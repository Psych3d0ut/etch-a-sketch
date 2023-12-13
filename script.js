`use strict`;

const DEFAULT_COLOR = `#333`;
const DEFAULT_MODE = `color`;
const DEFAULT_SIZE = 24;

const colorPicker = document.getElementById(`colorPicker`);
const colorBtn = document.getElementById(`colorBtn`);
const rainbowBtn = document.getElementById(`rainbowBtn`);
const grayscaleBtn = document.getElementById(`grayscaleBtn`);
const eraserBtn = document.getElementById(`eraserBtn`);
const resetButton = document.getElementById(`resetBtn`);
const gridContainer = document.getElementById(`gridContainer`);
const inputValue = document.getElementById(`sizeInput`);
const selectedValue = document.getElementById(`selectedValue`);

let gridSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.oninput = (e) => changeColor(e.target.value);
colorBtn.onclick = () => setMode(`color`);
rainbowBtn.onclick = () => setMode(`rainbow`);
grayscaleBtn.onclick = () => setMode(`grayscale`);
eraserBtn.onclick = () => setMode(`eraser`);
resetButton.onclick = () => clearGrid();


function changeColor(e) {
    if (e.type === `mouseover` && !mouseDown) return;
    switch (currentMode) {
        case `color`:
            colorPicker.style.backgroundColor = colorPicker.value;
            currentColor = colorPicker.value;
            e.target.style.backgroundColor = `${currentColor}`;
            break;
        case `rainbow`:
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            break;
        case `grayscale`:
            let currentCol = parseInt(e.target.getAttribute(`data-color`) || 0);
            currentCol = Math.min(currentCol + 1, 10);
            const colorVal = 255 - (currentCol * 25);
            e.target.style.backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
            e.target.setAttribute(`data-color`, currentCol);
            break;
        case `eraser`:
            e.target.style.backgroundColor = `whitesmoke`;
            break;
    }
}

function clearGrid() {
    createGrid(gridSize);

}

function createGrid(value) {
    gridContainer.innerHTML = ``;
    selectedValue.textContent = `${value}x${value}`;

    for (let i = 0; i < value*value; i++) {
        const gridbox = document.createElement(`div`);
        gridbox.className = `gridbox`;
        gridbox.setAttribute(`draggable`, false);
        gridbox.addEventListener('mouseover', changeColor)
        gridbox.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(gridbox);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${value}, minmax(2px, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${value}, minmax(2px, 1fr)`;
}

inputValue.addEventListener(`input`, () => {
    createGrid(inputValue.value);
    gridSize = inputValue.value;
});

function setColor(colorKey) {
    currentColor = colorKey;
}

function setMode(mode) {
    activateBtn(mode);
    currentMode = mode;
}

function activateBtn (mode) {
    removeActive()
    switch (mode) {
        case `color`:
            colorBtn.classList.add(`active`);
            break;
        case `rainbow`:
            rainbowBtn.classList.add(`active`);
            break;
        case `grayscale`:
            grayscaleBtn.classList.add(`active`);
            break;
        case `eraser`:
            eraserBtn.classList.add(`active`);
            break;
    }
}

function removeActive() {
    colorBtn.classList.remove(`active`);
    rainbowBtn.classList.remove(`active`);
    grayscaleBtn.classList.remove(`active`);
    eraserBtn.classList.remove(`active`);
}

createGrid(inputValue.value);