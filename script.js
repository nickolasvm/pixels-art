/* eslint-disable max-lines-per-function */
window.onload = function () {
  const colorDiv = document.getElementsByClassName('color-random');
  const randomBtn = document.getElementById('button-random-color');
  const clearBtn = document.getElementById('clear-board');
  const boardDiv = document.getElementById('board-div');
  const sizeBtn = document.getElementById('generate-board');
  const sizeInput = document.getElementById('board-size');
  const colorPal = document.getElementsByClassName('color');

  // localStorage.clear()
  // check if localStorage is empty or not
  // if not, update the color
  const savedColor = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorage.colorPalette !== undefined) {
    for (let i = 0; i < colorDiv.length; i += 1) {
      colorDiv[i].setAttribute('value', savedColor[i]);
      colorDiv[i].style.backgroundColor = savedColor[i];
    }
  }
  // apply random color to the palette
  let storagePalette = {};
  if (savedColor != null) {
    storagePalette = savedColor;
  }

  function randomColorGen() {
    const hexArray = [];
    for (let i = 0; i < colorDiv.length; i += 1) {
      // generates a color in hex value
      // 16777215 is hex for #FFFFFF (WHITE) so using a number less garantees we don't fall on white
      // padstart(6, 0) garantees us that we are not going to have string less than 6 characters
      const randomNumber = Math.floor(Math.random() * 16777214);
      hexArray.push(randomNumber);
      if (i > 0) {
        for (let j = 0; j < hexArray.length; j += 1) {
          if (hexArray[j] === hexArray[i]) {
            hexArray[i] += j;
          }
        }
      }

      const randomHex = `#${hexArray[i].toString(16).padStart(6, 0)}`;
      // colorDiv[i].setAttribute('value', randomHex);

      // save the color in array
      // storagePalette = {};
      storagePalette[i] = randomHex;
      colorDiv[i].value = randomHex;
      colorDiv[i].style.backgroundColor = randomHex;
    }
    localStorage.setItem('colorPalette', JSON.stringify(storagePalette));
    return storagePalette;
  }
  randomBtn.addEventListener('click', randomColorGen);

  /** ***************************************************** */
  // make black the deafult color picked
  let colorPicked = 'rgb(0,0,0)';

  function pickColor(element) {
    // getComputedStyle --0 get all the styles that the element hold in a object format
    // colorPicked = getComputedStyle(element.target)['backgroundColor'];
    colorPicked = element.target.value;

    for (let i = 0; i < colorPal.length; i += 1) {
      colorPal[i].classList.remove('selected');
    }
    // grab the id of the color and update the storage pallet
    const colorId = element.target.id.split('-')[1];
    element.target.classList.add('selected');
    element.target.style.backgroundColor = colorPicked;
    storagePalette[colorId] = colorPicked;
    localStorage.setItem('colorPalette', JSON.stringify(storagePalette));
  }

  // function to pick the color form the navbar and make it selected
  for (let i = 0; i < colorPal.length; i += 1) {
    colorPal[i].addEventListener('change', pickColor);
    colorPal[i].addEventListener('click', pickColor);
  }

  // populate pixel grid and add eventlistener for drawing
  // 'desenhar' is set as false by default and only true when the windows and pixel event listener happens
  let desenhar = false;

  // funtion to create the board and the pixels
  function includePixels(tamanho) {
    // create a board if it was not created before
    const pixelBoard = document.createElement('div');
    pixelBoard.setAttribute('draggable', false);
    pixelBoard.setAttribute('id', 'pixel-board');
    // changing the css variables so the board is a perfect square
    pixelBoard.style.setProperty('--columns', tamanho);
    pixelBoard.style.setProperty('--rows', tamanho);
    boardDiv.appendChild(pixelBoard);

    if (localStorage.pixelBoard !== undefined) {
      const savedDrawing = localStorage.getItem('pixelBoard');
      const gridNum = Math.sqrt(savedDrawing.split('pixel').length - 1);
      pixelBoard.style.setProperty('--columns', gridNum);
      pixelBoard.style.setProperty('--rows', gridNum);
      pixelBoard.innerHTML = `${savedDrawing}`;

      const pixel = document.getElementsByClassName('pixel');
      for (let i = 0; i < pixel.length; i += 1) {
        pixel[i].addEventListener('mouseover', (event) => {
          if (!desenhar) return;
          event.target.style.backgroundColor = colorPicked;
        });
        pixel[i].addEventListener('mousedown', (event) => {
          event.target.style.backgroundColor = colorPicked;
        });
      }
    } else {
      // tamanho * tamanho to make a perfect square
      for (let i = 0; i < tamanho * tamanho; i += 1) {
        const pixel = document.createElement('div');
        // set attribute draggable false to prevent dragging the paint pixels
        pixel.setAttribute('draggable', false);
        pixel.classList.add('pixel');
        // add eventListener to paint the board with the selected color
        pixel.addEventListener('mouseover', () => {
          if (!desenhar) return;
          pixel.style.backgroundColor = colorPicked;
        });
        pixel.addEventListener('mousedown', () => {
          pixel.style.backgroundColor = colorPicked;
        });
        pixelBoard.appendChild(pixel);
      }
    }
    localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
  }

  // create a default 25 pixels board (5x5) ONLY if not in local storage already
  includePixels(5);

  // when mouse is down, 'desenhar' turn into true, allowing to draw
  // when mouse is up, save the board in localStorage
  window.addEventListener('mousedown', () => {
    desenhar = true;
  });
  // when mouse is up, 'desenhar' is set as false
  window.addEventListener('mouseup', () => {
    const pixelBoard = document.getElementById('pixel-board');
    desenhar = false;
    localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
    // console.log(localStorage.getItem('pixelBoard'));
  });

  // function to clean after Limpar is pressed

  clearBtn.addEventListener('click', clearBoard);
  function clearBoard() {
    const pixel = document.getElementsByClassName('pixel');
    const pixelBoard = document.getElementById('pixel-board');
    for (i = 0; i < pixel.length; i += 1) {
      pixel[i].style.backgroundColor = 'white';
    }
    localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
    // console.log(pixelBoard.innerHTML.split('pixel').length - 1);
  }

  // function to change the board size
  sizeBtn.addEventListener('click', newBoard);
  function newBoard() {
    if (sizeInput.value === '') {
      alert('Board inválido!');
      return;
    }
    const board = document.getElementById('pixel-board');
    let size = parseInt(sizeInput.value);
    // keep board between 5x5 e 50x50
    if (size > 50) {
      size = 50;
    }
    if (size < 5) {
      size = 5;
    }
    board.remove();
    localStorage.removeItem('pixelBoard');
    includePixels(size);
  }
};
