<template>
  <content-wrapper>
    <template v-slot:top-section>
      <div class="page-title" data-cy="activity-title">Activity</div>
      <v-spacer />
      <v-btn rounded color="primary" dark x-large data-cy="activity-add-button">
        <v-icon left dark> mdi-plus </v-icon>
        Tambah
      </v-btn>
    </template>
    <v-img
      v-if="data.length === 0"
      class=""
      contain
      :src="require(`@/assets/images/activity-empty-state.png`)"
    />
  </content-wrapper>
</template>

<script>
export default {
  name: "AppDashboard",
  data() {
    return {
      isLoading: false,
      data: []
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    // concurrent get data process using promise.all
    getData: async function () {
      this.isLoading = true;
      try {
        await Promise.all([
          // TODO: Get data
        ]);
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
