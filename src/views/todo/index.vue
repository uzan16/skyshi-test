<template>
  <content-wrapper :is-loading="isLoading">
    <template v-slot:top-section>
      <v-btn
        data-cy="todo-back-button"
        icon
        color="#111111"
        class="mr-4"
        @click="$router.push('/')"
      >
        <v-icon size="48">mdi-chevron-left</v-icon>
      </v-btn>
      <div
        v-if="!isEditingTitle"
        data-cy="todo-title"
        class="page-title mr-4"
        @click="isEditingTitle = true"
      >
        {{ activity.title }}
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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            data-cy="todo-sort-button"
            outlined
            fab
            color="#E5E5E5"
            class="mr-3"
            :loading="isLoading"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>$arrowSort</v-icon>
          </v-btn>
        </template>
        <v-list class="py-0 sort-option" data-cy="sort-parent">
          <template v-for="(item, index) in sortOptions">
            <v-list-item
              :data-cy="`sort-${item.value}`"
              :key="index"
              @click="sortSelected = item.value"
            >
              <v-list-item-icon class="mr-3">
                <v-icon size="20">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="d-flex flex-row align-center">
                  <v-list-item-title
                    v-text="item.label"
                    class="mr-7"
                  ></v-list-item-title>
                  <v-icon
                    v-if="sortSelected === item.value"
                    color="#4A4A4A"
                    size="20"
                    >mdi-check</v-icon
                  >
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index < sortOptions.length - 1"
              :key="`div-${index}`"
            />
          </template>
        </v-list>
      </v-menu>
      <v-btn
        data-cy="todo-add-button"
        rounded
        color="primary"
        dark
        x-large
        :loading="isLoading"
        @click="() => showModalForm()"
      >
        <v-icon left dark> mdi-plus </v-icon>
        Tambah
      </v-btn>
    </template>
    <v-img
      data-cy="todo-empty-state"
      class="todo-empty-state mx-auto"
      v-if="data.length === 0"
      contain
      :src="require(`@/assets/images/todo-empty-state.png`)"
      @click="() => showModalForm()"
    />
    <template v-else>
      <todo-card
        v-for="(item, i) in sortedData"
        :item="item"
        @delete="deleteTodo(item)"
        @edit="showModalForm('edit', item)"
        @onActiveChange="(e) => saveTodo(item, e)"
        :key="item.id"
        :data-cy="`todo-item-${i}`"
      />
    </template>

    <form-page
      :show="showForm"
      @close="onCloseForm()"
      :data="selectedData"
      :mode="formMode"
      @onSuccess="getTodo()"
    />
  </content-wrapper>
</template>

<script>
import { TodoCard } from "@/components/atom";
import FormPage from "./form.vue";
export default {
  name: "AppTodo",
  data() {
    return {
      isLoading: false,
      data: [],
      activity: {},
      isEditingTitle: false,
      showForm: false,
      selectedData: {},
      formMode: "create",
      sortSelected: "latest"
    };
  },
  components: {
    TodoCard,
    FormPage
  },
  mounted: function () {
    if (!this.$route.params.id) {
      this.$router.replace("");
    }
    this.getActivity();
  },
  computed: {
    sortOptions: function () {
      return [
        {
          value: "latest",
          icon: "$sortLatest",
          label: "Terbaru"
        },
        {
          value: "oldest",
          icon: "$sortOldest",
          label: "Terlama"
        },
        {
          value: "az",
          icon: "$sortAZ",
          label: "A-Z"
        },
        {
          value: "za",
          icon: "$sortZA",
          label: "Z-A"
        },
        {
          value: "unfinished",
          icon: "$sortUnfinished",
          label: "Belum Selesai"
        }
      ];
    },
    sortedData: function () {
      switch (this.sortSelected) {
        case "latest":
          return [...this.data].sort((a, b) =>
            a.id < b.id ? 1 : a.id > b.id ? -1 : 0
          );
        case "oldest":
          return [...this.data].sort((a, b) =>
            a.id < b.id ? -1 : a.id > b.id ? 1 : 0
          );
        case "az":
          return [...this.data].sort((a, b) =>
            a.title < b.title ? -1 : a.title > b.title ? 1 : 0
          );
        case "za":
          return [...this.data].sort((a, b) =>
            a.title < b.title ? 1 : a.title > b.title ? -1 : 0
          );
        case "unfinished":
          return [...this.data].sort((a, b) =>
            a.is_active < b.is_active ? 1 : a.is_active > b.is_active ? -1 : 0
          );
        default:
          return [...this.data];
      }
    }
  },
  methods: {
    getActivity: async function () {
      this.isLoading = true;
      try {
        let {
          data: { id, title, created_at, todo_items }
        } = await this.$http.get(`/activity-groups/${this.$route.params.id}`);
        this.activity = {
          id,
          title,
          created_at
        };
        this.data = todo_items.map((x) => ({
          ...x,
          is_checked: x.is_active === 0
        }));
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
        this.data = data.map((x) => ({
          ...x,
          is_checked: x.is_active === 0
        }));
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    saveActivity: async function () {
      this.isLoading = true;
      try {
        let {
          data: { id, title, created_at }
        } = await this.$http.patch(`activity-groups/${this.$route.params.id}`, {
          title: this.activity.title
        });
        this.activity = {
          id,
          title,
          created_at
        };
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
        this.isEditingTitle = false;
      }
    },
    deleteTodo: async function (item) {
      try {
        const res = await this.$dialog.showDeleteConfirmation(
          item.title,
          "List Item",
          async () => {
            await this.$http.delete(`/todo-items/${item.id}`);
          }
        );
        if (res) {
          await this.getTodo();
          this.$dialog.showAlert("List Item berhasil dihapus");
        }
      } catch (e) {
        // TODDO: handle error
      }
    },
    saveTodo: async function ({ id }, e) {
      this.isLoading = true;
      try {
        await this.$http.patch(`todo-items/${id}`, {
          is_active: e ? 0 : 1
        });
        await this.getTodo();
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    showModalForm: async function (mode = "create", selectedData = {}) {
      this.selectedData = { ...selectedData };
      this.$nextTick().then(() => {
        this.formMode = mode;
        this.showForm = true;
      });
    },
    onCloseForm: function () {
      this.showForm = false;
    }
  }
};
</script>
