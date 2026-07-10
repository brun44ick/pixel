let navalny = document.querySelector('#navalny')
document.addEventListener('mousemove', function(e) {
    let dX = e.pageX - window.innerWidth / 2 
    let dY = e.pageY - window.innerHeight / 2
    let degX = 20 * dX / window.innerWidth / 2 
    let degY = 20 * dY / window.innerHeight / 2
    navalny.style.transform = `rotateX(${degY}deg) rotateY(${degX}deg)`
})