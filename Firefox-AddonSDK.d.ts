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
  export function get(datatype?: "text" | "html" | "image"): string;

  /**
   * Replace the contents of the user's clipboard with the provided data
   * @param data The data to put on the clipboard
   * @param datatype [text|html|image] The type of the data
   */
  export function set(data: string, datatype?: "text" | "html" | "image"): void;
}

declare module "sdk/context-menu" {

  /**
   * The context determines when the menu item will be visible
   */
  interface Context {
    // a base context
  }

  /**
   * The page context occurs when the user invokes the context menu on a non-interactive portion of the page
   */
  export var PageContext: PageContext;

  interface PageContext extends Context {
    (): Object;
  }

  /**
   * This context occurs when the menu is invoked on a page in which the user has made a selection
   */
  export var SelectionContext: SelectionContext;

  interface SelectionContext extends Context {
    (): Object;
  }

  /**
   * This context occurs when the menu is invoked on a node that either matches selector, a CSS selector,
   * or has an ancestor that matches
   * @param selector may include multiple selectors separated by commas, e.g., "a[href], img"
   */
  export var SelectorContext: SelectorContext;

  interface SelectorContext extends Context {
    (selector: string): Object;
  }

  /**
   * This context occurs when the menu is invoked on pages with particular URLs
   * also see {@link sdk/page-mod} module which uses a similar match pattern
   * @param matchPattern pattern string or an array of match pattern strings
   */
  export var URLContext: URLContext;

  interface URLContext extends Context {
    (matchPattern: string): Object;
  }

  /**
   * This context occurs when the function returns a true value
   * @param predicateFunction The function is passed an object with properties describing the menu invocation context
   */
  export var PredicateContext: PredicateContext;

  interface PredicateContext extends Context {
    (predicateFunction: (context: {documentType: string, documentURL: string, targetName: string, targetID?: string,
                                   isEditable: boolean, selectionText?: string, srcURL?: string, linkURL?: string,
                                   value?: string}) => boolean): Object;
  }

  interface ItemContext extends Array<Context> {
    // a list of Context that also has add, remove methods
    add: (context: Context) => void;
    remove: (context: Context) => void;
  }

  // Item overloads
  interface Item {
    context: ItemContext;
    destroy: () => void;
    label: string;
    image: string | URL;
    data: any;
    parentMenu?: Menu;
    contentScript?: string | string[];
    contentScriptFile?: string | string[];
  }
  /**
   * A menu item
   */
  export function Item(options: {label: string, image?: string, accessKey?: string, context?: Context | Context[],
    contentScript?: string, contentScriptFile?: string,  data?: any, onMessage?: (message?: any) => void}): Item;
  
  /**
   * A menu separator
   */
  export function Separator(): Separator;

  interface Separator {
    parentMenu: Menu;
    destroy: () => void;
  }

  interface Menu {
    addItem: (item: ItemMenuSeparator) => void;
    removeItem: (item: ItemMenuSeparator) => void;
    destroy: () => void;
    label: string;
    items: ItemMenuSeparator;
    image: string | URL;
    context: ItemContext;
    parentMenu?: Menu;
    contentScript: string | string[];
    contentScriptFile: string | string[];
  }

  type ItemMenuSeparator = Item | Menu | Separator;

  /**
   * A labeled menu item that expands into a submenu
   * @param options
   */
  export function Menu(options: {label: string, items: ItemMenuSeparator[], image?: string, context?: Context[],
    contentScript?: string | string[], contentScriptFile?: string | string[], onMessage: (message?: any) => void}): Menu;

}

declare module "sdk/hotkeys" {
  interface Hotkey {
    destroy: () => void;
  }
  /**
   * Hotkey
   * Used to define a hotkey combination passing it the combination and a function to be called when the user 
   * presses that combination
   */
  export function Hotkey(options: {combo: string, onPress: () => void}): Hotkey;
}

declare module "sdk/indexed-db" {
  
  // these interfaces are already provided by TypeScript
  
  interface IndexedImpl {
    indexedDB: IDBFactory;
    IDBKeyRange: IDBKeyRange;
    DOMException: DOMException;
  }

  export = IndexedImpl;
}

declare module "sdk/l10n" {
  /**
   * This function takes a string parameter which it uses as an identifier to look up and return a localized string in
   * the locale currently set for Firefox. Localized strings are supplied by the add-on developer in .properties
   * files stored in the add-ons "locale" directory
   * See {@link https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/l10n}
   * @param identifier An identifier for the localization of a particular string in the current locale
   * @param count If you're supplying different localizations for a string for singular or plural forms,
   *              this parameter is the number of items there are in this case
   * @param placeholder If you do not include the count parameter, you can supply one or more placeholder strings that
   *                    are to be inserted into the translated string at locations defined by the translator
   */
  export function get(identifier: string, count?: number, ...placeholder: string[]): string;
}

export module "sdk/page-mod" {

}

export module "sdk/self" {
  // TODO: data.url() returns a string
}