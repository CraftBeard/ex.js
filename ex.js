// ==UserScript==
// @name         Ex.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

const a_prices = document.querySelectorAll(".a-price");
let currency_rate = 7.22;
var origin_text;
var origin_symbol;
var origin_fraction;
var origin_whole;
var origin_dollars;
var dollars;
var new_text;
for (var i = 0; i < a_prices.length; i++) {
    origin_text = a_prices[i].querySelector(".a-offscreen").innerText;
    console.log(origin_text);

    origin_symbol = a_prices[i].querySelector(".a-price-symbol");
    console.log(origin_symbol);

    origin_fraction = a_prices[i].querySelector(".a-price-fraction");
    console.log(origin_symbol);

    origin_whole = a_prices[i].querySelector(".a-price-whole");
    console.log(origin_whole);

    if( origin_symbol ){
        origin_dollars = parseFloat(origin_text.split("$")[1]);
        console.log(origin_dollars);

        dollars = origin_dollars * currency_rate;
        console.log(dollars);

        new_text = origin_text.concat("≈￥",dollars.toFixed(2));
        console.log(new_text);

        origin_symbol.innerText = "";
        origin_fraction.innerText = "";
        origin_whole.innerText = new_text;
    };    
};
