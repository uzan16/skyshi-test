<template>
  <v-app>
    <app-bar />
    <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/organism/app-bar";

export default {
  name: "LayoutDefault",
  components: {
    AppBar
  }
};
</script>
