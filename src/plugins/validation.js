export default {
  install(Vue) {
    const Validator = {
      DEF_MSG: {
        required: "The {0} field is required.",
        regex: "The {0} field format is invalid.",
        numeric: "The {0} field may only contain numeric characters.",
        min_value: "The {0} field must be {1} or more.",
        min: "The {0} field must be at least {1} characters.",
        max_value: "The {0} field must be {1} or less.",
        max: "The {0} field may not be greater than {1} characters.",
        between: "The {0} field must be between {1} and {2}.",
        email: "The {0} field must be a valid email.",
        in: "The {0} field must be a valid value.",
        not_in: "The {0} field already exists.",
        not_in_ignorecase: "The {0} field already exists.",
        is: "The {0} field field must be a valid value.",
        is_not: "The {0} field field must be a valid value.",
        alpha_dash:
          "The {0} field may contain alpha-numeric characters as well as dashes and underscores.",
        alpha_num: "The {0} field may only contain alpha-numeric characters.",
        alpha_spaces:
          "The {0} field may only contain alphabetic characters as well as spaces.",
        alpha: "The {0} field may only contain alphabetic characters.",
        equal: "The {0} field must equal with {1}.",
        equalignorecase: "The {0} field must equal with {1}."
      },
      required: function (value) {
        if (Array.isArray(value)) {
          return !!value.length;
        }
        if (value === undefined || value === null) {
          return false;
        }
        return !!String(value).trim().length;
      },
      regex: function (value, ref) {
        if (value === undefined || value === null || value === "") {
          return true;
        }
        var regex = ref;
        // var flags = ref.slice(1);
        if (regex instanceof RegExp) {
          return regex.test(value);
        }
        return new RegExp(regex).test(String(value));
      },
      numeric: function (value) {
        if (value === null || value === undefined || value === "") {
          return true;
        }
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return /^[0-9-]+$/.test(String(val));
          });
        }
        return /^[0-9-]+$/.test(String(value));
      },
      min_value: function (value, min) {
        if (
          Array.isArray(value) ||
          value === null ||
          value === undefined ||
          value === ""
        ) {
          return true;
        }
        return Number(value) >= min;
      },
      min: function (value, length) {
        if (value === undefined || value === null) {
          return true;
        }
        return String(value).length === 0 || String(value).length >= length;
      },
      max_value: function (value, max) {
        if (
          Array.isArray(value) ||
          value === null ||
          value === undefined ||
          value === ""
        ) {
          return true;
        }
        return Number(value) <= max;
      },
      max: function (value, length) {
        if (value === undefined || value === null) {
          return length >= 0;
        }
        return String(value).length <= length;
      },
      between: function (value, ref) {
        var min = ref[0];
        var max = ref[1];

        if (value === null || value === undefined || value === "") {
          return true;
        }

        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.between(val, [min, max]);
          });
        }
        return Number(min) <= value && Number(max) >= value;
      },
      email: function (value) {
        if (value === undefined || value === null || value === "") {
          return true;
        }
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              String(val)
            );
          });
        }
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          String(value)
        );
      },
      phone: function (value) {
        if (value === undefined || value === null || value === "") {
          return true;
        }
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(
              String(val)
            );
          });
        }
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(
          String(value)
        );
      },
      alpha_dash: function (value) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.alpha_dash(val);
          });
        }
        return /^[0-9A-Za-z_-]*$/.test(value);
      },
      alpha_num: function (value) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.alpha_num(val);
          });
        }
        return /^[0-9A-Za-z]*$/.test(value);
      },
      alpha_spaces: function (value) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.alpha_spaces(val);
          });
        }
        return /^[A-Za-z\s]*$/.test(value);
      },
      alpha: function (value) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.alpha(val);
          });
        }
        return /^[A-Za-z]*$/.test(value);
      },

      in: function (value, options) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.in(val, options);
          });
        }
        return !!options.filter(function (option) {
          return option == value;
        }).length;
      },
      not_in: function (value, options) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.not_in(val, options);
          });
        }
        return !options.filter(function (option) {
          return option == value;
        }).length;
      },
      not_in_ignorecase: function (value, options) {
        if (Array.isArray(value)) {
          return value.every(function (val) {
            return Validator.not_in_ignorecase(val, options);
          });
        }
        return !options.filter(function (option) {
          return option.toUpperCase() == value.toUpperCase();
        }).length;
      },
      is: function (value, ref) {
        return value === ref;
      },
      is_not: function (value, ref) {
        return value !== ref;
      }
    };

    const formatString = (...params) => {
      let str = params[0];
      let args = params.slice(1);

      let temp = str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });

      return temp;
    };

    Vue.prototype.$rules = function (fieldName, specs) {
      let param = {};
      if (typeof specs == "string") {
        specs.split("|").forEach((row) => {
          if (row) {
            let _r = row.split(":");
            if (_r[0] === "between") {
              if (_r.length > 1) {
                let _v = _r[1].split(",");
                param[_r[0]] = [_v[0], _v.length > 1 ? _v[1] : 0];
              } else {
                param[_r[0]] = [0, 0];
              }
            } else {
              param[_r[0]] = _r.length > 1 ? _r[1] : true;
            }
          }
        });
      } else {
        param = specs;
      }
      let res = [];

      for (const key in param) {
        if (
          Validator[key] !== undefined &&
          param[key] !== undefined &&
          param[key] !== false
        ) {
          res.push(
            (v) =>
              Validator[key](v, param[key]) ||
              formatString(
                Validator.DEF_MSG[key],
                fieldName,
                ...(param[key] instanceof Array ? param[key] : [param[key]])
              )
          );
        }
      }

      return res;
    };
  }
};
