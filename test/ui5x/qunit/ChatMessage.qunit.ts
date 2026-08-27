import { ButtonType } from "sap/m/library";
import Lib from "sap/ui/core/Lib";

import ChatMessage from "ui5x/chat/ChatMessage";

QUnit.module("ui5x.chat.ChatMessage");

QUnit.test("Disabling editing discards the pending draft", function (assert) {
    const message = new ChatMessage({ text: "Hello", editable: true });

    message._getEditButton().firePress();
    message._getEditor().fireLiveChange({ value: "Draft" });

    assert.ok(message._isEditing(), "The editor is open");

    message.setEditable(false);
    message.setEditable(true);

    assert.notOk(message._isEditing(), "The editor does not reopen with a stale draft");
    assert.strictEqual(message._getDraft(), "", "The draft is discarded");

    message.destroy();
});

QUnit.test("Defaults and action buttons", function (assert) {
    const message = new ChatMessage();
    const resourceBundle = Lib.getResourceBundleFor("sap.m");

    assert.strictEqual(message.getKey(), "", "The key is empty by default");
    assert.strictEqual(message.getText(), "", "The text is empty by default");
    assert.strictEqual(message.getSender(), "", "The sender is empty by default");
    assert.notOk(message.getOwnMessage(), "Messages are incoming by default");
    assert.notOk(message.getEditable(), "Editing is disabled by default");
    assert.notOk(message.getDeletable(), "Deletion is disabled by default");
    assert.strictEqual(message.getTimestamp(), null, "The timestamp is empty by default");
    assert.strictEqual(
        message._getEditButton().getType(),
        ButtonType.Transparent,
        "The edit action uses a transparent sap.m.Button"
    );
    assert.strictEqual(
        message._getDeleteButton().getType(),
        ButtonType.Reject,
        "The delete action uses a reject sap.m.Button"
    );
    assert.strictEqual(
        message._getSaveButton().getType(),
        ButtonType.Emphasized,
        "The save action uses an emphasized sap.m.Button"
    );
    assert.strictEqual(
        message._getCancelButton().getType(),
        ButtonType.Transparent,
        "The cancel action uses a transparent sap.m.Button"
    );
    assert.strictEqual(
        message._getEditButton().getTooltip(),
        resourceBundle?.getText("LIST_ITEM_EDIT") ?? "",
        "The edit tooltip comes from the sap.m resource bundle"
    );
    assert.strictEqual(
        message._getDeleteButton().getTooltip(),
        resourceBundle?.getText("LIST_ITEM_DELETE") ?? "",
        "The delete tooltip comes from the sap.m resource bundle"
    );
    assert.strictEqual(
        message._getSaveButton().getTooltip(),
        resourceBundle?.getText("SEMANTIC_CONTROL_SAVE") ?? "",
        "The save tooltip comes from the sap.m resource bundle"
    );
    assert.strictEqual(
        message._getCancelButton().getTooltip(),
        resourceBundle?.getText("SEMANTIC_CONTROL_CANCEL") ?? "",
        "The cancel tooltip comes from the sap.m resource bundle"
    );
    assert.strictEqual(
        message._getEditor().getTooltip(),
        resourceBundle?.getText("LIST_ITEM_EDIT") ?? "",
        "The editor tooltip comes from the sap.m resource bundle"
    );

    message.destroy();
});

QUnit.test("Own messages render their content, time and actions", function (assert) {
    const done = assert.async();
    const timestamp = new Date(2026, 7, 26, 10, 30);
    const message = new ChatMessage({
        key: "message-1",
        text: "Order shipped",
        sender: "You",
        ownMessage: true,
        editable: true,
        deletable: true,
        timestamp
    });
    let editValue = "";
    let deletePressCount = 0;
    let renderingCount = 0;

    message.attachEditPress((event) => {
        editValue = event.getParameter("value") ?? "";
    });
    message.attachDeletePress(() => deletePressCount++);

    message.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            const domRef = message.getDomRef() as HTMLElement | null;
            const time = domRef?.querySelector("time");

            if (renderingCount === 1) {
                assert.ok(domRef?.classList.contains("ui5xChatMessageOwn"), "The message is aligned as an own message");
                assert.ok(domRef?.classList.contains("ui5xChatMessageHasActions"), "Messages with actions receive a minimum-width style");
                assert.strictEqual(domRef?.querySelector(".ui5xChatMessageSender")?.textContent, "You", "The sender is rendered");
                assert.strictEqual(domRef?.querySelector(".ui5xChatMessageText")?.textContent, "Order shipped", "The message text is rendered");
                assert.strictEqual(time?.getAttribute("datetime"), timestamp.toISOString(), "The machine-readable timestamp is rendered");
                assert.ok(document.getElementById(`${message.getId()}-edit`), "The edit action is rendered");
                assert.ok(document.getElementById(`${message.getId()}-delete`), "The delete action is rendered");

                message._getDeleteButton().firePress();
                assert.strictEqual(deletePressCount, 1, "The delete event is fired");
                assert.strictEqual(editValue, "", "Opening the editor does not fire an edit event");

                message._getEditButton().firePress();
                return;
            }

            assert.ok(domRef?.classList.contains("ui5xChatMessageEditing"), "The message enters inline edit mode");
            assert.notOk(domRef?.querySelector(".ui5xChatMessageText"), "The static text is hidden while editing");
            assert.ok(
                Math.abs(
                    ((domRef?.querySelector(".ui5xChatMessageBubble") as HTMLElement | null)?.clientWidth ?? 0)
                    - ((domRef?.clientWidth ?? 0) * 0.75)
                ) <= 1,
                "The editor can use the same maximum width as a regular message bubble"
            );
            assert.strictEqual(message._getEditor().getValue(), "Order shipped", "The editor starts with the current text");
            assert.notOk(message._getSaveButton().getEnabled(), "Saving is disabled until the text changes");

            message._getEditor().fireLiveChange({ value: "Order delivered" });
            assert.ok(message._getSaveButton().getEnabled(), "A valid change enables saving");

            message._getSaveButton().firePress();
            assert.strictEqual(editValue, "Order delivered", "Confirming emits the new text");
            assert.notOk(message._isEditing(), "The editor closes after confirmation");

            message.destroy();
            done();
        }
    });

    message.placeAt("qunit-fixture");
});

QUnit.test("Cancelling an inline edit keeps the original message", function (assert) {
    const message = new ChatMessage({
        text: "Original",
        editable: true
    });
    let editPressCount = 0;

    message.attachEditPress(() => editPressCount++);

    message._getEditButton().firePress();
    message._getEditor().fireLiveChange({ value: "Discarded" });
    message._getCancelButton().firePress();

    assert.notOk(message._isEditing(), "Cancel closes the editor");
    assert.strictEqual(message.getText(), "Original", "The message text is not mutated");
    assert.strictEqual(editPressCount, 0, "Cancel does not emit an edit event");

    message.destroy();
});

QUnit.test("Invalid timestamps are displayed as supplied", function (assert) {
    const message = new ChatMessage({
        timestamp: "Pending"
    });

    assert.strictEqual(message._getTimestampDate(), null, "An invalid timestamp has no Date representation");
    assert.strictEqual(message._getFormattedTime(), "Pending", "Its original text remains visible");
    assert.strictEqual(message._getDateKey(), "", "It does not create a date group");

    message.destroy();
});
