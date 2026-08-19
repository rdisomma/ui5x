# UI5X

Modern UX extensions for OpenUI5 and SAPUI5.

UI5X is an open-source UI5 control library. Its controls extend `sap.ui.core.Control` and the
library depends only on `sap.ui.core`, so they are declared, bound and rendered like any standard
UI5 control: from XML views, from JavaScript or from TypeScript.

> UI5X is in early development. APIs may change before version 1.0.

## Features

- **`Skeleton`** — a placeholder in the shape of the content you are waiting for: a paragraph of
  lines, a block, or an avatar disc. Animated by default, hidden from screen readers, and styled using UI5 theme parameters so it can adapt to the active UI5 theme.
- **`LoadingContainer`** — swaps between a placeholder and the real content: bind `loading` to a
  model flag and the container does the switch for you, with no manual visibility juggling. It
  ships with a built-in skeleton and accepts any UI5 control as a custom placeholder when the default does not match your
  layout.
- **Accessibility-aware** — the container exposes `aria-busy` while loading, skeletons are
  hidden from assistive technologies, and animations respect `prefers-reduced-motion`.
- **TypeScript first** — written in TypeScript and shipped with type definitions, while remaining
  fully usable from JavaScript applications. Built with UI5 CLI 4 for OpenUI5 and SAPUI5.

## Compatibility

- Developed and tested against OpenUI5 `1.151.0`
- Built using public UI5 APIs
- SAPUI5 compatibility is a project goal; compatibility across versions is still being validated

## Development requirements

- Node.js `20.11+` or `22+` (Node.js 21 is not supported by UI5 CLI 4)
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

For UI5 applications using a descriptor, declare UI5X as a library dependency:

```json
{
  "sap.ui5": {
    "dependencies": {
      "libs": {
        "ui5x": {}
      }
    }
  }
}
```

## Usage

### Skeleton

A `Line` skeleton stacks `lines` bars and shortens the last one to look like a paragraph;
`Rectangle` fills the available width; `Circle` uses `width` as its diameter.

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

| Aggregation   | Type                   | Cardinality | Description                                                    |
| ------------- | ---------------------- | ----------- | -------------------------------------------------------------- |
| `content`     | `sap.ui.core.Control`  | 0..1        | Default aggregation. Displayed when `loading` is `false`.       |
| `placeholder` | `sap.ui.core.Control`  | 0..1        | Custom placeholder — any control, e.g. skeletons composed in a `VBox`. Falls back to the built-in `Skeleton`. |

## Development

```bash
npm install
```

```bash
npm start
```

`npm start` regenerates the control interfaces in watch mode and serves the test pages at
`http://localhost:8080/test-resources/ui5x/Skeleton.html` and `.../LoadingContainer.html`.

| Script                    | What it does                                                        |
| ------------------------- | ------------------------------------------------------------------- |
| `npm start`               | Interface generator (watch) + dev server                            |
| `npm run interfaces`      | Generate the `*.gen.d.ts` control interfaces once                    |
| `npm run typecheck`       | `tsc --noEmit`                                                       |
| `npm run build`           | Interfaces + typecheck + `ui5 build --clean-dest` into `dist/`       |
| `npm run start:dist`      | Serve the built library from `dist/`                                 |
| `npm run test:unit:browser` | Open the QUnit suite in the browser                                |
| `npm run package:pack`    | Build, prepare `dist/package.json`, and `npm pack ./dist`            |
| `npm run package:dry-run` | Same as above without writing a tarball                              |
| `npm run clean`           | Remove `dist/`                                                       |

### Project layout

```
src/ui5x/
  library.ts                     library metadata and registration
  loading/
    Skeleton.ts                  placeholder control
    LoadingContainer.ts          loading-state container
    SkeletonType.ts              Line | Rectangle | Circle enum
    renderer/                    control renderers
  themes/                        LESS sources (base + sap_horizon)
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
