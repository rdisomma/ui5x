sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.CopyButton", {

        onInit: function () {
            this._oClipboard = navigator.clipboard;

            if (!this._oClipboard) {
                return;
            }

            this._fnWriteText = this._oClipboard.writeText.bind(this._oClipboard);
            this._oClipboard.writeText = this._writeText.bind(this);
        },

        onExit: function () {
            this._restoreClipboard();
        },

        _writeText: function (sValue) {
            return this.getModel("settings").getProperty("/copyButton/failOnPurpose")
                ? Promise.reject(new Error("Simulated from the demo"))
                : this._fnWriteText(sValue);
        },

        _restoreClipboard: function () {
            if (this._fnWriteText) {
                this._oClipboard.writeText = this._fnWriteText;
            }
        }
    });
});
