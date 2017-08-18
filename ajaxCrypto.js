/*
  @author: ihaci 
  ajaxCrypto 1.0
*/

(function () {
  "use strict";
  if (typeof window.ajaxCrypto === "undefined") {
    if (typeof window.encodeURIComponent === "undefined" || typeof window.XMLHttpRequest === "undefined" || typeof Object.keys === "undefined") {
      throw "Old browser detected!";
    }

    function setPW() {
      var r = {
        data: [],
        out: ""
      };
      for (var i = 0; i < 20; i++) {
        r.data[i] = Math.floor(Math.random() * (9999 + 1 - 1) + 1);
        r.out += String.fromCharCode(r.data[i]);
      }
      return r;
    }

    function e(data, pw) {
      var r = "",
        bas = 0;
      for (var i = 0; i < data.length; i++) {
        r += String.fromCharCode(data[i].charCodeAt(0) + pw[bas]);
        bas = bas + 1;
        if (!pw[bas]) {
          bas = 0;
        }
      }
      return r;
    }
    window.ajaxCrypto = function (method, url, data, header, success, error) {
      if (method && url) {
        if (method.toLowerCase() === "get" || method.toLowerCase() === "post") {
          var pw = setPW();
          var realData = "";
          var xhr = new XMLHttpRequest();
          if (typeof data === "object" && data) {
            Object.keys(data).forEach(function (key) {
              realData += encodeURIComponent(e(key + "", pw.data)) + "=" + encodeURIComponent(e(data[key + ""] + "", pw.data)) + "&"
            });
            realData += "ajaxCrypto=" + encodeURIComponent(pw.out);
          }
          if (method.toLowerCase() === "get" && data) {
            url += "?" + realData;
          }
          xhr.open(method, url, true);
          if (typeof header === "object" && header) {
            Object.keys(header).forEach(function (key) {
              xhr.setRequestHeader(key, header[key]);
            });
          }
          if (method.toLowerCase() === "post") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          }
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                if (typeof success === "function") {
                  success(xhr);
                }
              } else {
                if (typeof error === "function") {
                  error(xhr);
                }
              }
            }
          }
          xhr.send(realData);
        } else {
          throw "-> Unkown method!";
        }
      } else {
        if (!method) {
          throw "-> Method not set!";
        }
        if (!url) {
          throw "-> Url not set!";
        }
      }
    }
  }
})();