let newNote = document.querySelector("input");
let addBtn = document.querySelector('#add');
let expBtn = document.querySelector('#expand');
let notes = document.querySelector('#notes');
let overlay = document.querySelector('#overlay');
let box = document.querySelector('#box');
let body = document.body;
let searchBtn = document.querySelector('#search');
let notas = [];

const date = () => {
    let now = new Date();
    let day = now.getDate();
    let days = day.toString().padStart(2, 0);
    let month = now.getMonth() + 1;
    let months = month.toString().padStart(2, 0);
    let year = now.getFullYear();
    let hour = now.getHours();
    let hours = hour.toString().padStart(2, 0);
    let min = now.getMinutes();
    let mins = min.toString().padStart(2, 0);
    let fullDate = hours + ":" + mins + " " + " " + days + "/" + months + "/" + year;
    return fullDate;
}

function add(texto, fecha) {    
    let addNote = document.createElement('div');
    let addNoteText = document.createElement('p');
    let createdDate = document.createElement('p');
    let icon = document.createElement('i');

    addNote.id = "divGeneral";
    
    addNote.className = "col-12 rounded shadow ps-3 pe-3 p-1 mt-2";
    addNote.style.backgroundColor = "#efefef";
    addNote.style.position = "relative";
    addNoteText.className = "p-2 m-0 letra2";
    addNoteText.textContent = texto;

    createdDate.className = "p-2 m-0 text-end letra";
    createdDate.textContent = fecha;

    icon.className = "fa-solid fa-ellipsis-vertical";
    
    notes.appendChild(addNote);
    addNote.appendChild(addNoteText);
    addNote.appendChild(icon);
    addNote.appendChild(createdDate);

    icon.style.position = "absolute";
    icon.style.top = "10px";
    icon.style.right = "20px";
    icon.style.color = "grey";
    updateDataBase(texto, fecha);
}

const closeOverlay = () => {
    overlay.style.zindex = "0";
    overlay.style.display = "none";
}

const updateDataBase = (texto, fecha) => {
    notas.push({
        nota: texto,
        date: fecha,
    })

    let listaDeNotas = JSON.stringify(notas);

    localStorage.setItem('Notas', listaDeNotas);
}

const loadPage = () => {
    let loadList = localStorage.getItem('Notas');
    let list = JSON.parse(loadList);

    list.sort((a, b) => new Date(b.date) - new Date(a.date))

    list.forEach(item => {
        let text = item.nota;
        let fecha = item.date;
        add(text, fecha)
    })

}

const expandNote = () => {
    overlay.style.display = "block";
    overlay.style.zindex = "99";

    let text = newNote.value;
    newNote.value = "";

    let bigDiv = document.createElement('div');
    let bigText = document.createElement('textarea');

    bigDiv.id = "bigDiv";
    bigDiv.className = "col-12 rounded shadow p-1 mt-2";
    bigDiv.style.backgroundColor = "#efefef";
    bigText.className = "p-2 m-0";
    bigText.textContent = text;

    bigDiv.style.zindex = "200";
    bigDiv.style.width = "70%";
    bigDiv.style.height = "auto";
    bigDiv.style.position = "fixed";
    bigDiv.style.top = "30%";
    bigDiv.style.left = "15%";

    bigText.id = "textarea";
    bigText.style.width = "100%";
    bigText.style.height = "200px";
    bigText.style.resize = "none";
    bigText.style.border = "0px";
    bigText.style.outline = "none";

    body.appendChild(bigDiv);
    bigDiv.appendChild(bigText);

    bigText.focus();
    bigText.setSelectionRange(bigText.value.length, bigText.value.length);
}

const hideBigNote = () => {
    let divToDel = document.querySelector('#bigDiv');
    let textToDel = document.querySelector('#textarea');

    divToDel.remove();
    textToDel.remove();
}

const saveBigNote = () => {
    let bigText = document.querySelector('#textarea');
    let text = bigText.value;
    hideBigNote()
    add(text,date());
}

const error = () => {
    box.classList.remove("bg-white");
    box.style.backgroundColor = "#ffd3d3";
    newNote.style.backgroundColor = "#ffd3d3";

    setTimeout(() => {
        box.classList.add("bg-white");
        newNote.style.backgroundColor = "#ffffff";
    },200)
}

addBtn.addEventListener('click', function(){
    let text = newNote.value;
    let fecha = date();
    if ( text != "" ) {
        add(text, fecha);
        newNote.value = "";
    } else {
        error();
    }
})

expBtn.addEventListener('click', () => {
    let text = newNote.value;
    if ( text == "" ) {
        error();
    } else {
        expandNote();
    }
})

overlay.addEventListener('click', () => {
    closeOverlay();
    saveBigNote();
})


loadPage();