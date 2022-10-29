// ==UserScript==
// @name         Ex.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Convert US$ to RMB￥
// @author       New-Beard
// @match        https://www.amazon.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

'use strict';

//var pager = $(".s-pagination-button");
//console.log(pager.length);
//console.log(pager[0]);
//console.log(pager);

//pager.click(cal_currency);

(function cal_currency()
{
    GM.xmlHttpRequest({
        method: "GET",
        url: "https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=CNY",
        headers: {
            "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
            "Accept": "text/xml"            // If not specified, browser defaults will be used.
        },
        onload: function(response) {
            var responseXML = null;
            // Inject responseXML into existing Object (only appropriate for XML content).
            if (!response.responseXML) {
                responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
            }

            var a_prices = document.querySelectorAll(".a-price");
            var origin_text;
            var origin_symbol;
            var origin_fraction;
            var origin_whole;
            var origin_dollars;
            var dollars;
            var new_text;
            var currency_rate = -1;

            currency_rate = parseFloat(response.responseText.match('<p class="result__BigRate-sc-1bsijpp-1 iGrAod">(.*)<span class="faded-digits">')[1]);
            console.log('currency_rate: '+currency_rate);

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

                    //new_text = origin_text.concat("*",currency_rate.toFixed(2),"≈￥",dollars.toFixed(2));
                    new_text = origin_text.concat("≈￥",dollars.toFixed(2));
                    console.log(new_text);

                    origin_symbol.innerText = "";
                    origin_fraction.innerText = "";
                    origin_whole.innerText = new_text;
                };

                console.log("...");
            };
        }

    });
}) ();
