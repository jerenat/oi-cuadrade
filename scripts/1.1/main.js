// Iniciar Función cuando carga el cuerpo
$().init(() => {

	// CREAR ELEMENTO DIV
	let ejemplo1 = new Elem("div");
	
	ejemplo1.attr({
		class: 'Hola',
		id: 'chau',
		title: 'Hello world!'
	});
	
	//ejemplo1.txt("Hola a todos");
	
	ejemplo1.appTo();
	





	
	// AJAX
	let ajs = new OiAsync();
	
	ajs.ajax({
		type: 'GET',
		url: 'ejemplo.php',
		fn: (data) => {
	
			$("#ajax-e").html(parse(data));
		},
	});
	
	
	// FETCH
	let ejs = new OiAsync();
	
	ejs.fetch({
		url: "ejemplo.php",
		object:{
			type: 'GET',
		},
		res: 'json',
		fn: (data) => {
		
			console.log(count(data))

			$("#fetch-e").html(data);
		}
	});






	// WINDOW.LOCATION.XXX
	let winLocat = $().q(".win_locat");

	$(winLocat).html("window.location.href => " + lo.href() + "<br/>");

	$(winLocat).html("window.location.hostname => " + lo.host() + "<br/>");

	$(winLocat).html("window.location.pathname => " + lo.path() + "<br/>");

	$(winLocat).html("window.location.protocol => " + lo.stat() + "<br/>");

	$(winLocat).html("window.location.port => " + lo.port() + "<br/>");

	// $(winLocat).html("window.location.assign => " + lo.assign("https://google.com") + "<br/>");




// Crear etiquetas "script"
	$().script("main2.js", /*"anonymous", "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"*/);

});


