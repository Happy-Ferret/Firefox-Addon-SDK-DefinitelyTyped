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

declare module "sdk/notifications" {
  /**
   * Display transient, toaster-style desktop messages to the user
   * @param options
   * @param options.title A string to display as the message's title
   * @param options.text A string to display as the body of the message
   * @param options.iconURL The URL of an icon to display inside the message. It may be a remote URL, a data URI,
   *                        or a URL returned by the {@link sdk/self} module
   * @param options.onClick A function to be called when the user clicks the message. It will be passed the value of data
   * @param options.data A string that will be passed to onClick
   */
  export function notify(options: {title?: string, text?: string, iconURL?: string, onClick?: (data: string) => void,
                                   data?: string}): void;
}

interface Port {
  emit: (signal: string, data?: any) => void;
  on: (signal: string, handler: (data?: any) => void) => void;
}

interface Tab {
  title: string;
}

interface ContentWorker {
  new(options: {window: Window, contentScript?: string | string[], contentScriptFile?: string | string[],
                onMessage: (data?: any) => void, onError: (data?: any) => void}): ContentWorker;
  url: URL;
  port: Port,
  tab: Tab;
  on: (signal: "detach" | "message" | "error", handler: () => void) => void;
  postMessage: (data?: any) => void;
  destroy: () => void;
}

export module "sdk/page-mod" {
  /**
   * Run scripts in the context of web pages whose URL matches a given pattern
   * @param options.include
   * @param options.contentStyle Lists stylesheets to attach, supplied as strings
   * @param options.contentStyleFile Lists stylesheets to attach, supplied in separate files
   * @param options.contentScriptOptions Defines read-only values accessible to content scripts
   * @param options.attachTo Controls whether to attach scripts to tabs that were already open when the page-mod
   *                         was created, and whether to attach scripts to iframes as well as the topmost document
   * @param options.contentScriptWhen Controls the point during document load at which content scripts are attached
   * @param options.exclude Has the same syntax as include, but specifies the URLs to which content scripts should not
   *                        be attached, even if they match include: so it's a way of excluding a subset of the URLs
   *                        that include specifies. The exclude option is new in Firefox 32
   * @param options.onAttach This event is emitted when the page-mod's content scripts are attached to a document
   *                         whose URL matches the page-mod's include pattern
   * @param options.onError This event is emitted when an uncaught runtime error occurs in one of the page-mod's content scripts
   */
  export function PageMod(options: {include: string | string[] | RegExp | RegExp[], contentScript?: string | string[],
    contentScriptFile?: string | string[], contentStyle?: string | string[], contentStyleFile?: string | string[],
    contentScriptOptions?: any, attachTo?: attachmentMode | attachmentMode[], contentScriptWhen?: "start" | "ready" | "end",
    exclude?: string | string[], onAttach?: (worker: ContentWorker) => void, onError?: (error: Error) => void}): PageMod;

  type attachmentMode = "existing" | "top" | "frame"

  interface PageMod {
    destroy: () => void;
    include: string | string[] | RegExp | RegExp[];
  }

}

declare module "sdk/page-worker" {

  /**
   * Create a permanent, invisible page and access its DOM
   * @param options.contentURL The URL of the content to load in the worker
   * @param options.contentScript A string or an array of strings containing the texts of content scripts to load.
   *                              Content scripts specified by this option are loaded after those specified by the
   *                              contentScriptFile option.
   * @param options.contentScriptFile A local file URL or an array of local file URLs of content scripts to load
   *                                  Content scripts specified by this option are loaded before those specified
   *                                  by the contentScript option
   * @param options.include This is useful when your page worker loads a page which will redirect to other pages.
   *                        These define the documents to which the page-worker's content worker applies
   * @param options.contentScriptWhen When to load the content scripts
   *                                  "start": load content scripts immediately after the document element for the page
   *                                    is inserted into the DOM, but before the DOM content itself has been loaded
   *                                  "ready": load content scripts once DOM content has been loaded, corresponding
   *                                    to the DOMContentLoaded event
   *                                  "end": load content scripts once all the content (DOM, JS, CSS, images) for the
   *                                    page has been loaded, at the time the window.onload event fires
   * @param options.contentScriptOptions Read-only value exposed to content scripts under self.options property
   */
  export function Page(options: {contentURL?: string, contentScript?: string | string[],
                       contentScriptFile?: string | string[], contentScriptWhen?: "start" | "ready" | "end",
                       onMessage?: (message: string) => void, allow?: {script: boolean}, contentScriptOptions?: any,
                       include?: string | string[] | RegExp | RegExp[]}): PageWorker;

  interface PageWorker {
    port: Port;
    contentURL?: string;
    destroy: () => void;
    postMessage: (message: string) => void;
    on: (signal: "message" | "error", handler: (arg?: "message" | Error) => void) => void;
    removeListener: (signal: string, listener: Function) => void;
    allow?: {script: boolean};
    include?: string | string[] | RegExp | RegExp[];
    contentScriptFile?: string | string[];
    contentScript?: string | string[];
  }

}



export module "sdk/self" {
  // TODO: data.url() returns a string
}
