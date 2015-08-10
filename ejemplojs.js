var tablero, alto, ancho;

var obstaculos = [
    [-1, 150, 150, 250],
    [125, 300, 500, 400],
    [175, -1, 250, 250]
];

var tecla = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var fondo = {
    URL: "img/fondo.png",
    OK: false,
    img: new Image(),
    init: function() {
        this.img.src = this.URL;
        this.img.onload = this.draw;
    },
    draw: function() {
        tablero.drawImage(fondo.img, 0, 0);
    }
};

var tifis = {
    x: 25,
    y: 25,
    velocidad: 25,
    direccion: 0,
    alto: 46,
    ancho: 25,
    imgsUrl: [
        'img/diana-frente.png',
        'img/diana-atras.png',
        'img/diana-der.png',
        'img/diana-izq.png',
    ],
    imgs: new Array(),
    init: function() {
        for (var i = 0; i < this.imgsUrl.length; i++) {
            this.imgs[i] = new Image();
            this.imgs[i].src = this.imgsUrl[i];
        };
        this.imgs[tifis.direccion].onload = this.draw;
    },
    draw: function() {
        document.getElementById("coords").innerHTML = "Tifis x:" + tifis.x + " y:" + tifis.y;
        tablero.drawImage(tifis.imgs[tifis.direccion], tifis.x, tifis.y);
    }
};

function inicio() {
    var canvas = document.getElementById("pantalla");
    tablero = canvas.getContext("2d");
    ancho = canvas.width;
    alto = canvas.height;

    fondo.init();
    tifis.init();

    document.addEventListener("keydown", teclado);
}

function teclado(k) {
    var before = {
        x: tifis.x,
        y: tifis.y
    };
    tifis.error = false;

    if (k.keyCode == tecla.UP || k.keyCode == tecla.DOWN || k.keyCode == tecla.LEFT || k.keyCode == tecla.RIGHT) {
        k.preventDefault();  
        if (k.keyCode == tecla.UP) {
            tifis.direccion = 1;
            tifis.y -= tifis.velocidad;
        } else if (k.keyCode == tecla.DOWN) {
            tifis.direccion = 0;
            tifis.y += tifis.velocidad;
        } else if (k.keyCode == tecla.LEFT) {
            tifis.direccion = 3;
            tifis.x -= tifis.velocidad;
        } else if (k.keyCode == tecla.RIGHT) {
            tifis.direccion = 2;
            tifis.x += tifis.velocidad;
        }
        obstaculos.forEach(function(obstaculo) {
            if (tifis.x > obstaculo[0] && tifis.x < obstaculo[2]) {
                if (tifis.y > obstaculo[1] && tifis.y < obstaculo[3]) {
                    tifis.error = true;
                }
            }
        });
        if (tifis.x < 0 || tifis.x > ancho - tifis.ancho || tifis.y < 0 || tifis.y > alto - tifis.alto) {
            tifis.error = true;
        }
        if (tifis.error) {
            tifis.x = before.x;
            tifis.y = before.y;
        };
        dibujar();
    }
}

function dibujar() {
    fondo.draw();
    tifis.draw();
}