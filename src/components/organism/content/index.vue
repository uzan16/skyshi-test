<template>
  <v-container class="content-wrapper mt-5">
    <div class="d-flex flex-row top-section align-center mb-4">
      <slot name="top-section" />
    </div>
    <slot />
  </v-container>
</template>
