'use strict';

/* Console Log types */
function setLog($object) {

    if (typeof $object.message !== 'undefined') {

        var $message = ($object.message.constructor == String) ? $object.message : $object.message.toString();                  // Texto del mensaje
        var $type = (typeof $object.type !== 'undefined' || $object.type !== false) ? $object.type : 'c_error';                 // Tipo de mensaje


        switch ($type) {

            case 'warning':                 // Console Log Warning

                console.warn($message);
                break;

            case 'error':                   // Throw error
                throw new Error($message);

            case 'c_error':                 // Console Log Error
                console.error($message)
                break;

            case 'text':                    // Console Log Text
                console.log($message)
                break;

            default:                        // Console Log Error (default)
                console.error($message)
                break;

        };



    } else {
        throw new Error("Elije un mensaje")
    }
};




/*

const $alert = new AlertBox({
    dialog: $title,     // Texto
    time: $time,        // Segundos (s)
    body: $d.body,      // Cuerpo donde se agregará
    type: 'error',      // Estilo de alert-box
});

$alert.init();

*/

class AlertBox {

    // Constructor principal
    constructor(o) {
        if (typeof $ !== 'undefined') {

            this.text = o.dialog;               // Texto de dialogo
            this.time = o.time;                 // Tiempo de eliminado
            this.element = o.body;              // Elemento donde se agregará
            this.type = o.type;                 // Tipo de dialogo

        } else {

            setLog({
                message: "Necesitas el complemento \"OI Cuadrade\" ",
                type: 'error'
            });
        }
    };


    // Tipo de ventana
    _setType(a) {

        var $a = (typeof this.type !== 'undefined') ? this.type : 'default';

        if ($a.constructor == String) {

            switch ($a) {

                // Advertencia
                case 'warning':
                    a.classList.add('warning')
                    break;

                // All ok
                case 'ok':
                    a.classList.add('ok')
                    break;

                // Error
                case 'error':
                    a.classList.add('error')
                    break;

                // Visible
                case 'visible':
                    a.classList.add('visible')
                    break;

                // Default
                case 'default':
                    a.classList.add('default')
                    break;

                default:
                    a.classList.add('default')
                    break;

            };


        } else {

            setLog({
                message: "Necesita ser formato String!",
                type: 'error'
            });
        }

    }

    // Establecer estilos de carga
    setTimeCss(m, t) {

        var $clock = Math.floor(Math.floor(this.time * 1000) - 500);

        if (t == 'load') {

            m.classList.add('load-js')

            window.setTimeout(() => {
                m.classList.remove('load-js');      // Quitar animacion de carga
                m.classList.add('exit-js');         // Iniciar animacion de descarga
            }, $clock)
        };


    };



    // Dialogo
    _Text(t) {

        var $text = (typeof this.text !== 'undefined') ? this.text : 'Hello world! The title does not exists.';

        let spanText = $().create("span");
        $(t).app(spanText)
        $(spanText).html($text);

    };

    // tiempo
    _Time(s, r, q) {

        var $time = (typeof this.time !== 'undefined') ? this.time : 5;
        var _$time = Math.floor($time * 1000);
        var i = 0;

        if (this.time !== undefined) {

            /* CREAR ELEMENTOS */

            //.time-var
            let timeBar = $().create("div", {
                class: 'time-var'
            })
            $(s).app(timeBar)

            //.time-var > .progressBar
            let progressBar = $().create("div", {
                class: 'progressBar'
            });

            $(timeBar).app(progressBar);


            if (i == 0) {
                i = 1;
                var elem = progressBar;
                var width = 0;
                var id = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(id);
                        i = 0;
                    } else {
                        width++;
                        elem.style.width = width + "%";
                    }

                }, 10);
            };
        };


        window.setTimeout(() => {
            this.setTimeCss(q, 'close');
            $(r).del(q)
        }, _$time)


    };


    // Cuerpo principal
    main() {

        var $e = (typeof this.element !== 'undefined') ? this.element : $d.body;


        // .div-alert
        let divAlert = $().create("div", {
            class: 'div-alert'
        })

        $($e).app(divAlert);
        this.setTimeCss(divAlert, 'load');

        // .div-alert > .a-sub-alert
        let divSubAlert = $().create("div", {
            class: 'a-sub-alert'
        })
        $(divAlert).app(divSubAlert);
        this._setType(divSubAlert);

        // .div-alert > .a-sub-alert > span
        this._Text(divSubAlert);

        // .div-alert > .a-sub-alert > .time-var
        this._Time(divSubAlert, $e, divAlert);

    };


    // Inicializador
    init() {
        this.main();
    };


};


function OIAlert(b) {
    return new AlertBox(b);
};


/*
const newModal = new myModal({
    title,
    function,
    style:{
        width: px, %, em, rem, vw,
        height: px, %,
        fade: down, pong, zig-zag, fade,
        time: XXX,
        move : true | false
    }
    onClose: fn(){
        dialog,
        time
    } || Url[href]
});

newModal.click($(element).id)

newModal.load()
*/
class myModal {


    // Constructor principal
    constructor(object) {

        if (typeof $ !== 'undefined') {

            if (object !== undefined) {

                // Variable general
                this.title = object.title;                                                                  // Título
                this.function = object.fn;                                                                  // Función
                this.logs = (object.logs !== undefined) ? object.logs : false;                             // Dialogos (desactivar -> false)
                this.version = 1;                                                                           // Versión

                // Variables de estilos
                if (object.hasOwnProperty('style')) {

                    this.width = object.style.width;                                                        // Ancho de ventana
                    this.height = object.style.height;                                                      // Alto de ventana
                    this.fade = object.style.fade;                                                          // Efecto de desvanecimiento
                    this.move = object.style.move;                                                          // Mover ventana
                    this.time = object.style.time;                                                          // time
                    this.theme = object.style.theme;                                                        // Tema de fondo

                };

                // Variable de cerrado (onCLose)
                this.close = object.onClose;

            } else {

                setLog({
                    message: "Error! debes definir un valor",
                    type: 'error'
                });
            }
        } else {

            setLog({
                message: "Error, necesitas el complemento \"OI Cuadrade\"",
                type: 'error'
            });

        }

    };

    // Detectar modelo de navegador
    _detect() {

        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');

    };

    // Detectar si pertenece a Internet Explorer
    _user() {

        var ua = navigator.userAgent;

        if (ua.indexOf("MSIE 5") < 0) return false;
        else return true;

    };



    // Define si el objeto no es indefinido
    _isDef(u) {

        "@babel/helpers - typeof";

        return typeof (u) !== 'undefined';
    };


    // onClose Function
    _onClose() {

        if (this._isDef(this.close)) {

            let _$link = this.close;
            const regex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;

            if (_$link.constructor == String && regex.test(_$link)) {

                href(_$link);

            } else if (_$link.constructor == Object) {

                var $title = (this._isDef(_$link.dialog)) ? _$link.dialog : 'No title';         // Título
                var $time = (this._isDef(_$link.time)) ? _$link.time : 5;                       // Tiempo
                var $message = (this._isDef(_$link.message)) ? _$link.message : 'default';      // Color de cuadro


                const $alert = new OIAlert({
                    dialog: $title,         // Texto
                    time: $time,            // Segundos (s)
                    body: $d.body,          // Cuerpo donde se agregará
                    type: $message,         // Estilo de alert-box,
                });

                $alert.init();

            } else {
                setLog({
                    message: 'Debe ser enlace o funcion!',
                    type: 'error'
                });

            }

        };
    };


    // Título
    _title(element) {

        const string = this.title;

        let s_string = (string.constructor == String || string.constructor == Object) ? string : string.toString();

        try {
            $(element).html(s_string);
        } catch (err) {
            setLog({
                message: err.message,
                type: 'error'
            });
        }

    };


    // Cabecera
    _header(g, h) {

        // #myModal > .modal-content > .modal-head
        let modalHead = $().create("div", {
            class: 'modal-head'
        })
        $(h).app(modalHead);


        if (this._isDef(this.title)) {


            // #myModal > .modal-content > .modal-head > .modal-title
            let modalTitle = $().create("div", {
                class: 'modal-title'
            })
            $(modalHead).app(modalTitle);

            // #myModal > .modal-content > .modal-head > .modal-title > title
            let title = $().create("span");
            $(modalTitle).app(title)
            this._title(title)



            /* ##### CLOSE BUTTON ##### */

            // #myModal > .modal-content > .modal-head > .modal-close
            let modalClose = $().create("div", {
                class: 'modal-close'
            })
            $(modalHead).app(modalClose);

            // #myModal > .modal-content > .modal-close > button
            let _close = $().create("button");
            //$(_close).text('x');
            $(modalClose).app(_close);


            // EVENTO
            $(_close).on("click", (event) => {

                if (event.target == _close)
                    if ($d.body.contains(g))
                        $($d.body).del(g)

                // Si contiene "onClose"
                if (this._isDef(this.close)) {
                    //console.log("Contiene onClose!")
                    this._onClose();
                }
            })

        } else {
            modalHead.classList.add("nocolor")


            /* ##### CLOSE BUTTON ##### */

            // #myModal > .modal-content > .modal-head > .modal-close
            let modalClose = $().create("div", {
                class: 'modal-close absolut3'
            })
            $(modalHead).app(modalClose);

            // #myModal > .modal-content > .modal-close > button
            let _close = $().create("button");
            //$(_close).text('x');
            $(modalClose).app(_close);


            // EVENTO
            $(_close).on("click", (event) => {

                if (event.target == _close)
                    if ($d.body.contains(g))
                        $($d.body).del(g)

                // Si contiene "onClose"
                if (this._isDef(this.close)) {
                    //console.log("Contiene onClose!")
                    this._onClose();
                }
            })
        }


        if (this._isDef(this.move))
            if (this.move.constructor == Boolean)
                if (this.move) {

                    var mousePosition;
                    var offset = [0, 0];
                    var isDown = false;

                    modalHead.style.cursor = 'grab';


                    // evento
                    $(modalHead).on("mousedown", e => {

                        isDown = true;
                        offset = [
                            h.offsetLeft - e.clientX,
                            h.offsetTop - e.clientY
                        ];

                    })

                    $(modalHead).on("mouseup", () => {
                        isDown = false;
                    })

                    $(modalHead).on("mousemove", event => {

                        prevent(event);

                        if (isDown) {
                            mousePosition = {
                                x: event.clientX,
                                y: event.clientY
                            };

                            h.style.left = `${mousePosition.x + offset[0]}px`;
                            h.style.top = `${mousePosition.y + offset[1]}px`;

                        };

                    })

                }

    };


    // Funciones
    _functions(element) {

        const fns = this.function;

        if (typeof (fns) == 'function') {

            fns(element);

        } else if (typeof (fns) == 'string') {

            let stringBody = $().create("div", {
                class: 'string-body'
            });

            $(element).app(stringBody)

            let stext = $().create("span")
            $(stringBody).app(stext)
            $(stext).text(fns);
        } else {

            setLog({
                message: " Necesitar definir algun parámetro. (La variable 'fn' no puede quedar vacia).",
                type: 'error'
            });

        }


    };


    // Width Content
    _width(e) {

        let $w = (this._isDef(this.width)) ? this.width : '50%';

        let $width = $w;
        let $_width = ($width.constructor == String) ? $width : $width.toString();
        let $arrWidth = new Array("px", "%", "em", "rem", "vw");

        for (let i = 0; i < count($arrWidth); i++) {

            if ($_width.indexOf($arrWidth[i]) > -1) {
                e.style.width = $_width
            } else {
                e.style.width = `${$_width}px`;
            }
        };

    };

    // Height Body
    _height(e, f) {

        let $h = (this._isDef(this.height)) ? this.height : 'auto';

        let $height = $h;
        let $_height = ($height.constructor == String) ? $height : $height.toString();
        let $arrHeight = new Array("px", "%");

        if ($_height.indexOf($arrHeight[0]) > -1 || $_height.indexOf($arrHeight[1]) > -1) {

            e.style.height = $_height

        } else {

            e.style.height = `${$_height}px`;

        }
        // Estilo obtenido

        // e -> height
        let $e = e.style.height;

        // f -> height
        let $fHeight = f.getBoundingClientRect().height;


        // XX%
        if ($e.indexOf("%") > -1) {

            let $eHeight = parseInt((window.innerHeight * parseInt($e.replace("%", '')) / 100));

            e.style.height = $eHeight + 'px';

            if ($eHeight < $fHeight)
                e.style.overflowY = 'scroll';

        };

        // XXpx
        if ($e.indexOf("px") > -1) {

            let $eHeight = parseInt($e.replace("px", ''));

            if ($eHeight < $fHeight)
                e.style.overflowY = 'scroll';
        };

    };


    // CSS 3.0 FadeIn
    _fade(e) {

        if (this._isDef(this.fade))
            switch (this.fade) {

                case 'down':
                    e.style.animationName = `init-window-modal`;
                    e.style.animationDuration = `.2s`;
                    break;

                case 'fade':
                    e.style.animationName = `fade-window-modal`;
                    e.style.animationDuration = `.2s`;
                    break;

                case 'zig-zag':
                    e.style.animationName = `zigzag-window-modal`;
                    e.style.animationDuration = `.5s`;
                    break;

                case 'pong':
                    e.style.animationName = `pong-window-modal`;
                    e.style.animationDuration = `.5s`;
                    break;

                default:
                    e.style.animationName = `init-window-modal`;
                    e.style.animationDuration = `.2s`;
                    break;
            }

    };

    // CSS3.0 Theme
    _theme(e) {

        let $t = this.theme;

        if (this._isDef($t)) {

            switch ($t) {

                case "light":
                    e.classList.add("light");
                    break;

                case "dark":
                    e.classList.add("dark");
                    break;

                default:
                    //
                    break;
            }
        }
    }

    // Precarga
    _subload(a) {

        // cuerpo de precarga
        let divPreload = $().create("div", {
            class: 'preloader'
        })
        $(a).app(divPreload);

        window.setTimeout(() => {
            $(a).del(divPreload);

            // Subcuerpo
            let modalInnerElement = $().create("div", {
                class: 'modal-inner'
            })
            $(a).app(modalInnerElement);

            this._functions(modalInnerElement)

            this._height(a, modalInnerElement);        // Ancho de cuerpo

        }, 2000); // 2s



    };


    // Cuerpo Principal
    main() {

        // CONSTRUCCIÓN DEL ELEMENTO

        // FONDO

        // #myModal
        let myModal = $().create("div", {
            id: "myModal",
            class: 'modal'
        })

        $($d.body).app(myModal)

        // Si contiene tiempo
        if (this._isDef(this.time)) {

            let $_ = this.time;
            let $time = (this.time.constructor == Number) ? $_ : parseInt($_.replace(/^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{6,}$/g, ''));
            let $_time = parseFloat($time * 1000);

            window.setTimeout(() => {

                if ($d.body.contains(myModal))

                    $($d.body).del(myModal)

            }, $_time);
        };

        // CONTENIDO

        // #myModal > .modal-content
        let modalContent = $().create("div", {
            class: 'modal-content'
        })

        $(myModal).app(modalContent);

        this._fade(modalContent);       // Desvanecimiento
        this._theme(modalContent);      // Tema
        this._width(modalContent);      // Ancho


        // ##### CABECERA #####
        this._header(myModal, modalContent);



        // ##### CUERPO ######


        // #myModal > .modal-content > .modal-body
        let modalBody = $().create("div", {
            class: 'modal-body'
        })
        $(modalContent).app(modalBody);


        // #myModal > .modal-content > .modal-body > .modal-inner
        this._subload(modalBody);


        // Elementos generales

        // EVENTOS


        // Window
        if (typeof this.move === 'undefined' || !this.move) {
            $(window).on("click", (event) => {
                if (event.target == myModal) {
                    $($d.body).del(myModal)
                };
            })
        };



        $($d).on("keydown", (evt) => {

            evt = evt || window.event;
            var isEscape = false;


            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }


            if (isEscape) {
                if ($d.body.contains(myModal))
                    $($d.body).del(myModal)
            }

        })
    };


    _preload() {
        if (this._user) {


            this.main();

            if (this.logs) {

                setLog({
                    message: `Version de complemento -> ${this.version}`,
                    type: 'text'
                });

                setLog({
                    message: `Version de navegador -> ${this._detect()}`,
                    type: 'text'
                });
            };

        }
        else {

            setLog({
                message: "Se necesita un navegador mas moderno!!!",
                type: 'error'
            });

        }

    };


    // ##### EVENTOS #####

    // onClick

    click(element) {

        if (element) {
            $(element).on("click", () => {
                this._preload()
            })
        }

    };

    // onLoad
    load() {
        $(window).on('load', () => {
            this._preload()
        })
    };

};


// Nueva variable
var OIModal = a => {

    return new myModal(a);

};