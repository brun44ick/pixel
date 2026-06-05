let grid = document.querySelector(".grid")

const w=40 
const h=20

let PENDOWN = false

let instruments = document.querySelectorAll(".tool") 

let color = document.querySelector('input')
let pen = document.getElementById("pen")
let eraser = document.getElementById("eraser")
let fill = document.getElementById("fill")
let trash = document.getElementById("trash")

let currColor = '#e2139a'
let currInstrument = 'pen'
let eraseColor = "rgba(30, 41, 59, 0.8)"

color.addEventListener("input", (e) => { currColor = e.target.value}, false);
pen.addEventListener('click', function() { currInstrument = "pen"; select()});
eraser.addEventListener('click', function() { currInstrument = "eraser"; select()});
fill.addEventListener('click', function() { currInstrument = "fill"; select()});
trash.addEventListener('click', function() {
    currInstrument = "trash"; 
    select()
    if (confirm("Вы уверены?")) {
        trashed()
    }
});

function createGrid(w,h) {
    grid.style.gridTemplateColumns = `repeat(${w}, 0.6fr)`
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`

    for (let i = 0; i<h; i++) {
        for (let j = 0; j<w; j++) {
            let poxel = document.createElement("div")
            poxel.classList.add("poxel")
            poxel.id = `px${i}-${j}`

            poxel.addEventListener('click', function() {

                if (currInstrument == "pen") {
                    poxel.style.backgroundColor = currColor
                }
                if (currInstrument == "eraser") {
                    poxel.style.backgroundColor = eraseColor
                }
            })

            poxel.addEventListener('mouseover', function() {

                if (PENDOWN && currInstrument == "pen") {
                    poxel.style.backgroundColor = currColor
                }
                if (PENDOWN && currInstrument == "eraser") {
                    poxel.style.backgroundColor = eraseColor
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
        }
    }
}

function trashed() {
    if (currInstrument == 'trash') {
        let poxels = document.querySelectorAll(".poxel")
        for (let p of poxels) {
            p.style.backgroundColor = eraseColor
        }
    }
}

createGrid(w,h)
grid.addEventListener('mousedown',()=> {PENDOWN = true})
grid.addEventListener('mouseup',()=> {PENDOWN = false})
grid.addEventListener('click', filling)
