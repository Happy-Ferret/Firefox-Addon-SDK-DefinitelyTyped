# Firefox Addon SDK TypeScript Definitions

Type definitions for your [Firefox Addon SDK](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Add-on_SDK) addon written using [TypeScript](https://www.typescriptlang.org).

Currently, only the [High-level APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/SDK/High-Level_APIs) are typed.

## Usage

1. Copy the code in [Firefox-AddonSDK.d.ts](./Firefox-AddonSDK.d.ts) to a file in your project
2. Add a reference at the very top of your .ts files to the file, like this:

`/// <reference path="./path/to/Firefox-AddonSDK.d.ts" />`

## Omissions
The typings intentionally omit the deprecated [addon-page](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/addon-page) and [widget](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/widget) APIs.
Use the [ui modules](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/ui) instead.
