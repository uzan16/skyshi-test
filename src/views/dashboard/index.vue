<template>
  <content-wrapper :is-loading="isLoading">
    <template v-slot:top-section>
      <div data-cy="activity-title" class="page-title">Activity</div>
      <v-spacer />
      <v-btn
        data-cy="activity-add-button"
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
      data-cy="activity-empty-state"
      v-if="data.length === 0"
      contain
      :src="require(`@/assets/images/activity-empty-state.png`)"
      @click="createActivity"
    />
    <v-row v-else class="d-flex flex-wrap">
      <v-col
        v-for="(item, i) in data"
        cols="3"
        :key="item.id"
        :data-cy="`activity-item-${i}`"
      >
        <activity-card :item="item" @delete="deleteActivity(item)" />
      </v-col>
    </v-row>
  </content-wrapper>
</template>

<script>
import { ActivityCard } from "@/components/atom";
export default {
  name: "AppDashboard",
  data() {
    return {
      isLoading: false,
      data: []
    };
  },
  components: {
    ActivityCard
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: async function () {
      this.isLoading = true;
      try {
        let {
          data: { data }
        } = await this.$http.get(
          `/activity-groups?email=${encodeURIComponent(
            process.env.VUE_APP_EMAIL
          )}`
        );
        this.data = data;
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    createActivity: async function () {
      this.isLoading = true;
      try {
        await this.$http.post(`/activity-groups`, {
          title: "New Activity",
          email: process.env.VUE_APP_EMAIL
        });
        await this.getData();
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
          await this.getData();
          this.$dialog.showAlert("Activity berhasil dihapus");
        }
      } catch (e) {
        // TODDO: handle error
      }
    }
  }
};
</script>
