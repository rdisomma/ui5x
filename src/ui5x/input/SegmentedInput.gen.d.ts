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
        segmentCount?: number | PropertyBindingInfo | `{${string}}`;

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

        // property: segmentCount

        /**
         * Gets current value of property "segmentCount".
         *
         * Defines the number of digit fields.
        
        Values are constrained between 1 and 34.
         *
         * Default value is: 6
         * @returns Value of property "segmentCount"
         */
        getSegmentCount(): number;

        /**
         * Sets a new value for property "segmentCount".
         *
         * Defines the number of digit fields.
        
        Values are constrained between 1 and 34.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 6
         * @param [segmentCount=6] New value for property "segmentCount"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSegmentCount(segmentCount: number): this;

        // property: inputType

        /**
         * Gets current value of property "inputType".
         *
         * Defines which characters can be entered.
         *
         * Default value is: "SegmentedInputType.Numeric"
         * @returns Value of property "inputType"
         */
        getInputType(): SegmentedInputType;

        /**
         * Sets a new value for property "inputType".
         *
         * Defines which characters can be entered.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "SegmentedInputType.Numeric"
         * @param [inputType="SegmentedInputType.Numeric"] New value for property "inputType"
         * @returns Reference to "this" in order to allow method chaining
         */
        setInputType(inputType: SegmentedInputType): this;

        // property: size

        /**
         * Gets current value of property "size".
         *
         * Defines the size of each field.
        
        The Medium size matches the standard sap.m.Input height.
         *
         * Default value is: "SegmentedInputSize.Medium"
         * @returns Value of property "size"
         */
        getSize(): SegmentedInputSize;

        /**
         * Sets a new value for property "size".
         *
         * Defines the size of each field.
        
        The Medium size matches the standard sap.m.Input height.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "SegmentedInputSize.Medium"
         * @param [size="SegmentedInputSize.Medium"] New value for property "size"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSize(size: SegmentedInputSize): this;

        // property: showSeparators

        /**
         * Gets current value of property "showSeparators".
         *
         * Defines whether visual separators are displayed between groups
        of digit fields.
         *
         * Default value is: false
         * @returns Value of property "showSeparators"
         */
        getShowSeparators(): boolean;

        /**
         * Sets a new value for property "showSeparators".
         *
         * Defines whether visual separators are displayed between groups
        of digit fields.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [showSeparators=false] New value for property "showSeparators"
         * @returns Reference to "this" in order to allow method chaining
         */
        setShowSeparators(showSeparators: boolean): this;

        // property: separatorInterval

        /**
         * Gets current value of property "separatorInterval".
         *
         * Defines the number of digits displayed between separators.
        
        Values lower than 1 are normalized to 1.
         *
         * Default value is: 3
         * @returns Value of property "separatorInterval"
         */
        getSeparatorInterval(): number;

        /**
         * Sets a new value for property "separatorInterval".
         *
         * Defines the number of digits displayed between separators.
        
        Values lower than 1 are normalized to 1.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 3
         * @param [separatorInterval=3] New value for property "separatorInterval"
         * @returns Reference to "this" in order to allow method chaining
         */
        setSeparatorInterval(separatorInterval: number): this;

        // property: value

        /**
         * Gets current value of property "value".
         *
         * Defines the value.
        
        Unsupported characters are removed according to inputType and
        the value is limited to the configured number of fields.
         *
         * Default value is: ""
         * @returns Value of property "value"
         */
        getValue(): string;

        /**
         * Sets a new value for property "value".
         *
         * Defines the value.
        
        Unsupported characters are removed according to inputType and
        the value is limited to the configured number of fields.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [value=""] New value for property "value"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValue(value: string): this;

        // property: valueState

        /**
         * Gets current value of property "valueState".
         *
         * Defines the visual state of the control.
         *
         * Default value is: "ValueState.None"
         * @returns Value of property "valueState"
         */
        getValueState(): ValueState;

        /**
         * Sets a new value for property "valueState".
         *
         * Defines the visual state of the control.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: "ValueState.None"
         * @param [valueState="ValueState.None"] New value for property "valueState"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValueState(valueState: ValueState): this;

        // property: valueStateText

        /**
         * Gets current value of property "valueStateText".
         *
         * Defines the message associated with the current value state.
        
        When empty, the standard text for the configured value state is
        used.
         *
         * Default value is: ""
         * @returns Value of property "valueStateText"
         */
        getValueStateText(): string;

        /**
         * Sets a new value for property "valueStateText".
         *
         * Defines the message associated with the current value state.
        
        When empty, the standard text for the configured value state is
        used.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: ""
         * @param [valueStateText=""] New value for property "valueStateText"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValueStateText(valueStateText: string): this;

        // property: showClearIcon

        /**
         * Gets current value of property "showClearIcon".
         *
         * Defines whether a clear icon is shown when the control has a
        value.
         *
         * Default value is: false
         * @returns Value of property "showClearIcon"
         */
        getShowClearIcon(): boolean;

        /**
         * Sets a new value for property "showClearIcon".
         *
         * Defines whether a clear icon is shown when the control has a
        value.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [showClearIcon=false] New value for property "showClearIcon"
         * @returns Reference to "this" in order to allow method chaining
         */
        setShowClearIcon(showClearIcon: boolean): this;

        // property: enabled

        /**
         * Gets current value of property "enabled".
         *
         * Defines whether the control can be interacted with.
        
        A disabled control is dimmed and cannot receive focus.
         *
         * Default value is: true
         * @returns Value of property "enabled"
         */
        getEnabled(): boolean;

        /**
         * Sets a new value for property "enabled".
         *
         * Defines whether the control can be interacted with.
        
        A disabled control is dimmed and cannot receive focus.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [enabled=true] New value for property "enabled"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEnabled(enabled: boolean): this;

        // property: editable

        /**
         * Gets current value of property "editable".
         *
         * Defines whether the value can be changed.
        
        A non-editable control keeps its normal appearance and can still
        be focused and read, but rejects every value change.
         *
         * Default value is: true
         * @returns Value of property "editable"
         */
        getEditable(): boolean;

        /**
         * Sets a new value for property "editable".
         *
         * Defines whether the value can be changed.
        
        A non-editable control keeps its normal appearance and can still
        be focused and read, but rejects every value change.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: true
         * @param [editable=true] New value for property "editable"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEditable(editable: boolean): this;

        // property: required

        /**
         * Gets current value of property "required".
         *
         * Defines whether the control is marked as required for assistive
        technologies.
         *
         * Default value is: false
         * @returns Value of property "required"
         */
        getRequired(): boolean;

        /**
         * Sets a new value for property "required".
         *
         * Defines whether the control is marked as required for assistive
        technologies.
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: false
         * @param [required=false] New value for property "required"
         * @returns Reference to "this" in order to allow method chaining
         */
        setRequired(required: boolean): this;

        // event: liveChange

        /**
         * Attaches event handler "fn" to the "liveChange" event of this "SegmentedInput".
         *
         * Fired whenever the value changes through user input.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachLiveChange(fn: (event: SegmentedInput$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "liveChange" event of this "SegmentedInput".
         *
         * Fired whenever the value changes through user input.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachLiveChange<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$LiveChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "liveChange" event of this "SegmentedInput".
         *
         * Fired whenever the value changes through user input.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachLiveChange(fn: (event: SegmentedInput$LiveChangeEvent) => void, listener?: object): this;

        /**
         * Fires event "liveChange" to attached listeners.
         *
         * Fired whenever the value changes through user input.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired whenever the value changes through user input.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireLiveChange(parameters?: SegmentedInput$LiveChangeEventParameters): this;

        // event: change

        /**
         * Attaches event handler "fn" to the "change" event of this "SegmentedInput".
         *
         * Fired when the value has been changed by the user and the focus
        has left the control.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachChange(fn: (event: SegmentedInput$ChangeEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "change" event of this "SegmentedInput".
         *
         * Fired when the value has been changed by the user and the focus
        has left the control.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachChange<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$ChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "change" event of this "SegmentedInput".
         *
         * Fired when the value has been changed by the user and the focus
        has left the control.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachChange(fn: (event: SegmentedInput$ChangeEvent) => void, listener?: object): this;

        /**
         * Fires event "change" to attached listeners.
         *
         * Fired when the value has been changed by the user and the focus
        has left the control.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired when the value has been changed by the user and the focus
        has left the control.
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireChange(parameters?: SegmentedInput$ChangeEventParameters): this;

        // event: complete

        /**
         * Attaches event handler "fn" to the "complete" event of this "SegmentedInput".
         *
         * Fired when every digit field contains a value.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachComplete(fn: (event: SegmentedInput$CompleteEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "complete" event of this "SegmentedInput".
         *
         * Fired when every digit field contains a value.
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "SegmentedInput" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "SegmentedInput" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachComplete<CustomDataType extends object>(data: CustomDataType, fn: (event: SegmentedInput$CompleteEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "complete" event of this "SegmentedInput".
         *
         * Fired when every digit field contains a value.
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachComplete(fn: (event: SegmentedInput$CompleteEvent) => void, listener?: object): this;

        /**
         * Fires event "complete" to attached listeners.
         *
         * Fired when every digit field contains a value.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value] Fired when every digit field contains a value.
         *
         * @returns Reference to "this" in order to allow method chaining
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
