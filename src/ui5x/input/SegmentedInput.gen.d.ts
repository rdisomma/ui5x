import Event from "sap/ui/base/Event";
import SegmentedInputType from "ui5x/input/SegmentedInputType";
import SegmentedInputSize from "ui5x/input/SegmentedInputSize";
import { ValueState } from "sap/ui/core/library";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./SegmentedInput" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $SegmentedInputSettings extends $ControlSettings {

        /**
         * Defines the number of digit fields.
        
        Values are constrained between 1 and 34.
         */
        digits?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines which characters can be entered.
         */
        inputType?: SegmentedInputType | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the size of each field.
        
        The Medium size matches the standard sap.m.Input height.
         */
        size?: SegmentedInputSize | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether visual separators are displayed between groups
        of digit fields.
         */
        showSeparators?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the number of digits displayed between separators.
        
        Values lower than 1 are normalized to 1.
         */
        separatorInterval?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the value.
        
        Unsupported characters are removed according to inputType and
        the value is limited to the configured number of fields.
         */
        value?: string | PropertyBindingInfo;

        /**
         * Defines the visual state of the control.
         */
        valueState?: ValueState | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines the message associated with the current value state.
        
        When empty, the standard text for the configured value state is
        used.
         */
        valueStateText?: string | PropertyBindingInfo;

        /**
         * Defines whether a clear icon is shown when the control has a
        value.
         */
        showClearIcon?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the control can be interacted with.
        
        A disabled control is dimmed and cannot receive focus.
         */
        enabled?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the value can be changed.
        
        A non-editable control keeps its normal appearance and can still
        be focused and read, but rejects every value change.
         */
        editable?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Defines whether the control is marked as required for assistive
        technologies.
         */
        required?: boolean | PropertyBindingInfo | `{${string}}`;

        /**
         * Fired whenever the value changes through user input.
         */
        liveChange?: (event: SegmentedInput$LiveChangeEvent) => void;

        /**
         * Fired when the value has been changed by the user and the focus
        has left the control.
         */
        change?: (event: SegmentedInput$ChangeEvent) => void;

        /**
         * Fired when every digit field contains a value.
         */
        complete?: (event: SegmentedInput$CompleteEvent) => void;
    }

    export default interface SegmentedInput {

        // property: digits

        /**
         * Defines the number of digit fields.
        
        Values are constrained between 1 and 34.
         */
        getDigits(): number;

        /**
         * Defines the number of digit fields.
        
        Values are constrained between 1 and 34.
         */
        setDigits(digits: number): this;

        // property: inputType

        /**
         * Defines which characters can be entered.
         */
        getInputType(): SegmentedInputType;

        /**
         * Defines which characters can be entered.
         */
        setInputType(inputType: SegmentedInputType): this;

        // property: size

        /**
         * Defines the size of each field.
        
        The Medium size matches the standard sap.m.Input height.
         */
        getSize(): SegmentedInputSize;

        /**
         * Defines the size of each field.
        
        The Medium size matches the standard sap.m.Input height.
         */
        setSize(size: SegmentedInputSize): this;

        // property: showSeparators

        /**
         * Defines whether visual separators are displayed between groups
        of digit fields.
         */
        getShowSeparators(): boolean;

        /**
         * Defines whether visual separators are displayed between groups
        of digit fields.
         */
        setShowSeparators(showSeparators: boolean): this;

        // property: separatorInterval

        /**
         * Defines the number of digits displayed between separators.
        
        Values lower than 1 are normalized to 1.
         */
        getSeparatorInterval(): number;

        /**
         * Defines the number of digits displayed between separators.
        
        Values lower than 1 are normalized to 1.
         */
        setSeparatorInterval(separatorInterval: number): this;

        // property: value

        /**
         * Defines the value.
        
        Unsupported characters are removed according to inputType and
        the value is limited to the configured number of fields.
         */
        getValue(): string;

        /**
         * Defines the value.
        
        Unsupported characters are removed according to inputType and
        the value is limited to the configured number of fields.
         */
        setValue(value: string): this;

        // property: valueState

        /**
         * Defines the visual state of the control.
         */
        getValueState(): ValueState;

        /**
         * Defines the visual state of the control.
         */
        setValueState(valueState: ValueState): this;

        // property: valueStateText

        /**
         * Defines the message associated with the current value state.
        
        When empty, the standard text for the configured value state is
        used.
         */
        getValueStateText(): string;

        /**
         * Defines the message associated with the current value state.
        
        When empty, the standard text for the configured value state is
        used.
         */
        setValueStateText(valueStateText: string): this;

        // property: showClearIcon

        /**
         * Defines whether a clear icon is shown when the control has a
        value.
         */
        getShowClearIcon(): boolean;

        /**
         * Defines whether a clear icon is shown when the control has a
        value.
         */
        setShowClearIcon(showClearIcon: boolean): this;

        // property: enabled

        /**
         * Defines whether the control can be interacted with.
        
        A disabled control is dimmed and cannot receive focus.
         */
        getEnabled(): boolean;

        /**
         * Defines whether the control can be interacted with.
        
        A disabled control is dimmed and cannot receive focus.
         */
        setEnabled(enabled: boolean): this;

        // property: editable

        /**
         * Defines whether the value can be changed.
        
        A non-editable control keeps its normal appearance and can still
        be focused and read, but rejects every value change.
         */
        getEditable(): boolean;

        /**
         * Defines whether the value can be changed.
        
        A non-editable control keeps its normal appearance and can still
        be focused and read, but rejects every value change.
         */
        setEditable(editable: boolean): this;

        // property: required

        /**
         * Defines whether the control is marked as required for assistive
        technologies.
         */
        getRequired(): boolean;

        /**
         * Defines whether the control is marked as required for assistive
        technologies.
         */
        setRequired(required: boolean): this;

        // event: liveChange

        /**
         * Fired whenever the value changes through user input.
         */
        attachLiveChange(fn: (event: SegmentedInput$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fired whenever the value changes through user input.
         */
        attachLiveChange<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$LiveChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired whenever the value changes through user input.
         */
        detachLiveChange(fn: (event: SegmentedInput$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fired whenever the value changes through user input.
         */
        fireLiveChange(parameters?: SegmentedInput$LiveChangeEventParameters): this;

        // event: change

        /**
         * Fired when the value has been changed by the user and the focus
        has left the control.
         */
        attachChange(fn: (event: SegmentedInput$ChangeEvent) => void, listener?: object): this;

        /**
         * Fired when the value has been changed by the user and the focus
        has left the control.
         */
        attachChange<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$ChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when the value has been changed by the user and the focus
        has left the control.
         */
        detachChange(fn: (event: SegmentedInput$ChangeEvent) => void, listener?: object): this;

        /**
         * Fired when the value has been changed by the user and the focus
        has left the control.
         */
        fireChange(parameters?: SegmentedInput$ChangeEventParameters): this;

        // event: complete

        /**
         * Fired when every digit field contains a value.
         */
        attachComplete(fn: (event: SegmentedInput$CompleteEvent) => void, listener?: object): this;

        /**
         * Fired when every digit field contains a value.
         */
        attachComplete<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$CompleteEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when every digit field contains a value.
         */
        detachComplete(fn: (event: SegmentedInput$CompleteEvent) => void, listener?: object): this;

        /**
         * Fired when every digit field contains a value.
         */
        fireComplete(parameters?: SegmentedInput$CompleteEventParameters): this;
    }

    /**
     * Interface describing the parameters of SegmentedInput's 'liveChange' event.
     * Fired whenever the value changes through user input.
     */
    export interface SegmentedInput$LiveChangeEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of SegmentedInput's 'change' event.
     * Fired when the value has been changed by the user and the focus
    has left the control.
     */
    export interface SegmentedInput$ChangeEventParameters {
        value?: string;
    }

    /**
     * Interface describing the parameters of SegmentedInput's 'complete' event.
     * Fired when every digit field contains a value.
     */
    export interface SegmentedInput$CompleteEventParameters {
        value?: string;
    }

    /**
     * Type describing the SegmentedInput's 'liveChange' event.
     * Fired whenever the value changes through user input.
     */
    export type SegmentedInput$LiveChangeEvent = Event<SegmentedInput$LiveChangeEventParameters>;

    /**
     * Type describing the SegmentedInput's 'change' event.
     * Fired when the value has been changed by the user and the focus
    has left the control.
     */
    export type SegmentedInput$ChangeEvent = Event<SegmentedInput$ChangeEventParameters>;

    /**
     * Type describing the SegmentedInput's 'complete' event.
     * Fired when every digit field contains a value.
     */
    export type SegmentedInput$CompleteEvent = Event<SegmentedInput$CompleteEventParameters>;
}
