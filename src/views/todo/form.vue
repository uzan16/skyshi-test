<template>
  <v-dialog
    data-cy="modal-add"
    :value="show"
    scrollable
    :max-width="600"
    transition="dialog-bottom-transition"
    @click:outside="doClose"
    @keydown="({ keyCode }) => (keyCode === 27 ? doClose() : null)"
  >
    <v-card class="sk-form">
      <v-card-title
        class="d-flex justify-space-between align-center modal-header px-6 py-4"
      >
        <span data-cy="modal-add-title" class="form-title">{{
          mode === "create" ? "Tambah List Item" : "Edit List Item"
        }}</span>
        <v-btn
          data-cy="modal-add-close-button"
          icon
          color="#A4A4A4"
          @click="doClose"
        >
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-6 pt-5 pb-10" v-if="show">
        <v-form ref="form" lazy-validation>
          <div class="form-group">
            <span data-cy="modal-add-name-title" class="field-caption"
              >Nama List Item</span
            >
            <v-text-field
              data-cy="modal-add-name-input"
              single-line
              dense
              outlined
              class="mt-2"
              hide-details="auto"
              v-model="form.title"
              placeholder="Tambahkan nama list item"
              :rules="$rules('Nama List Item', 'required')"
            />
          </div>
          <div class="form-group">
            <span data-cy="modal-add-priority-title" class="field-caption"
              >Priority</span
            >
            <v-select
              data-cy="modal-add-priority-dropdown"
              single-line
              dense
              outlined
              class="mt-2 field-priority"
              hide-details="auto"
              v-model="form.priority"
              placeholder="Pilih priority"
              :rules="$rules('Priority', 'required')"
              :items="priorityData"
            >
              <template v-slot:selection="{ item }">
                <span
                  :data-cy="`modal-add-priority-${item.value}`"
                  class="priority-dot"
                  :class="item.value"
                  >{{ item.text }}</span
                >
              </template>
              <template v-slot:item="{ item }">
                <span
                  data-cy="modal-add-priority-item"
                  class="priority-dot"
                  :class="item.value"
                  >{{ item.text }}</span
                >
              </template>
            </v-select>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-6 py-4 justify-end">
        <v-btn
          data-cy="modal-add-save-button"
          color="primary"
          class="form-btn"
          rounded
          :loading="isLoading"
          @click="save"
          :disabled="!(form.title && form.priority)"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import priorityData from "@/data/priority.json";

export default {
  name: "FormTodo",
  props: {
    show: {
      default: false
    },
    mode: {
      default: "create"
    },
    data: {
      default: () => ({})
    }
  },
  data: () => ({
    priorityData: priorityData,
    form: {},
    isLoading: false
  }),
  watch: {
    data: function (val) {
      this.form = { ...val };

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      });
    }
  },
  methods: {
    doClose: function () {
      if (this.isLoading) return;
      this.$emit("close");
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        let method = "patch";
        let url = `/todo-items/${this.form.id}`;
        if (this.mode === "create") {
          method = "post";
          url = "/todo-items";
        }
        try {
          await this.$http[method](url, {
            ...this.form,
            activity_group_id: this.$route.params.id
          });
          this.$emit("onSuccess");
          this.$emit("close");
        } catch (error) {
          // console.log("err", error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
};
</script>
