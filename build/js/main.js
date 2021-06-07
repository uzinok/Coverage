"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Coverage = function Coverage(data, name) {
  _classCallCheck(this, Coverage);

  _defineProperty(this, "getMedia", function (count) {
    var pos = 0;
    var text = this.content[count].text;
    var ranges = this.content[count].ranges;

    while (pos < this.content[count].text.length) {
      if (text.indexOf('@media', pos) == -1) break;
      var rangeUp = {};
      var rangeDown = {};
      pos = rangeUp.start = text.indexOf('@media', pos);
      pos = rangeUp.end = text.indexOf('{', pos) + 1;
      ranges.push(rangeUp);
      var regexp = /[}|\f\n\r\t\v​\u00A0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​\u2028\u2029​\u202f\u205f​\u3000|]}/g;
      regexp.lastIndex = pos;
      var posIndex = regexp.exec(text);
      pos = rangeDown.start = posIndex.index;
      pos = rangeDown.end = text.indexOf('}', pos) + 1;
      ranges.push(rangeDown);
    }

    pos = 0;

    while (pos < this.content[count].text.length) {
      if (text.indexOf('@font-face', pos) == -1) break;
      pos = ranges.start = text.indexOf('@font-face', pos);
      pos = ranges.end = text.indexOf('}', pos) + 1;
      ranges.push(ranges);
    }

    sortRanges(ranges);

    function sortRanges(arr) {
      arr.sort(function (a, b) {
        return a.start > b.start ? 1 : -1;
      });
    }
  });

  _defineProperty(this, "getCss", function () {
    for (var i = 0, len = this.content.length; i < len; i++) {
      var row = this.content[i];
      var ext = row.url.split('.').pop();

      if (ext !== 'css') {
        continue;
      }

      this.getMedia(i);
      this.showUseCSS(row);
    }
  });

  _defineProperty(this, "showUseCSS", function (row) {
    var textarea = document.createElement('textarea');
    var p = document.createElement('p');
    p.innerHTML = row.url;

    for (var i = 0, len = row.ranges.length; i < len; i++) {
      var offset = row.ranges[i];
      textarea.innerHTML += row.text.substr(offset.start, offset.end - offset.start) + "\n";
    } // найти пустые медиа и удалить
    // подхватить используемые правила @keyframes


    document.body.append(p);
    document.body.append(textarea);
  });

  this.content = data;
  this.name = name;
  this.getCss();
};

var res = new Coverage(data, false);

function fib(x) {
  if (x == 0) {
    return 0;
  }

  if (x == 1) {
    return 1;
  }

  return fib(x - 2) + fib(x - 1);
}

console.log(fib(10));