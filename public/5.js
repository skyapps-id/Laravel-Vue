(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AppDashboard.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AppDashboard.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'AppDashboard',
  data: function data() {
    return {
      drawer: null,
      collapseOnScroll: true,
      items: [{
        title: 'Home',
        icon: 'mdi-home',
        to: '/'
      }, {
        title: 'Master Person',
        icon: 'mdi-account-group-outline',
        to: 'person'
      }, {
        title: 'Master Designer',
        icon: 'mdi-cards',
        to: 'designers'
      }, {
        title: 'Master Event',
        icon: 'mdi-calendar',
        to: 'event'
      }, {
        title: 'Event Register',
        icon: 'mdi-calendar-check',
        to: 'register'
      }, {
        title: 'Logout',
        icon: 'mdi-logout',
        to: '/auth/logout/destory'
      }],
      right: null
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    "v-app",
    [
      _c(
        "v-navigation-drawer",
        {
          attrs: { app: "", fixed: "" },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-list",
            { attrs: { dense: "", nav: "" } },
            _vm._l(_vm.items, function(item) {
              return _c(
                "v-list-item",
                { key: item.title, attrs: { to: item.to } },
                [
                  _c(
                    "v-list-item-action",
                    [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [_c("v-list-item-title", [_vm._v(_vm._s(item.title))])],
                    1
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-app-bar",
        { attrs: { app: "", fixed: "", color: "primary" } },
        [
          _c("v-app-bar-nav-icon", {
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.drawer = !_vm.drawer
              }
            }
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("HuntStreet")]),
          _vm._v(" "),
          _c("div", { staticClass: "flex-grow-1" }),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [
              _c(
                "v-badge",
                {
                  attrs: { color: "accent", overlap: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "badge",
                      fn: function() {
                        return [_vm._v("4")]
                      },
                      proxy: true
                    }
                  ])
                },
                [_vm._v(" "), _c("v-icon", [_vm._v("mdi-bell")])],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [
              _c(
                "v-badge",
                {
                  attrs: { color: "accent", overlap: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "badge",
                      fn: function() {
                        return [_vm._v("3")]
                      },
                      proxy: true
                    }
                  ])
                },
                [_vm._v(" "), _c("v-icon", [_vm._v("mdi-email")])],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-main", [_c("router-view")], 1),
      _vm._v(" "),
      _c(
        "v-footer",
        { attrs: { app: "", inset: "", color: "primary", height: "auto" } },
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                {
                  attrs: { align: "start", justify: "center", "no-gutters": "" }
                },
                [
                  _c("v-col", { attrs: { cols: "12" } }, [
                    _c("div", { staticClass: "text-center" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(new Date().getFullYear()) +
                          " — "
                      ),
                      _c("strong", [_vm._v("Vuetify")])
                    ])
                  ])
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

/***/ "./node_modules/vuetify-loader/lib/runtime/installComponents.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/runtime/installComponents.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installComponents (component, components) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.components = component.exports.options.components
  }

  options.components = options.components || {}

  for (var i in components) {
    options.components[i] = options.components[i] || components[i]
  }
}


/***/ }),

/***/ "./resources/js/components/AppDashboard.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/AppDashboard.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppDashboard.vue?vue&type=template&id=0a09e7de& */ "./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de&");
/* harmony import */ var _AppDashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppDashboard.vue?vue&type=script&lang=js& */ "./resources/js/components/AppDashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VApp */ "./node_modules/vuetify/lib/components/VApp/index.js");
/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ "./node_modules/vuetify/lib/components/VAppBar/index.js");
/* harmony import */ var vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBadge */ "./node_modules/vuetify/lib/components/VBadge/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VFooter */ "./node_modules/vuetify/lib/components/VFooter/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VMain */ "./node_modules/vuetify/lib/components/VMain/index.js");
/* harmony import */ var vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VNavigationDrawer */ "./node_modules/vuetify/lib/components/VNavigationDrawer/index.js");
/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ "./node_modules/vuetify/lib/components/VToolbar/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppDashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */



















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__["VApp"],VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__["VAppBar"],VAppBarNavIcon: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__["VAppBarNavIcon"],VBadge: vuetify_lib_components_VBadge__WEBPACK_IMPORTED_MODULE_6__["VBadge"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_7__["VBtn"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VContainer"],VFooter: vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_9__["VFooter"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__["VIcon"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItem"],VListItemAction: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemAction"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemTitle"],VMain: vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_12__["VMain"],VNavigationDrawer: vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_13__["VNavigationDrawer"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VRow"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_14__["VToolbarTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/AppDashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/AppDashboard.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/AppDashboard.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppDashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AppDashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppDashboard.vue?vue&type=template&id=0a09e7de& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AppDashboard.vue?vue&type=template&id=0a09e7de&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppDashboard_vue_vue_type_template_id_0a09e7de___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);