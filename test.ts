/// <reference path="Firefox-AddonSDK.d.ts" />

import * as base64 from "sdk/base64";
import * as panel from "sdk/panel";


base64.decode("jesus", "abc");
base64.decode(base64.encode("easy"));

let p = panel.Panel({width: 10, height: 20, onError: (e) => e.message});
p.port.on("damn", () => console.log("damn"));
p.on("show", () => console.log("panel shown"));
p.destroy();
