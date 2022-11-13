import Vue from "vue";
import Vuetify from "vuetify/lib";
import deleteIconSvg from "@/assets/icons/activity-item-delete-button.vue";
import modalDeleteIcon from "@/assets/icons/modal-delete-icon.vue";
import editActivity from "@/assets/icons/todo-title-edit-button.vue";
import arrowSort from "@/assets/icons/arrow-sort.vue";
import sortAZ from "@/assets/icons/sort-az.vue";
import sortZA from "@/assets/icons/sort-za.vue";
import sortLatest from "@/assets/icons/sort-latest.vue";
import sortOldest from "@/assets/icons/sort-oldest.vue";
import sortUnfinished from "@/assets/icons/sort-unfinished.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      deleteIcon: {
        component: deleteIconSvg
      },
      modalDeleteIcon: {
        component: modalDeleteIcon
      },
      editActivity: {
        component: editActivity
      },
      arrowSort: {
        component: arrowSort
      },
      sortAZ: {
        component: sortAZ
      },
      sortZA: {
        component: sortZA
      },
      sortLatest: {
        component: sortLatest
      },
      sortOldest: {
        component: sortOldest
      },
      sortUnfinished: {
        component: sortUnfinished
      }
    }
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#16ABF8",
        secondary: "#D1EDDB"
      }
    }
  }
});
