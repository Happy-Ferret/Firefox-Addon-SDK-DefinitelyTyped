/// <reference path="Firefox-AddonSDK.d.ts" />

import * as base64 from "sdk/base64";
import * as panel from "sdk/panel";
import * as passwords from "sdk/passwords";
import * as pageMod from "sdk/page-mod"
import * as privateBrowsing from "sdk/private-browsing";
import * as requests from "sdk/request";


base64.decode("jesus", "abc");
base64.decode(base64.encode("easy"));

let p = panel.Panel({width: 10, height: 20, onError: (e) => e.message});
p.port.on("damn", () => console.log("damn"));
p.on("show", () => console.log("panel shown"));
p.destroy();

passwords.search({onComplete: (credentials) => credentials.forEach((cred) => passwords.remove(cred)),
                  username: "mhamdy"});
passwords.store({username: "mhamdy", password: "secret", onError: (error) => console.error(error.toString())});

pageMod.PageMod({include: "http://example.com", onAttach: (worker) => privateBrowsing.isPrivate(worker)});

requests.Request({url: "http://example.com", onComplete: (response) => console.log(response.json["value"])}).get();
