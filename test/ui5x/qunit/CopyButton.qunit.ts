import { ButtonType } from "sap/m/library";
import BindingMode from "sap/ui/model/BindingMode";
import JSONModel from "sap/ui/model/json/JSONModel";

import CopyButton from "ui5x/button/CopyButton";

QUnit.module("ui5x.button.CopyButton");

QUnit.test("Success type follows the current button type by default", function (assert) {
    const button = new CopyButton({
        type: ButtonType.Emphasized
    });

    assert.strictEqual(
        button.getSuccessType(),
        ButtonType.Emphasized,
        "The initial button type is used"
    );

    button.setType(ButtonType.Transparent);

    assert.strictEqual(
        button.getSuccessType(),
        ButtonType.Transparent,
        "The effective success type follows later type changes"
    );

    button.setSuccessType(ButtonType.Accept);
    button.setType(ButtonType.Emphasized);

    assert.strictEqual(
        button.getSuccessType(),
        ButtonType.Accept,
        "An explicitly configured success type takes precedence"
    );

    button.destroy();
});

QUnit.test("An empty success icon preserves the original icon", function (assert) {
    const button = new CopyButton({
        icon: "sap-icon://copy",
        text: "Copy ID",
        type: ButtonType.Emphasized,
        successIcon: "",
        successText: "Copied"
    });

    const feedbackButton = button as unknown as {
        showSuccessFeedback(): void;
    };

    feedbackButton.showSuccessFeedback();

    assert.strictEqual(
        button.getIcon(),
        "sap-icon://copy",
        "The original icon is preserved"
    );

    assert.strictEqual(
        button.getText(),
        "Copied",
        "Other configured feedback is still applied"
    );

    assert.strictEqual(
        button.getType(),
        ButtonType.Emphasized,
        "The original type is preserved when successType is omitted"
    );

    button.destroy();
});

QUnit.test("The feedback never reaches a bound model", function (assert) {
    const model = new JSONModel({
        text: "npm i ui5x",
        type: ButtonType.Default,
        icon: "sap-icon://copy"
    });

    model.setDefaultBindingMode(BindingMode.TwoWay);

    const button = new CopyButton({
        text: "{/text}",
        type: "{/type}",
        icon: "{/icon}",
        successText: "Copied",
        successType: ButtonType.Accept,
        successIcon: "sap-icon://accept"
    });

    button.setModel(model);

    const feedbackButton = button as unknown as {
        showSuccessFeedback(): void;
    };

    feedbackButton.showSuccessFeedback();

    assert.strictEqual(
        button.getText(),
        "Copied",
        "The button shows the success text"
    );

    assert.strictEqual(
        button.getType(),
        ButtonType.Accept,
        "The button shows the success type"
    );

    assert.strictEqual(
        button.getIcon(),
        "sap-icon://accept",
        "The button shows the success icon"
    );

    assert.strictEqual(
        model.getProperty("/text"),
        "npm i ui5x",
        "The bound text is left alone"
    );

    assert.strictEqual(
        model.getProperty("/type"),
        ButtonType.Default,
        "The bound type is left alone"
    );

    assert.strictEqual(
        model.getProperty("/icon"),
        "sap-icon://copy",
        "The bound icon is left alone"
    );

    button.destroy();
});
