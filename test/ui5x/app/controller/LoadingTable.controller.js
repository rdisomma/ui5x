sap.ui.define(["./Base.controller"], function (Base) {
    "use strict";

    return Base.extend("ui5x.test.app.controller.LoadingTable", {
        settings: {
            loading: true,
            skeletonRows: 5,
            maxSkeletonRows: 10,
            skeletonRowsMode: "Fixed",
            dynamicSkeletonWidths: true,
            animated: true
        },

        data: {
            rows: [
                { name: "Mario Rossi", company: "Acme S.p.A.", status: "Active", state: "Success", amount: "125,000" },
                { name: "Laura Bianchi", company: "Example S.r.l.", status: "Pending", state: "Warning", amount: "87,500" },
                { name: "Giuseppe Verdi", company: "Northwind", status: "Active", state: "Success", amount: "310,000" },
                { name: "Anna Neri", company: "Contoso", status: "Inactive", state: "Error", amount: "42,000" },
                { name: "Luca Gialli", company: "Fabrikam", status: "Active", state: "Success", amount: "198,000" }
            ]
        }
    });
});
