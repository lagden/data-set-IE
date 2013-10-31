/**
 * dataSetIE.js
 * Version 0.2.1
 * Thiago Lagden | @thiagolagden | lagden@gmail.com
 * It is a plugin that allows access, both in reading and writing mode, to all the custom data attributes on IE lower than 11
 * 
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.dataset
 */

;(function(window) {

    function DataSetIE(doc, nav, isDebug) {
        this.doc = doc;
        this.nav = nav;
        this.isDebug = isDebug || false;

        var ver = this.IEVersion();
        if (ver > -1 && ver <= 10.0) {
            var all = this.doc.getElementsByTagName("*");
            for (var i = all.length - 1; i >= 0; i--) {
                all[i].dataset = {};
                if (!! all[i].attributes) {
                    for (var m = all[i].attributes.length - 1; m >= 0; m--) {
                        var currentName = String(all[i].attributes[m].name);
                        if (currentName.indexOf("data-") > -1) {
                            var s = dataCamelCase(currentName);
                            if (s !== "") {
                                all[i].dataset[s] = all[i].attributes[m].nodeValue;
                                if (this.isDebug) {
                                    console.log(currentName);
                                    console.log(s);
                                    console.log(all[i].dataset[s]);
                                }
                            }
                        }
                    }
                }
            }
            return this.doc;
        }
        return null;
    }

    // Return IE version
    DataSetIE.prototype.IEVersion = function() {
        var rv = -1;
        if (this.nav.appName == 'Microsoft Internet Explorer')
            if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(this.nav.userAgent) !== null)
                rv = parseFloat(RegExp.$1);
        return rv;
    };

    // Return a data attribute in camelcase
    function dataCamelCase(name) {
        var r = "";
        var s = name.split("-");
        var i = 0;
        var len = s.length;
        for (i; i < len; i++) {
            if(i > 0) {
                if(i > 1)
                    r += ucfirst(s[i]);
                else
                    r += s[i];
            }
        }
        return r;
    }

    // Return a string with first letter in uppercase
    function ucfirst(str) {
        str += "";
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }

    // AMD Support
    var define = define || null;
    if (typeof define === 'function' && define.amd)
        define(function() { return DataSetIE; });
    else
        window.DataSetIE = DataSetIE;

}(window));