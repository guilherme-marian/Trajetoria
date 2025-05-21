const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function()
{
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})


let newX = 0, newY = 0, startX = 0, startY = 0

const card = document.getElementById('drag__card')

card.addEventListener('mousedown', mouseDown)

function mouseDown(e)
{
    startX = e.clientX
    startY = e.clientY

    card.addEventListener('mousemove', mouseMove)
    card.addEventListener('mouseup', mouseUp)
}

function mouseMove(e)
{
    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    card.style.top = (card.offsetTop - newY) + 'px'
    card.style.left = (card.offsetLeft - newX) + 'px'

    console.log({newX, newY})
    console.log({startX, startY})
}

function mouseUp(e)
{
    document.removeEventListener('mousemove', mouseMove)
}