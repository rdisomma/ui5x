import { ButtonType } from "sap/m/library";
import TextArea from "sap/m/TextArea";
import Lib from "sap/ui/core/Lib";
import JSONModel from "sap/ui/model/json/JSONModel";

import ChatFeed from "ui5x/chat/ChatFeed";
import ChatFeedComposerPosition from "ui5x/chat/ChatFeedComposerPosition";
import ChatFeedMessageAlignment from "ui5x/chat/ChatFeedMessageAlignment";
import ChatMessage from "ui5x/chat/ChatMessage";
import ChatMessageAppearance from "ui5x/chat/ChatMessageAppearance";
import ChatMessageTimestampFormat from "ui5x/chat/ChatMessageTimestampFormat";

QUnit.module("ui5x.chat.ChatFeed");

QUnit.test("Defaults and composer controls", function (assert) {
    const feed = new ChatFeed();
    const resourceBundle = Lib.getResourceBundleFor("sap.m");

    assert.strictEqual(feed.getValue(), "", "The composer is empty by default");
    assert.strictEqual(feed.getPlaceholder(), "", "The placeholder is empty by default");
    assert.ok(feed.getEnabled(), "The feed is enabled by default");
    assert.ok(feed.getEditable(), "The composer is editable by default");
    assert.notOk(feed.getLoading(), "The messages are not loading by default");
    assert.ok(feed.getSendOnEnter(), "Enter sends by default");
    assert.ok(feed.getShowSendButton(), "The send button is visible by default");
    assert.ok(feed.getSendButtonEnabled(), "The send action is enabled by default");
    assert.notOk(feed.getGroupByDate(), "Date grouping is disabled by default");
    assert.notOk(feed.getHighlightOwnMessage(), "Own messages are not highlighted by default");
    assert.strictEqual(feed.getOwnMessageAppearance(), ChatMessageAppearance.Bubble, "Own messages use bubbles by default");
    assert.strictEqual(feed.getIncomingMessageAppearance(), ChatMessageAppearance.Conversation, "Incoming messages use the conversation appearance by default");
    assert.strictEqual(feed.getComposerPosition(), ChatFeedComposerPosition.Top, "The composer starts above the messages");
    assert.strictEqual(feed.getMessageAlignment(), ChatFeedMessageAlignment.Top, "Messages start at the top");
    assert.strictEqual(feed.getChatMaxHeight(), "32rem", "The chat has a finite default height");
    assert.strictEqual(feed.getWidth(), "100%", "The feed fills its container by default");
    assert.deepEqual(feed.getMessages(), [], "There are no messages by default");
    assert.strictEqual(feed.getSendButtonType(), ButtonType.Emphasized, "The send button is emphasized");
    assert.strictEqual(feed.getSendButtonIcon(), "sap-icon://paper-plane", "The send icon is a paper plane");
    assert.strictEqual(
        feed.getSendButtonTooltip(),
        resourceBundle?.getText("SEMANTIC_CONTROL_SEND_MESSAGE") ?? "",
        "The default send tooltip comes from the sap.m resource bundle"
    );
    assert.ok(feed._getTextArea() instanceof TextArea, "The composer uses sap.m.TextArea");
    assert.ok(feed._getTextArea()?.getGrowing(), "The composer grows with multiline content");
    assert.strictEqual(feed._getTextArea()?.getGrowingMaxLines(), 5, "The composer stops growing after five lines");
    feed.destroy();
});

QUnit.test("Message appearances are independent from composer placement and scrolling", function (assert) {
    const done = assert.async();
    const messages = Array.from({ length: 8 }, (_, index) => new ChatMessage({
        text: `Message ${index + 1}`,
        ownMessage: index % 2 === 1
    }));
    const feed = new ChatFeed({
        ownMessageAppearance: ChatMessageAppearance.Conversation,
        incomingMessageAppearance: ChatMessageAppearance.Bubble,
        composerPosition: ChatFeedComposerPosition.Bottom,
        messageAlignment: ChatFeedMessageAlignment.Bottom,
        chatMaxHeight: "6rem",
        messages
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            const domRef = feed.getDomRef() as HTMLElement | null;
            const composer = feed.getDomRef("composer") as HTMLElement | null;
            const messageLog = feed.getDomRef("messages") as HTMLElement | null;

            assert.ok(domRef?.classList.contains("ui5xChatFeedOwnMessagesConversation"), "Own messages use the configured conversation appearance");
            assert.ok(domRef?.classList.contains("ui5xChatFeedIncomingMessagesBubble"), "Incoming messages use the configured bubble appearance");
            assert.ok(messageLog?.classList.contains("ui5xChatFeedMessagesBottom"), "The messages content is bottom aligned");
            assert.strictEqual(domRef?.style.height, "6rem", "The configured chat height is reserved immediately");
            assert.strictEqual(domRef?.style.maxHeight, "6rem", "The configured maximum chat height is rendered");
            assert.strictEqual(messageLog?.style.height, "", "The messages viewport uses the remaining chat height");
            assert.strictEqual(messageLog?.nextElementSibling, composer, "The composer is rendered after the messages");
            assert.ok((messageLog?.scrollHeight ?? 0) > (messageLog?.clientHeight ?? 0), "Long conversations scroll inside the viewport");
            assert.ok((messageLog?.scrollTop ?? 0) > 0, "A bottom-aligned conversation initially shows its latest messages");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("The bottom composer remains stable while a short conversation grows", function (assert) {
    const done = assert.async();
    const fixture = document.getElementById("qunit-fixture") as HTMLElement;

    fixture.style.height = "12rem";

    const feed = new ChatFeed({
        composerPosition: ChatFeedComposerPosition.Bottom,
        chatMaxHeight: "100%",
        messages: [new ChatMessage({ text: "First message" })]
    });
    let initialComposerTop = 0;
    let renderingCount = 0;

    feed.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            const composer = feed.getDomRef("composer") as HTMLElement | null;

            if (renderingCount === 1) {
                assert.strictEqual(
                    feed.getDomRef()?.clientHeight,
                    fixture.clientHeight,
                    "A percentage height fills the explicitly sized parent"
                );
                initialComposerTop = composer?.offsetTop ?? 0;
                feed.addMessage(new ChatMessage({ text: "Second message" }));
                return;
            }

            assert.strictEqual(
                composer?.offsetTop,
                initialComposerTop,
                "Adding a message does not move the composer"
            );

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Sending a new message always scrolls to the end", function (assert) {
    const done = assert.async();
    const messages = Array.from({ length: 8 }, (_, index) => new ChatMessage({
        key: String(index + 1),
        text: `Message ${index + 1}`
    }));
    const feed = new ChatFeed({
        value: "Newest message",
        messageAlignment: ChatFeedMessageAlignment.Top,
        chatMaxHeight: "6rem",
        messages
    });
    let renderingCount = 0;

    feed.attachSend((event) => {
        feed.addMessage(new ChatMessage({
            key: "9",
            text: event.getParameter("value") ?? "",
            ownMessage: true
        }));
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            const messageLog = feed.getDomRef("messages") as HTMLElement | null;

            if (renderingCount === 1) {
                assert.ok((messageLog?.scrollHeight ?? 0) > (messageLog?.clientHeight ?? 0), "The conversation is scrollable");
                assert.strictEqual(messageLog?.scrollTop, 0, "Top alignment initially shows the first messages");

                feed._getSendButton()?.firePress();
                return;
            }

            const maximumScroll = (messageLog?.scrollHeight ?? 0)
                - (messageLog?.clientHeight ?? 0);

            assert.ok(maximumScroll > 0, "The updated conversation remains scrollable");
            assert.ok(Math.abs((messageLog?.scrollTop ?? 0) - maximumScroll) <= 1, "The newly sent message is visible at the bottom");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Own-message highlighting is controlled by the feed", function (assert) {
    const done = assert.async();
    const ownMessage = new ChatMessage({
        text: "Own message",
        ownMessage: true
    });
    const feed = new ChatFeed({
        highlightOwnMessage: false,
        messages: [ownMessage]
    });
    let renderingCount = 0;

    feed.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            if (renderingCount === 1) {
                assert.notOk(
                    feed.getDomRef()?.classList.contains("ui5xChatFeedHighlightOwnMessage"),
                    "The conversation uses the neutral message appearance by default"
                );
                assert.ok(
                    ownMessage.getDomRef()?.classList.contains("ui5xChatMessageOwn"),
                    "The item still identifies itself as an own message"
                );

                feed.setHighlightOwnMessage(true);
                return;
            }

            assert.ok(
                feed.getDomRef()?.classList.contains("ui5xChatFeedHighlightOwnMessage"),
                "The feed enables highlighting for all own messages"
            );
            assert.ok(
                ownMessage.getDomRef()?.classList.contains("ui5xChatMessageOwn"),
                "The message item does not need a separate highlight property"
            );

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Loading shows chat skeletons without changing messages", function (assert) {
    const done = assert.async();
    const message = new ChatMessage({
        text: "Loaded message",
        sender: "Anna"
    });
    const feed = new ChatFeed({
        loading: true,
        messages: [message]
    });
    let renderingCount = 0;

    feed.addEventDelegate({
        onAfterRendering: () => {
            renderingCount++;

            const domRef = feed.getDomRef();
            const messageLog = domRef?.querySelector(".ui5xChatFeedMessages");

            if (renderingCount === 1) {
                assert.strictEqual(messageLog?.getAttribute("aria-busy"), "true", "The message log exposes its loading state");
                assert.strictEqual(domRef?.querySelectorAll(".ui5xChatMessageLoading").length, 3, "Three chat placeholders are rendered");
                assert.strictEqual(domRef?.querySelectorAll(".ui5xSkeleton").length, 3, "Every placeholder uses ui5x.loading.Skeleton");
                assert.notOk(domRef?.querySelector(".ui5xChatMessageText"), "Real message content is hidden while loading");
                assert.ok(domRef?.querySelector("textarea"), "The composer remains available while messages load");
                assert.strictEqual(feed.getMessages()[0], message, "The messages aggregation remains untouched");

                feed.setLoading(false);
                return;
            }

            assert.strictEqual(messageLog?.getAttribute("aria-busy"), "false", "The message log clears its busy state");
            assert.notOk(domRef?.querySelector(".ui5xSkeleton"), "Skeletons are removed after loading");
            assert.strictEqual(domRef?.querySelector(".ui5xChatMessageText")?.textContent, "Loaded message", "The original message is rendered");
            assert.strictEqual(feed.getMessages()[0], message, "The same message control is preserved");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("The configurable button sends and clears a trimmed value", function (assert) {
    const done = assert.async();
    const feed = new ChatFeed({
        value: "  Hello  ",
        sendButtonText: "Publish",
        sendButtonIcon: "sap-icon://accept",
        sendButtonType: ButtonType.Accept,
        sendButtonTooltip: "Publish message"
    });
    let sentValue = "";

    feed.attachSend((event) => {
        sentValue = event.getParameter("value") ?? "";
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            const button = feed._getSendButton();

            assert.strictEqual(button?.getText(), "Publish", "The custom button text is applied");
            assert.strictEqual(button?.getIcon(), "sap-icon://accept", "The custom button icon is applied");
            assert.strictEqual(button?.getType(), ButtonType.Accept, "The custom button type is applied");
            assert.strictEqual(button?.getTooltip(), "Publish message", "The custom tooltip is applied");
            assert.ok(button?.getEnabled(), "A non-empty value enables the action");

            button?.firePress();

            assert.strictEqual(sentValue, "Hello", "The send event contains the trimmed value");
            assert.strictEqual(feed.getValue(), "", "The composer is cleared after sending");
            assert.notOk(button?.getEnabled(), "Clearing the value disables the action");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Keyboard sending can be disabled independently", function (assert) {
    const done = assert.async();
    const feed = new ChatFeed({
        value: "First",
        sendOnEnter: false
    });
    const sentValues: string[] = [];

    feed.attachSend((event) => sentValues.push(event.getParameter("value") ?? ""));

    feed.addEventDelegate({
        onAfterRendering: () => {
            const textArea = feed.getDomRef()?.querySelector("textarea");
            const disabledEnter = new KeyboardEvent("keydown", {
                key: "Enter",
                bubbles: true,
                cancelable: true
            });

            textArea?.dispatchEvent(disabledEnter);
            assert.deepEqual(sentValues, [], "Enter does not send when sendOnEnter is false");
            assert.notOk(disabledEnter.defaultPrevented, "Normal multiline input remains available");
            assert.strictEqual(feed.getValue(), "First", "The composer is preserved");

            feed.setSendOnEnter(true);

            const shiftedEnter = new KeyboardEvent("keydown", {
                key: "Enter",
                shiftKey: true,
                bubbles: true,
                cancelable: true
            });

            textArea?.dispatchEvent(shiftedEnter);
            assert.deepEqual(sentValues, [], "Shift+Enter does not send");
            assert.notOk(shiftedEnter.defaultPrevented, "Shift+Enter can insert a new line");

            const enabledEnter = new KeyboardEvent("keydown", {
                key: "Enter",
                bubbles: true,
                cancelable: true
            });

            textArea?.dispatchEvent(enabledEnter);
            assert.deepEqual(sentValues, ["First"], "Enter sends when enabled");
            assert.ok(enabledEnter.defaultPrevented, "Sending does not insert a trailing new line");
            assert.strictEqual(feed.getValue(), "", "The composer is cleared");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Disabling the button does not disable keyboard submission", function (assert) {
    const done = assert.async();
    const feed = new ChatFeed({
        value: "Keyboard only",
        sendButtonEnabled: false
    });
    let sentValue = "";

    feed.attachSend((event) => {
        sentValue = event.getParameter("value") ?? "";
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            feed.getDomRef()?.querySelector("textarea")?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key: "Enter",
                    bubbles: true,
                    cancelable: true
                })
            );

            assert.strictEqual(sentValue, "Keyboard only", "Enter remains available independently from the button");
            assert.strictEqual(feed.getValue(), "", "The submitted composer is cleared");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("liveChange synchronizes the public value", function (assert) {
    const feed = new ChatFeed();
    let liveValue = "";

    feed.attachLiveChange((event) => {
        liveValue = event.getParameter("value") ?? "";
    });

    feed._getTextArea()?.fireLiveChange({ value: "Draft" });

    assert.strictEqual(feed.getValue(), "Draft", "The property follows user input");
    assert.strictEqual(liveValue, "Draft", "The new value is exposed through liveChange");

    feed.destroy();
});

QUnit.test("Messages bind from a model, group by date and forward actions", function (assert) {
    const done = assert.async();
    const model = new JSONModel({
        messages: [
            {
                id: "1",
                text: "Incoming",
                sender: "Anna",
                ownMessage: false,
                editable: false,
                deletable: false,
                timestamp: "2026-08-25T09:00:00"
            },
            {
                id: "2",
                text: "Outgoing",
                sender: "You",
                ownMessage: true,
                editable: true,
                deletable: true,
                timestamp: "2026-08-25T09:05:00"
            },
            {
                id: "3",
                text: "Next day",
                sender: "Anna",
                ownMessage: false,
                editable: false,
                deletable: false,
                timestamp: "2026-08-26T10:00:00"
            }
        ]
    });
    const template = new ChatMessage({
        key: "{id}",
        text: "{text}",
        sender: "{sender}",
        ownMessage: "{ownMessage}",
        editable: "{editable}",
        deletable: "{deletable}",
        timestamp: "{timestamp}"
    });
    const feed = new ChatFeed({ groupByDate: true });
    let editedMessage: ChatMessage | null = null;
    let editedValue = "";
    let deletedMessage: ChatMessage | null = null;

    feed.setModel(model);
    feed.bindAggregation("messages", {
        path: "/messages",
        template,
        templateShareable: false
    });
    feed.attachMessageEdit((event) => {
        editedMessage = event.getParameter("message") ?? null;
        editedValue = event.getParameter("value") ?? "";
    });
    feed.attachMessageDelete((event) => {
        deletedMessage = event.getParameter("message") ?? null;
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            const messages = feed.getMessages();
            const domRef = feed.getDomRef();

            assert.strictEqual(messages.length, 3, "Three model entries create three messages");
            assert.strictEqual(domRef?.querySelectorAll(".ui5xChatFeedDateSeparator").length, 2, "One separator is rendered for each date");
            assert.strictEqual(domRef?.querySelectorAll(".ui5xChatMessageIncoming").length, 2, "Incoming messages stay on the start side");
            assert.strictEqual(domRef?.querySelectorAll(".ui5xChatMessageOwn").length, 1, "The current user's message is on the end side");

            messages[1]._getEditButton().firePress();
            messages[1]._getEditor().fireLiveChange({ value: "Updated outgoing" });
            messages[1]._getSaveButton().firePress();
            messages[1]._getDeleteButton().firePress();

            assert.strictEqual(editedMessage, messages[1], "The edit event exposes the bound message control");
            assert.strictEqual(editedValue, "Updated outgoing", "The edit event exposes the confirmed text");
            assert.strictEqual(deletedMessage, messages[1], "The delete event exposes the bound message control");

            feed.destroy();
            model.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("The feed decides how message timestamps are displayed", function (assert) {
    const message = new ChatMessage({
        text: "Of course",
        timestamp: "2026-08-26T16:45:00"
    });
    const feed = new ChatFeed({ messages: [message] });

    const time = message._getFormattedTime();

    assert.ok(time, "The time of day is displayed by default");

    feed.setMessageTimestampFormat(ChatMessageTimestampFormat.None);
    assert.strictEqual(message._getFormattedTime(), "", "None hides the timestamp");

    feed.setMessageTimestampFormat(ChatMessageTimestampFormat.DateTime);
    const dateTime = message._getFormattedTime();

    assert.notStrictEqual(dateTime, time, "DateTime differs from the time alone");
    assert.ok(dateTime.length > time.length, "DateTime carries the date as well");

    feed.destroy();
});

QUnit.test("A message outside a feed keeps the time of day", function (assert) {
    const message = new ChatMessage({
        text: "Standalone",
        timestamp: "2026-08-26T16:45:00"
    });

    assert.ok(message._getFormattedTime(), "The timestamp is still formatted");

    message.destroy();
});

QUnit.test("Only one message editor is open at a time", function (assert) {
    const first = new ChatMessage({ text: "One", editable: true });
    const second = new ChatMessage({ text: "Two", editable: true });
    const feed = new ChatFeed({ messages: [first, second] });

    first._getEditButton().firePress();
    assert.ok(first._isEditing(), "The first editor opens");

    second._getEditButton().firePress();

    assert.ok(second._isEditing(), "The second editor opens");
    assert.notOk(first._isEditing(), "The first editor is closed by the second one");

    feed.destroy();
});

QUnit.test("An unconfirmed edit survives a model refresh", function (assert) {
    const done = assert.async();
    const model = new JSONModel({
        messages: [
            { id: "1", text: "Incoming", editable: false },
            { id: "2", text: "Outgoing", editable: true }
        ]
    });
    const feed = new ChatFeed();
    let renderingCount = 0;

    feed.setModel(model);
    feed.bindAggregation("messages", {
        path: "/messages",
        template: new ChatMessage({
            key: "{id}",
            text: "{text}",
            editable: "{editable}"
        }),
        templateShareable: false
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            renderingCount += 1;

            const messages = feed.getMessages();

            if (renderingCount === 1) {
                messages[1]._getEditButton().firePress();
                messages[1]._getEditor().fireLiveChange({ value: "Draft in progress" });

                assert.ok(messages[1]._isEditing(), "The editor is open before the refresh");

                model.setProperty("/messages", [
                    ...(model.getProperty("/messages") as object[]),
                    { id: "3", text: "New incoming", editable: false }
                ]);

                return;
            }

            const restored = messages.find((message) => message.getKey() === "2");

            assert.strictEqual(messages.length, 3, "The refresh recreated the bound messages");
            assert.ok(restored?._isEditing(), "The editor is still open after the refresh");
            assert.strictEqual(restored?._getDraft(), "Draft in progress", "The draft is preserved");

            feed.destroy();
            model.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});

QUnit.test("Visibility and editability are reflected by the composer", function (assert) {
    const done = assert.async();
    const feed = new ChatFeed({
        value: "Read only",
        editable: false,
        showSendButton: false
    });

    feed.addEventDelegate({
        onAfterRendering: () => {
            assert.notOk(feed._getTextArea()?.getEditable(), "The internal text area is read-only");
            assert.notOk(document.getElementById(`${feed.getId()}-send`), "The send button is not rendered");

            feed.destroy();
            done();
        }
    });

    feed.placeAt("qunit-fixture");
});
