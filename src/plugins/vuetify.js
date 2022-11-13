import Vue from "vue";
import Vuetify from "vuetify/lib";
import deleteIconSvg from "@/assets/icons/activity-item-delete-button.vue";
import modalDeleteIcon from "@/assets/icons/modal-delete-icon.vue";
import editActivity from "@/assets/icons/todo-title-edit-button.vue";

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
