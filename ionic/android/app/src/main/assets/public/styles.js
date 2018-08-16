(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/global.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/global.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "audio,\ncanvas,\nprogress,\nvideo {\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nb,\nstrong {\n  font-weight: bold; }\n\nimg {\n  max-width: 100%;\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  height: 1px;\n  border-width: 0;\n  box-sizing: content-box; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nlabel,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  line-height: normal; }\n\ntextarea {\n  overflow: auto;\n  height: auto;\n  font: inherit;\n  color: inherit; }\n\ntextarea::-webkit-input-placeholder {\n  padding-left: 2px; }\n\ntextarea:-ms-input-placeholder {\n  padding-left: 2px; }\n\ntextarea::-ms-input-placeholder {\n  padding-left: 2px; }\n\ntextarea::placeholder {\n  padding-left: 2px; }\n\nform,\ninput,\noptgroup,\nselect {\n  margin: 0;\n  font: inherit;\n  color: inherit; }\n\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  cursor: pointer;\n  -webkit-appearance: button; }\n\na,\na div,\na span,\na ion-icon,\na ion-label,\nbutton,\nbutton div,\nbutton span,\nbutton ion-icon,\nbutton ion-label,\n[tappable],\n[tappable] div,\n[tappable] span,\n[tappable] ion-icon,\n[tappable] ion-label,\ninput,\ntextarea {\n  touch-action: manipulation; }\n\na ion-label,\nbutton ion-label {\n  pointer-events: none; }\n\nbutton {\n  border: 0;\n  border-radius: 0;\n  font-family: inherit;\n  font-style: inherit;\n  font-variant: inherit;\n  line-height: 1;\n  text-transform: none;\n  cursor: pointer;\n  -webkit-appearance: button; }\n\n[tappable] {\n  cursor: pointer; }\n\na[disabled],\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  padding: 0;\n  box-sizing: border-box; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none; }\n\nhtml {\n  width: 100%;\n  height: 100%;\n  -webkit-text-size-adjust: 100%;\n     -moz-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%; }\n\nbody {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin: 0;\n  padding: 0;\n  position: fixed;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 100%;\n  text-rendering: optimizeLegibility;\n  overflow: hidden;\n  touch-action: manipulation;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-user-drag: none;\n  -ms-content-zooming: none;\n  word-wrap: break-word;\n  overscroll-behavior-y: contain;\n  -webkit-text-size-adjust: none;\n     -moz-text-size-adjust: none;\n      -ms-text-size-adjust: none;\n          text-size-adjust: none; }\n\n[hidden] {\n  /* stylelint-disable-next-line declaration-no-important */\n  display: none !important; }\n\n:root[mode=ios] {\n  --ion-font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif;\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif; }\n\n:root[mode=md] {\n  --ion-font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif; }\n\na {\n  background-color: transparent;\n  color: var(--ion-color-primary, #3880ff); }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 16px;\n  margin-bottom: 10px;\n  font-weight: 500;\n  line-height: 1.2; }\n\nh1 {\n  margin-top: 20px;\n  font-size: var(--ion-header-size, 26px); }\n\nh2 {\n  margin-top: 18px;\n  font-size: calc(var(--ion-header-size, 26px) - var(--ion-header-step, 2px)); }\n\nh3 {\n  font-size: calc(var(--ion-header-size, 26px) - var(--ion-header-step, 2px) * 2); }\n\nh4 {\n  font-size: calc(var(--ion-header-size, 26px) - var(--ion-header-step, 2px) * 3); }\n\nh5 {\n  font-size: calc(var(--ion-header-size, 26px) - var(--ion-header-step, 2px) * 4); }\n\nh6 {\n  font-size: calc(var(--ion-header-size, 26px) - var(--ion-header-step, 2px) * 5); }\n\nsmall {\n  font-size: 75%; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsup {\n  top: -.5em; }\n\nsub {\n  bottom: -.25em; }\n\n.ion-color-primary {\n  --ion-color-base: var(--ion-color-primary, #3880ff) !important;\n  --ion-color-base-rgb: var(--ion-color-primary-rgb, 56, 128, 255) !important;\n  --ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-primary-shade, #3171e0) !important;\n  --ion-color-tint: var(--ion-color-primary-tint, #4c8dff) !important; }\n\n.ion-color-secondary {\n  --ion-color-base: var(--ion-color-secondary, #0cd1e8) !important;\n  --ion-color-base-rgb: var(--ion-color-secondary-rgb, 12, 209, 232) !important;\n  --ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-secondary-shade, #0bb8cc) !important;\n  --ion-color-tint: var(--ion-color-secondary-tint, #24d6ea) !important; }\n\n.ion-color-tertiary {\n  --ion-color-base: var(--ion-color-tertiary, #7044ff) !important;\n  --ion-color-base-rgb: var(--ion-color-tertiary-rgb, 112, 68, 255) !important;\n  --ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-tertiary-shade, #633ce0) !important;\n  --ion-color-tint: var(--ion-color-tertiary-tint, #7e57ff) !important; }\n\n.ion-color-success {\n  --ion-color-base: var(--ion-color-success, #10dc60) !important;\n  --ion-color-base-rgb: var(--ion-color-success-rgb, 16, 220, 96) !important;\n  --ion-color-contrast: var(--ion-color-success-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-success-shade, #0ec254) !important;\n  --ion-color-tint: var(--ion-color-success-tint, #28e070) !important; }\n\n.ion-color-warning {\n  --ion-color-base: var(--ion-color-warning, #ffce00) !important;\n  --ion-color-base-rgb: var(--ion-color-warning-rgb, 255, 206, 0) !important;\n  --ion-color-contrast: var(--ion-color-warning-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-warning-shade, #e0b500) !important;\n  --ion-color-tint: var(--ion-color-warning-tint, #ffd31a) !important; }\n\n.ion-color-danger {\n  --ion-color-base: var(--ion-color-danger, #f04141) !important;\n  --ion-color-base-rgb: var(--ion-color-danger-rgb, 240, 65, 65) !important;\n  --ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-danger-shade, #d33939) !important;\n  --ion-color-tint: var(--ion-color-danger-tint, #f25454) !important; }\n\n.ion-color-light {\n  --ion-color-base: var(--ion-color-light, #f4f5f8) !important;\n  --ion-color-base-rgb: var(--ion-color-light-rgb, 244, 245, 248) !important;\n  --ion-color-contrast: var(--ion-color-light-contrast, #000) !important;\n  --ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0, 0, 0) !important;\n  --ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;\n  --ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important; }\n\n.ion-color-medium {\n  --ion-color-base: var(--ion-color-medium, #989aa2) !important;\n  --ion-color-base-rgb: var(--ion-color-medium-rgb, 152, 154, 162) !important;\n  --ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-medium-shade, #86888f) !important;\n  --ion-color-tint: var(--ion-color-medium-tint, #a2a4ab) !important; }\n\n.ion-color-dark {\n  --ion-color-base: var(--ion-color-dark, #222428) !important;\n  --ion-color-base-rgb: var(--ion-color-dark-rgb, 34, 36, 40) !important;\n  --ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;\n  --ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255, 255, 255) !important;\n  --ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;\n  --ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important; }\n\n[no-padding] {\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  padding: 0; }\n\n[padding] {\n  --padding-start: var(--ion-padding, 16px);\n  --padding-end: var(--ion-padding, 16px);\n  --padding-top: var(--ion-padding, 16px);\n  --padding-bottom: var(--ion-padding, 16px);\n  padding: var(--ion-padding, 16px); }\n\n[padding-top] {\n  --padding-top: var(--ion-padding, 16px);\n  padding-top: var(--ion-padding, 16px); }\n\n[padding-start] {\n  --padding-start: var(--ion-padding, 16px);\n  padding-left: var(--ion-padding, 16px); }\n\n[padding-end] {\n  --padding-end: var(--ion-padding, 16px);\n  padding-right: var(--ion-padding, 16px); }\n\n[padding-bottom] {\n  --padding-bottom: var(--ion-padding, 16px);\n  padding-bottom: var(--ion-padding, 16px); }\n\n[padding-vertical] {\n  --padding-top: var(--ion-padding, 16px);\n  --padding-bottom: var(--ion-padding, 16px);\n  padding-top: var(--ion-padding, 16px);\n  padding-bottom: var(--ion-padding, 16px); }\n\n[padding-horizontal] {\n  --padding-start: var(--ion-padding, 16px);\n  --padding-end: var(--ion-padding, 16px);\n  padding-left: var(--ion-padding, 16px);\n  padding-right: var(--ion-padding, 16px); }\n\n[no-margin] {\n  --margin-start: 0;\n  --margin-end: 0;\n  --margin-top: 0;\n  --margin-bottom: 0;\n  margin: 0; }\n\n[margin] {\n  --margin-start: var(--ion-margin, 16px);\n  --margin-end: var(--ion-margin, 16px);\n  --margin-top: var(--ion-margin, 16px);\n  --margin-bottom: var(--ion-margin, 16px);\n  margin: var(--ion-margin, 16px); }\n\n[margin-top] {\n  --margin-top: var(--ion-margin, 16px);\n  margin-top: var(--ion-margin, 16px); }\n\n[margin-start] {\n  --margin-start: var(--ion-margin, 16px);\n  margin-left: var(--ion-margin, 16px); }\n\n[margin-end] {\n  --margin-end: var(--ion-margin, 16px);\n  margin-right: var(--ion-margin, 16px); }\n\n[margin-bottom] {\n  --margin-bottom: var(--ion-margin, 16px);\n  margin-bottom: var(--ion-margin, 16px); }\n\n[margin-vertical] {\n  --margin-top: var(--ion-margin, 16px);\n  --margin-bottom: var(--ion-margin, 16px);\n  margin-top: var(--ion-margin, 16px);\n  margin-bottom: var(--ion-margin, 16px); }\n\n[margin-horizontal] {\n  --margin-start: var(--ion-margin, 16px);\n  --margin-end: var(--ion-margin, 16px);\n  margin-left: var(--ion-margin, 16px);\n  margin-right: var(--ion-margin, 16px); }\n\n[float-left] {\n  float: left !important; }\n\n[float-right] {\n  float: right !important; }\n\n[float-start] {\n  float: left !important; }\n\n[float-end] {\n  float: right !important; }\n\n@media (min-width: 576px) {\n  [float-sm-left] {\n    float: left !important; }\n  [float-sm-right] {\n    float: right !important; }\n  [float-sm-start] {\n    float: left !important; }\n  [float-sm-end] {\n    float: right !important; } }\n\n@media (min-width: 768px) {\n  [float-md-left] {\n    float: left !important; }\n  [float-md-right] {\n    float: right !important; }\n  [float-md-start] {\n    float: left !important; }\n  [float-md-end] {\n    float: right !important; } }\n\n@media (min-width: 992px) {\n  [float-lg-left] {\n    float: left !important; }\n  [float-lg-right] {\n    float: right !important; }\n  [float-lg-start] {\n    float: left !important; }\n  [float-lg-end] {\n    float: right !important; } }\n\n@media (min-width: 1200px) {\n  [float-xl-left] {\n    float: left !important; }\n  [float-xl-right] {\n    float: right !important; }\n  [float-xl-start] {\n    float: left !important; }\n  [float-xl-end] {\n    float: right !important; } }\n\n[text-center] {\n  text-align: center !important; }\n\n[text-justify] {\n  text-align: justify !important; }\n\n[text-start] {\n  text-align: start !important; }\n\n[text-end] {\n  text-align: end !important; }\n\n[text-left] {\n  text-align: left !important; }\n\n[text-right] {\n  text-align: right !important; }\n\n[text-nowrap] {\n  white-space: nowrap !important; }\n\n[text-wrap] {\n  white-space: normal !important; }\n\n@media (min-width: 576px) {\n  [text-sm-center] {\n    text-align: center !important; }\n  [text-sm-justify] {\n    text-align: justify !important; }\n  [text-sm-start] {\n    text-align: start !important; }\n  [text-sm-end] {\n    text-align: end !important; }\n  [text-sm-left] {\n    text-align: left !important; }\n  [text-sm-right] {\n    text-align: right !important; }\n  [text-sm-nowrap] {\n    white-space: nowrap !important; }\n  [text-sm-wrap] {\n    white-space: normal !important; } }\n\n@media (min-width: 768px) {\n  [text-md-center] {\n    text-align: center !important; }\n  [text-md-justify] {\n    text-align: justify !important; }\n  [text-md-start] {\n    text-align: start !important; }\n  [text-md-end] {\n    text-align: end !important; }\n  [text-md-left] {\n    text-align: left !important; }\n  [text-md-right] {\n    text-align: right !important; }\n  [text-md-nowrap] {\n    white-space: nowrap !important; }\n  [text-md-wrap] {\n    white-space: normal !important; } }\n\n@media (min-width: 992px) {\n  [text-lg-center] {\n    text-align: center !important; }\n  [text-lg-justify] {\n    text-align: justify !important; }\n  [text-lg-start] {\n    text-align: start !important; }\n  [text-lg-end] {\n    text-align: end !important; }\n  [text-lg-left] {\n    text-align: left !important; }\n  [text-lg-right] {\n    text-align: right !important; }\n  [text-lg-nowrap] {\n    white-space: nowrap !important; }\n  [text-lg-wrap] {\n    white-space: normal !important; } }\n\n@media (min-width: 1200px) {\n  [text-xl-center] {\n    text-align: center !important; }\n  [text-xl-justify] {\n    text-align: justify !important; }\n  [text-xl-start] {\n    text-align: start !important; }\n  [text-xl-end] {\n    text-align: end !important; }\n  [text-xl-left] {\n    text-align: left !important; }\n  [text-xl-right] {\n    text-align: right !important; }\n  [text-xl-nowrap] {\n    white-space: nowrap !important; }\n  [text-xl-wrap] {\n    white-space: normal !important; } }\n\n[text-uppercase] {\n  /* stylelint-disable-next-line declaration-no-important */\n  text-transform: uppercase !important; }\n\n[text-lowercase] {\n  /* stylelint-disable-next-line declaration-no-important */\n  text-transform: lowercase !important; }\n\n[text-capitalize] {\n  /* stylelint-disable-next-line declaration-no-important */\n  text-transform: capitalize !important; }\n\n@media (min-width: 576px) {\n  [text-sm-uppercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: uppercase !important; }\n  [text-sm-lowercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: lowercase !important; }\n  [text-sm-capitalize] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: capitalize !important; } }\n\n@media (min-width: 768px) {\n  [text-md-uppercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: uppercase !important; }\n  [text-md-lowercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: lowercase !important; }\n  [text-md-capitalize] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: capitalize !important; } }\n\n@media (min-width: 992px) {\n  [text-lg-uppercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: uppercase !important; }\n  [text-lg-lowercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: lowercase !important; }\n  [text-lg-capitalize] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: capitalize !important; } }\n\n@media (min-width: 1200px) {\n  [text-xl-uppercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: uppercase !important; }\n  [text-xl-lowercase] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: lowercase !important; }\n  [text-xl-capitalize] {\n    /* stylelint-disable-next-line declaration-no-important */\n    text-transform: capitalize !important; } }\n\n[align-self-start] {\n  align-self: flex-start !important; }\n\n[align-self-end] {\n  align-self: flex-end !important; }\n\n[align-self-center] {\n  -ms-grid-row-align: center !important;\n      align-self: center !important; }\n\n[align-self-stretch] {\n  -ms-grid-row-align: stretch !important;\n      align-self: stretch !important; }\n\n[align-self-baseline] {\n  align-self: baseline !important; }\n\n[nowrap] {\n  flex-wrap: nowrap !important; }\n\n[wrap-reverse] {\n  flex-wrap: wrap-reverse !important; }\n\n[justify-content-start] {\n  justify-content: flex-start !important; }\n\n[justify-content-center] {\n  justify-content: center !important; }\n\n[justify-content-end] {\n  justify-content: flex-end !important; }\n\n[justify-content-around] {\n  justify-content: space-around !important; }\n\n[justify-content-between] {\n  justify-content: space-between !important; }\n\n[align-items-start] {\n  align-items: flex-start !important; }\n\n[align-items-center] {\n  align-items: center !important; }\n\n[align-items-end] {\n  align-items: flex-end !important; }\n\n[align-items-stretch] {\n  align-items: stretch !important; }\n\n[align-items-baseline] {\n  align-items: baseline !important; }\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/theme/variables.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/theme/variables.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #488aff;\n  --ion-color-primary-rgb: 72,138,255;\n  --ion-color-primary-contrast: #fff;\n  --ion-color-primary-contrast-rgb: 255,255,255;\n  --ion-color-primary-shade: #3f79e0;\n  --ion-color-primary-tint: #5a96ff;\n  /** secondary **/\n  --ion-color-secondary: #32db64;\n  --ion-color-secondary-rgb: 50,219,100;\n  --ion-color-secondary-contrast: #fff;\n  --ion-color-secondary-contrast-rgb: 255,255,255;\n  --ion-color-secondary-shade: #2cc158;\n  --ion-color-secondary-tint: #47df74;\n  /** tertiary **/\n  --ion-color-tertiary: #f4a942;\n  --ion-color-tertiary-rgb: 244,169,66;\n  --ion-color-tertiary-contrast: #fff;\n  --ion-color-tertiary-contrast-rgb: 255,255,255;\n  --ion-color-tertiary-shade: #d7953a;\n  --ion-color-tertiary-tint: #f5b255;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16,220,96;\n  --ion-color-success-contrast: #fff;\n  --ion-color-success-contrast-rgb: 255,255,255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255,206,0;\n  --ion-color-warning-contrast: #000;\n  --ion-color-warning-contrast-rgb: 0,0,0;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f53d3d;\n  --ion-color-danger-rgb: 245,61,61;\n  --ion-color-danger-contrast: #fff;\n  --ion-color-danger-contrast-rgb: 255,255,255;\n  --ion-color-danger-shade: #d83636;\n  --ion-color-danger-tint: #f65050;\n  /** light **/\n  --ion-color-light: #f4f4f4;\n  --ion-color-light-rgb: 244,244,244;\n  --ion-color-light-contrast: #000;\n  --ion-color-light-contrast-rgb: 0,0,0;\n  --ion-color-light-shade: #d7d7d7;\n  --ion-color-light-tint: #f5f5f5;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152,154,162;\n  --ion-color-medium-contrast: #000;\n  --ion-color-medium-contrast-rgb: 0,0,0;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** dark **/\n  --ion-color-dark: #222;\n  --ion-color-dark-rgb: 34,34,34;\n  --ion-color-dark-contrast: #fff;\n  --ion-color-dark-contrast-rgb: 255,255,255;\n  --ion-color-dark-shade: #1e1e1e;\n  --ion-color-dark-tint: #383838; }\n"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/global.scss":
/*!*************************!*\
  !*** ./src/global.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/raw-loader!../node_modules/postcss-loader/lib??embedded!../node_modules/sass-loader/lib/loader.js??ref--15-3!./global.scss */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/global.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/theme/variables.scss":
/*!**********************************!*\
  !*** ./src/theme/variables.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/raw-loader!../../node_modules/postcss-loader/lib??embedded!../../node_modules/sass-loader/lib/loader.js??ref--15-3!./variables.scss */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/theme/variables.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 2:
/*!**********************************************************!*\
  !*** multi ./src/theme/variables.scss ./src/global.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/c/work/xsmart/ionic/src/theme/variables.scss */"./src/theme/variables.scss");
module.exports = __webpack_require__(/*! /mnt/c/work/xsmart/ionic/src/global.scss */"./src/global.scss");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map