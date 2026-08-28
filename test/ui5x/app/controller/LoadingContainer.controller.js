sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.LoadingContainer", {
        settings: {
            loading: true,
            skeletonType: "Line",
            skeletonLines: 3
        }
    });
});
