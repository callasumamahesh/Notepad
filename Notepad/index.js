let notes = []
let tasks = []
let checkbox = []
function renderElement(){
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note => {
            createnewnote(note.Title,note.Para,note.uniqueid)
        })
    }
}

renderElement()

function CreateNewNote(){
    document.querySelector('.image').style.display = 'none';
    document.querySelector('.inputbox').style.display = 'block';
    document.querySelector('.clickOneditButton').style.display = 'none';
}

document.querySelector('#inputbutton').addEventListener(('click'),() => {
    if(document.getElementById('text').value.trim() === '' || document.getElementById('textarea').value.trim() === ''
    ){
        alert('Fill Both forms')
    }
    else{
        let UniqueNumber = Math.floor(Math.random()*100000)
        let MatterInInput = document.querySelector('#text').value;
        let MatterInTextarea = document.querySelector('#textarea').value;
        SavetheNote(MatterInInput,MatterInTextarea,UniqueNumber)
        createnewnote(MatterInInput,MatterInTextarea,UniqueNumber)
    }
})


 function createnewnote(MatterInInput,MatterInTextarea,UniqueNumber){
    
    let notesatnotepad = document.querySelector('.notesatnotepad')
    let note = document.createElement('div')
    note.classList.add('note', 'note' + UniqueNumber)
    let title = document.createElement('div')
    title.className = 'title';
    let h2 = document.createElement('h2');
    h2.innerHTML = MatterInInput;
    h2.className = 'notetitle';
    let button = document.createElement('button');

    button.addEventListener('click',() => {

        let uniqueid = document.querySelector('.'+ 'note' + UniqueNumber)
        document.querySelector('.image').style.display = 'none';
        uniqueid.querySelector('.buttons').style.display = 'none';
        uniqueid.querySelector('.savebutton').style.display = 'block';
        document.querySelector('.clickOneditButton').style.display = 'block';
        document.querySelector('.inputbox').style.display = 'none';
        let HeadingofEdit = uniqueid.querySelector('.notetitle').innerHTML;
        let dataofEdit = uniqueid.querySelector('.notedescription').innerHTML;
        let title_right = document.querySelector('.notetitle_right');
        let description_right = document.querySelector('.description');
        title_right.innerHTML = HeadingofEdit;
        description_right.value = dataofEdit;
    })

    button.id = 'edit';
    button.innerHTML = 'Edit';
    let twobuttons = document.createElement('div');
    twobuttons.className = 'buttons';
    let taskbutton = document.createElement('button');
    taskbutton.innerHTML = 'Add Task'
    taskbutton.addEventListener('click',()=>{
        console.log(UniqueNumber)
        let AlertTask = prompt('Enter Your Task ')

        SetDataTask(AlertTask,UniqueNumber)
    })

    let deletebutton = document.createElement('button');
    deletebutton.innerHTML = 'Delete';

    deletebutton.addEventListener('click',()=>{
        let uniqueid = '.'+'note'+UniqueNumber;
        document.querySelector(uniqueid).remove();
        DeleteFromStorage(uniqueid)
    })

    let savediv = document.createElement('div');
    savediv.className = 'savebutton';
    savediv.style.marginBottom = '1rem';
    savebutton = document.createElement('button');
    savebutton.innerHTML = 'Save'
    savediv.style.display = 'none'
    savebutton.style.width = '200px';
    savebutton.style.height = '50px';
    savebutton.style.backgroundColor = 'green';
    savebutton.style.color = 'white';
    savebutton.style.borderRadius = '20px';
    savebutton.addEventListener('click', ()=> {
        console.log(notes)
        let SaveTitle = document.querySelector('.notetitle_right').innerHTML;
        let SaveDescription = document.querySelector('.description').value;
        notes.forEach((note) => {
           if(UniqueNumber === note.uniqueid){
            note.Para = SaveDescription;
           }
        })
        localStorage.setItem('notes',JSON.stringify(notes))
        SaveRender(UniqueNumber)
        location.reload()
    })



    function SaveRender(UniqueNumber){
        let Savedata = JSON.parse(localStorage.getItem('notes'));
    }

    savediv.appendChild(savebutton)
    twobuttons.appendChild(taskbutton)
    twobuttons.appendChild(deletebutton)
    title.appendChild(h2)
    title.appendChild(button)
    let p = document.createElement('p')
    p.className = 'notedescription';
    p.innerHTML = MatterInTextarea;
    note.appendChild(title);
    note.appendChild(p);
    note.append(twobuttons)
    note.append(savediv)
    notesatnotepad.appendChild(note);    
    document.querySelector('#text').value = '';
    document.querySelector('#textarea').value = '';

 }



function SavetheNote(T,P,ID){
   let singlenote = {
    Title:T,
    Para : P,
    uniqueid : ID,
   }
   notes.push(singlenote);
   localStorage.setItem('notes',JSON.stringify(notes))
}

function DeleteFromStorage(uniqueid){
    notes = JSON.parse(localStorage.getItem('notes'))
    tasks = JSON.parse(localStorage.getItem('tasks'))
    let index = notes.findIndex(note => note.uniqueid == uniqueid)
    let task = tasks.findIndex(task => task.uniqueid === uniqueid)
    tasks.splice(task,1)
    notes.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(notes))
    localStorage.setItem('tasks',JSON.stringify(tasks))
}


function createTaskElement(task) {
    let yourtask = '.' + 'note' + task.uniqueid
    console.log(yourtask)
    let taskplace = document.querySelector(yourtask);
    let checkboxclass = document.createElement('section');
    checkboxclass.className = 'check';

    let typeCheckbox = document.createElement('input');
    typeCheckbox.type = 'checkbox';
    typeCheckbox.checked = task.Complete;

    typeCheckbox.addEventListener('change', () => {
        task.Complete = typeCheckbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        if (typeCheckbox.checked) {
            checkboxclass.classList.add('done');
        } else {
            checkboxclass.classList.remove('done');
        }
    });

    typeCheckbox.style.marginRight = '1rem';
    let spanElement = document.createElement('span');
    spanElement.innerHTML = task.taskinput;

    checkboxclass.appendChild(typeCheckbox);
    checkboxclass.appendChild(spanElement);
    taskplace.appendChild(checkboxclass);

    if (task.Complete) {
        checkboxclass.classList.add('done');
    }
}

// Function to set task data
function SetDataTask(userInput, uniquenumber) {
    let task = {
        'taskinput': userInput,
        'uniqueid': uniquenumber,
        'Complete': false,
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Create the task element with checkbox
    createTaskElement(task);
}

// Load tasks from localStorage on page load
window.addEventListener('load', () => {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }
});