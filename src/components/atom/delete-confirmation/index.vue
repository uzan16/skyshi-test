<template>
  <v-dialog
    data-cy="modal-delete"
    :value="deleteDialog.show"
    width="500"
    @click:outside="doCancel"
    @keydown="({keyCode}) => keyCode === 27 ? doCancel() : null"
  >
    <v-card class="d-flex flex-column align-center pa-7">
      <v-icon data-cy="modal-delete-icon" size="64"> $modalDeleteIcon </v-icon>
      <span
        data-cy="modal-delete-title"
        class="my-5 text-center modal-delete-title"
      >
        Apakah anda yakin menghapus {{ deleteDialog.type }}<br /><strong
          >"{{ deleteDialog.data }}"</strong
        >?
      </span>
      <div class="d-flex flex-row">
        <v-btn
          data-cy="modal-delete-cancel-button"
          rounded
          color="#F4F4F4"
          depressed
          class="mr-2"
          width="156"
          :loading="deleteDialog.loading"
          @click="doCancel"
        >
          Batal
        </v-btn>
        <v-btn
          data-cy="modal-delete-confirm-button"
          rounded
          color="#ED4C5C"
          dark
          depressed
          class="ml-2"
          width="156"
          :loading="deleteDialog.loading"
          @click="doAction"
        >
          Hapus
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DeleteConfirmation",
  computed: {
    ...mapState(["deleteDialog"])
  },
  methods: {
    ...mapMutations(["setDeleteDialog"]),
    doCancel: function () {
      this.setDeleteDialog({
        ...this.deleteDialog,
        loading: true
      });
      if (this.deleteDialog.callback) {
        this.deleteDialog.callback({
          isCancel: true
        });
      }
    },
    doAction: function () {
      this.setDeleteDialog({
        ...this.deleteDialog,
        loading: true
      });
      if (this.deleteDialog.callback) {
        this.deleteDialog.callback({
          isCancel: false
        });
      }
    }
  }
};
</script>
