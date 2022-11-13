<template>
  <v-dialog
    data-cy="modal-information"
    :value="alert.show"
    width="500"
    @click:outside="doCancel"
  >
    <v-card class="d-flex flex-row align-center px-7 py-5">
      <v-icon data-cy="modal-information-icon" size="24" color="#00A790">
        mdi-alert-circle-outline
      </v-icon>
      <span
        data-cy="modal-information-title"
        class="ml-4 modal-information-title"
      >
        {{ alert.message }}
      </span>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Alert",
  computed: {
    ...mapState(["alert"])
  },
  methods: {
    ...mapMutations(["setAlert"]),
    doCancel: function () {
      this.setAlert({
        ...this.alert,
        show: false
      });
    }
  }
};
</script>
