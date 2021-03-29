var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};
__markAsModule(exports);
__export(exports, {
  QRCodeDescription: () => QRCodeDescription,
  QRCodePrototype: () => QRCodePrototype
});
var import_qrcode_min = __toModule(require("url!./qrcode.min.js"));
const QRCodePrototype = {
  mount(container, insertBefore) {
    super.mount(container, insertBefore);
    if (window.QRCode === void 0) {
      const script = document.createElement("script");
      script.onload = () => {
        this.initialized = true;
      };
      script.src = import_qrcode_min.default;
      document.head.appendChild(script);
    } else {
      this.initialized = true;
    }
  },
  update(changed) {
    super.update(changed);
    if (changed.initialized || changed.content || changed.width || changed.height) {
      if (this.initialized) {
        const qr = new window.QRCode({
          content: this.content,
          width: this.width,
          height: this.height,
          join: true
        });
        this._element.innerHTML = qr.svg();
      }
    }
  }
};
const QRCodeDescription = {
  name: "QRCode",
  title: "QR Code",
  prototype: QRCodePrototype,
  extends: "Play Kit/View",
  properties: {
    content: {
      type: "string",
      default: "https://play.playful.software",
      editor: {type: "MultilineString"}
    },
    width: {type: "number", default: 256},
    height: {type: "number", default: 256}
  }
};
//# sourceMappingURL=qrcode.js.map
