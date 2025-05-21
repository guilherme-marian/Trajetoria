const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function()
{
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})

const addBtn = document.getElementById("add__note");
const container = document.getElementById("notes__container");

let notes = [];

function createNote({id, content, x= 100, y= 100})
{
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.style.left = `${x}px`;
    noteEl.style.top = `${x}px`;


    const textarea = document.createElement("textarea");
    textarea.value
}

addBtn.addEventListener("click", ()=>{
    const newNote = 
    {
       id: Date.now(),
       content:"",
       x: 100,
       y: 100,
    };
    notes.push(newNote);
    createNote(newNote);
});