window.onload = function() {
    const colorDiv = document.getElementsByClassName('color-random');
    const randomBtn = document.getElementById('button-random-color');
    const clearBtn = document.getElementById('clear-board');
    const boardDiv = document.getElementById('board-div');

    // localStorage.clear()
    // check if localStorage is empty or not
    // if not, update the color
    if (localStorage['colorPalette'] !== undefined) {
        let savedColor = JSON.parse(localStorage.getItem('colorPalette'));
        for (let i = 0; i < colorDiv.length; i += 1) {
            colorDiv[i].setAttribute('value', savedColor[i]);
            colorDiv[i].style.backgroundColor = savedColor[i];
        }
    }
    // apply random color to the palette
    function randomColorGen() {
        const storagePalette = [];

        for (let i = 0; i < colorDiv.length; i += 1) {
            // generates a color in hex value
            // 16777215 is hex for #FFFFFF (WHITE) so using a number less garantees we don't fall on white
            // padstart(6, 0) garantees us that we are not going to have string less than 6 characters
            let randomHex = '#' + Math.floor(Math.random()*16777214).toString(16).padStart(6, 0);
            // colorDiv[i].setAttribute('value', randomHex);

            // save the color in array
            storagePalette.push(randomHex);
            colorDiv[i].value = randomHex;
            colorDiv[i].style.backgroundColor = randomHex;
        }

        localStorage.setItem('colorPalette', JSON.stringify(storagePalette));
    }
    randomBtn.addEventListener('click', randomColorGen);

    /********************************************************/
    const colorPal = document.getElementsByClassName('color');

    // make black the deafult color picked
    let colorPicked = 'rgb(0,0,0)';
    
    function pickColor(element) {
        // getComputedStyle --0 get all the styles that the element hold in a object format
        // colorPicked = getComputedStyle(element.target)['backgroundColor'];
        colorPicked = element.target.value;

        for (let i = 0; i < colorPal.length; i += 1) {
            const color = colorPal[i];
            color.classList.remove('selected');

            for (let j = 0; j < colorPal[i].classList.length; j += 1) {
            }
        }
        element.target.classList.add('selected');
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
        pixelBoard.setAttribute('draggable', false)
        pixelBoard.setAttribute('id', 'pixel-board');
        boardDiv.appendChild(pixelBoard);

        if (localStorage['pixelBoard'] !== undefined) {
            let savedDrawing = localStorage.getItem('pixelBoard');
            let wraper = document.createElement('div');
            pixelBoard.innerHTML = `${savedDrawing}`;

            const pixel = document.getElementsByClassName('pixel');
            for (let i = 0; i < pixel.length; i += 1) {
                pixel[i].addEventListener('mouseover', function(){
                    if(!desenhar) return
                    event.target.style.backgroundColor = colorPicked;
                    console.log(colorPicked)
                })
                pixel[i].addEventListener('mousedown', function(){
                    event.target.style.backgroundColor = colorPicked;
                })
            }

        } else {
            // tamanho * tamanho to make a perfect square
            for (let i = 0; i < tamanho * tamanho; i += 1) {
                const pixel = document.createElement('div');
                // set attribute draggable false to prevent dragging the paint pixels
                pixel.setAttribute('draggable', false)
                pixel.classList.add('pixel');
                // add eventListener to paint the board with the selected color
                pixel.addEventListener('mouseover', function(){
                    if(!desenhar) return
                    pixel.style.backgroundColor = colorPicked;
                })
                pixel.addEventListener('mousedown', function(){
                    pixel.style.backgroundColor = colorPicked;
                    console.log(pixel.style.backgroundColor)
                })
                pixelBoard.appendChild(pixel);
            }
        }
    }
    // create a default 25 pixels board (5x5)
    includePixels(5);
    // when mouse is down, 'desenhar' turn into true, allowing to draw
    // when mouse is up, save the board in localStorage
    const pixelBoard = document.getElementById('pixel-board');
    window.addEventListener('mousedown', function(){
        desenhar = true
    })
    // when mouse is up, 'desenhar' is set as false
    window.addEventListener('mouseup', function(){
        desenhar = false

        localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
    })

    // function to clean after Limpar is pressed
    const pixel = document.getElementsByClassName('pixel');

    clearBtn.addEventListener('click', function(){
        for (i = 0; i < pixel.length; i += 1) {
            pixel[i].style.backgroundColor = 'white';
        }
        localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
    })
}