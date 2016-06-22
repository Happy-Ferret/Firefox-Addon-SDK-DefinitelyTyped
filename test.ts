/// <reference path="Firefox-AddonSDK.d.ts" />

import * as base64 from "sdk/base64";
base64.decode("jesus", "abc");
base64.decode(base64.encode("easy"));

import * as panel from "sdk/panel";
let p = panel.Panel({width: 10, height: 20, onError: (e) => e.message});
p.port.on("damn", () => console.log("damn"));
p.on("show", () => console.log("panel shown"));
p.destroy();

import * as passwords from "sdk/passwords";
passwords.search({onComplete: (credentials) => credentials.forEach((cred) => passwords.remove(cred)),
                  username: "mhamdy"});
passwords.store({username: "mhamdy", password: "secret", onError: (error) => console.error(error.toString())});

import * as pageMod from "sdk/page-mod";
import * as privateBrowsing from "sdk/private-browsing";
pageMod.PageMod({include: "http://example.com", onAttach: (worker) => privateBrowsing.isPrivate(worker)});

import * as requests from "sdk/request";
requests.Request({url: "http://example.com", onComplete: (response) => console.log(response.json["value"])}).get();

import * as selection from "sdk/selection";
selection.on("select", () => {
  console.log(selection.text);
  selection.html = "<h1>Hello There!</h1>";
  if (selection.isContiguous) {
    console.log("selection is not not contiguous");
  }
});

import * as self from "sdk/self";
p.contentScriptFile = self.data.url("./hello.js");
p.show();

import * as prefs from "sdk/simple-prefs";
prefs.prefs["pref1"] = "value";
prefs.on("pref1", () => console.log("pref1 changed"));
prefs.removeListener("pref1", new Function());

import * as storage from "sdk/simple-storage";
storage.storage.value = 10;
storage.storage.x = "hello";
delete storage.storage.value;
storage.on("OverQuota", () => {
  if (storage.quotaUsage > 1) {
    console.log("you no longer have shelves to store anything. Successful!");
  }
});

import * as system from "sdk/system";
console.log(system.env.PATH);
system.env.PATH = "/path/to/my/virus";
