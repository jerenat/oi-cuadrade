'use strict';

/* VARIABLES Y CONSTANTES GLOBALES */
const $d = document;
const $w = window;


/*
    FUNCIÓN PRINCIPAL

    $(element).Subfunción


*/

function FuncOI(a) {

    /* VARIABLES LOCALES */
    let index = (
        typeof a == 'string'
    ) ? $d.querySelector(a) : (
        typeof a == 'object'
    ) ? (
        a.constructor == Window
    ) ? $w : (
        a.constructor == HTMLDocument
    ) ? $d : (
        a.constructor == HTMLBodyElement
    ) ? $d.body : a : $d.body;




    /* FUNCIONES LOCALES */


    // document.querySelector(elemento);
    // var n = $("XXX").q("XXX");

    this.q = (n) => {
        return index.querySelector(n);
    };


    // document.querySelectorAll(elemento)
    // var n = $("XXX").qs("XXX");

    this.qs = (n) => {

        return index.querySelectorAll(n);
    };




    /*
    * addEventListener y removeEventListener
    * b: evento 
    * c: función
    * d: booleano (true o false)
    */

    // element.addEventListener(event, function, bool);
    // $(element).on(event, function(){ }, bool || null);

    this.on = (b, c, d) => {

        let db = (typeof d !== 'undefined') ? (d.constructor == Boolean) ? d : true : true;

        return index.addEventListener(b, c, db);

    };



    // element.removeEventListener(event, function, bool);
    // $(element).off(event, function(){ }, bool || null);

    this.off = (b, c, d) => {

        let db = (typeof d !== 'undefined') ? (d.constructor == Boolean) ? d : true : true;

        return index.removeEventListener(b, c, db);
    };



    // Convertir FormData() a JSON

    /*
        let xxx = new FormData();

        $(FormData()).formJSON();
    */
    this.formJSON = () => {

        var object = {};

        index.forEach((value, key) => {
            if (!Reflect.has(object, key)) {
                object[key] = value;
                return;
            }
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        });
        var json = JSON.stringify(object);

        return json;
    };



    // element.innerHTML = "XXX";
    // $(element).html("XXX");
    this.html = h => {
        return index.innerHTML += h;
    };


    // div.textContent = "XXX";
    // $(div).txt("XXX");
    this.txt = t => {
        return index.textContent = t;
    };



    // window.onload = function(){ ... };
    // $().init(function(){ ... });

    this.init = fn => {
        if ($d.readyState != 'loading') {
            fn();
        } else {
            $().on("DOMContentLoaded", fn());
        }
    };


    // element.contains(children);
    // $(element).have(children);

    this.have = children => {
        return index.contains(children);
    };



    // Date.now();
    // $().now();

    this.now = () => {
        return Date.now();
    };


};



// Convierte FuncOI -> $
let $ = (x) => {
    return new FuncOI(x);
};












/*
    FUNCIONES Y CARACTERISTICAS ADICIONALES
*/


// Event Object
function evt(e) {


    // event.stopPropagation
    this.stop = () => {
        return e.stopPropagation();
    };

    // event.preventDefault
    this.prev = () => {
        return e.preventDefault();
    };


    // event.target
    this.target = () => {
        return e.target;
    };

};




// JSON.parse(string)
const parse = p => {
    return JSON.parse(p);
}


// JSON.stringify(json)
const toStr = t => {
    return JSON.stringify(t);
}


// x.length
const count = a => {

    if (a.constructor == Array || a.constructor == String) {

        return a.length;

    } else if (a.constructor == Object) {

        return Object.keys(a).length;

    }

};



// typeof elem == 'aaa';
// type(elem, "aaa");

const type = (d, u) => {

    "@babel/helpers -typeof";

    return (typeof d == u);

};



// Limitar texto
/*
    1. hola a todos me llamo jeremias
    2. hola a to...

    limitWords(string, number);
*/
const limitWords = (value, length) => {

    /*
    * JSFIDDLE: http://jsfiddle.net/Lcc4efz0/1/
    */

    value = value.trim();
    if (value.length <= length) return value;
    var strAry = value.split(' ');
    var retString = strAry[0];
    for (var i = 1; i < strAry.length; i++) {
        if (retString.length >= length || retString.length + strAry[i].length + 1 > length) break;
        retString += " " + strAry[i];
    }
    return retString + ('...' || '');
};




/*
* Generar identificadores aleatorios
*/

/*
* randomNumber(n);
*/
const randomNumber = n => {
    let num = parseInt(n);
    const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$';
    let randonNumber = 0;
    for (let i = 0; i < n; i++) {
        randonNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    };

    return randonNumber;
};




// WINDOW.LOCATION.XXX
class locat {

    constructor() {

        this.type = $w.location;

    }

    // window.location.href
    href = () => {
        return this.type.href;
    };

    // window.location.hostname
    host = () => {
        return this.type.hostname;
    };

    // window.location.pathname
    path = () => {

        return this.type.pathname;

    };

    // window.location.protocol
    stat = () => {
        return this.type.protocol;
    };

    // window.location.port
    port = () => {

        return this.type.port;

    };

    // window.location.assign()
    assign = (a) => {
        return this.type.assign(a);
    };

};

// declaramos la clase como variable

/*
    window.location.href => lo.href();
    window.location.hostname => lo.host();
    window.location.pathname => lo.path();
    window.location.protocol => lo.stat();
    window.location.port => lo.port();
    window.location.assign => lo.assign("https://google.com");
*/

const lo = new locat();






/* Comparar valores (similar a strcmp) */
// strcmp( valor1, valor2 );


const strcmp = (value1, value2) => {

    let const_value2;


    switch (value1.constructor) {

        case Number:            // Número


            const_value2 = (typeof value2 == 'number') ? true : false;

            if (const_value2 == true) {

                return (value1 == value2) ? true : false;

            } else {
                return false;
            }


        case String:            // String

            const_value2 = (typeof value2 == 'string') ? true : false;

            if (const_value2 == true) {


                let setValues = value1.localeCompare(value2)

                if (setValues == 0 || setValues == '0') {
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }


        case Boolean:           // Booleano

            const_value2 = (typeof value2 == 'boolean') ? true : false;

            if (const_value2 == true) {
                return (value1 == value2) ? true : false;
            } else {
                return false;
            }

    }

};




/*
* timeAgo: Parsea el tiempo en formato "timestamp" > 16430670218 >> 16m
*/
// timeAgo(132568495);


const timeAgo = (timeStamp) => {

    /*
    * GitHub: https://github.com/jasadesign-bdg/Javascript-Timestamp-to-TimeAgo
    */


    // Variables
    let previous = new Date(timeStamp);
    let current = new Date();
    let msPerMinute = (60 * 1000);
    let msPerHour = (msPerMinute * 60);
    let msPerDay = (msPerHour * 24);
    let msPerMonth = (msPerDay * 30);
    let msPerYear = (msPerDay * 365);
    let elapsed = (current - previous);

    // Condicional
    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seg';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' min';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hor';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' día';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' mes';
    } else {
        return Math.round(elapsed / msPerYear) + ' año';
    }
};


/*
* Parsear texto;
* Una vez que el texto ha sido introducido, que lo parsee, separandolo de lo que es necesario
*/


const parseText = (input) => {


    let parseLink = (input) => {

        /*
        * parse <a href=""></a>, <iframe></iframe>
        * https://codepen.io/philipeachille/pen/yLBGYrW
        */

        let text = input;
        const linksFound = text.match(/(?:www|https?)[^\s]+/g);
        const aLink = [];

        if (linksFound != null) {

            for (let i = 0; i < linksFound.length; i++) {

                let replace = linksFound[i];

                if (!(linksFound[i].match(/(http(s?)):\/\//))) {
                    replace = 'http://' + linksFound[i]
                }

                let linkText = replace.split('/')[2];

                if (linkText.substring(0, 3) == 'www') {
                    linkText = linkText.replace('www.', '')
                }

                if (linkText.match(/youtu/)) {

                    let youtubeID = replace.split('/').slice(-1)[0];
                    aLink.push('<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')

                } else if (linkText.match(/vimeo/)) {

                    let vimeoID = replace.split('/').slice(-1)[0];
                    aLink.push('<div class="video-wrapper"><iframe src="https://player.vimeo.com/video/' + vimeoID + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')

                } else {

                    aLink.push('<a href="' + replace + '" target="_blank">' + linkText + '</a>');

                }

                text = text.split(linksFound[i]).map(item => {
                    return aLink[i].includes('iframe') ? item.trim() : item
                }).join(aLink[i]);
            };

            return text;

        } else {

            return input;
        }
    };


    /*
    * parse:
    * Bold:         *text here*
    * Italic:       _text here_
    * Underline:    --text here--
    * Strike        ~text here~
    * Monospace:    ```Text here```

    * https://stackoverflow.com/questions/10168285/markdown-to-convert-double-asterisks-to-bold-text-in-javascript
    */
    let parseSymbol = (input) => {

        return input.replace(/(?:\*)(?:(?!\s))((?:(?!\*|\n).)+)(?:\*)/g, '<b>$1</b>')
            .replace(/(?:_)(?:(?!\s))((?:(?!\n|_).)+)(?:_)/g, '<i>$1</i>')
            .replace(/(?:~)(?:(?!\s))((?:(?!\n|~).)+)(?:~)/g, '<s>$1</s>')
            .replace(/(?:--)(?:(?!\s))((?:(?!\n|--).)+)(?:--)/g, '<u>$1</u>')
            .replace(/(?:```)(?:(?!\s))((?:(?!\n|```).)+)(?:```)/g, '<tt>$1</tt>');
    };

    return parseSymbol(parseLink(input));

};







/*

===== AJAX =====

let ajs = new OiAsync();

ajs.ajax({
    type,
    url,
    boolean || false,
    data || false,
    content || false,
    fn || false,
});


===== FETCH PROMISE =====
let ajs = new OiAsync();

ajs.fetch({
    url,
    object {},
    resp,
    fn,
});

*/
class OiAsync {


    constructor() {
    }


    // AJAX
    ajax(o) {

        // Variables
        var request = new XMLHttpRequest();

        var type = o.type,
            url = o.url,
            boolean = (typeof o.bool == 'undefined') ? true : false,
            body = o.body,
            fn = (typeof o.fn !== 'undefined') ? o.fn : null,
            data = (typeof o.data !== 'undefined') ? o.data : null,
            content = (typeof o.content !== 'undefined') ? o.content : null;



        // Ejecución
        request.open(type, url, boolean);

        if (content !== null) {
            request.setRequestHeader('Content-Type', content);
        };

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {

                if (fn !== null) {
                    fn(request.responseText);
                };

            };
        };

        if (data !== null) {
            request.send(data);
        } else {
            request.send();
        }
    };



    // Fetch Promise
    fetch(u) {

        var url = u.url,
            object = u.object,
            resp = u.res,
            fn = u.fn;




        fetch(url, object)
            .then(rs => {

                switch (resp) {
                    case 'json':
                        return rs.json();
                        break;
                    case 'text':
                        return rs.text();
                        break;
                    case 'blob':
                        return rs.blob();
                        break;
                    case 'array':
                        return rs.arrayBuffer();
                        break;
                    case 'clone':
                        return rs.clone();
                        break;
                    case 'err':
                        return rs.error();
                        break;
                    default:
                        return rs.text();
                        break;
                };

            })
            .then(data => {
                if (typeof fn !== 'undefined') {
                    fn(data);
                };
            })
            .catch(err => {
                throw new Error(err)
            })

    };

};














/*
    CREAR ELEMENTOS

    let ejemplo1 = new Elem("div");

    ejemplo1.attr({
        class: string,
        id: string,
        title: string'
    });

    ejemplo1.txt("XXXXXXX X XXXX");

    ejemplo1.appTo();

*/
class Elem {

    // Constructor inicial (contiene las variables globales)
    constructor(a) {

        this.object = a;                                // Objeto principal
        this.newElem = $d.createElement(this.object);   // document.createElement(XX);
    }



    // element.setAttribute(a,b);
    // $(div).attr(Object{});

    attr(o) {

        var map = new Map(Object.entries(o));
        var admitted = new Array(

            // para todo HTML
            "class", "id", "title", "lang", "hidden", "xmlns", "crossorigin", "media",
            // para input
            "type", "name", "multiple", "size", "placeholder", "required", "autocomplete", "size", "value", "min", "max",
            // para div
            "contenteditable", "style",
            // para Textarea
            "cols", "rows", "resize", "readonly", "autofocus", "form",
            // para form
            "type", "method", "enctype", "target", "accept-charset",
            //para a
            "href", "rel",
            //para Imagen
            "src", "alt",
            //para select
            "option",
            // para video
            "autoplay", "controls", "height", "width", "loop", "muted", "preload",
            //para script
            "async", "defer", "referrerpolicy", "nomodule",
        );

        map.forEach((lndex, arr) => {

            for (let i = 0; i < count(admitted); i++) {

                if (arr == admitted[i]) {

                    this.newElem.setAttribute(arr, lndex);

                };

            };

        });

    };


    // element.appendChild(b);
    // $(div).appTo(index);

    appTo(e) {

        let index = (typeof e !== 'undefined') ? e : $d.body;

        index.appendChild(this.newElem);

    };

    // element.removeChild(b);
    // $(div).delTo(index);

    delTo(e) {

        let index = (typeof e !== 'undefined') ? e : $d.body;

        index.removeChild(this.newElem);
    };



    // index.insertBefore(a, index.children[0]);
    // $(div).before(index);

    before(b) {
        b.insertBefore(this.newElem, b.children[0]);
    };



    // element.innerText += 'aaa';
    // $(div).txt("XXX");

    txt(t) {
        this.newElem.innerText += t;
    };


    // element.innerHTML += `<example></example>`;
    // $(div).html("XXX");

    html(h) {

        this.newElem.innerHTML += h;

    };


    // element.classList.add("XXX");
    // $(div).addClass("XXX")

    addClass(c) {
        if (typeof c == 'string') {
            this.newElem.classList.add(c);
        };

    };

    // element.classList.remove("XXX");
    // $(div).rmClass("XXX");

    rmClass(r) {
        if (typeof r == 'string') {
            this.newElem.classList.remove(r);
        };
    };
};