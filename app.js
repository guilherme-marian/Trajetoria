// oi samuel

const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function()
{
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})

const addBtn = document.getElementById("add__note");
const container = document.getElementById("notes__container");

let notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];

function saveNotes()
{
    localStorage.setItem("stickyNotes", JSON.stringify(notes))
}

function createNote({id, content, x= 100, y= 100})
{
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.style.left = `${x}px`;
    noteEl.style.top = `${x}px`;


    const textarea = document.createElement("textarea");
    textarea.value = content;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "x";

    const moveIcon = document.createElement("div")
    moveIcon.className = "move__icon";
    moveIcon.innerText = "=";~

    noteEl.appendChild(textarea);
    noteEl.appendChild(deleteBtn);
    noteEl.appendChild(moveIcon);
    container.appendChild(noteEl);

    let offsetX, offsetY;
    noteEl.addEventListener("mousedown", (e)=>
    {
    if(e.target.tagName === "TEXTAREA") return;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    
    function onMouseMove(e)
    {
        noteEl.style.left = `${e.pageX - offsetX}px`;
        noteEl.style.top = `${e.pageY - (offsetY + 90)}px`;
    }

    function onMouseUp()
    {
        const idx = notes.findIndex((n) => n.id === id);
        notes[idx].x = parseInt(noteEl.style.left);
        notes[idx].y = parseInt(noteEl.style.top);
        saveNotes();
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        
    }

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);
});

    deleteBtn.addEventListener("click", ()=>{
        noteEl.remove();
        notes = notes.filter(n => n.id !== id);
        saveNotes();
    })

    textarea.addEventListener("input", ()=>
    {
        const idx = notes.findIndex(n => n.id === id);
        notes[idx].content = textarea.value;
        saveNotes();
    })
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
    saveNotes();
    createNote(newNote);
});

notes.forEach((note) => createNote(note));