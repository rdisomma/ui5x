# UI5X

[![CI](https://github.com/rdisomma/ui5x/actions/workflows/ci.yml/badge.svg)](https://github.com/rdisomma/ui5x/actions/workflows/ci.yml)

Advanced controls for OpenUI5 and SAPUI5.

UI5X adds higher-level controls to OpenUI5 and SAPUI5. The standard libraries stop at the
building blocks, so anything composed from them gets rebuilt in every project. UI5X ships those
compositions as controls, with the theming, accessibility and state handling already done.

Each one extends `sap.ui.core.Control` or the standard control it specialises. None of them touch
a private API. You declare and bind them from XML views, JavaScript or TypeScript.

> UI5X is in early development. APIs may change before version 1.0.

## Features

- **`Skeleton`** — a placeholder in the shape of the content you are waiting for: a paragraph of
  lines, a block, or an avatar disc. Animated by default, hidden from screen readers, and styled
  with UI5 theme parameters so it follows the active theme.
- **`LoadingContainer`** — swaps between a placeholder and the real content: bind `loading` to a
  model flag and the container does the switch for you, with no manual visibility juggling. It
  ships with a built-in skeleton and accepts any UI5 control as a custom placeholder when the
  default does not match your layout.
- **`LoadingResponsiveTable`** — wraps a responsive `sap.m.Table` and replaces its rows with
  matching skeleton cells while data is loading. It supports fixed and viewport-filling row counts.
- **`LoadingTable`** — wraps a grid `sap.ui.table.Table` and renders a matching, presentation-only
  table with skeleton cells while data is loading.
- **`Accordion`** — groups `AccordionItem` sections with single or multiple expansion. Items can
  contain any UI5 control and support disabled or non-toggleable states.
- **`CopyButton`** — copies a value to the system clipboard and confirms success with a temporary
  icon, text and button type while preserving the original state.
- **`SegmentedInput`** — collects numeric or alphanumeric identifiers in separate fields, with
  optional grouping, three sizes, value-state feedback, paste support and a Fiori clear action.
- **`ChatFeed`** — combines a configurable message composer with a bindable conversation. Messages
  can be aligned by current user, grouped by date and expose edit or delete actions.
- **Accessibility-aware** — loading containers expose `aria-busy`, skeleton content is kept out
  of the accessibility tree, and animations respect `prefers-reduced-motion`. The interactive
  controls implement the UI5 focus and labelling contracts (`getFocusDomRef`, `getIdForLabel`,
  `getAccessibilityInfo`), so `focus()` and a `sap.m.Label` behave as they do on a standard
  control.
- **Theme coverage** — the `sap_horizon` and `sap_fiori_3` families, each in light, dark and both
  high-contrast variants, with the right-to-left stylesheets generated alongside them. The
  high-contrast themes replace the subtle tints of the standard palettes so placeholders stay
  above the 3:1 contrast ratio instead of disappearing into the background.
- **Verified on every change** — the QUnit suite runs headless in CI against the lowest supported
  Node.js versions and the current LTS, together with the type check, the generated interfaces
  and a full library build.
- **TypeScript first** — written in TypeScript and shipped with type definitions, while remaining
  fully usable from JavaScript applications. Built with UI5 CLI 4 for OpenUI5 and SAPUI5.

## Compatibility

- Developed and tested against OpenUI5 `1.151.0`
- Themes: `sap_horizon`, `sap_horizon_dark`, `sap_horizon_hcb`, `sap_horizon_hcw`,
  `sap_fiori_3`, `sap_fiori_3_dark`, `sap_fiori_3_hcb`, `sap_fiori_3_hcw`.
  Any other theme falls back to the base theme
- Tested with SAPUI5 `1.151.0` in SAP Business Application Studio
- Built using public UI5 APIs
- Compatibility with older UI5 versions has not been validated yet

## Tests

```sh
npm test
```

Runs the QUnit suite in headless Chrome through karma. The run exits non-zero
on the first failing assertion, so it can be used as a CI gate.

`npm run test:unit:browser` opens the same suite in a visible browser, which is
easier to debug.

To check a control by hand, `npm start` serves the demo pages under
`test-resources/ui5x/`. Each one carries a toolbar that changes the layout and the behaviour of
its control, and a theme selector covering every theme the library ships, which is the practical
way to look at the dark and high-contrast palettes.

### UI5 library dependencies

UI5X declares three OpenUI5 libraries, which are loaded together with it:

| Library        | Required by |
| -------------- | ----------- |
| `sap.ui.core`  | Every control |
| `sap.m`        | `CopyButton` (which extends `sap.m.Button`), `ChatFeed`, `ChatMessage`, `SegmentedInput`, `LoadingResponsiveTable` |
| `sap.ui.table` | `LoadingTable` only |

`sap.m` in turn brings `sap.ui.layout` and `sap.ui.unified`, the latter shared with
`sap.ui.table`. An application that uses no grid table still loads `sap.ui.table`, which is the
one dependency UI5X could drop by moving `LoadingTable` out of the library.

## Development requirements

- Node.js `20.19+` or `22.12+` (Node.js 21 is not supported by UI5 CLI 4).
  UI5 CLI 4 itself accepts `20.11+`, but the interface generator loads an
  ESM-only dependency, and `require()` of an ES module needs those versions
- npm `8+`
- UI5 CLI `4`

## Installation

UI5X is not published to the public npm registry yet.

From a local clone of this repository, install the development dependencies and build the
distributable package:

```bash
npm install
npm run package:pack
```

Then install the generated tarball in your UI5 application:

```bash
npm install ../ui5x/raffaeledisomma-ui5x-0.1.0.tgz
```

UI5X has no npm dependencies of its own, so installing it adds one package and nothing else.
Whatever `npm audit` reports afterwards comes from the application's own dependency tree, not
from here. The UI5 libraries it needs at runtime are listed under
[UI5 library dependencies](#ui5-library-dependencies).

Then declare UI5X in the application's `manifest.json`:

```json
{
  "sap.ui5": {
    "dependencies": {
      "libs": {
        "ui5x": {}
      }
    },
    "resourceRoots": {
      "ui5x": "./thirdparty/ui5x/"
    }
  }
}
```

`resourceRoots` is what tells UI5 where the library lives. UI5X is served from
`/thirdparty/ui5x/` rather than from `/resources/`, so this mapping is required rather than
optional, and it is also what makes the library resolve against the application in SAP Build
Work Zone, where the UI5 runtime is loaded by the shell.

## Consuming UI5X in a SAP Fiori tools project

A SAP Fiori tools project reserves `/resources/` for the SAPUI5 runtime: a proxy claims it during
local preview, and a route forwards it to SAP's servers once deployed. UI5X is therefore served
from `/thirdparty/ui5x/` instead, so neither has to be reconfigured and neither can intercept the
library.

What remains is getting the library into the deployment, which UI5 CLI does not do on its own.

| Step | File | Needed for | Symptom when missing |
| ---- | ---- | ---------- | -------------------- |
| Declare and map the library | `manifest.json` | always | `ModuleError: failed to load 'ui5x/library.js'` |
| Include in the build | `ui5.yaml` or the deploy configuration | any deployment | `dist` contains no `thirdparty/ui5x` |
| Include in the archive | the `ui5-task-zipper` configuration | Cloud Foundry | the archive contains no `thirdparty/ui5x` |

Nothing is needed for local preview: `npm start` serves the library from the dependency graph.

### Build output

`ui5 build` only writes the application's own files unless the library is declared as a build
dependency. Add it to the configuration the build actually uses, which for a Fiori tools project
is often `ui5-deploy.yaml` rather than `ui5.yaml`:

```yaml
builder:
  settings:
    includeDependency:
      - ui5x
```

### Deployment archive

If the project packages itself with `ui5-task-zipper`, the archive holds the application's own
files only. The option that adds the libraries is spelled `includeDependencies`, one letter away
from the build setting above, and both are required:

```yaml
builder:
  customTasks:
    - name: ui5-task-zipper
      afterTask: generateCachebusterInfo
      configuration:
        includeDependencies: true
```

Verify before deploying:

```bash
unzip -l dist/<archive>.zip | grep "thirdparty/ui5x/library.js"
```

### Verifying a deployment

The library can be requested directly, without the application having to work:

```
https://<application-url>/thirdparty/ui5x/library.js
```

Serving the file means the deployment is complete.

## Usage

### Skeleton

A `Line` skeleton stacks `lines` bars and shortens the last one to look like a paragraph;
`Rectangle` fills the available width; `Circle` uses `width` as its diameter.

![Animated preview of the UI5X Skeleton control](docs/assets/skeleton-preview.gif)

```js
sap.ui.require(["ui5x/loading/Skeleton"], function (Skeleton) {
  new Skeleton({
    type: "Line",
    lines: 3,
    width: "20rem",
    animated: true
  }).placeAt("content");
});
```

In XML views:

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:loading="ui5x.loading">

  <loading:Skeleton type="Circle" width="3rem" />

</mvc:View>
```

| Property   | Type                     | Default  | Description                                                                 |
| ---------- | ------------------------ | -------- | --------------------------------------------------------------------------- |
| `width`    | `sap.ui.core.CSSSize`    | `null`   | Width of the skeleton, e.g. `"100%"`, `"20rem"`, `"320px"`.                  |
| `type`     | `ui5x.loading.SkeletonType` | `Line` | Visual shape: `Line`, `Rectangle` or `Circle`.                              |
| `lines`    | `int`                    | `1`      | Number of placeholder lines. Values outside 1–3 are clamped. Only applies to type `Line`. |
| `animated` | `boolean`                | `true`   | Shimmer animation. Also stops when the system requests reduced motion.       |

### LoadingContainer

A container that swaps between a placeholder and its real content: it renders the placeholder
while `loading` is `true`, and its `content` otherwise. Only one of the two is in the DOM at a
time, so `loading` can be bound directly to a model flag.

![Animated preview of the UI5X LoadingContainer control](docs/assets/loading-container-preview.gif)

```js
sap.ui.require([
  "ui5x/loading/LoadingContainer",
  "sap/m/Text"
], function (LoadingContainer, Text) {
  const container = new LoadingContainer({
    loading: true,
    skeletonType: "Line",
    skeletonLines: 3,
    content: new Text({ text: "Loaded content" })
  });

  container.placeAt("content");

  // later, when data has arrived
  container.setLoading(false);
});
```

With a custom placeholder:

```xml
<loading:LoadingContainer
  loading="{ui>/busy}"
  xmlns:loading="ui5x.loading"
  xmlns:m="sap.m">

  <loading:placeholder>
    <loading:Skeleton
      type="Rectangle"
      width="20rem" />
  </loading:placeholder>

  <m:Text text="Loaded content" />

</loading:LoadingContainer>
```

| Property        | Type                        | Default | Description                                                         |
| --------------- | --------------------------- | ------- | ------------------------------------------------------------------- |
| `loading`       | `boolean`                   | `false` | Show the placeholder instead of the content.                        |
| `skeletonType`  | `ui5x.loading.SkeletonType` | `Line`  | Type of the default skeleton. Ignored when `placeholder` is set.    |
| `skeletonLines` | `int`                       | `1`     | Lines of the default skeleton (clamped to 1–3). Ignored when `placeholder` is set. |
| `animated`      | `boolean`                   | `true`  | Animate the default skeleton. Ignored when `placeholder` is set.    |
| `width`         | `sap.ui.core.CSSSize`       | `null`  | Width of the container. Inherits the width of its parent when unset. |

| Aggregation   | Type                   | Cardinality | Description                                                    |
| ------------- | ---------------------- | ----------- | -------------------------------------------------------------- |
| `content`     | `sap.ui.core.Control`  | 0..1        | Default aggregation. Displayed when `loading` is `false`.       |
| `placeholder` | `sap.ui.core.Control`  | 0..1        | Custom placeholder — any control, e.g. skeletons composed in a `VBox`. Falls back to the built-in `Skeleton`. |

### LoadingResponsiveTable

`LoadingResponsiveTable` wraps a `sap.m.Table`. While `loading` is `true`, it renders a matching
table with cloned columns and skeleton cells; when loading finishes, it renders the original table
and its bound items.

![Animated preview of the UI5X LoadingResponsiveTable control](docs/assets/loading-responsive-table-preview.gif)

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:loading="ui5x.loading"
  xmlns:m="sap.m">

  <loading:LoadingResponsiveTable
    loading="{ui>/busy}"
    skeletonRowsMode="Fill"
    skeletonRows="5"
    maxSkeletonRows="10"
    dynamicSkeletonWidths="true">

    <m:Table items="{/rows}">
      <m:columns>
        <m:Column>
          <m:Text text="Name" />
        </m:Column>
        <m:Column>
          <m:Text text="Company" />
        </m:Column>
      </m:columns>

      <m:items>
        <m:ColumnListItem>
          <m:cells>
            <m:Text text="{name}" />
            <m:Text text="{company}" />
          </m:cells>
        </m:ColumnListItem>
      </m:items>
    </m:Table>

  </loading:LoadingResponsiveTable>

</mvc:View>
```

`Fixed` mode always renders `skeletonRows`. `Fill` mode calculates how many rows fit between the
table and the bottom of the viewport, using `skeletonRows` as the initial fallback and
`maxSkeletonRows` as the upper limit.

| Property                | Type                           | Default | Description                                           |
| ----------------------- | ------------------------------ | ------- | ----------------------------------------------------- |
| `loading`               | `boolean`                      | `false` | Show skeleton rows instead of the original table.     |
| `skeletonRows`          | `int`                          | `5`     | Rows rendered in `Fixed` mode and fallback for `Fill`. |
| `maxSkeletonRows`       | `int`                          | `10`    | Maximum rows calculated in `Fill` mode.               |
| `skeletonRowsMode`      | `ui5x.loading.SkeletonRowMode` | `Fixed` | Row-count strategy: `Fixed` or `Fill`.                |
| `skeletonRowHeight`     | `sap.ui.core.CSSSize` | `""`      | Height of every skeleton row. `sap.m.Table` sizes rows on their content, so skeleton rows are shorter than rows carrying data and the table grows when it arrives; set this to the height the application rows end up with. |
| `dynamicSkeletonWidths` | `boolean`                      | `false` | Vary skeleton widths across cells.                    |
| `animated`              | `boolean`                      | `true`  | Enable the skeleton shimmer animation.                |

| Aggregation | Type          | Cardinality | Description                                      |
| ----------- | ------------- | ----------- | ------------------------------------------------ |
| `table`     | `sap.m.Table` | 0..1        | Default aggregation containing the actual data. |

### LoadingTable

`LoadingTable` provides the same loading experience for a grid `sap.ui.table.Table`. While
`loading` is `true`, it renders an internal table with matching columns and skeleton rows. The
original table, its row binding and its application data remain untouched.

![Animated preview of the UI5X LoadingTable control](docs/assets/loading-table-preview.gif)

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:loading="ui5x.loading"
  xmlns:m="sap.m"
  xmlns:t="sap.ui.table">

  <loading:LoadingTable
    loading="{ui>/busy}"
    skeletonRowsMode="Fixed"
    skeletonRows="5"
    maxSkeletonRows="10"
    dynamicSkeletonWidths="true">

    <t:Table
      rows="{/rows}"
      visibleRowCount="5"
      visibleRowCountMode="Fixed">

      <t:columns>
        <t:Column width="15rem">
          <m:Label text="Customer" />
          <t:template>
            <m:Text text="{name}" />
          </t:template>
        </t:Column>

        <t:Column width="13rem">
          <m:Label text="Company" />
          <t:template>
            <m:Text text="{company}" />
          </t:template>
        </t:Column>
      </t:columns>

    </t:Table>

  </loading:LoadingTable>

</mvc:View>
```

`Fixed` mode always renders `skeletonRows`. `Fill` mode calculates how many rows fit between the
table and the bottom of the viewport, using `skeletonRows` as the initial fallback and
`maxSkeletonRows` as the upper limit.

| Property                | Type                           | Default | Description                                            |
| ----------------------- | ------------------------------ | ------- | ------------------------------------------------------ |
| `loading`               | `boolean`                      | `false` | Show skeleton rows instead of the original table.      |
| `skeletonRows`          | `int`                          | `5`     | Rows rendered in `Fixed` mode and fallback for `Fill`. |
| `maxSkeletonRows`       | `int`                          | `10`    | Maximum rows calculated in `Fill` mode.                |
| `skeletonRowsMode`      | `ui5x.loading.SkeletonRowMode` | `Fixed` | Row-count strategy: `Fixed` or `Fill`.                 |
| `dynamicSkeletonWidths` | `boolean`                      | `false` | Vary skeleton widths across cells.                     |
| `animated`              | `boolean`                      | `true`  | Enable the skeleton shimmer animation.                 |

| Aggregation | Type                 | Cardinality | Description                                      |
| ----------- | -------------------- | ----------- | ------------------------------------------------ |
| `table`     | `sap.ui.table.Table` | 0..1        | Default aggregation containing the actual data. |

### Accordion

`Accordion` displays a collection of expandable `AccordionItem` sections. By default, expanding
one item collapses the other toggleable items. Set `multipleExpansion` to `true` to allow several
sections to remain open at the same time.

![Animated preview of the UI5X Accordion control](docs/assets/accordion-preview.gif)

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:layout="ui5x.layout"
  xmlns:m="sap.m">

  <layout:Accordion
    width="30rem"
    multipleExpansion="false"
    itemToggle=".onItemToggle">

    <layout:AccordionItem
      title="General information"
      expanded="true">
      <m:Text text="Content of the first section" />
    </layout:AccordionItem>

    <layout:AccordionItem title="Details">
      <m:VBox>
        <m:Label
          text="Company name"
          labelFor="companyName" />
        <m:Input
          id="companyName"
          value="{/company/name}"
          width="100%" />
        <m:HBox class="sapUiSmallMarginTop">
          <m:Button
            text="Save"
            type="Emphasized"
            press=".onSave" />
          <m:Button
            text="Cancel"
            press=".onCancel"
            class="sapUiTinyMarginBegin" />
        </m:HBox>
      </m:VBox>
    </layout:AccordionItem>

    <layout:AccordionItem
      title="Always expanded"
      expanded="true"
      toggleable="false">
      <m:Text text="This section cannot be collapsed" />
    </layout:AccordionItem>

  </layout:Accordion>

</mvc:View>
```

| `Accordion` property | Type                  | Default | Description                                      |
| -------------------- | --------------------- | ------- | ------------------------------------------------ |
| `multipleExpansion`  | `boolean`             | `false` | Allow more than one item to be expanded.         |
| `width`              | `sap.ui.core.CSSSize` | `null`  | Width of the accordion, such as `"100%"`.        |

| `AccordionItem` property | Type      | Default | Description                                             |
| ------------------------ | --------- | ------- | ------------------------------------------------------- |
| `title`                  | `string`  | `""`    | Text displayed in the item header.                      |
| `expanded`               | `boolean` | `false` | Whether the content is expanded.                        |
| `toggleable`             | `boolean` | `true`  | Whether user and accordion logic may change the state.  |
| `enabled`                | `boolean` | `true`  | Whether the item can be toggled through user input.     |

| API          | Type                   | Description                                             |
| ------------ | ---------------------- | ------------------------------------------------------- |
| `items`      | `AccordionItem[]`      | Default aggregation containing the accordion sections. |
| `itemToggle` | Event                  | Fired after an item is toggled through user input.      |

### CopyButton

`CopyButton` extends `sap.m.Button` with clipboard support and visual success feedback. The
feedback is shown only after the value has been copied successfully, then the original icon, text
and button type are restored automatically.

![Animated preview of the UI5X CopyButton control](docs/assets/copy-button-preview.gif)

```js
sap.ui.require(["ui5x/button/CopyButton"], function (CopyButton) {
  new CopyButton({
    value: "npm i @raffaeledisomma/ui5x",
    text: "Copy",
    successText: "Copied",
    successType: "Accept"
  }).placeAt("content");
});
```

In XML views:

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:button="ui5x.button">

  <button:CopyButton
    value="{invoice>/id}"
    text="Copy ID"
    successText="Copied"
    successType="Accept" />

</mvc:View>
```

When `successType` is omitted, the button keeps its current `type`. Set `successIcon` to an empty
string to keep the original icon during feedback. Clipboard access requires a secure context and
a press initiated by the user.

| Property      | Type                  | Default                | Description                                                    |
| ------------- | --------------------- | ---------------------- | -------------------------------------------------------------- |
| `value`       | `string`              | `""`                   | Value written to the system clipboard.                         |
| `successIcon` | `sap.ui.core.URI`     | `sap-icon://accept`    | Temporary success icon. An empty value preserves the icon.     |
| `successText` | `string`              | `""`                   | Temporary text, applied only when the button already has text. |
| `successType` | `sap.m.ButtonType`    | Current button `type`  | Temporary type. An explicitly configured value takes priority. |

### SegmentedInput

`SegmentedInput` collects a fixed-length value in individual fields. It supports numeric codes
such as PINs and one-time passwords, as well as alphanumeric identifiers such as fiscal codes,
license keys, VINs and IBANs. Pasted content is distributed across the segments automatically.

![Animated preview of the UI5X SegmentedInput control](docs/assets/segmented-input-preview.gif)

```js
sap.ui.require(["ui5x/input/SegmentedInput"], function (SegmentedInput) {
  new SegmentedInput({
    digits: 16,
    inputType: "Alphanumeric",
    size: "Small",
    showClearIcon: true,
    complete: function (event) {
      this.setValueState("Success");
      this.setValueStateText(`Completed: ${event.getParameter("value")}`);
    }
  }).placeAt("content");
});
```

In XML views:

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:input="ui5x.input">

  <input:SegmentedInput
    digits="6"
    inputType="Numeric"
    size="Large"
    showSeparators="true"
    separatorInterval="3"
    value="{/verificationCode}"
    valueState="{/codeState}"
    valueStateText="{/codeStateText}"
    liveChange=".onCodeChange"
    complete=".onCodeComplete" />

</mvc:View>
```

The exposed `value` is always a string, including in `Numeric` mode, so leading zeroes are
preserved. `Medium` matches the standard `sap.m.Input` height; `Small` is suitable for compact
forms and `Large` emphasizes short verification codes.

| Property            | Type                               | Default   | Description                                                       |
| ------------------- | ---------------------------------- | --------- | ----------------------------------------------------------------- |
| `digits`            | `int`                              | `6`       | Number of segments, clamped between 1 and 34.                     |
| `inputType`         | `ui5x.input.SegmentedInputType`    | `Numeric` | Accepted characters: `Numeric` or `Alphanumeric`.                 |
| `size`              | `ui5x.input.SegmentedInputSize`    | `Medium`  | Segment size: `Small`, `Medium` or `Large`.                       |
| `value`             | `string`                           | `""`      | Current normalized value, limited to the configured segment count. |
| `showSeparators`    | `boolean`                          | `false`   | Display visual separators between groups.                        |
| `separatorInterval` | `int`                              | `3`       | Number of segments in each group; values below 1 become 1.        |
| `valueState`        | `sap.ui.core.ValueState`           | `None`    | Fiori value state applied to every segment.                       |
| `valueStateText`    | `string`                           | `""`      | Message associated with the current value state.                  |
| `showClearIcon`     | `boolean`                          | `false`   | Show a transparent Fiori clear button while a value is present.   |

| API          | Type   | Description                                                       |
| ------------ | ------ | ----------------------------------------------------------------- |
| `liveChange` | Event  | Fired after every user change with the current `value`.           |
| `complete`   | Event  | Fired when every segment contains a character.                    |
| `clear()`    | Method | Clears all segments without firing user-interaction events.       |

### ChatFeed

`ChatFeed` combines a growing `sap.m.TextArea` composer with a chat-style message list. Its default
`messages` aggregation accepts `ChatMessage` controls and can be bound directly to a model. Set
`ownMessage` on each message to align messages from the current user to the end side.

When `sendOnEnter` is enabled, Enter sends the message and Shift+Enter inserts a new line. When it
is disabled, Enter keeps the standard multiline text-area behavior.

![Animated preview of the UI5X ChatFeed control](docs/assets/chat-feed-preview.gif)

```js
sap.ui.require([
  "ui5x/chat/ChatFeed",
  "ui5x/chat/ChatMessage"
], function (ChatFeed, ChatMessage) {
  const feed = new ChatFeed({
    value: "{/draft}",
    placeholder: "Write a message",
    sendOnEnter: true,
    sendButtonText: "Send",
    groupByDate: true,
    messageTimestampFormat: "Time",
    ownMessageAppearance: "Bubble",
    incomingMessageAppearance: "Conversation",
    composerPosition: "Bottom",
    messageAlignment: "Bottom",
    chatMaxHeight: "32rem",
    send: function (event) {
      // Add event.getParameter("value") to the application model.
    },
    messageEdit: function (event) {
      // Update event.getParameter("message").getBindingContext().
    },
    messageDelete: function (event) {
      // Remove the corresponding entry from the application model.
    }
  });

  feed.bindAggregation("messages", {
    path: "/messages",
    template: new ChatMessage({
      key: "{id}",
      text: "{text}",
      sender: "{sender}",
      ownMessage: "{ownMessage}",
      editable: "{editable}",
      deletable: "{deletable}",
      timestamp: "{timestamp}"
    }),
    templateShareable: false
  });
});
```

The control emits actions and leaves model mutations to the application, so the same API works
with `JSONModel`, OData and other UI5 models. Sending clears the composer after the `send` event.
Message appearance is configured independently for own and incoming messages. `Conversation`
uses a transparent surface, while `Bubble` uses a neutral Fiori bubble. Bottom alignment preserves
chronological order while initially showing the latest messages.

| `ChatFeed` property      | Type                  | Default                    | Description                                      |
| ------------------------ | --------------------- | -------------------------- | ------------------------------------------------ |
| `value`                  | `string`              | `""`                       | Current composer value.                          |
| `placeholder`            | `string`              | `""`                       | Composer placeholder.                            |
| `enabled`                | `boolean`             | `true`                     | Enables the composer and send action.            |
| `editable`               | `boolean`             | `true`                     | Allows the composer value to be changed.         |
| `loading`                | `boolean`             | `false`                    | Replaces messages with chat skeleton placeholders. |
| `sendOnEnter`            | `boolean`             | `true`                     | Sends when the user presses Enter.               |
| `sendButtonText`         | `string`              | `""`                       | Optional send button text.                       |
| `sendButtonIcon`         | `sap.ui.core.URI`     | `sap-icon://paper-plane`   | Send button icon.                                |
| `sendButtonType`         | `sap.m.ButtonType`    | `Emphasized`               | Send button type.                                |
| `sendButtonTooltip`      | `string`              | `sap.m localized text`      | Accessible send button tooltip.                  |
| `showSendButton`         | `boolean`             | `true`                     | Displays the send button.                        |
| `sendButtonEnabled`      | `boolean`             | `true`                     | Enables the button independently from Enter.    |
| `messageTimestampFormat` | `ui5x.chat.ChatMessageTimestampFormat` | `Time`    | Displays each timestamp as `Time`, as `DateTime`, or hides it with `None`. Without date separators, `Time` alone leaves the day ambiguous. |
| `groupByDate`            | `boolean`             | `false`                    | Inserts date separators between message groups. |
| `highlightOwnMessage`    | `boolean`             | `false`                    | Highlights every message marked as `ownMessage`. |
| `ownMessageAppearance`   | `ui5x.chat.ChatMessageAppearance` | `Bubble`          | Selects the appearance of messages from the current user. |
| `incomingMessageAppearance` | `ui5x.chat.ChatMessageAppearance` | `Conversation` | Selects the appearance of incoming messages. |
| `composerPosition`       | `ui5x.chat.ChatFeedComposerPosition` | `Top`       | Places the composer above or below the messages. |
| `messageAlignment`       | `ui5x.chat.ChatFeedMessageAlignment` | `Top`       | Starts short conversations at the top or bottom and controls the initial scroll position. |
| `chatMaxHeight`          | `sap.ui.core.CSSSize` | `32rem`                    | Reserves and limits the complete chat so the composer stays fixed; percentages require a parent with an explicit height, while an empty value restores a content-driven height. |
| `width`                  | `sap.ui.core.CSSSize` | `100%`                     | Width of the control.                            |

| `ChatMessage` property | Type      | Default | Description                                         |
| ---------------------- | --------- | ------- | --------------------------------------------------- |
| `key`                  | `string`  | `""`    | Stable application key for the message.             |
| `text`                 | `string`  | `""`    | Message body.                                       |
| `sender`               | `string`  | `""`    | Displayed sender name.                              |
| `ownMessage`           | `boolean` | `false` | Aligns messages from the current user to the end.   |
| `editable`             | `boolean` | `false` | Enables inline editing with save and cancel actions. |
| `deletable`            | `boolean` | `false` | Displays a Fiori reject delete action.              |
| `timestamp`            | `any`     | `null`  | Date, ISO string or numeric message timestamp.      |

| Event           | Parameter              | Description                                      |
| --------------- | ---------------------- | ------------------------------------------------ |
| `liveChange`    | `value: string`        | Fired whenever the composer value changes.      |
| `send`          | `value: string`        | Fired after a non-empty value is submitted.      |
| `messageEdit`   | `message: ChatMessage`, `value: string` | Fired when an inline edit is confirmed. |
| `messageDelete` | `message: ChatMessage` | Fired when a message delete action is pressed.   |

## Development

```bash
npm install
```

```bash
npm start
```

`npm start` regenerates the control interfaces in watch mode and serves the test pages at
`http://localhost:8080/test-resources/ui5x/Skeleton.html`. Additional manual demos include
`LoadingContainer.html`, `LoadingResponsiveTable.html`, `LoadingTable.html`, `Accordion.html`,
`CopyButton.html`, `SegmentedInput.html` and `ChatFeed.html` in the same directory.

| Script                      | What it does |
| --------------------------- | ------------ |
| `npm start`                 | Interface generator (watch) + dev server |
| `npm run interfaces`        | Generate the `*.gen.d.ts` control interfaces once |
| `npm run typecheck`         | `tsc --noEmit` |
| `npm run build`             | Interfaces + typecheck + regular UI5 build into `dist/` |
| `npm run build:package`     | Build UI5X and create a reusable UI5 build manifest |
| `npm run start:dist`        | Serve the built library from `dist/` |
| `npm run test:unit:browser` | Open the QUnit suite in the browser |
| `npm run package:pack`      | Build, prepare and create the distributable npm tarball |
| `npm run package:dry-run`   | Validate the distributable package without creating a tarball |
| `npm run clean`             | Remove `dist/` |

### Project layout

```
src/ui5x/
  library.ts                     library metadata and registration
  loading/
    Skeleton.ts                  placeholder control
    LoadingContainer.ts          loading-state container
    LoadingResponsiveTable.ts    responsive table skeleton wrapper
    LoadingTable.ts              grid table skeleton wrapper
    SkeletonType.ts              Line | Rectangle | Circle enum
    renderer/                    control renderers
  layout/
    Accordion.ts                 accordion container
    AccordionItem.ts             expandable section
    renderer/                    control renderers
  button/
    CopyButton.ts                clipboard button with success feedback
  input/
    SegmentedInput.ts            segmented numeric and alphanumeric input
    SegmentedInputType.ts        Numeric | Alphanumeric enum
    SegmentedInputSize.ts        Small | Medium | Large enum
    renderer/                    segmented input renderer
  chat/
    ChatFeed.ts                  bindable chat and composer control
    ChatMessage.ts               individual incoming or own message
    renderer/                    chat renderers
  themes/                        LESS sources grouped by control namespace
test/ui5x/
  *.html                         manual demo pages
  qunit/                         unit tests
```

Controls are written in TypeScript. After changing control metadata (properties, aggregations,
events), run `npm run interfaces` so the generated `*.gen.d.ts` declarations stay in sync.

## Contributing

Issues and pull requests are welcome at
[github.com/rdisomma/ui5x](https://github.com/rdisomma/ui5x). Please run
`npm run typecheck` and the QUnit suite before opening a PR.

## License

Apache-2.0 — see [LICENSE](LICENSE).
