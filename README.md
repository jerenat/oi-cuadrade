# Origin Interface Cuadrade
Origin Interface Cuadrade, un JavaScript minificado

*OI Cuadrade* es un simple archivo de Javascript que permite simplificar el código escrito, para que sea mas accesible al programar.

Se ha notado grandemente la modificación desde la versión `1.0` hasta la `1.1`, agregando nuevas caracteristicas y muchisimas mejoras de codigo, las cuales, demuestran el progreso de la programación el dicha área.

## Como se usa

Acontinuación se muestran las comparaciones con **Vanilla JS** y el módulo **OI JS**:


### Funcion "onload":

Vanilla js:
```js
document.onload = function(){
	...
};
```

OI JS:
```js
$().init(function(){
	...
});
```



### Crear nuevo elemento en el DOM

Vanilla js:
```js
let element = document.createElement("div");

element.setAttribute("class", "element-example");
document.body.appendChild(element);
element.textContent = 'Hello world!';
```

OI JS:
```js
let element = new Elem("div");

$(element).attr({
	class: 'element-example'
});

$(element).addTo($d.body);
$(element).txt("Hello world");
```

### Selectores

Vanilla js:
```js
document.querySelector(".example");
document.querySelector("#example");
document.querySelectorAll(".example1 > .example2");
document.getElementById("#example");
document.getElementByClassName(".example");

```

OI JS:
```js
$().q(".example");
$().q("#example");
$().qs(".example1 > .example2");
$().qs("#example1 > #example2");
```

### Convertir FormData a JSON
El módulo permite convertir el formato de FormData(); en JSON para ser enviado en AJAX en caso de que tenga la opción `application/json`.

```js
let xdata = new FormData();
	xdata.append('name','OIJS');
	
let new_xdata = $(xdata).FormJSON();

```


### innerHTML e innerText

**HTML**

Vanilla js:
```js
element.innerHTML += "Hello world!";
```

OI JS:
```js
$(element).html("Hello world!");
```

**Text**

Vanilla js:
```js
element.textContent = "Hello world";
element.innerText = "Hello OI JS";
```

OI JS:
```js
$(element).txt("Hello OI JS");
```

## Eventos
Los eventos son objetos utilizados generalmente al realizar alguna acción (ya sea dando click, o arrastrando algun archivo),

**addEventListener**

Vanilla JS:
```js
element.addEventListener("click", function(event){
	...
});
```

OI JS:
```js
$(element).on("click", (event) => {
	...
});
```

**removeEventListener**

```js
element.removeEventListener("click", function(event){
	...
});
```

OI JS:
```js
$(element).off("click", (event) => {
	...
});
```
