let grid = document.querySelector(".grid")

const w=40 
const h=20

let PENDOWN = false
let GRID = true

let instruments = document.querySelectorAll(".tool")

let color = document.querySelector("input")
let pen = document.getElementById("pen")
let eraser = document.getElementById("eraser")
let fill = document.getElementById("fill")
let trash = document.getElementById("trash")
let save = document.getElementById("save")
let download = document.getElementById("download")
let gridIcon = document.getElementById("grid")

let currColor = "#e2139a"
let currInstrument = "pen"
let eraseColor = "rgba(30, 41, 59, 0.8)"

color.addEventListener('input', (e) => { currColor = e.target.value}, false);
pen.addEventListener('click', function() { currInstrument = "pen"; select()});
eraser.addEventListener('click', function() { currInstrument = "eraser"; select()});
fill.addEventListener('click', function() { currInstrument = "fill"; select()});
gridIcon.addEventListener('click', function() {
    let poxels = document.querySelectorAll(".poxel")
    let border = "1px solid grey"
    if (GRID) {
       gridIcon.style.fill = 'white'
       border = 'none'
    } else {
        gridIcon.style.fill = 'rgb(236, 72, 153)'
    }
    for (let p of poxels) {
        p.style.border = border
    }
    GRID = !GRID
})

trash.addEventListener('click', function() {
    let pastTool = currInstrument;
    currInstrument = "trash";
    if (confirm("Start the system file deletion process?Path: C:../System32")) {
        trashed()
    }
    currInstrument = pastTool;
});

save.addEventListener('click',function() {
    currInstrument = "save";
    saveColors()
});

download.addEventListener('click', function() { 
    currInstrument = "download";
    domtoimage.toPng(grid)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        let link = document.createElement('a');
        link.download = 'pixel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
});

function createGrid(w,h) {
    grid.style.gridTemplateColumns = `repeat(${w}, 0.6fr)`
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`

    for (let i = 0; i<h; i++) {
        for (let j = 0; j<w; j++) {
            let poxel = document.createElement('div')
            poxel.classList.add("poxel")
            poxel.id = `px${i}-${j}`

            poxel.addEventListener('click', function() {
                if (currInstrument == "pen") {
                    poxel.style.backgroundColor = currColor
                    poxel.dataset.color = currColor
                }
                if (currInstrument == "eraser") {
                    poxel.style.backgroundColor = eraseColor
                    poxel.dataset.color = eraseColor
                }
            })
            poxel.addEventListener('mouseover', function() {

                if (PENDOWN && currInstrument == "pen") {
                    poxel.style.backgroundColor = currColor
                    poxel.dataset.color = currColor
                }
                if (PENDOWN && currInstrument == "eraser") {
                    poxel.style.backgroundColor = eraseColor
                    poxel.dataset.color = eraseColor
                }
            })
            grid.appendChild(poxel)
        }
    }
}

function select() {
    for (let tool of instruments) {
        tool.classList.remove('selected')
    }
    switch (currInstrument) {
        case "pen":
            pen.classList.add('selected')
            break
        case "eraser":
            eraser.classList.add('selected')
            break
        case "fill":
            fill.classList.add('selected')
            break
    }
}

function filling() {
    if (currInstrument == "fill") {
        let poxels = document.querySelectorAll(".poxel")
        for (let p of poxels) {
            p.style.backgroundColor = currColor
            p.dataset.color = currColor
        }
    }
}

function trashed() {
    if (currInstrument == "trash") {
        let poxels = document.querySelectorAll(".poxel")
        for (let p of poxels) {
            p.style.backgroundColor = eraseColor
            p.dataset.color = eraseColor
        }
    }
}

function saveColors() {
    let poxels = document.querySelectorAll(".poxel")
    let colors = []
    for (let p of poxels) {
        let color = p.dataset.color || p.style.backgroundColor
        colors.push(color);
    }
    localStorage.setItem('colors', JSON.stringify(colors));
}

function loadColors() {
    let savedData = localStorage.getItem('colors');
    if (savedData) {
        try {
            const colors = JSON.parse(savedData);
            const poxels = document.querySelectorAll('.poxel');
            for (let i = 0; i < poxels.length; i++) {
                if (colors[i]) {
                    const color = colors[i];
                    poxels[i].style.backgroundColor = color;
                    poxels[i].dataset.color = color;
                }
            }
        } catch(error) {
            console.error('Ошибка при парсинге данных из localStorage:', error);
            localStorage.removeItem('colors');
        }
    }
}

createGrid(w,h)
loadColors()
grid.addEventListener('mousedown',()=> {PENDOWN = true})
grid.addEventListener('mouseup',()=> {PENDOWN = false})
grid.addEventListener('click', filling)
