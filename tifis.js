var tablero, direccion;
var teclas={
	UP: 38,
	DOWN:40,
	LEFT:37,
	RIGHT:39
};
var fondo = {
	imagenURL : "fondo.png",
	imagenOK: false
};

var tifis = {
	x:150,
	y:200,
	frenteURL:"diana-frente.png",
	frenteOK: false,
	atrasURL:"diana-atras.png",
	atrasOK: false,
	derURL:"diana-der.png",
	derOK: false,
	izqURL:"diana-izq.png",
	izqOK: false,
	velocidad:20
};

var liz = {
	lizURL: "liz.png",
	lizOK:false,
	x:400,
	y:200
};


function inicio()
{
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");
//	CAPA1 FONDO
    fondo.imagen = new Image();
    //console.log(fondo);
    fondo.imagen.src = fondo.imagenURL;

    //fondo.imagen.onload = dibujar;
    fondo.imagen.onload = confirmarFondo;

//	CAPA1 TIFIS
    tifis.frente = new Image();
    tifis.frente.src = tifis.frenteURL;
    tifis.frente.onload= confirmarFrente;

    tifis.atras = new Image();
    tifis.atras.src = tifis.atrasURL;
    tifis.atras.onload= confirmarAtras;

    tifis.der = new Image();
    tifis.der.src = tifis.derURL;
    tifis.der.onload= confirmarDer;

    tifis.izq = new Image();
    tifis.izq.src = tifis.izqURL;
    tifis.izq.onload= confirmarIzq;

    // var m = document.getElementById("mover");
    // m.addEventListener("click",movimiento)
//	CAPA3 LIZ
    liz.lizy = new Image();
    liz.lizy.src = liz.lizURL;
    liz.lizy.onload= confirmarLiz;
    

   // direccion = codigo; //04/06/15



    document.addEventListener("keydown",teclado)


}

// function dibujar(){
// 	tablero.drawImage(fondo.imagen, 0, 0);
// }

function teclado(datos){

	//console.log(datos);
	// if (datos.keyCode == 38) {
	// 	alert("arriba");
	// };

	//Guardo en "codigo" la tecla presionada
	var codigo = datos.keyCode;



	if (codigo == teclas.UP) {
		tifis.y -= tifis.velocidad;

	};
	if (codigo == teclas.DOWN) {
		if (tifis.y < 300) {
		tifis.y += tifis.velocidad;

		};

	};
	if (codigo == teclas.LEFT) {
		tifis.x -= tifis.velocidad;

	};
	if (codigo == teclas.RIGHT) {
		tifis.x += tifis.velocidad;

	};
	dibujar(codigo);
}


function confirmarLiz(){
	liz.lizOK= true;
	dibujar();
}

function confirmarFrente(){
	tifis.frenteOK=true;
	dibujar();
}

function confirmarAtras(){
	tifis.atrasOK=true;
	dibujar();
}

function confirmarIzq(){
	tifis.izqOK=true;
	dibujar();
}

function confirmarDer(){
	tifis.derOK=true;
	dibujar();
}

function dibujar(direccion){

	//capa 1: Fondo
	if (fondo.imagenOK==true) {
		tablero.drawImage(fondo.imagen,0,0);
	};


	//capa 2 : tifis
	var tifiDibujo= tifis.frente;



	if (tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK) {


		if (direccion==teclas.UP) {
			tifiDibujo = tifis.atras
		};
		if (direccion==teclas.DOWN) {
			tifiDibujo = tifis.frente
		};
		if (direccion==teclas.LEFT) {
			tifiDibujo = tifis.izq
		};
		if (direccion==teclas.RIGHT) {
			tifiDibujo = tifis.der
		};
		//tablero.drawImage(tifis.frente,tifis.x,tifis.y);
		tablero.drawImage(tifiDibujo,tifis.x,tifis.y);

	};

	//capa3: liz
	//como lizOk es booleana no necesito comparar
	if (liz.lizOK) {
		tablero.drawImage(liz.lizy,liz.x,liz.y);
	};
}

function confirmarFondo(){
	fondo.imagenOK= true;
	dibujar();
}

// function movimiento(){
// 	tifis.x += 10;
// 	dibujar();
// }
