// CODE EXPLAINED channel

//  Select Elements
const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')

//  Classes names
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

// Show Date
const today = new Date()
const options = {weekday: 'long', month: 'short', day: 'numeric'}
dateElement.innerHTML = today.toLocaleDateString('es-ES', options)

//  Variables
// const LIST = []  // with out localStorage
// let id = 0
let LIST
let id

//  get item from localStorage
let data = localStorage.getItem('TODO')

if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    id = 0
}

//  Fill UI with list items
function loadList(array){
    array.forEach( item => {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

//  clear localStorage
clear.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

//  Add to do Function
function addToDo(toDo, id, done, trash){
    if(trash){ return }
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ''

    const item = `
        <li class="item">
           <i class="fa ${DONE} co" job="complete" id="${id}"></i>
           <p class="text ${LINE}">${toDo}</p>
           <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>`
    const position = 'beforeend'
    list.insertAdjacentHTML(position, item)
}


//  add item to the list when user hit enter
document.addEventListener('keyup', function(event) {
    const enterKey = event.keyCode
    const toDo = input.value
    if(enterKey === 13){
        if(toDo){
            addToDo(toDo, id, false, false)

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            })

            //  add item to localStorage (this code must be added where the LIST array is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST))

            id++
        }
        input.value = ''
    }
})

function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true
}

//  target elements created dinamically
list.addEventListener('click', (event) => {
    const element = event.target
    const elementJob = element.attributes.job.value

    if(elementJob === 'complete'){
        completeToDo(element)
    } else if(elementJob === 'delete'){
        removeToDo(element)
    }
    //  add item to localStorage (this code must be added where the LIST array is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST))
})