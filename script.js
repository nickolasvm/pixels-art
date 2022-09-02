window.onload = function() {
    const colorDiv = document.getElementsByClassName('color-random');
    const randomBtn = document.getElementById('button-random-color');
    const clearBtn = document.getElementById('clear-board');

    // check if localStorage is empty or not
    // if not, update the color
    if (localStorage.length !== 0) {
        let savedColor = JSON.parse(localStorage.getItem('colorPalette'));
        
        for (let i = 0; i < colorDiv.length; i += 1) {
            colorDiv[i].style.backgroundColor = savedColor[i];
        }
    }

    // random number from 1 to 255
    function randomRGB() {
        return Math.floor(Math.random() * 255 + 1);
    }

    // apply random color to the palette
    function randomColorGen() {
        const storagePalette = [];

        for (let i = 0; i < colorDiv.length; i += 1) {
            let r = randomRGB();
            let g = randomRGB();
            let b = randomRGB();
    
            // check if the color is white (255, 255, 255) and change it
            if (r && g && b === 255) {
                r -= 1;
            };
    
            let randomColor = `rgb(${r}, ${g}, ${b})`

            colorDiv[i].style.backgroundColor = randomColor;
            // save the color in array
            storagePalette.push(randomColor);
        }

        localStorage.setItem('colorPalette', JSON.stringify(storagePalette));
    }
    randomBtn.addEventListener('click', randomColorGen);

    /********************************************************/
    const colorPal = document.getElementsByClassName('color');

    // function to pick the color form the navbar and make it selected
    for (let i = 0; i < colorPal.length; i += 1) {
        colorPal[i].addEventListener('click', pickColor);
    }

    // make black the deafult color picked
    let colorPicked = 'rgb(0,0,0)';
    function pickColor(element) {
        // getComputedStyle --0 get all the styles that the element hold in a object format
        colorPicked = getComputedStyle(element.target)['backgroundColor'];

        for (let i = 0; i < colorPal.length; i += 1) {
            const color = colorPal[i];
            color.classList.remove('selected');

            for (let j = 0; j < colorPal[i].classList.length; j += 1) {
            }
        }
        element.target.classList.add('selected');
    }

    // populate pixel grid and add eventlistener for drawing
    const pixelBoard = document.getElementById('pixel-board');


    // 'desenhar' is set as false by default
    let desenhar = false; 
    function includePixels(tamanho) {
        // tamanho * tamanho to make a perfect square
        for (let i = 0; i < tamanho * tamanho; i += 1) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');

            // add eventListener to paint the board with the selected color
            pixel.addEventListener('mouseover', function(){
                if(!desenhar) return
                pixel.style.backgroundColor = colorPicked;
            })
            pixel.addEventListener('mousedown', function(){
                pixel.style.backgroundColor = colorPicked;
            })
            pixelBoard.appendChild(pixel);

            // function to clean after Limpar is pressed
            clearBtn.addEventListener('click', function(){
                pixel.style.backgroundColor = 'white';
            })
        }
    }
    // when mouse is down, 'desenhar' turn into true, allowing to draw
    window.addEventListener("mousedown", function(){
        desenhar = true
    })
    // when mouse is up, 'desenhar' is set as false
    window.addEventListener("mouseup", function(){
        desenhar = false
    })

    includePixels(5);
    
}