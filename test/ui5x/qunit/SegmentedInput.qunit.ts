import SegmentedInput from "ui5x/input/SegmentedInput";
import SegmentedInputSize from "ui5x/input/SegmentedInputSize";
import SegmentedInputType from "ui5x/input/SegmentedInputType";
import Input from "sap/m/Input";
import { ButtonType } from "sap/m/library";
import { ValueState } from "sap/ui/core/library";

QUnit.module("ui5x.input.SegmentedInput");

QUnit.test("Defaults and digit constraints", function (assert) {
    const input = new SegmentedInput();

    assert.strictEqual(input.getDigits(), 6, "Six digits are shown by default");
    assert.strictEqual(input.getInputType(), SegmentedInputType.Numeric, "Numeric input is the default");
    assert.strictEqual(input.getSize(), SegmentedInputSize.Medium, "Medium is the default size");
    assert.notOk(input.getShowClearIcon(), "The clear icon is hidden by default");

    input.setDigits(0);
    assert.strictEqual(input.getDigits(), 1, "The lower bound is one digit");

    input.setDigits(35);
    assert.strictEqual(input.getDigits(), 34, "The upper bound is 34 digits");

    input.destroy();
});

QUnit.test("Separators are optional and use the configured interval", function (assert) {
    const done = assert.async();
    const defaultInput = new SegmentedInput();
    const input = new SegmentedInput({
        digits: 6,
        showSeparators: true,
        separatorInterval: 2
    });

    assert.strictEqual(
        defaultInput.getShowSeparators(),
        false,
        "Separators are hidden by default"
    );
    assert.strictEqual(
        defaultInput.getSeparatorInterval(),
        3,
        "Three digits are grouped by default"
    );
    defaultInput.destroy();

    input.setSeparatorInterval(0);
    assert.strictEqual(input.getSeparatorInterval(), 1, "The lower bound is one digit");
    input.setSeparatorInterval(2);

    input.addEventDelegate({
        onAfterRendering: () => {
            assert.strictEqual(
                input.getDomRef()?.querySelectorAll(".ui5xSegmentedInputSeparator").length,
                2,
                "A separator is rendered after every complete group except the last one"
            );

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Value is numeric and limited to the configured digits", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 4,
        value: "1a23b45"
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            assert.strictEqual(input.getValue(), "1234", "The value is normalized");
            assert.strictEqual(
                input.getDomRef()?.querySelectorAll(".ui5xSegmentedInputDigit").length,
                4,
                "The configured number of fields is rendered"
            );

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Alphanumeric values support fiscal codes and preserve their order", function (assert) {
    const input = new SegmentedInput({
        digits: 16,
        inputType: SegmentedInputType.Alphanumeric,
        value: "RSS-MRA85 T10A562S!"
    });

    assert.strictEqual(
        input.getValue(),
        "RSSMRA85T10A562S",
        "Unsupported characters are removed from an alphanumeric value"
    );

    input.setInputType(SegmentedInputType.Numeric);

    assert.strictEqual(
        input.getValue(),
        "8510562",
        "Changing to Numeric removes alphabetic characters"
    );

    input.destroy();
});

QUnit.test("User input fires liveChange and complete", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 2
    });

    const liveValues: string[] = [];
    let completedValue = "";

    input.attachLiveChange((event) => {
        liveValues.push(event.getParameter("value") ?? "");
    });

    input.attachComplete((event) => {
        completedValue = event.getParameter("value") ?? "";
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const firstDigit = document.getElementById(
                `${input.getId()}-digit-0`
            ) as HTMLInputElement;

            const secondDigit = document.getElementById(
                `${input.getId()}-digit-1`
            ) as HTMLInputElement;

            firstDigit.value = "4";
            firstDigit.dispatchEvent(new InputEvent("input", {
                bubbles: true,
                data: "4",
                inputType: "insertText"
            }));

            secondDigit.value = "2";
            secondDigit.dispatchEvent(new InputEvent("input", {
                bubbles: true,
                data: "2",
                inputType: "insertText"
            }));

            assert.deepEqual(liveValues, ["4", "42"], "Every change is reported");
            assert.strictEqual(completedValue, "42", "Completion reports the code");

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Input remains in the focused digit when previous digits are empty", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 4
    });

    let completedValue = "";

    input.attachComplete((event) => {
        completedValue = event.getParameter("value") ?? "";
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const digitInputs = Array.from(
                input.getDomRef()?.querySelectorAll<HTMLInputElement>(
                    ".ui5xSegmentedInputDigit"
                ) ?? []
            );
            const enterDigit = (index: number, digit: string): void => {
                digitInputs[index].value = digit;
                digitInputs[index].dispatchEvent(new InputEvent("input", {
                    bubbles: true,
                    data: digit,
                    inputType: "insertText"
                }));
            };

            enterDigit(2, "7");

            assert.strictEqual(digitInputs[0].value, "", "The first digit remains empty");
            assert.strictEqual(digitInputs[2].value, "7", "The digit remains in the focused field");
            assert.strictEqual(input.getValue(), "7", "The exposed value remains compact");
            assert.strictEqual(completedValue, "", "An intermediate gap does not complete the input");

            enterDigit(0, "1");
            enterDigit(1, "2");
            enterDigit(3, "8");

            assert.strictEqual(input.getValue(), "1278", "The value follows the visual field order");
            assert.strictEqual(completedValue, "1278", "Completion waits for every field");

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Typing before an existing digit replaces only the focused field", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 4,
        value: "1234"
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const digitInputs = Array.from(
                input.getDomRef()?.querySelectorAll<HTMLInputElement>(
                    ".ui5xSegmentedInputDigit"
                ) ?? []
            );
            const firstDigit = digitInputs[0];

            firstDigit.focus();
            firstDigit.setSelectionRange(0, 0);

            // Browser value after inserting 9 before the existing 1.
            firstDigit.value = "91";
            firstDigit.setSelectionRange(1, 1);
            firstDigit.dispatchEvent(new InputEvent("input", {
                bubbles: true,
                data: "9",
                inputType: "insertText"
            }));

            assert.deepEqual(
                digitInputs.map((digitInput) => digitInput.value),
                ["9", "2", "3", "4"],
                "Only the focused field is replaced"
            );
            assert.strictEqual(input.getValue(), "9234", "The value keeps the field order");
            assert.strictEqual(
                document.activeElement,
                digitInputs[1],
                "Focus advances by one field"
            );

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Paste fills all six fields and Backspace removes a digit", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 6
    });

    let completedValue = "";

    input.attachComplete((event) => {
        completedValue = event.getParameter("value") ?? "";
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const firstDigit = document.getElementById(
                `${input.getId()}-digit-0`
            ) as HTMLInputElement;

            const lastDigit = document.getElementById(
                `${input.getId()}-digit-5`
            ) as HTMLInputElement;

            const pasteShortcut = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "v",
                metaKey: true
            });

            firstDigit.dispatchEvent(pasteShortcut);

            assert.notOk(
                pasteShortcut.defaultPrevented,
                "The paste keyboard shortcut is not blocked"
            );

            const pasteEvent = new Event("paste", {
                bubbles: true,
                cancelable: true
            });

            Object.defineProperty(pasteEvent, "clipboardData", {
                value: {
                    getData: () => "123456"
                }
            });

            firstDigit.dispatchEvent(pasteEvent);

            assert.strictEqual(input.getValue(), "123456", "All pasted digits are used");
            assert.strictEqual(completedValue, "123456", "Paste can complete the code");

            lastDigit.dispatchEvent(new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Backspace"
            }));

            assert.strictEqual(input.getValue(), "12345", "Backspace removes the current digit");

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Success value state text is visible while a field has focus", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 2,
        valueState: ValueState.Success,
        valueStateText: "Code verified"
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const firstDigit = document.getElementById(
                `${input.getId()}-digit-0`
            ) as HTMLInputElement;
            const valueStateText = document.getElementById(
                `${input.getId()}-valueStateText`
            ) as HTMLElement;

            firstDigit.focus();

            assert.strictEqual(valueStateText.textContent, "Code verified", "The message is rendered");
            assert.notOk(
                valueStateText.classList.contains("sapUiInvisibleText"),
                "The success message is not visually hidden"
            );
            assert.strictEqual(
                getComputedStyle(valueStateText).visibility,
                "visible",
                "The success message is shown on focus"
            );

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Clear icon and clear API empty every field", function (assert) {
    const done = assert.async();
    const input = new SegmentedInput({
        digits: 4,
        value: "1234",
        showClearIcon: true
    });
    const liveValues: string[] = [];

    input.attachLiveChange((event) => {
        liveValues.push(event.getParameter("value") ?? "");
    });

    input.addEventDelegate({
        onAfterRendering: () => {
            const clearButton = document.getElementById(
                `${input.getId()}-clear`
            ) as HTMLButtonElement;
            const digitInputs = Array.from(
                input.getDomRef()?.querySelectorAll<HTMLInputElement>(
                    ".ui5xSegmentedInputDigit"
                ) ?? []
            );

            assert.notOk(clearButton.hidden, "The clear icon is visible when a value exists");
            assert.strictEqual(
                input._getClearButton().getType(),
                ButtonType.Transparent,
                "The clear action uses a transparent sap.m.Button"
            );

            input._getClearButton().firePress();

            assert.strictEqual(input.getValue(), "", "Clicking the icon clears the value");
            assert.ok(digitInputs.every((digitInput) => !digitInput.value), "Every field is empty");
            assert.deepEqual(liveValues, [""], "The user action fires liveChange");
            assert.ok(clearButton.hidden, "The clear icon is hidden after clearing");
            assert.strictEqual(document.activeElement, digitInputs[0], "Focus returns to the first field");

            input.setValue("9876");
            input.clear();

            assert.strictEqual(input.getValue(), "", "The public clear method empties the value");
            assert.deepEqual(liveValues, [""], "The programmatic method does not fire user events");

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});

QUnit.test("Sizes are distinct and Medium matches sap.m.Input height", function (assert) {
    const done = assert.async();
    const controls = [
        new SegmentedInput({ digits: 1, size: SegmentedInputSize.Small }),
        new SegmentedInput({ digits: 1, size: SegmentedInputSize.Medium }),
        new SegmentedInput({ digits: 1, size: SegmentedInputSize.Large })
    ];
    const standardInput = new Input();
    let renderedControls = 0;
    const checkWhenRendered = (): void => {
        renderedControls += 1;

        if (renderedControls < controls.length + 1) {
            return;
        }

        const heights = controls.map((control) => (
            control.getDomRef()
                ?.querySelector<HTMLElement>(".ui5xSegmentedInputDigit")
                ?.getBoundingClientRect().height ?? 0
        ));
        const standardHeight = standardInput.getDomRef()
            ?.getBoundingClientRect().height ?? 0;

        assert.ok(heights[0] < heights[1], "Small is shorter than Medium");
        assert.ok(heights[1] < heights[2], "Medium is shorter than Large");
        assert.strictEqual(heights[1], standardHeight, "Medium matches sap.m.Input height");

        controls.forEach((control) => control.destroy());
        standardInput.destroy();
        done();
    };

    controls.forEach((control) => {
        control.addEventDelegate({ onAfterRendering: checkWhenRendered });
        control.placeAt("qunit-fixture");
    });
    standardInput.addEventDelegate({ onAfterRendering: checkWhenRendered });
    standardInput.placeAt("qunit-fixture");
});

QUnit.test("Value state and value state text are rendered accessibly", function (assert) {
    const done = assert.async();
    const defaultInput = new SegmentedInput();
    const input = new SegmentedInput({
        digits: 2,
        valueState: ValueState.Error,
        valueStateText: "Invalid code"
    });

    assert.strictEqual(defaultInput.getValueState(), ValueState.None, "No state is set by default");
    assert.strictEqual(defaultInput.getValueStateText(), "", "No state text is set by default");
    defaultInput.destroy();

    input.addEventDelegate({
        onAfterRendering: () => {
            const domRef = input.getDomRef();
            const valueStateTextId = `${input.getId()}-valueStateText`;
            const digitInputs = domRef?.querySelectorAll<HTMLInputElement>(
                ".ui5xSegmentedInputDigit"
            );

            assert.ok(
                domRef?.classList.contains("ui5xSegmentedInputError"),
                "The value state class is rendered"
            );
            assert.ok(
                Array.from(digitInputs ?? []).every((digitInput) => (
                    digitInput.getAttribute("aria-invalid") === "true"
                    && digitInput.getAttribute("aria-errormessage") === valueStateTextId
                )),
                "Every digit exposes the error state"
            );
            assert.strictEqual(
                document.getElementById(valueStateTextId)?.textContent,
                "Invalid code",
                "The value state text is rendered"
            );

            input.destroy();
            done();
        }
    });

    input.placeAt("qunit-fixture");
});
