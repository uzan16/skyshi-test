<template>
  <v-container class="content-wrapper mt-5">
    <div class="d-flex flex-row top-section align-center mb-8">
      <slot name="top-section" />
    </div>
    <div v-if="isLoading" class="loading-wrapper text-center mt-16 pt-16">
      <v-progress-circular
        indeterminate
        color="primary"
        large
      ></v-progress-circular>
    </div>
    <slot v-else />
  </v-container>
</template>

<script>
export default {
  name: "Content",
  props: {
    isLoading: {
      default: false
    }
  }
};
</script>
