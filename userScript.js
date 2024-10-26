// ==UserScript==
// @name         Quick info
// @namespace    http://tampermonkey.net/
// @version      2024-10-25
// @description  simple add-on for quick buffs info! Made by @swbuwk
// @author       You
// @match        http://*/*
// @include http://orteil.dashnet.org/cookieclicker/
// @include http://orteil.dashnet.org/cookieclicker/beta/
// @include https://orteil.dashnet.org/cookieclicker/
// @include https://orteil.dashnet.org/cookieclicker/beta/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const readyCheck = setInterval(() => {
  if (typeof Game !== 'undefined' && typeof Game.ready !== 'undefined' && Game.ready) {
    Game.LoadMod("https://swbuwk.github.io/CC_QuickInfoMod/dist/QuickInfo.js");
    clearInterval(readyCheck);
  }
}, 1000);