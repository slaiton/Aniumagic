const PUZZLE_HOVER_TINT = "#009900";
const img = new Image();
const soundAnimal = new Audio();
var nameAnimal = "";
// soundAnimal.setAttribute('id','soundAnimal');
const canvas = document.querySelector("#canvas");
const stage = canvas.getContext("2d");
let difficulty = 4;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let currentPiece;
let currentDropPiece;
let mouse;
// import { detener, iniciar } from "contador";

const images = [
  "http://54.176.177.178/animagic/images/perro-basenji.jpg",
  "http://54.176.177.178/animagic/images/caballos-100.jpg",
  "http://54.176.177.178/animagic/images/loros-100.jpg",
  "http://54.176.177.178/animagic/images/mariposa-100.jpg",
  "http://54.176.177.178/animagic/images/abeja-100.jpg",
  "https://assets.afcdn.com/story/20161017/989289_w1200h630c1cx511cy250.jpg",
  "https://www.cuerpomente.com/medio/2022/12/07/perritos_f063bee8_1280x720.jpg",
]

const animals = [
  {
    'name': 'Elefante',
    'sound':'medios/elefante.mp3',
    'image':'http://54.176.177.178/animagic/images/elefante-100.jpg'
  },
  {
    'name': 'Tigre',
    'sound':'medios/tigre.mp3',
    'image':'http://54.176.177.178/animagic/images/tigre-100.jpg'
  },
  {
    'name': 'Chimpance',
    'sound':'medios/chimpance.mp3',
    'image':'http://54.176.177.178/animagic/images/mono-100.jpg'
  },
  {
    'name': 'Perro',
    'sound':'medios/perro.mp3',
    'image':'http://54.176.177.178/animagic/images/perro-basenji.jpg'
  },
  {
    'name': 'Caballo',
    'sound':'medios/caballo.mp3',
    'image':'http://54.176.177.178/animagic/images/caballos-100.jpg'
  },
  {
    'name': 'Loro',
    'sound':'medios/loro.mp3',
    'image':'http://54.176.177.178/animagic/images/loros-100.jpg'
  },
  {
    'name': 'Mariposa',
    'sound':'',
    'image':'http://54.176.177.178/animagic/images/mariposa-100.jpg'
  },
  {
    'name': 'abeja',
    'sound':'medios/abeja.mp3',
    'image':'http://54.176.177.178/animagic/images/abeja-100.jpg'
  },
  {
    'name': 'Panda',
    'sound':'medios/panda.mp3',
    'image':'https://assets.afcdn.com/story/20161017/989289_w1200h630c1cx511cy250.jpg'
  }
]

const playGame = document.querySelector('#playGame'); 
const continueGame = document.querySelector('#continueGame');
const finishGame = document.querySelector('#finishGame');
const prevObj = document.querySelector('#prevHome');
const prevObj2 = document.querySelector('#prevConf');
// const canvasCont = document.querySelector("#canvasContainer");
const welcome = document.querySelector('#welcomePart');

const build = document.querySelector('#buildImage');

const section1 = document.querySelector('#initialPart');
const section2 = document.querySelector('#rulesConfig');
const section3 = document.querySelector('#playingGame');

// var animalsBtn = document.querySelector('#animals');
// var randomCard = document.querySelector('#randomCard');
var cardsContent = document.querySelector('#cardsContent');
var cerrarTarget = window.document.querySelector('.cerrarTarget');
const dataUser = window.document.querySelector('#dataUser');
const dataLevel = window.document.querySelector('#dataLevel');

const activeSound = document.querySelector('#activeSound');
const desactiveSound = document.querySelector('#desactiveSound');
const desactiveSound2 = document.querySelector('#desactiveSound2');

const sonidoAnimal = document.querySelector("#soundAnimal");

const pregunta = document.querySelector(".pregunta");
const num_question = document.querySelector("#num-question");
const status_game = document.querySelector("#status-game");
const containAyuda = document.querySelector("#imagenAyuda");
const imagenAyuda = new Image();


const TOTAL_OPTIONS = 10;
const select = document.getElementById("edad");

for (let i = 1; i <= TOTAL_OPTIONS; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerHTML = `${i} Años`;

  select.appendChild(option);
}


window.onload = function(){
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
  welcome.classList.add('animacionMenu');
  // controlAnimation();
};



randomImage();


//EVENTOS

playGame.addEventListener('click', function(){
  section1.style.display = 'none';
  section2.style.display = 'block';

    // const sonido = cargarSonido('medios/bienvenida.mp3', '#initialPart');
    const audio = document.getElementById('welcomeSound');
    // console.log(sonido);
    audio.volume = 0.25;
    audio.play();

// document.querySelector("#difficulty").oninput = updateDifficulty;
  // updateDifficulty();  
})

prevObj.addEventListener('click', function(){
 window.location.reload();
})

prevObj2.addEventListener('click', function(){
  section2.style.display = 'block';
  section3.style.display = 'none';
  initPuzzle();
})


continueGame.addEventListener('click', function(){
  section2.style.display = 'none';
  section3.style.display = 'block';
  onImage();
  

})

build.addEventListener('click', function() {
  buildPieces();
  build.style.display = 'none';
})

finishGame.addEventListener('click', function(){
  initPuzzle();
})

activeSound.addEventListener('click', function() {
  const audio = document.getElementById('soundHome');
  const image = document.querySelector('#activeSound img');
  if (!audio.paused) {
    image.src = 'images/soundoff.png';
    // activeSound.img.src = "images/soundoff.png";
    // audio.volume = 0.25;
    audio.pause();
  }else{
    image.src = 'images/soundon.png';
    // activeSound.img.src = "images/soundoff.png";
    audio.volume = 0.25;
    audio.play();
  }
 
})

desactiveSound.addEventListener('click', function() {
  const audio = document.getElementById('welcomeSound');
  const image = document.querySelector('#desactiveSound img');
  if (!audio.paused) {
    image.src = 'images/soundoff.png';
    // activeSound.img.src = "images/soundoff.png";
    // audio.volume = 0.25;
    audio.pause();
  }else{
    image.src = 'images/soundon.png';
    // activeSound.img.src = "images/soundoff.png";
    audio.volume = 0.25;
    audio.play();
  }
 
})

desactiveSound2.addEventListener('click', function() {
  const audio = document.getElementById('welcomeSound');
  const image = document.querySelector('#desactiveSound2 img');
  if (!audio.paused) {
    image.src = 'images/soundoff.png';
    // activeSound.img.src = "images/soundoff.png";
    // audio.volume = 0.25;
    audio.pause();
  }else{
    image.src = 'images/soundon.png';
    // activeSound.img.src = "images/soundoff.png";
    audio.volume = 0.25;
    audio.play();
  }
 
})

sonidoAnimal.addEventListener('click', function() {
  if (!soundAnimal.paused) {
    sonidoAnimal.src = 'images/animalSoundOff.png';
    // activeSound.img.src = "images/soundoff.png";
    // soundAnimal.volume = 0.25;
    soundAnimal.pause();
  }else{
    sonidoAnimal.src = 'images/animalSound.png';
    // activeSound.img.src = "images/soundoff.png";
    soundAnimal.volume = 0.95;
    soundAnimal.play();
  }
});

pregunta.addEventListener('click', function(){
  if (status_game.value == 1) {
    
    if (num_question.value <= 2) {
      pregunta.classList.remove('hide');
      // pregunta.style.display = 'block';
      imagenAyuda.style.width = '80%';
      imagenAyuda.style.height = 'auto';
      console.log(imagenAyuda);
      containAyuda.appendChild(imagenAyuda);
      num_question.value = parseInt(num_question.value)+1;

      setTimeout(() => {
        alert('Tiempo de ayuda terminado')
        containAyuda.innerHTML = '';
      }, 5000)


    }else{
      alert('Numero de intentos Superados');
    }

  }else{

    alert('Primero Iniciar Juego')

  }
  
});


// cerrarTarget.addEventListener('click', function() {
//   console.log(animalsBtn);

//   animalsBtn.style.display = 'block';
//   cerrarTarget.style.display = 'block';

// })

//SONIDOS 

const cargarSonido = function (fuente, id) {
  const ruta = document.querySelector(id);
  const sonido = new Audio(fuente)
  ruta.appendChild(sonido);
  return sonido;
};

// CARTAS CONFIGURACION

function randomCard()
{
  randomImage();
  cardsContent.innerHTML = "";
  var obj = "";
  obj += '<div class="cardsOptions mt-1">';
  obj += ' <div onclick="" class="card">';
  obj += '   <span class="cerrarTarget" onclick="resetTarget()"><img src="images/cerrar.png" width="50"></span>';
   obj += '  <img src="images/random.png" width="200" alt="">';
   obj += '  <h2>Aleatorio</h2>';
   obj += ' </div>'; 
   obj += '</div>'; 

   cardsContent.innerHTML = obj;
}


function animalsBtn()
{
  cardsContent.innerHTML = "";
  var obj = "";
  obj += '<label for="edad">Selecciona un animal</label>';
   obj += '<div class="cardsOptions mt-1">';
  for (let a = 0; a < animals.length; a++) {
    const element = animals[a];

    // const image = comprimirImagen(element.image,90,70);

    // console.log(image);
   obj += '<div onclick="selectAnimal('+a+')" class="card">';
   obj += '<img src="'+element.image+'" width="200" alt="">';
   obj += '<h2>'+element.name+'</h2>';
   obj += '</div>'; 
  }
   obj += '</div>';
  
   cardsContent.innerHTML = obj;
   dataUser.style.display = 'none';
   dataLevel.style.display = 'none';
   continueGame.style.display = 'none';
}

function selectAnimal(id)
{
  var sonido = "";
  if (animals[id].sound != "") {
    sonido = animals[id].sound;
/*    const audio = document.querySelector('audio#sound'+id);
    console.log(audio);
    audio.play();
*/
    // audio.volume = 0.95;
  }

  const image = animals[id].image;
  const name = animals[id].name ;
  const audio = animals[id].sound ;

  soundAnimal.src = audio;
  img.src = image; 
  imagenAyuda.src = image;
  nameAnimal = name;

  cardsContent.innerHTML = "";
  var obj = "";
  obj += '<div class="cardsOptions mt-1">';
  obj += ' <div onclick="" class="card">';
  obj += '   <span class="cerrarTarget" onclick="resetTarget()"><img src="images/cerrar.png" width="50"></span>';
   obj += '  <img src="'+image+'" width="200" alt="">';
   obj += '  <h2>'+name+'</h2>';
   obj +=  '<audio preload="auto" src="'+sonido+'" id="sound'+id+'" autoplay></audio>'
   obj += ' </div>'; 
   obj += '</div>'; 

   cardsContent.innerHTML = obj;
   dataUser.style.display = 'block';
   dataLevel.style.display = 'block';
   continueGame.style.display = 'block';

}

function resetTarget()
{
  cardsContent.innerHTML = "";
  var obj = "";
  obj += '<div class="cardsOptions mt-1">';
  obj += ' <div class="card" id="randomCard" onclick="randomCard()">';
   obj += '  <img src="images/random.png" width="200" alt="">';
   obj += '  <h2>Aleatorio</h2>';
   obj += ' </div>'; 
  obj += ' <div class="card" id="animals" onclick="animalsBtn()">';
   obj += '  <img src="images/animals.png" width="200" alt="">';
   obj += '  <h2>Animales</h2>';
   obj += ' </div>'; 
   obj += '</div>'; 

   cardsContent.innerHTML = obj;
}



function resizeImage(imageUrl) {
  var image = new Image();
  image.onload = function() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var width = image.width;
    var height = image.height;

    var aspectRatio = width / height;
    var maxDimension = 64;

    if (width > height) {
      width = maxDimension;
      height = width / aspectRatio;
    } else {
      height = maxDimension;
      width = height * aspectRatio;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    var iconImage = document.createElement("img");
    iconImage.classList.add("icon");
    iconImage.src = canvas.toDataURL();
    document.body.appendChild(iconImage);
  };
  image.src = imageUrl;
}



// BARRA DIFICULTAD

const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  difficulty = target.value;
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)


function randomImage() {
  const Number = Math.floor(Math.random() * animals.length);
  console.log(animals[Number]);
  img.src = animals[Number].image;
  imagenAyuda.src = animals[Number].image;
  soundAnimal.src = animals[Number].sound;
  nameAnimal = animals[Number].name;
}

//IMAGENES

const comprimirImagen = (imagenComoArchivo, alto, ancho) => {
  /*
    https://parzibyte.me/blog
  */
  return new Promise((resolve, reject) => {
    const $canvas = document.createElement("canvas");
    const imagen = new Image();
    imagen.onload = () => {
      $canvas.width = ancho;
      $canvas.height = alto;
      $canvas.getContext("2d").drawImage(imagen, 0, 0);
      $canvas.toBlob(
        (blob) => {
          if (blob === null) {
            return reject(blob);
          } else {
            resolve(blob);
          }
        },
        "image/jpeg",
        50 / 100
      );
    };
    imagen.src = URL.createObjectURL(imagenComoArchivo);
  });
};


// PUZZLE


function initPuzzle() {
  pieces = [];
  mouse = {
    x: 0,
    y: 0
  };
  currentPiece = null;
  currentDropPiece = null;
  stage.drawImage(
    img,
    0,
    0,
    puzzleWidth,
    puzzleHeight,
    0,
    0,
    puzzleWidth,
    puzzleHeight
  );
  // createTitle("Click para empezar");
  // buildPieces();
}

function resetOptions()
{
  alert('felicidades');
  detener();
  build.style.display = 'block';
}

function setCanvas() {
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  canvas.style.border = "1px solid black";
}

function setAudio() {
console.log(soundAnimal);
  stage.appendChild(soundAnimal);
}

function onImage() {
  pieceWidth = Math.floor(img.width / difficulty);
  pieceHeight = Math.floor(img.height / difficulty);
  puzzleWidth = pieceWidth * difficulty;
  puzzleHeight = pieceHeight * difficulty;
  setCanvas();
  initPuzzle();
  // setAudio();
  shuffleWord(nameAnimal);
}

function createTitle(msg) {
  stage.fillStyle = "#000000";
  stage.globalAlpha = 0.4;
  stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
  stage.fillStyle = "#FFFFFF";
  stage.globalAlpha = 1;
  stage.textAlign = "center";
  stage.textBaseline = "middle";
  stage.font = "20px Arial";
  stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
}

function buildPieces() {
  let i;
  let piece;
  let xPos = 0;
  let yPos = 0;
  for (i = 0; i < difficulty * difficulty; i++) {
    piece = {};
    piece.sx = xPos;
    piece.sy = yPos;
    pieces.push(piece);
    xPos += pieceWidth;
    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }
  // document.onpointerdown = shufflePuzzle;
  shufflePuzzle();
}

function shufflePuzzle() {
  pieces = shuffleArray(pieces);
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  let xPos = 0;
  let yPos = 0;
  for (const piece of pieces) {
    piece.xPos = xPos;
    piece.yPos = yPos;
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      xPos,
      yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
    xPos += pieceWidth;
    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }
  document.onpointerdown = onPuzzleClick;
}

function checkPieceClicked() {
  for (const piece of pieces) {
    if (
      mouse.x < piece.xPos ||
      mouse.x > piece.xPos + pieceWidth ||
      mouse.y < piece.yPos ||
      mouse.y > piece.yPos + pieceHeight
    ) {
      //PIECE NOT HIT
    } else {
      return piece;
    }
  }
  return null;
}

function updatePuzzle(e) {
  currentDropPiece = null;
  if (e.layerX || e.layerX == 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;
  } else if (e.offsetX || e.offsetX == 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;
  }
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  for (const piece of pieces) {
    if (piece == currentPiece) {
      continue;
    }
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      piece.xPos,
      piece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    if (currentDropPiece == null) {
      if (
        mouse.x < piece.xPos ||
        mouse.x > piece.xPos + pieceWidth ||
        mouse.y < piece.yPos ||
        mouse.y > piece.yPos + pieceHeight
      ) {
        //NOT OVER
      } else {
        currentDropPiece = piece;
        stage.save();
        stage.globalAlpha = 0.4;
        stage.fillStyle = PUZZLE_HOVER_TINT;
        stage.fillRect(
          currentDropPiece.xPos,
          currentDropPiece.yPos,
          pieceWidth,
          pieceHeight
        );
        stage.restore();
      }
    }
  }
  stage.save();
  stage.globalAlpha = 0.6;
  stage.drawImage(
    img,
    currentPiece.sx,
    currentPiece.sy,
    pieceWidth,
    pieceHeight,
    mouse.x - pieceWidth / 2,
    mouse.y - pieceHeight / 2,
    pieceWidth,
    pieceHeight
  );
  stage.restore();
  stage.strokeRect(
    mouse.x - pieceWidth / 2,
    mouse.y - pieceHeight / 2,
    pieceWidth,
    pieceHeight
  );
}

function onPuzzleClick(e) {
  if (e.layerX || e.layerX === 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;
  } else if (e.offsetX || e.offsetX === 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;
  }
  currentPiece = checkPieceClicked();
  if (currentPiece !== null) {
    stage.clearRect(
      currentPiece.xPos,
      currentPiece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.save();
    stage.globalAlpha = 0.9;
    stage.drawImage(
      img,
      currentPiece.sx,
      currentPiece.sy,
      pieceWidth,
      pieceHeight,
      mouse.x - pieceWidth / 2,
      mouse.y - pieceHeight / 2,
      pieceWidth,
      pieceHeight
    );
    stage.restore();
    document.onpointermove = updatePuzzle;
    document.onpointerup = pieceDropped;
  }
}

function gameOver() {
  document.onpointerdown = null;
  document.onpointermove = null;
  document.onpointerup = null;
  initPuzzle();
  resetOptions();
}

function pieceDropped(e) {
  document.onpointermove = null;
  document.onpointerup = null;
  if (currentDropPiece !== null) {
    let tmp = {
      xPos: currentPiece.xPos,
      yPos: currentPiece.yPos
    };
    currentPiece.xPos = currentDropPiece.xPos;
    currentPiece.yPos = currentDropPiece.yPos;
    currentDropPiece.xPos = tmp.xPos;
    currentDropPiece.yPos = tmp.yPos;
  }
  resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin() {
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  let gameWin = true;
  for (piece of pieces) {
    stage.drawImage(
      img,
      piece.sx,
      piece.sy,
      pieceWidth,
      pieceHeight,
      piece.xPos,
      piece.yPos,
      pieceWidth,
      pieceHeight
    );
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
      gameWin = false;
    }
  }
  if (gameWin) {
    setTimeout(gameOver, 500);
  }
}

function shuffleArray(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

function updateDifficulty(e) {
  difficulty = e.target.value;
  pieceWidth = Math.floor(img.width / difficulty);
  pieceHeight = Math.floor(img.height / difficulty);
  puzzleWidth = pieceWidth * difficulty;
  puzzleHeight = pieceHeight * difficulty;
  gameOver();
}



// CRONOMETRO

	const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido"),
		$btnIniciar = document.querySelector("#buildImage"),
		$btnPausar = document.querySelector("#btnPausar"),
		$btnMarca = document.querySelector("#btnMarca"),
		$btnDetener = document.querySelector("#finishGame"),
        $prevObj2 = document.querySelector('#prevConf'),
		$contenedorMarcas = document.querySelector("#contenedorMarcas");
	let marcas = [],
		idInterval,
		tiempoInicio = null;
	let diferenciaTemporal = 0;

	const ocultarElemento = elemento => {
		elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		elemento.style.display = "";
	}

	const agregarCeroSiEsNecesario = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}

	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
	};


	function iniciar() {
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
    status_game.value = 1;
		ocultarElemento($btnIniciar);
		mostrarElemento($btnDetener);
		mostrarElemento($tiempoTranscurrido);
		// mostrarElemento($btnMarca);
		// mostrarElemento($btnPausar);
	}
	// const pausar = () => {
	// 	diferenciaTemporal = new Date() - tiempoInicio.getTime();
	// 	clearInterval(idInterval);
	// 	mostrarElemento($btnIniciar);
	// 	// ocultarElemento($btnMarca);
	// 	// ocultarElemento($btnPausar);
	// 	mostrarElemento($btnDetener);
	// };
	function refrescarTiempo() {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		$tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
	}
	// const ponerMarca = () => {
	// 	marcas.unshift(new Date() - tiempoInicio.getTime());
	// 	dibujarMarcas();
	// };
	// const dibujarMarcas = () => {
	// 	$contenedorMarcas.innerHTML = "";
	// 	for (const [indice, marca] of marcas.entries()) {
	// 		const $li = document.createElement("p");
	// 		$li.innerHTML = `<strong class="is-size-4">${marcas.length - indice}.</strong> ${milisegundosAMinutosYSegundos(marca)}`;
	// 		$li.classList.add("is-size-3");
	// 		$contenedorMarcas.append($li);
	// 	}
	// };

	
  function detener() {
		clearInterval(idInterval);
		init();
		marcas = [];
		diferenciaTemporal = 0;
    status_game.value = 0;
    num_question.value =  0;
    containAyuda.innerHTML = '';
	}

	function init() {
		$tiempoTranscurrido.textContent = "00:00.0";
		// ocultarElemento($btnPausar);
		// ocultarElemento($btnMarca);
		ocultarElemento($btnDetener);
		mostrarElemento($btnIniciar);
		ocultarElemento($tiempoTranscurrido);
	};

	init();

	$btnIniciar.onclick = iniciar;
	// $btnMarca.onclick = ponerMarca;
	// $btnPausar.onclick = pausar;
	$btnDetener.onclick = detener;
	$prevObj2.onclick = detener;


  // LETRAS




  var draggedElement = null;

  function shuffleWord(word) {
    
    var shuffledWord = shuffleArray2(word.split('')).join('');

    var resultElement = document.getElementById("resultWords");

    resultElement.innerHTML = '';

    for (var i = 0; i < shuffledWord.length; i++) {
      var letterElement = document.createElement("span");
      letterElement.textContent = shuffledWord[i];
      letterElement.classList.add("letter");
      letterElement.draggable = true;
      letterElement.addEventListener("dragstart", dragStart);
      letterElement.addEventListener("dragover", dragOver);
      letterElement.addEventListener("drop", drop);
      resultElement.appendChild(letterElement);
    }


    var wordTitle = document.getElementById('titleWords');
    var titleWord = wordTitle.querySelector('h1');
    titleWord.textContent = "Resuelve la palabra";

    checkSuccess();
  }

  function shuffleArray2(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function dragStart(event) {
    draggedElement = event.target;
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event) {
    var targetElement = event.target;

    if (targetElement.classList.contains("letter")) {
      var temp = targetElement.textContent;
      targetElement.textContent = draggedElement.textContent;
      draggedElement.textContent = temp;
    }

    draggedElement = null;
    checkSuccess();
  }

  function checkSuccess() {
    var resultElement = document.getElementById("resultWords");
    var letters = resultElement.querySelectorAll(".letter");
    var wordTitle = document.getElementById('titleWords');
    var titleWord = wordTitle.querySelector('h1');
    console.log(letters);
    var currentWord = "";
    
    for (var i = 0; i < letters.length; i++) {
      currentWord += letters[i].textContent;
    }
    
    if (currentWord === nameAnimal) {
      resultElement.classList.add("success");
      resultElement.textContent = currentWord;
      titleWord.textContent = "FELICIDADES!"
      openModal("FELICIDADES!", "Continue con el rompecabezas del "+ nameAnimal);
      playSuccessSound();
    } else {
      resultElement.classList.remove("success");
    }
  }

  function openModal(titulo, cuerpo) {
    var modal = document.getElementById("myModal");
    var content = modal.querySelector('.modal-content');
    var title = content.querySelector('.title');
    var body = content.querySelector('.body');

    title.textContent = titulo;
    body.textContent = cuerpo;
    modal.style.animation = "fadeIn 0.5s forwards";
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.animation = "fadeOut 0.5s forwards";
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }

  function playSuccessSound() {
    var audio = new Audio("medios/correct.mp3");
    audio.play();
  }



