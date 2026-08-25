import { ButtonType } from "sap/m/library";

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
