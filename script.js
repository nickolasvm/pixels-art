window.onload = function() {
    const colorDiv = document.getElementsByClassName('color-random');
    const randomBtn = document.getElementById('button-random-color');

    // random number from 0 to 255
    function randomRGB() {
        return Math.floor(Math.random() * 255 + 1);
    }

    // random color from 1 to 255
    function randomColorGen() {
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
        }
    }

    randomBtn.addEventListener('click', randomColorGen);
}