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
    const colorPal = document.getElementsByClassName('color');

    // function to pick the color form the navbar and make it selected
    for (let i = 0; i < colorPal.length; i += 1) {
        colorPal[i].addEventListener('click', pickColor);
    }

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

    // populate pixel grid
    const pixelBoard = document.getElementById('pixel-board');
    const pixel = document.createElement('div');
    function includePixels(tamanho) {
        for (let i = 0; i < tamanho * tamanho; i += 1) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixelBoard.appendChild(pixel);

            // add eventListener to paint the board with teh selected color
            pixel.addEventListener('mouseover', function(){
                pixel.style.backgroundColor = colorPicked;
            })
        }
    }
    includePixels(5);
    
}