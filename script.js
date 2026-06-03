let instruments = document.querySelector(".instruments")
let grid = document.querySelector(".grid")
let color = document.querySelector('input')

let currColor = '#e2139a'
let PENDOWN = false
color.addEventListener("input", (e) => { currColor = e.target.value}, false);

const w=40 
const h=20

function createGrid(w,h) {
    grid.style.gridTemplateColumns = `repeat(${w}, 0.6fr)`
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`

    for (let i = 0; i<h; i++) {
        for (let j = 0; j<w; j++) {
            let poxel = document.createElement("div")
            poxel.classList.add("poxel")
            poxel.id = `px${i}-${j}`
            poxel.addEventListener('click', function() {
                poxel.style.backgroundColor = currColor
            })
            poxel.addEventListener('mouseover', function() {
                if (PENDOWN) {
                    poxel.style.backgroundColor = currColor
                }
            })
            grid.appendChild(poxel)
        }
    }
}

createGrid(w,h)
grid.addEventListener('mousedown',()=> {PENDOWN = true})
grid.addEventListener('mouseup',()=> {PENDOWN = false})
