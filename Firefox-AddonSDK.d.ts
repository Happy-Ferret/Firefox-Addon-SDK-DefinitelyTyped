// Type definitions for Firefox Addon SDK
// Project: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Add-on_SDK
// Definitions by: Mohammed Hamdy <https://github.com/github-account-because-they-want-it>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "sdk/base64" {

  /**
   * Creates a base-64 encoded ASCII string from a string of binary data
   * @param data the data to encode
   * @param charset The charset of the string to encode (optional). The only accepted value is "utf-8".
   *        In order to encode and decode Unicode strings, the charset parameter needs to be set
   */
  export function encode(data: string, charset?: string): string;

  /**
   *
   * @param data the encoded data
   * @param charset
   */
  export function decode(data: string, charset?: string): string;
}

declare module "sdk/clipboard" {

  /**
   * get the contents of the system clipboard
   * @param datatype [text|html|image] Retrieve the clipboard contents only if matching this type
   */
  export function get(datatype?: string): string;

  /**
   * Replace the contents of the user's clipboard with the provided data
   * @param data The data to put on the clipboard
   * @param datatype [text|html|image] The type of the data
   */
  export function set(data: string, datatype?: string): void;
}
