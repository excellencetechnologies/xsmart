(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs-tabs-module"],{

/***/ "./src/app/about/about.module.ts":
/*!***************************************!*\
  !*** ./src/app/about/about.module.ts ***!
  \***************************************/
/*! exports provided: AboutPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./about.page */ "./src/app/about/about.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_0__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild([{ path: '', component: _about_page__WEBPACK_IMPORTED_MODULE_5__["AboutPage"] }])
            ],
            declarations: [_about_page__WEBPACK_IMPORTED_MODULE_5__["AboutPage"]]
        })
    ], AboutPageModule);
    return AboutPageModule;
}());



/***/ }),

/***/ "./src/app/about/about.page.html":
/*!***************************************!*\
  !*** ./src/app/about/about.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>About</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content></ion-content>\n"

/***/ }),

/***/ "./src/app/about/about.page.scss":
/*!***************************************!*\
  !*** ./src/app/about/about.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/about/about.page.ts":
/*!*************************************!*\
  !*** ./src/app/about/about.page.ts ***!
  \*************************************/
/*! exports provided: AboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPage", function() { return AboutPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AboutPage = /** @class */ (function () {
    function AboutPage() {
    }
    AboutPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.page.html */ "./src/app/about/about.page.html"),
            styles: [__webpack_require__(/*! ./about.page.scss */ "./src/app/about/about.page.scss")]
        })
    ], AboutPage);
    return AboutPage;
}());



/***/ }),

/***/ "./src/app/api/api.service.ts":
/*!************************************!*\
  !*** ./src/app/api/api.service.ts ***!
  \************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.base_url = "http://192.168.4.1/";
    }
    ApiService.prototype.checkPing = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.base_url).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.getScanWifi = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.base_url + "wifi").toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.setWifiPassword = function (ssid, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.setDeviceNickName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.base_url + "setnickname?name=" + name).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/api/device.service.ts":
/*!***************************************!*\
  !*** ./src/app/api/device.service.ts ***!
  \***************************************/
/*! exports provided: DeviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceService", function() { return DeviceService; });
/* harmony import */ var _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/native-storage/ngx */ "./node_modules/@ionic-native/native-storage/ngx/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ionic_native_unique_device_id_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/unique-device-id/ngx */ "./node_modules/@ionic-native/unique-device-id/ngx/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var DeviceService = /** @class */ (function () {
    function DeviceService(nativeStorage, platform, uniqueDeviceID) {
        this.nativeStorage = nativeStorage;
        this.platform = platform;
        this.uniqueDeviceID = uniqueDeviceID;
    }
    //random id to identify the current app
    DeviceService.prototype.getAppID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is("mobile")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.uniqueDeviceID.get()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, Promise.resolve("!23")];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeviceService.prototype.getDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is("mobile")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.nativeStorage.getItem('devices')];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (localStorage.getItem('devices')) {
                            return [2 /*return*/, JSON.parse(localStorage.getItem('devices'))];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.checkDeviceExists = function (chipid) {
        return __awaiter(this, void 0, void 0, function () {
            var devices, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        device = devices.find(function (device) {
                            if (device.chip === chipid) {
                                return true;
                            }
                            return false;
                        });
                        return [2 /*return*/, device];
                }
            });
        });
    };
    DeviceService.prototype.setDevices = function (devices) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is("mobile")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.nativeStorage.setItem('devices', devices)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        localStorage.setItem('devices', JSON.stringify(devices));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.updateDevicePin = function (pin, status, chip) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        devices = devices.map(function (device) {
                            if (device.chip === chip) {
                                device.switches = device.switches.map(function (s) {
                                    if (s.pin === pin) {
                                        s.status = status;
                                    }
                                    return s;
                                });
                            }
                            return device;
                        });
                        this.setDevices(devices);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.updateDeviceNotFound = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        devices = devices.map(function (device) {
                            if (device.chip === data.chip) {
                                device.online = false;
                            }
                            return device;
                        });
                        this.setDevices(devices);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.updateDevice = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        devices = devices.map(function (device) {
                            if (device.chip === data.chip) {
                                var offset = new Date().getTimezoneOffset() * 60 * 1000;
                                device.ttl = data.time * 1 + offset * -1;
                                if (device.ttl < new Date().getTime() - 5 * 60 * 1000) {
                                    device.online = false;
                                }
                                else {
                                    device.online = true;
                                }
                                device.switches = [];
                                data.pins.forEach(function (pin) {
                                    var swtich = {
                                        "status": pin.status,
                                        "pin": pin.pin
                                    };
                                    device.switches.push(swtich);
                                });
                            }
                            return device;
                        });
                        return [4 /*yield*/, this.setDevices(devices)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.addDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        devices.push(device);
                        if (!this.platform.is("mobile")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.nativeStorage.setItem("devices", devices)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, localStorage.setItem('devices', JSON.stringify(devices))];
                }
            });
        });
    };
    DeviceService.prototype.deleteDevice = function (deleteDevice) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices()];
                    case 1:
                        devices = _a.sent();
                        devices = devices.filter(function (device) {
                            if (device.chip === deleteDevice.chip) {
                                return false;
                            }
                            return true;
                        });
                        this.setDevices(devices);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_0__["NativeStorage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_native_unique_device_id_ngx__WEBPACK_IMPORTED_MODULE_3__["UniqueDeviceID"]])
    ], DeviceService);
    return DeviceService;
}());



/***/ }),

/***/ "./src/app/api/notify.service.ts":
/*!***************************************!*\
  !*** ./src/app/api/notify.service.ts ***!
  \***************************************/
/*! exports provided: NotifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyService", function() { return NotifyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var NotifyService = /** @class */ (function () {
    function NotifyService(alertController, platform) {
        this.alertController = alertController;
        this.platform = platform;
    }
    NotifyService.prototype.alertUser = function (msg, subtitle) {
        if (subtitle === void 0) { subtitle = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            subHeader: subtitle,
                            message: msg
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        setTimeout(function () {
                            alert.dismiss();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    NotifyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"]])
    ], NotifyService);
    return NotifyService;
}());



/***/ }),

/***/ "./src/app/contact/contact.module.ts":
/*!*******************************************!*\
  !*** ./src/app/contact/contact.module.ts ***!
  \*******************************************/
/*! exports provided: ContactPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPageModule", function() { return ContactPageModule; });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _contact_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact.page */ "./src/app/contact/contact.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ContactPageModule = /** @class */ (function () {
    function ContactPageModule() {
    }
    ContactPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_0__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild([{ path: '', component: _contact_page__WEBPACK_IMPORTED_MODULE_5__["ContactPage"] }])
            ],
            declarations: [_contact_page__WEBPACK_IMPORTED_MODULE_5__["ContactPage"]]
        })
    ], ContactPageModule);
    return ContactPageModule;
}());



/***/ }),

/***/ "./src/app/contact/contact.page.html":
/*!*******************************************!*\
  !*** ./src/app/contact/contact.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name=\"logo-ionic\" slot=\"start\"></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/contact/contact.page.scss":
/*!*******************************************!*\
  !*** ./src/app/contact/contact.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/contact/contact.page.ts":
/*!*****************************************!*\
  !*** ./src/app/contact/contact.page.ts ***!
  \*****************************************/
/*! exports provided: ContactPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPage", function() { return ContactPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ContactPage = /** @class */ (function () {
    function ContactPage() {
    }
    ContactPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.page.html */ "./src/app/contact/contact.page.html"),
            styles: [__webpack_require__(/*! ./contact.page.scss */ "./src/app/contact/contact.page.scss")]
        })
    ], ContactPage);
    return ContactPage;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_0__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild([{ path: '', component: _home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"] }])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Home</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div>\n    Platform: {{message}}\n  </div>\n\n  <div *ngIf=\"mode === 'device'\">\n\n    <div *ngIf=\"devices.length\">\n      <ion-card *ngFor=\"let device of devices; trackBy: trackByDevice\">\n        <!-- <ion-img src=\"/assets/myImg.png\"></ion-img> -->\n\n        <ion-card-content>\n          <ion-card-title>\n              <ion-item>\n                  <ion-label>{{device.name}}</ion-label>\n                  <ion-button (click)=\"deleteDevice(device)\" fill=\"outline\" slot=\"end\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                  </ion-button>\n                </ion-item>\n          </ion-card-title>\n\n          \n\n          <p>Device ID: {{device.device_id}}</p>\n          <p>CHIP: {{device.chip}}</p>\n          <p>Last Online: {{device.ttl | date:'short'}}</p>\n          <p>\n            <ion-badge *ngIf=\"device.online\" color=\"secondary\">Online</ion-badge>\n            <ion-badge *ngIf=\"!device.online\" color=\"warning\">Offline</ion-badge>\n          </p>\n\n\n          <p *ngIf=\"device.switches.length > 0\"> Switches In Device </p>\n          <ion-toolbar>\n            <ion-buttons slot=\"start\" *ngFor=\"let switch of device.switches; trackBy: trackBySwitch\">\n                <ion-button slot=\"icon-only\" (click)=\"switchOn(switch,device)\" *ngIf=\"switch.status === 0\" color=\"medium\">\n                  <ion-icon name=\"power\"></ion-icon>\n                </ion-button>\n                <ion-button slot=\"icon-only\" (click)=\"switchOff(switch,device)\" *ngIf=\"switch.status === 1\" color=\"dark\">\n                  <ion-icon name=\"power\"></ion-icon>\n                </ion-button>\n            </ion-buttons>\n          </ion-toolbar>\n          \n        </ion-card-content>\n      </ion-card>\n    </div>\n\n    <div *ngIf=\"!devices.length\">\n      No Devices Found!\n    </div>\n\n\n\n    <ion-button (click)=\"scanDevice()\" color=\"primary\">Scan For devices</ion-button>\n\n  </div>\n  <div *ngIf=\"mode === 'discovery'\">\n      \n      <div *ngIf=\"!devicePing.isNew\">\n        This device was configured previously with name <b>{{devicePing.name}}</b> \n        <br/>\n        Do you want keep this name or change it?\n        <br/>\n        <ion-button (click)=\"setDeviceName(devicePing.name)\" color=\"primary\">Keep</ion-button>\n        <ion-button (click)=\"freshDevice()\" color=\"primary\">Start New</ion-button>\n      </div>\n      <div *ngIf=\"devicePing.isNew\">\n         This is a new device device, please set name for the device\n\n         <ion-item>\n            <ion-input [(ngModel)]=\"devicePing.name\" required type=\"text\" placeholder=\"Device Name..\"></ion-input>\n            <ion-button (click)=\"setDeviceName(devicePing.name)\" color=\"primary\">Set Name</ion-button>\n          </ion-item>\n      </div>\n\n  </div>\n  <div *ngIf=\"mode === 'scan'\">\n    <div *ngIf=\"isScanningDevice\">\n\n      Turn on Access point on your device and connect to the wifi network.\n      <br/> Network name like xSmart-XXXXXX should show up on your phone.\n      <br/> Connect to the network with password : 123456789\n      <br/> Waiting to connect to wifi network\n      <br/>\n      <ion-spinner></ion-spinner>\n    </div>\n\n    <div *ngIf=\"xSmartConnect\">\n      {{devicePing.webid}}\n      <br/> \n      {{devicePing.chip}}\n      <br/>\n      {{devicePing.name}}\n      <br/>\n      <ion-button (click)=\"scanWifi()\" color=\"primary\">Scan Wifi Networks</ion-button>\n      <Br/>\n      <ion-list *ngFor=\"let wifi of wifinetworks\">\n        <ion-item (click)=\"askWifiPassword(wifi)\">\n          <ion-avatar slot=\"start\">\n            <ion-icon slot=\"start\" name=\"wifi\"></ion-icon>\n          </ion-avatar>\n          <ion-label>\n            <h2>{{wifi.SSID}}</h2>\n            <div>\n              {{wifi.RSSI}} -- {{wifi.ENC}}\n            </div>\n          </ion-label>\n        </ion-item>\n      </ion-list>\n    </div>\n\n\n  </div>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _api_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/api.service */ "./src/app/api/api.service.ts");
/* harmony import */ var _api_device_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/device.service */ "./src/app/api/device.service.ts");
/* harmony import */ var _api_notify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/notify.service */ "./src/app/api/notify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var socket = null;
var wifiCheckInterval = null;
var HomePage = /** @class */ (function () {
    // mode show in which state the mobile app is 
    // 1. device (i.e it will show list of devices if any)
    // 2. scan ( i.e scan for devices )
    // 3. discovery ( i.e new device found )
    function HomePage(platform, http, api, alertController, deviceService, notifyService) {
        this.platform = platform;
        this.http = http;
        this.api = api;
        this.alertController = alertController;
        this.deviceService = deviceService;
        this.notifyService = notifyService;
        this.message = "test";
        this.xSmartConnect = false;
        this.wifinetworks = [];
        this.devices = [];
        this.isScanningDevice = false;
        this.mode = "device";
        this.isSocketConnected = false;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.message = "platform ready";
            // this.keepCheckingWifiConnected();
            _this.checkExistingDevice();
        });
    };
    HomePage.prototype.sendMessageToSocket = function (msg) {
        var _this = this;
        if (this.isSocketConnected) {
            console.log("socket msg send to", msg);
            socket.send(JSON.stringify(msg));
        }
        else {
            socket = new WebSocket('ws://5.9.144.226:9030');
            // Connection opened
            socket.addEventListener('open', function (event) {
                console.log("socket connected");
                _this.isSocketConnected = true;
                socket.send(JSON.stringify(msg));
            });
            socket.addEventListener('close', function () {
                console.log("socket closed");
                _this.isSocketConnected = false;
            });
            // Listen for messages
            socket.addEventListener('message', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var res, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            res = JSON.parse(event.data);
                            console.log('Message from server ', res);
                            if (!(res.type === "device_online_check_reply")) return [3 /*break*/, 1];
                            this.updateDeviceStatus(res);
                            return [3 /*break*/, 5];
                        case 1:
                            if (!(res.type === "device_pin_oper_reply")) return [3 /*break*/, 2];
                            this.notifyService.alertUser("operation sent to device");
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(res.type === "device_io_notify")) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.deviceService.updateDevicePin(res.pin, res.status, res.chip)];
                        case 3:
                            _b.sent();
                            _a = this;
                            return [4 /*yield*/, this.deviceService.getDevices()];
                        case 4:
                            _a.devices = _b.sent();
                            this.notifyService.alertUser("device performed the action!");
                            _b.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    HomePage.prototype.switchOff = function (s, d) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.sendMessageToSocket;
                        _b = {
                            type: "device_pin_oper",
                            chip: d.chip,
                            pin: s.pin,
                            status: 0
                        };
                        return [4 /*yield*/, this.deviceService.getAppID()];
                    case 1:
                        _a.apply(this, [(_b.app_id = _c.sent(),
                                _b)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.switchOn = function (s, d) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.sendMessageToSocket;
                        _b = {
                            type: "device_pin_oper",
                            chip: d.chip,
                            pin: s.pin,
                            status: 1
                        };
                        return [4 /*yield*/, this.deviceService.getAppID()];
                    case 1:
                        _a.apply(this, [(_b.app_id = _c.sent(),
                                _b)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.updateDeviceStatus = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data.found) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deviceService.updateDevice(data)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.deviceService.updateDeviceNotFound(data)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _a = this;
                        return [4 /*yield*/, this.deviceService.getDevices()];
                    case 5:
                        _a.devices = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.checkExistingDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.deviceService.getDevices()];
                    case 1:
                        _a.devices = _b.sent();
                        if (this.devices.length > 0) {
                            this.keepCheckingDeviceOnline();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.trackByDevice = function (device) {
        return device.chip;
    };
    HomePage.prototype.trackBySwitch = function (s) {
        return s.pin;
    };
    HomePage.prototype.deleteDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.deviceService.deleteDevice(device);
                this.checkExistingDevice();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.scanDevice = function () {
        this.mode = "scan";
        this.isScanningDevice = true;
        this.wifinetworks = [];
        this.devicePing = {
            name: "",
            chip: "",
            webid: "",
            isNew: false
        };
        this.keepCheckingWifiConnected();
    };
    HomePage.prototype.keepCheckingWifiConnected = function () {
        var _this = this;
        if (wifiCheckInterval)
            clearInterval(wifiCheckInterval);
        wifiCheckInterval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.api.checkPing()];
                    case 1:
                        _a.devicePing = _b.sent();
                        if (this.devicePing.name.length > 0) {
                            this.devicePing.isNew = false;
                        }
                        else {
                            this.devicePing.isNew = true;
                        }
                        console.log(this.devicePing);
                        this.isScanningDevice = false;
                        clearInterval(wifiCheckInterval);
                        this.mode = "discovery";
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        console.log(e_1);
                        this.isScanningDevice = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }, 1000);
    };
    HomePage.prototype.freshDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.devicePing.name = "";
                this.devicePing.isNew = true;
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.setDeviceName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var newdevice, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.api.setDeviceNickName(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deviceService.checkDeviceExists(this.devicePing.chip)];
                    case 2:
                        if (!(_a.sent())) {
                            newdevice = {
                                name: name,
                                device_id: this.devicePing.webid,
                                chip: this.devicePing.chip,
                                ttl: 0,
                                online: false,
                                switches: []
                            };
                            this.deviceService.addDevice(newdevice);
                        }
                        this.mode = "scan";
                        this.xSmartConnect = true;
                        this.scanWifi();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        this.notifyService.alertUser("failed to set device name");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.scanWifi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.api.getScanWifi()];
                    case 1:
                        _a.wifinetworks = _b.sent();
                        console.log(this.wifinetworks);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        console.log(e_3);
                        this.isScanningDevice = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.pingDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.devices.forEach(function (device) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = this.sendMessageToSocket;
                                _b = {
                                    type: "device_online_check",
                                    chip: device.chip
                                };
                                return [4 /*yield*/, this.deviceService.getAppID()];
                            case 1:
                                _a.apply(this, [(_b.app_id = _c.sent(),
                                        _b)]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.keepCheckingDeviceOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.pingDevices();
                        console.log(this.isSocketConnected);
                        this.keepCheckingDeviceOnline();
                        return [2 /*return*/];
                    });
                }); }, this.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.askWifiPassword = function (wifi) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Enter Wifi Password',
                            inputs: [
                                {
                                    name: 'password',
                                    type: 'text',
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                }, {
                                    text: 'Ok',
                                    handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                        var e_4;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log('Confirm Ok');
                                                    console.log(data.password);
                                                    console.log(wifi.SSID);
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, this.api.setWifiPassword(wifi.SSID, data.password)];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_4 = _a.sent();
                                                    console.log(e_4);
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    this.keepCheckingDeviceOnline();
                                                    this.mode = "device";
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _api_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _api_device_service__WEBPACK_IMPORTED_MODULE_4__["DeviceService"],
            _api_notify_service__WEBPACK_IMPORTED_MODULE_5__["NotifyService"]])
    ], HomePage);
    return HomePage;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.module.ts":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/*! exports provided: TabsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tabs_router_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabs.router.module */ "./src/app/tabs/tabs.router.module.ts");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs.page */ "./src/app/tabs/tabs.page.ts");
/* harmony import */ var _contact_contact_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../contact/contact.module */ "./src/app/contact/contact.module.ts");
/* harmony import */ var _about_about_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../about/about.module */ "./src/app/about/about.module.ts");
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../home/home.module */ "./src/app/home/home.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_0__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _tabs_router_module__WEBPACK_IMPORTED_MODULE_4__["TabsPageRoutingModule"],
                _home_home_module__WEBPACK_IMPORTED_MODULE_8__["HomePageModule"],
                _about_about_module__WEBPACK_IMPORTED_MODULE_7__["AboutPageModule"],
                _contact_contact_module__WEBPACK_IMPORTED_MODULE_6__["ContactPageModule"]
            ],
            declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_5__["TabsPage"]]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.page.html":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-tabs>\n  <ion-tab label=\"Home\" icon=\"home\" href=\"/tabs/(home:home)\">\n    <ion-router-outlet name=\"home\"></ion-router-outlet>\n  </ion-tab>\n  <ion-tab label=\"About\" icon=\"information-circle\" href=\"/tabs/(about:about)\">\n    <ion-router-outlet name=\"about\"></ion-router-outlet>\n  </ion-tab>\n  <ion-tab label=\"Contact\" icon=\"contacts\" href=\"/tabs/(contact:contact)\">\n    <ion-router-outlet name=\"contact\"></ion-router-outlet>\n  </ion-tab>\n</ion-tabs>\n"

/***/ }),

/***/ "./src/app/tabs/tabs.page.scss":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/tabs/tabs.page.ts":
/*!***********************************!*\
  !*** ./src/app/tabs/tabs.page.ts ***!
  \***********************************/
/*! exports provided: TabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPage", function() { return TabsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TabsPage = /** @class */ (function () {
    function TabsPage() {
    }
    TabsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tabs',
            template: __webpack_require__(/*! ./tabs.page.html */ "./src/app/tabs/tabs.page.html"),
            styles: [__webpack_require__(/*! ./tabs.page.scss */ "./src/app/tabs/tabs.page.scss")]
        })
    ], TabsPage);
    return TabsPage;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.router.module.ts":
/*!********************************************!*\
  !*** ./src/app/tabs/tabs.router.module.ts ***!
  \********************************************/
/*! exports provided: TabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageRoutingModule", function() { return TabsPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs.page */ "./src/app/tabs/tabs.page.ts");
/* harmony import */ var _home_home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../home/home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _about_about_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../about/about.page */ "./src/app/about/about.page.ts");
/* harmony import */ var _contact_contact_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../contact/contact.page */ "./src/app/contact/contact.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_2__["TabsPage"],
        children: [
            {
                path: 'home',
                outlet: 'home',
                component: _home_home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"]
            },
            {
                path: 'about',
                outlet: 'about',
                component: _about_about_page__WEBPACK_IMPORTED_MODULE_4__["AboutPage"]
            },
            {
                path: 'contact',
                outlet: 'contact',
                component: _contact_contact_page__WEBPACK_IMPORTED_MODULE_5__["ContactPage"]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=tabs-tabs-module.js.map