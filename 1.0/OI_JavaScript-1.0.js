/* 
OI Cuadrade JavaScript - a Minimal Complement for Navigators
Created By Jeremias Geminiani https://github.com/JereNathan/
License GPL v3.0
*/


window.undefined = window.undefined; 	// window undefined


var $d = window.document,				// window document
	winW = window.innerWidth,			// width default
	winH = window.innerHeight,			// height default
	connexion;							// Variable de Conexion AJAX (Principal).



function OiCuadradeJS(){
	// Simplificacion de AJAX en Vanilla JS
		if(window.XMLHttpRequest){
			connexion = new XMLHttpRequest(); //Gecko, AppleWebKit,Chrome,Firefox
		}else{
			connexion = new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"); // si es IE 5+
		}

		// Envio datos de Apertura AJAX
		this.ajaxopen = function(type, url, bool){
			var tipo = type,
				link = url,
				bolean = bool;

			return connexion.open(tipo, link, bolean);
		}




		// Envio de Variables al servidor
		this.ajaxsend = function(value){
			if(value != ''){
				return connexion.send(value);
			}else{
				return connexion.send();
			}
		}



		// si el status es 200 o 4 o superiores
		this.prot = function(st, rst){
			return connexion.status == st && connexion.readyState == rst;
		}





		// addEventListener
		this.addevent = function(identificator, getelection, func, bool){
			if(identificator.addEventListener){
				return identificator.addEventListener(getelection, func, null || bool);
			}else if($d.addEventListener){
				return $d.addEventListener(getelection, func, null || bool);
			}
		}


		// removeEventListener
		this.remevent = function(identificator, getelection, func, bool){
			if(identificator.removeEventListener){
				return identificator.removeEventListener(getelection, func, null || bool);
			}else if($d.removeEventListener){
				return $d.removeEventListener(getelection, func, null || bool);
			}
		}




		// Detectar navegador Usado
		this.detectNavigator = function(obj){
			var nav,
				n = navigator;

			if(obj == "codename"){nav = n.appCodeName;}
			else if(obj == "name"){nav = n.appName;}
			else if(obj == "ver"){nav = n.appVersion;}
			else if(obj == "cookie"){nav = n.cookieEnabled;}
			else if(obj == "lang"){nav = n.language;}
			else if(obj == "line"){nav = n.onLine;}
			else if(obj == "plataform"){nav = n.platform;}
			else if(obj == "agent"){nav = n.userAgent || n.userAgent.toLowerCase();}

				return nav;
		};


		// Hide element
		this.hide = function(elementID){ return elementID.style.display = "none"; }


		// Show element
		this.show = function(elementID){ return elementID.style.display = ""; }


		// Graphics Context ("2d" or "webgl");
		this.get = function(elementID,gtx){ return elementID.getContext(gtx); }


		// Date.now();
		this.now = function(){ return Date.now(); }


		// fillRect
		this.rect = function(elementID, x, y, size_one, size_two){
			return elementID.fillRect(x, y, size_one, size_two);
		}


		// scrollTop and scrollLeft
		this.scroll = function(elementID, posit){
			var element;
			if(posit == 'top'){
				element = elementID.scrollTop;
			}else if(posit == 'left'){
				element = elementID.scrollLeft;
			}else if(posit == 'width'){
				element = elementID.scrollWidth;
			}else if(posit == 'height'){
				element = elementID.scrollHeight;
			}
			return element;
		}


		// setAttribute("assign","value");
		this.set = function(elementID,assign,value){
			var id = elementID, ass = assign, val = value;
			return id.setAttribute(ass,val);
		};

		// createElement("element");
		this.create = function(value){
			return $d.createElement(value);
		};

		// appendChild("value");
		this.app = function(elementID,value){
			return elementID.appendChild(value);
		};

		// removeChild("value");
		this.del = function(elementID,value){
			return elementID.removeChild(value);
		};

		// createTextNode("Text");
		this.txt = function(text){
			return $d.createTextNode(text);
		};

}
var $ = new OiCuadradeJS();


///////////////////////////////////////////////////////////////////////////////////////////////////
////// ALERT EN JAVASCRIPT ////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

var Alert = function(){
	var winwd = winW, 		// Ancho de Pantalla (Default-Width)
		winht = winH, 		// Ancho de Pantalla (Default-Height)
		ancho = 300, 		//ancho de borde
		borde = 4, 			//borde
		separar = 15, 		//padding
		tope = 100,
		o = this;


		o.winwd = winwd;
		o.winht = winht;
		o.ancho = ancho;
		o.borde = borde;
		o.separar = separar;
		o.tope = tope;


		o.crear = function(title, text, cancel, acept, title_clr, btn_clr, funct, array){
			o.miArray = array;

			// creamos elementos
			var crearNuevoDivTapa = $.create("div"), // DIV de la Tapa
				crearNuevoDivCaja = $.create("div"); // DIV de la Caja


			// Estilos de la tapa
			crearNuevoDivTapa.style.height = winht + "px";
			crearNuevoDivTapa.style.opacity = ".4";
			crearNuevoDivTapa.style.position = "fixed";
			crearNuevoDivTapa.style.top = "0px";
			crearNuevoDivTapa.style.left = "0px";
			crearNuevoDivTapa.style.background = "black";
			crearNuevoDivTapa.style.width = "100%";
			crearNuevoDivTapa.style.zIndex = "9999";
			// fin Estilos de la tapa


			//clases
			$.set(crearNuevoDivTapa,"class","del_oi_alert_class");
			crearNuevoDivCaja.className = "oi_alert_class";
			crearNuevoDivCaja.style.position = "fixed";
			crearNuevoDivCaja.style.background = "white";
			crearNuevoDivCaja.style.textAlign = "center";
			crearNuevoDivCaja.style.padding = separar + "px";
			crearNuevoDivCaja.style.borderRadius = "4px";
			crearNuevoDivCaja.style.width = ancho + "px";
			crearNuevoDivCaja.style.left = ((winwd/2) - (ancho * .5)) - (borde + separar) + "px";
			crearNuevoDivCaja.style.top = tope + "px";
			crearNuevoDivCaja.style.zIndex = "9999";


			//HTML
			crearNuevoDivCaja.innerHTML = "<div><div class='title_alert'>"+ title +"</div></div>";
			crearNuevoDivCaja.innerHTML += '<p>'+ text +'</p>';
			crearNuevoDivCaja.innerHTML += '<span onclick="alert.close();">'+cancel+'</span> <span onclick="alert.aceptar('+ funct +');">'+acept+'</span>';
			//HTML

			$.app($d.body,crearNuevoDivTapa);
			$.app($d.body,crearNuevoDivCaja);


			// TITULO DEL ALERT
			var titleAlert = $d.querySelector(".title_alert");
			titleAlert.style.background = title_clr || "#eee";
			titleAlert.style.color = "#575757";
			titleAlert.style.fontSize = "13px";
			titleAlert.style.padding = "4px";
			titleAlert.style.textAlign = "left";
			titleAlert.style.marginTop = "-15px";
			titleAlert.style.marginLeft = "-15px";
			titleAlert.style.marginRight = "-15px";
			titleAlert.style.borderTopLeftRadius = borde + "px";
			titleAlert.style.borderTopRightRadius = borde + "px";
			titleAlert.style.fontWeight = "bold";
			titleAlert.style.borderBottom = "1px solid #d9d9d9";
			// FIN TITULO DEL ALERT

			// BOTONES DEL ALERT
			var spanClass = $d.querySelectorAll(".oi_alert_class span");
			for (var i = 0; i <= spanClass.length - 1; i++) {
				spanClass[i].style.background = btn_clr;
				spanClass[i].style.padding = "5px 10px";
				spanClass[i].style.color = "white";
				spanClass[i].style.cursor = "pointer";
				spanClass[i].style.border = ".5 solid #666";
				spanClass[i].style.borderRadius = borde + "px";
				spanClass[i].style.fontSize = "13px";
			};
			// BOTONES DEL ALERT


		};


		o.aceptar = function(e){
			$d.querySelector(".del_oi_alert_class").remove();
			$d.querySelector(".oi_alert_class").remove();
			if(e != null || e != undefined){
				Alert.prototype.mostrarArray = e(o.miArray);
			}

		};
		o.close = function(){
			$d.querySelector(".del_oi_alert_class").remove();
			$d.querySelector(".oi_alert_class").remove();
		};
};

var alert = new Alert();


///////////////////////////////////////////////////////////////////////////////////////////////////
////// ONERROR EN JAVASCRIPT //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


function onErrorWindow(){
    var o = this;

    o.new = function(pTexto, ifYesButtonRed, textButtonRed, fRed, ifYesButtonWhite, textButtonWhite, fWhite){

      var headDiv = $.create("div"),
          /* cross */
          crossDiv = $.create("div"),
          spanCross = $.create("span"),
          crossSpan = $.txt("x"),
          /* p */
          p = $.create("p");
          pText = $.txt(pTexto);
          /* buttons */
          buttonRed = $.create("button"),
          textButtonRed = $.txt(textButtonRed),
          buttonWhite = $.create("button"),
          textButtonWhite = $.txt(textButtonWhite);

            /* DIV BASE */
              $.set(headDiv,"class","on-error-class");
              $.set(headDiv,"id","onErrorClass");

            /* HEAD DIV CROSS */
              /*span*/
              $.set(spanCross,"id","closeOnErrorClassButton");
              $.app(spanCross,crossSpan);
              /*div-head*/
              $.set(crossDiv,"class","close-error");
              $.app(crossDiv,spanCross);

              /*into div*/
              headDiv.appendChild(crossDiv);

            /* P TEXT */
              p.appendChild(pText);
              headDiv.appendChild(p);

            /* BUTTONS */
              /*red*/
              if(ifYesButtonRed == "yes"){
                $.set(buttonRed,"class","btn-dangerous");
                $.set(buttonRed,"onclick", fRed);
                $.app(buttonRed,textButtonRed);
                $.app(headDiv,buttonRed);
                buttonRed.style.marginRight = "7px";
              }
              /*white*/
              if(ifYesButtonWhite == "yes"){
              	$.set(buttonWhite,"class","btn");
              	$.set(buttonWhite,"onclick", fWhite);
              $.app(buttonWhite,textButtonWhite);
              $.app(headDiv,buttonWhite);
              buttonWhite.style.marginRight = "7px";
              }

              $.app($d.body,headDiv); // insert after div in the body;

              $.addevent(spanCross, "click", function(){
                $.del($d.body,headDiv);
              });
    };
};

var winerror = new onErrorWindow();





///////////////////////////////////////////////////////////////////////////////////////////////////
////// MODAL WINDOW DEFINED  //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
function onWindow(){
    var o = this;

    o.new = function(border_color, color, pTexto,idElement){

      var headDiv = $.create("div"),
          /* p */
            p = $.create("p"),
            pText = $.txt(pTexto);

          /* STYLE */
          headDiv.style.background = "#"+color;
          headDiv.style.borderColor = "#"+border_color;
          p.style.color = "#"+border_color;

            /* DIV BASE */
              $.set(headDiv,"class","on-error-class");
              $.set(headDiv,"id","onErrorClass");

            /* P TEXT */
              $.app(p,pText);
             $.app(headDiv,p);

              $.app(idElement,headDiv); // insert after div in the body;
    };
};

var onNewWin = new onWindow();






$.addevent(window,"load",function(){ // Window Load Complement

	/* NAVBAR FIXED POSITION
		Only add the element "oi_nav" to class.
				add the element "dropContent" to class.
	*/

	var navbar = $d.querySelector("#oi_nav"),
		offsetClassBar = navbar.offsetTop,
		dropContent = $d.querySelector("#dropContent");

			/* Style Navbar */
			navbar.style.borderRadius = "0px";
			dropContent.style.position = "fixed";

			window.onscroll = function(){
				if($d.body.scrollTop > offsetClassBar || $d.documentElement.scrollTop > offsetClassBar){
						navbar.style.width = "100%";
						navbar.style.position = "fixed";
						navbar.style.top = "0px";
						navbar.style.left = "0px";
						dropContent.style.position = "fixed";
				}else{
						navbar.style.position = "relative";
				}
			}


			/* GO TO UP BUTTON */
			var backTop = $d.querySelector('#js-top'),
				s = 100;



			$.addevent(window,"scroll",function(){
				if($d.body.scrollTop > s || $d.documentElement.scrollTop > s){

					backTop.style.display = "block";

					$.addevent(backTop,"click",function(){
						window.scrollTo(0,0);
					});

				}else{
					backTop.style.display = "none";
				}
			});



}); // END Window Load Complement
