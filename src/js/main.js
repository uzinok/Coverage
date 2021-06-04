class Coverage {
    constructor(data, name) {
        this.content = data;
        this.name = name;

        this.getCss();
    }

    getMedia = function (count) {
        // добавить медиа выражения в row.ranges
        // где они заканчиваются
        // отсортировать row.ranges

        let pos = 0;
        let text = this.content[count].text;

        while (pos < this.content[count].text.length) {
            if (text.indexOf('@media', pos) == -1) break;

            let rangeUp = {};
            let rangeDown = {};

            pos = rangeUp.start = text.indexOf('@media', pos);
            pos = rangeUp.end = text.indexOf('{', pos) + 1;

            this.content[count].ranges.push(rangeUp);

            let regexp = /}|s+\n|}/g;
            regexp.lastIndex = pos;

            let posIndex = regexp.exec(text);

            pos = rangeDown.start = posIndex.index;
            pos = rangeDown.end = text.indexOf('}', pos) + 1;
            this.content[count].ranges.push(rangeDown);

        }

        console.log(this.content[count].ranges)

    };



    getCss = function () {
        for (var i = 0, len = this.content.length; i < len; i++) {

            var row = this.content[i];
            var ext = row.url.split('.').pop();

            if (ext !== 'css') {
                continue;
            }

            this.getMedia(i);
            this.showUseCSS(row);

        }
    }

    showUseCSS = function (row) {
        let textarea = document.createElement('textarea');
        let p = document.createElement('p');
        p.innerHTML = row.url;

        for (var i = 0, len = row.ranges.length; i < len; i++) {
            var offset = row.ranges[i];

            textarea.innerHTML += row.text.substr(offset.start, offset.end - offset.start) + "\n";

        }

        // найти пустые медиа и удалить
        document.body.append(p)
        document.body.append(textarea);
    }
}

let res = new Coverage(data, false)
