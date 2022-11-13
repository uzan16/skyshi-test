<template>
  <v-app>
    <app-bar />
    <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <delete-confirmation />
    <alert />
  </v-app>
</template>
<script>
import AppBar from "@/components/organism/app-bar";
import { DeleteConfirmation, Alert } from "@/components/atom";

export default {
  name: "App",
  components: {
    AppBar,
    DeleteConfirmation,
    Alert
  }
};
</script>
