window.onload = function() {
    const colorDiv = document.getElementsByClassName('color-random');
    const randomBtn = document.getElementById('button-random-color');

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
    const color1 = document.getElementById('color-1');
    const color2 = document.getElementById('color-2');
    const color3 = document.getElementById('color-3');
    const color4 = document.getElementById('color-4');
    let colorPicked = '';

    function pickColor(element) {
        // getComputedStyle --0 get all the styles that the element hold in a object format
        colorPicked = getComputedStyle(element.target)['backgroundColor'];
        console.log(colorPicked);
    }

    color1.addEventListener('click', pickColor)
    color2.addEventListener('click', pickColor)
    color3.addEventListener('click', pickColor)
    color4.addEventListener('click', pickColor)

    // populate pixel grid
    const pixelBoard = document.getElementById('pixel-board');
    const pixel = document.createElement('div');
    function includePixels(tamanho) {
        for (let i = 0; i < tamanho; i += 1) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixelBoard.appendChild(pixel);

                    
            pixel.addEventListener('mouseover', function(){
                pixel.style.backgroundColor = colorPicked;
            })
        }
    }
    includePixels(25);
}