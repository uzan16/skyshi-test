<template>
  <content-wrapper :is-loading="isLoading">
    <template v-slot:top-section>
      <v-btn
        data-cy="todo-back-button"
        icon
        color="#111111"
        class="mr-4"
      >
        <v-icon size="48">mdi-chevron-left</v-icon>
      </v-btn>
      <div 
        v-if="!isEditingTitle" 
        data-cy="todo-title" 
        class="page-title mr-4"
        @click="isEditingTitle = true"
      >
        {{activity.title}}
      </div>
      <v-text-field
        v-else
        autofocus
        v-model="activity.title"
        hide-details="autos"
        class="page-title mt-0 pt-0"
        single-line
        :disabled="isLoading"
        @blur="saveActivity"
      ></v-text-field>
      <v-btn
        data-cy="todo-title-edit-button"
        icon
        @click="isEditingTitle = !isEditingTitle"
        :loading="isLoading"
      >
        <v-icon>$editActivity</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        data-cy="todo-add-button"
        rounded
        color="primary"
        dark
        x-large
        :loading="isLoading"
        @click="createActivity"
      >
        <v-icon left dark> mdi-plus </v-icon>
        Tambah
      </v-btn>
    </template>
    <v-img
      data-cy="todo-empty-state"
      v-if="data.length === 0"
      contain
      :src="require(`@/assets/images/todo-empty-state.png`)"
      @click="createActivity"
    />
    <v-row v-else class="d-flex flex-wrap">
      <v-col
        v-for="(item, i) in data"
        cols="3"
        :key="item.id"
        :data-cy="`todo-item-${i}`"
      >
        <activity-card :item="item" @delete="deleteActivity(item)" />
      </v-col>
    </v-row>
  </content-wrapper>
</template>

<script>
import { ActivityCard } from "@/components/atom";
export default {
  name: "AppTodo",
  data() {
    return {
      isLoading: false,
      data: [],
      activity: {},
      isEditingTitle: false
    };
  },
  components: {
    ActivityCard
  },
  mounted: function () {
    if (!this.$route.params.id) {
      this.$router.replace('');
    }
    this.getActivity();
  },
  methods: {
    getActivity: async function () {
      this.isLoading = true;
      try {
        let {
          data: { id, title, created_at, todo_items }
        } = await this.$http.get(
          `/activity-groups/${this.$route.params.id}`
        );
        this.activity = {
          id, title, created_at
        };
        this.data = todo_items;
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    getTodo: async function () {
      this.isLoading = true;
      try {
        let {
          data: { data }
        } = await this.$http.get(
          `/todo-items?activity_group_id=${this.$route.params.id}`
        );
        this.data = data;
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    saveActivity: async function () {
      this.isLoading = true;
      try {
        let {data: { id, title, created_at}} = await this.$http.patch(`activity-groups/${this.$route.params.id}`, {
          title: this.activity.title
        });
        this.activity = {
          id, title, created_at
        };
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
        this.isEditingTitle = false;
      }
    },
    createActivity: async function () {
      this.isLoading = true;
      try {
        await this.$http.post(`/activity-groups`, {
          title: "New Activity",
          email: process.env.VUE_APP_EMAIL
        });
        await this.getTodo();
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    deleteActivity: async function (item) {
      try {
        const res = await this.$dialog.showDeleteConfirmation(
          item,
          "activity",
          async () => {
            await this.$http.delete(`/activity-groups/${item.id}`);
          }
        );
        if (res) {
          await this.getTodo();
          this.$dialog.showAlert("Activity berhasil dihapus");
        }
      } catch (e) {
        // TODDO: handle error
      }
    }
  }
};
</script>
