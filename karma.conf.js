/*!
 * Copyright (c) 2026 Raffaele Di Somma.
 * Licensed under the Apache License, Version 2.0.
 */

/*
 * Runs the QUnit suite in a headless browser.
 *
 * karma-ui5 serves the project through the UI5 Tooling middleware chain
 * declared in ui5.yaml, so the TypeScript sources and tests are transpiled the
 * same way `ui5 serve` does.
 */
module.exports = function (config) {
    config.set({
        frameworks: ["ui5"],

        ui5: {
            type: "library",
            testpage: "test-resources/ui5x/qunit/unitTests.qunit.html"
        },

        browsers: ["ChromeHeadless"],

        reporters: ["progress"],

        singleRun: true,

        browserConsoleLogOptions: {
            level: "warn"
        }

        /*
         * karma-ui5 runs the test page in karma's own context frame and forces
         * clearContext off, so karma reports "Some of your tests did a full
         * page reload!" when the browser is torn down at the end of the run.
         * It appears even for a page with a single assertion and does not
         * affect the outcome: the run still exits 0 when green and 1 when a
         * test fails.
         */
    });
};
