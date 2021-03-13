(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      formTitle: 'TEST',
      action: null,
      loading: true,
      persons: [],
      totalDatas: 2,
      options: {},
      search: '',
      headers: [{
        text: 'Name',
        align: 'start',
        value: 'name'
      }, {
        text: 'Email',
        value: 'email'
      }, {
        text: 'Sex',
        value: 'sex'
      }, {
        text: 'Action',
        sortable: false,
        value: 'action'
      }],
      email: '',
      name: '',
      birthday: new Date().toISOString().substr(0, 10),
      menu: null,
      selectSex: null,
      sexs: ['Men', 'Male'],
      designers: [],
      itemDesigners: []
    };
  },
  computed: {
    params: function params(nv) {
      return _objectSpread(_objectSpread({}, this.options), {}, {
        query: this.search
      });
    }
  },
  watch: {
    params: {
      handler: function handler() {
        this.load();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    this.load();
  },
  methods: {
    query: function query() {
      return query_string__WEBPACK_IMPORTED_MODULE_0___default.a.stringify({
        q: this.search,
        page: this.options.page,
        limit: this.options.itemsPerPage,
        sortBy: this.options.sortBy,
        sortDesc: this.options.sortDesc
      }, {
        skipEmptyString: true
      });
    },
    load: function load() {
      var _this = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/persons?").concat(this.query());
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this.loading = false;
        _this.persons = response.data;
        _this.totalDatas = response.data.total_all;
      })["catch"](function (err) {
        if (err.response.status === 401) {
          _this.$router.push('/auth/logout');
        } else {
          _this.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }
      });
    },
    modalForm: function modalForm(param) {
      this.actionBtn(param);
      this.dialog = !this.dialog;
      this.resetForm();
    },
    resetForm: function resetForm() {
      var _this2 = this;

      this.email = '';
      this.name = '';
      this.birthday = new Date().toISOString().substr(0, 10);
      this.selectSex = null;
      this.designers = [];
      this.$nextTick(function () {
        _this2.$refs.observer.reset();
      });
    },
    actionBtn: function actionBtn(param) {
      switch (param.action) {
        case 'add':
          this.formTitle = 'New';
          this.action = 'Save';
          this.loadDesigners();
          break;

        case 'edit':
          this.formTitle = 'Edit';
          this.action = 'Update';
          this.showAPI(param.id);
          this.loadDesigners();
          break;
      }
    },
    loadDesigners: function loadDesigners() {
      var _this3 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/public/designers");
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        _this3.itemDesigners = response.data.data.map(function (value) {
          return value.name;
        });
      })["catch"](function (err) {
        if (err.response.status === 401) {
          _this3.$router.push('/auth/logout');
        } else {
          _this3.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }
      });
    },
    onSubmit: function onSubmit(data) {
      switch (this.action) {
        case 'Save':
          this.createAPI();
          break;

        case 'Update':
          this.updateAPI();
          break;
      }
    },
    createAPI: function createAPI() {
      var _this4 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/person");
      this.axios.post(uri, {
        email: this.email,
        name: this.name,
        sex: this.selectSex,
        birthday: this.birthday,
        designers: this.designers.join('|')
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this4.dialog = false;

        _this4.load();

        _this4.$swal.fire({
          title: 'Success',
          text: "Person created successfully",
          icon: 'success',
          timer: 1000
        });
      })["catch"](function (err) {
        if (err.response.status === 401) {
          _this4.$router.push('/auth/logout');
        } else {
          _this4.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }
      });
    },
    showAPI: function showAPI(param) {
      var _this5 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/person/").concat(param);
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this5.email = response.data.email;
        _this5.name = response.data.name;
        _this5.birthday = response.data.birthday;
        _this5.selectSex = response.data.sex;
        _this5.designers = response.data.designers.split('|');
      })["catch"](function (err) {
        if (err.response.status === 401) {
          _this5.$router.push('/auth/logout');
        } else {
          _this5.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }
      });
    },
    updateAPI: function updateAPI() {
      var _this6 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/person/").concat(this.email);
      this.axios.put(uri, {
        name: this.name,
        sex: this.selectSex,
        birthday: this.birthday,
        designers: this.designers.join('|')
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this6.dialog = false;

        _this6.load();

        _this6.$swal.fire({
          title: 'Success',
          text: "Person updated successfully",
          icon: 'success',
          timer: 1000
        });
      })["catch"](function (err) {
        if (err.response.status === 401) {
          _this6.$router.push('/auth/logout');
        } else {
          _this6.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }
      });
    },
    deleteAPI: function deleteAPI(param) {
      var _this7 = this;

      this.$swal.fire({
        title: 'Are you sure?',
        text: "If you delete it, the data will not come back again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(function (result) {
        if (result.value) {
          _this7.$swal.fire({
            title: 'Success!',
            text: 'Person deleted successfully',
            icon: 'success',
            timer: 1000
          });

          var uri = "".concat(_this7.appConfig.$api_url, "/api/master/person/").concat(param);

          _this7.axios["delete"](uri, {
            data: {},
            headers: {
              'Content-Type': 'application/json',
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            }
          }).then(function (response) {
            _this7.load();
          })["catch"](function (err) {
            if (err.response.status === 401) {
              _this7.$router.push('/auth/logout');
            } else {
              _this7.$swal.fire({
                title: 'Error',
                text: err,
                icon: 'error'
              });
            }
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "500px" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [
                _c("span", { staticClass: "headline" }, [
                  _vm._v(_vm._s(_vm.formTitle) + " Person")
                ])
              ]),
              _vm._v(" "),
              _c("validation-observer", {
                ref: "observer",
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var handleSubmit = ref.handleSubmit
                      return [
                        _c(
                          "v-form",
                          {
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return handleSubmit(_vm.onSubmit)
                              }
                            }
                          },
                          [
                            _c(
                              "v-card-text",
                              [
                                _c(
                                  "v-container",
                                  { attrs: { "grid-list-md": "" } },
                                  [
                                    _c("validation-provider", {
                                      attrs: {
                                        name: "Email",
                                        rules: "required|email"
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Email",
                                                    "prepend-inner-icon":
                                                      "mdi-account-circle-outline",
                                                    readonly:
                                                      _vm.action == "Update"
                                                        ? true
                                                        : false,
                                                    filled:
                                                      _vm.action == "Update"
                                                        ? true
                                                        : false,
                                                    "error-messages": errors[0]
                                                  },
                                                  model: {
                                                    value: _vm.email,
                                                    callback: function($$v) {
                                                      _vm.email = $$v
                                                    },
                                                    expression: "email"
                                                  }
                                                })
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("validation-provider", {
                                      attrs: {
                                        name: "Full Name",
                                        rules: "required"
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Full Name",
                                                    "prepend-inner-icon":
                                                      "mdi-account-circle-outline",
                                                    "error-messages": errors[0]
                                                  },
                                                  model: {
                                                    value: _vm.name,
                                                    callback: function($$v) {
                                                      _vm.name = $$v
                                                    },
                                                    expression: "name"
                                                  }
                                                })
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("validation-provider", {
                                      attrs: {
                                        name: "Birthday",
                                        rules: "required"
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c(
                                                  "v-menu",
                                                  {
                                                    attrs: {
                                                      "close-on-content-click": false,
                                                      "nudge-right": 40,
                                                      transition:
                                                        "scale-transition",
                                                      "offset-y": "",
                                                      "min-width": "auto"
                                                    },
                                                    scopedSlots: _vm._u(
                                                      [
                                                        {
                                                          key: "activator",
                                                          fn: function(ref) {
                                                            var on = ref.on
                                                            var attrs =
                                                              ref.attrs
                                                            return [
                                                              _c(
                                                                "v-text-field",
                                                                _vm._g(
                                                                  _vm._b(
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Birthday",
                                                                        "prepend-icon":
                                                                          "mdi-calendar",
                                                                        readonly:
                                                                          "",
                                                                        "error-messages":
                                                                          errors[0]
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm.birthday,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.birthday = $$v
                                                                        },
                                                                        expression:
                                                                          "birthday"
                                                                      }
                                                                    },
                                                                    "v-text-field",
                                                                    attrs,
                                                                    false
                                                                  ),
                                                                  on
                                                                )
                                                              )
                                                            ]
                                                          }
                                                        }
                                                      ],
                                                      null,
                                                      true
                                                    ),
                                                    model: {
                                                      value: _vm.menu,
                                                      callback: function($$v) {
                                                        _vm.menu = $$v
                                                      },
                                                      expression: "menu"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(" "),
                                                    _c("v-date-picker", {
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          _vm.menu = false
                                                        }
                                                      },
                                                      model: {
                                                        value: _vm.birthday,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.birthday = $$v
                                                        },
                                                        expression: "birthday"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("validation-provider", {
                                      attrs: { name: "Sex", rules: "required" },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c("v-select", {
                                                  attrs: {
                                                    items: _vm.sexs,
                                                    label: "Sex",
                                                    "prepend-inner-icon":
                                                      "mdi-gender-male-female",
                                                    "error-messages": errors[0]
                                                  },
                                                  model: {
                                                    value: _vm.selectSex,
                                                    callback: function($$v) {
                                                      _vm.selectSex = $$v
                                                    },
                                                    expression: "selectSex"
                                                  }
                                                })
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("validation-provider", {
                                      attrs: {
                                        name: "Designers",
                                        rules: "required"
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c("v-combobox", {
                                                  attrs: {
                                                    "item-value": "name",
                                                    "item-text": "name",
                                                    items: _vm.itemDesigners,
                                                    label: "Designers",
                                                    multiple: "",
                                                    chips: "",
                                                    "prepend-inner-icon":
                                                      "mdi-cards",
                                                    "error-messages": errors[0]
                                                  },
                                                  model: {
                                                    value: _vm.designers,
                                                    callback: function($$v) {
                                                      _vm.designers = $$v
                                                    },
                                                    expression: "designers"
                                                  }
                                                })
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "blue darken-1" },
                                    on: {
                                      click: function($event) {
                                        _vm.dialog = false
                                      }
                                    }
                                  },
                                  [_vm._v("Cancel")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      color: "blue darken-1",
                                      type: "submit"
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.action))]
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { align: "start", justify: "center" } },
        [
          _c("v-col", { attrs: { cols: "12" } }, [
            _c("h2", { staticClass: "text-center" }, [_vm._v("Persons")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { staticClass: "d-flex align-center", attrs: { md: "4" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { small: "", color: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.modalForm({ action: "add" })
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { dark: "" } }, [
                    _vm._v("\n\t\t\t\t\t\tmdi-plus\n\t\t\t\t\t")
                  ]),
                  _vm._v("\n\t\t\t\t\tNew Person\n\t\t\t\t")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { staticClass: "ml-auto d-flex align-center", attrs: { md: "4" } },
            [
              _c(
                "v-row",
                { attrs: { "no-gutters": "" } },
                [
                  _c(
                    "v-col",
                    { attrs: { md: "8" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          "append-icon": "mdi-magnify",
                          label: "Search"
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider", { staticClass: "mt-1" }),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { align: "start", justify: "start" } },
        [
          _c(
            "v-col",
            { attrs: { md: "12" } },
            [
              _c(
                "v-card",
                { staticClass: "mx-auto" },
                [
                  _c("v-data-table", {
                    attrs: {
                      options: _vm.options,
                      "server-items-length": _vm.totalDatas,
                      headers: _vm.headers,
                      items: _vm.persons.data,
                      search: _vm.search,
                      loading: _vm.loading
                    },
                    on: {
                      "update:options": function($event) {
                        _vm.options = $event
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item.action",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            _c(
                              "v-btn-toggle",
                              { attrs: { mandatory: "" } },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      small: "",
                                      color: "cyan",
                                      default: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.modalForm({
                                          action: "edit",
                                          id: item.id
                                        })
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      small: "",
                                      color: "secondary",
                                      default: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteAPI(item.id)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/person/PersonIndex.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/person/PersonIndex.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersonIndex.vue?vue&type=template&id=96e032a4& */ "./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4&");
/* harmony import */ var _PersonIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersonIndex.vue?vue&type=script&lang=js& */ "./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VBtnToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtnToggle */ "./node_modules/vuetify/lib/components/VBtnToggle/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VCombobox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VCombobox */ "./node_modules/vuetify/lib/components/VCombobox/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDatePicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VDatePicker */ "./node_modules/vuetify/lib/components/VDatePicker/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VForm */ "./node_modules/vuetify/lib/components/VForm/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ "./node_modules/vuetify/lib/components/VMenu/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PersonIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */





















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VBtnToggle: vuetify_lib_components_VBtnToggle__WEBPACK_IMPORTED_MODULE_5__["VBtnToggle"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VCombobox: vuetify_lib_components_VCombobox__WEBPACK_IMPORTED_MODULE_8__["VCombobox"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_9__["VDataTable"],VDatePicker: vuetify_lib_components_VDatePicker__WEBPACK_IMPORTED_MODULE_10__["VDatePicker"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_11__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_12__["VDivider"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_13__["VForm"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_14__["VIcon"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_15__["VMenu"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_16__["VSelect"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_17__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/person/PersonIndex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PersonIndex.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/person/PersonIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PersonIndex.vue?vue&type=template&id=96e032a4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/person/PersonIndex.vue?vue&type=template&id=96e032a4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PersonIndex_vue_vue_type_template_id_96e032a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);