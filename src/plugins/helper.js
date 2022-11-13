import dayjs from "dayjs";
import store from "../store";

export default {
  install(Vue) {
    Vue.prototype.$helper = {
      formatDate: function (date, format = "D MMMM YYYY") {
        if (!date) {
          return "";
        }
        return dayjs(date).format(format);
      }
    };
    Vue.prototype.$dialog = {
      showDeleteConfirmation: function (item, type, action) {
        return new Promise((resolve) => {
          store.commit("setDeleteDialog", {
            show: true,
            type,
            data: item.title,
            callback: async ({ isCancel }) => {
              if (isCancel) {
                store.commit("setDeleteDialog", {
                  show: false,
                  type: "",
                  data: "",
                  callback: undefined,
                  loading: false
                });
                resolve(false);
              } else {
                await action();
                store.commit("setDeleteDialog", {
                  show: false,
                  type: "",
                  data: "",
                  callback: undefined,
                  loading: false
                });
                resolve(true);
              }
            },
            loading: false
          });
        });
      },
      showAlert: function (message, type = "info") {
        store.commit("setAlert", {
          show: true,
          type,
          message
        });
      }
    };
  }
};
