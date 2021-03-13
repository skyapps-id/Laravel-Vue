(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      formTitle: 'TEST',
      action: null,
      loading: true,
      designers: [],
      totalDatas: 2,
      options: {},
      search: '',
      headers: [{
        text: 'Name',
        align: 'start',
        value: 'name'
      }, {
        text: 'Action',
        sortable: false,
        value: 'action'
      }],
      id: '',
      name: '',
      menu: null
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

      var uri = "".concat(this.appConfig.$api_url, "/api/master/designers?").concat(this.query());
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this.loading = false;
        _this.designers = response.data;
        _this.totalDatas = response.data.total_all;
      })["catch"](function (err) {
        _this.$swal.fire({
          title: 'Error',
          text: err,
          icon: 'error'
        });
      });
    },
    modalForm: function modalForm(param) {
      this.actionBtn(param);
      this.dialog = !this.dialog;
      this.resetForm();
    },
    resetForm: function resetForm() {
      var _this2 = this;

      this.id = '';
      this.name = '';
      this.$nextTick(function () {
        _this2.$refs.observer.reset();
      });
    },
    actionBtn: function actionBtn(param) {
      switch (param.action) {
        case 'add':
          this.formTitle = 'New';
          this.action = 'Save';
          break;

        case 'edit':
          this.formTitle = 'Edit';
          this.action = 'Update';
          this.showAPI(param.id);
          break;
      }
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
      var _this3 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/designer");
      this.axios.post(uri, {
        name: this.name
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this3.dialog = false;

        _this3.load();

        _this3.$swal.fire({
          title: 'Success',
          text: "Designer created successfully",
          icon: 'success',
          timer: 1000
        });
      })["catch"](function (err) {
        _this3.$swal.fire({
          title: 'Error',
          text: err,
          icon: 'error'
        });
      });
    },
    showAPI: function showAPI(param) {
      var _this4 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/designer/").concat(param);
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this4.id = response.data.id;
        _this4.name = response.data.name;
      })["catch"](function (err) {
        _this4.$swal.fire({
          title: 'Error',
          text: err,
          icon: 'error'
        });
      });
    },
    updateAPI: function updateAPI() {
      var _this5 = this;

      var uri = "".concat(this.appConfig.$api_url, "/api/master/designer/").concat(this.id);
      this.axios.put(uri, {
        name: this.name
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer ".concat(localStorage.getItem('token'))
        }
      }).then(function (response) {
        _this5.dialog = false;

        _this5.load();

        _this5.$swal.fire({
          title: 'Success',
          text: "Designer updated successfully",
          icon: 'success',
          timer: 1000
        });
      })["catch"](function (err) {
        _this5.$swal.fire({
          title: 'Error',
          text: err,
          icon: 'error'
        });
      });
    },
    deleteAPI: function deleteAPI(param) {
      var _this6 = this;

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
          _this6.$swal.fire({
            title: 'Success!',
            text: 'Designer deleted successfully',
            icon: 'success',
            timer: 1000
          });

          var uri = "".concat(_this6.appConfig.$api_url, "/api/master/designer/").concat(param);

          _this6.axios["delete"](uri, {
            data: {},
            headers: {
              'Content-Type': 'application/json',
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            }
          }).then(function (response) {
            _this6.load();
          })["catch"](function (err) {
            _this6.$swal.fire({
              title: 'Error',
              text: err,
              icon: 'error'
            });
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
                  _vm._v(_vm._s(_vm.formTitle) + " Designer")
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
                                        name: "Name",
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
                                                    label: "Name",
                                                    "prepend-inner-icon":
                                                      "mdi-cards",
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
            _c("h2", { staticClass: "text-center" }, [_vm._v("Designers")])
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
                  _vm._v("\n\t\t\t\t\tNew Designer\n\t\t\t\t")
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
                      items: _vm.designers.data,
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

/***/ "./resources/js/components/designers/DesignersIndex.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/designers/DesignersIndex.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DesignersIndex.vue?vue&type=template&id=af8a1088& */ "./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088&");
/* harmony import */ var _DesignersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DesignersIndex.vue?vue&type=script&lang=js& */ "./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VBtnToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtnToggle */ "./node_modules/vuetify/lib/components/VBtnToggle/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ "./node_modules/vuetify/lib/components/VDataTable/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VForm */ "./node_modules/vuetify/lib/components/VForm/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DesignersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */

















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VBtnToggle: vuetify_lib_components_VBtnToggle__WEBPACK_IMPORTED_MODULE_5__["VBtnToggle"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__["VDataTable"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_10__["VDivider"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_11__["VForm"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/designers/DesignersIndex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DesignersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DesignersIndex.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/designers/DesignersIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DesignersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DesignersIndex.vue?vue&type=template&id=af8a1088& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/designers/DesignersIndex.vue?vue&type=template&id=af8a1088&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DesignersIndex_vue_vue_type_template_id_af8a1088___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);