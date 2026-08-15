document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
})

//div contenant les actions a faire
const divaction = document.querySelector('#actionlist')
const actiontext = document.querySelector('#actiontext')
const Add = document.querySelector('#Add')
const but1 = document.querySelector('.toutes')
const but2 = document.querySelector('.afaire')
const but3 = document.querySelector('.fait')

/**
 * Permet de créer un element HTML
 * @param {string} tagName 
 * @param {Object} attributes
 * @return {HTMLElement} 
 */
function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}

const text = document.querySelector("#text-start")
let compteurDef = document.querySelector('#is-defin')
let compteurComplet = document.querySelector('#is-completed')
compteurDef.innerText = 0
compteurComplet.innerText = 0

Add.addEventListener('click', (e) => {
    if(actiontext.value!==''){

        e.preventDefault()
        text.remove()
        compteurDef.innerText ++

    let action = createElement('div', {
        class: 'action'
    })

    let check = createElement('input', {
        type: 'checkbox',
        class: "check"
    });

    let label = createElement('p', {
        class: 'text',
    })
    label.innerText = actiontext.value

    let button = createElement('button', {
        class: 'btn del',
    })
    button.innerText = "D"

    divaction.prepend(action)
    action.appendChild(check)
    action.appendChild(label)
    action.appendChild(button)
    
    button.addEventListener('click', e => remove(e, action))
    check.addEventListener('change', e => toggle(e, action))
    
    actiontext.value=''
    }
    else{
        alert("veuillez remplir le champ")
    }
})

/**
 * fonction permettant la suppression d'une action de la to-do-list 
 * @param {PointerEvent} e 
 * @param {HTMLElement} deleteElement
 */
function remove(e, deleteElement) {
    e.preventDefault()
    deleteElement.remove()
    compteurDef.innerText--
}

/**
* Change l'état (à faire / fait) de la tâche
* @param {HTMLInputElement} checkbox
* @param {HTMLElement} Act
*/
function toggle(checkbox, Act) {
    if (checkbox.currentTarget.checked) {
        Act.classList.add('is-completed')
        compteurComplet.innerText++
    } else {
        Act.classList.remove('is-completed')
        compteurComplet.innerText--
    }
}

document.querySelectorAll('.btn-group .btn').forEach(button => {
    button.addEventListener('click', toggleFilter)
})

function toggleFilter(e) {
    e.preventDefault()

    const button = e.currentTarget
    const filter = button.dataset.filter

    // Retirer la classe active de l'ancien bouton
    button.parentElement
        .querySelector('.active')
        .classList.remove('active')

    // Ajouter la classe active au bouton cliqué
    button.classList.add('active')

    if (filter === 'todo') {
        divaction.classList.add('hide-completed')
        divaction.classList.remove('hide-todo')

    } else if (filter === 'done') {
        divaction.classList.add('hide-todo')
        divaction.classList.remove('hide-completed')

    } else {
        divaction.classList.remove('hide-completed')
        divaction.classList.remove('hide-todo')
    }
}