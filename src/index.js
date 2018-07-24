document.addEventListener("DOMContentLoaded", () => {
    console.log("connected!")
    renderAllHogs()
    handleNewHogForm()
})

function renderAllHogs() {
    document.querySelector("#hog-container").innerHTML = ""
    fetch("http://localhost:3000/hogs").then(res => res.json())
    .then(json => {
        json.forEach(hogObj => {
            makeAndAppendNewHog(hogObj)
        })
    })
}

function makeAndAppendNewHog(hogData) {
    let newHog = new Hog(hogData.id, hogData.name, hogData.specialty, hogData.greased, hogData["highest medal achieved"], hogData["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"], hogData.image)
    appendNewHog(newHog)
    createGreasedCheckbox(newHog)
    createDeleteButton(newHog)
}

function appendNewHog(newHog) {
    let hogElement = document.createElement("div")
    document.querySelector("#hog-container").appendChild(hogElement)
    hogElement.outerHTML = newHog.render()
}

function createGreasedCheckbox(newHog) {
    let checkbox = document.createElement("input")
    checkbox.id = `${newHog.id}-greased`
    checkbox.value = "greased"
    checkbox.checked = newHog.greased
    checkbox.setAttribute("type", "checkbox")
    let label = document.createElement("label")
    
    document.getElementById(newHog.id).appendChild(label)
    document.getElementById(newHog.id).appendChild(checkbox)
    label.outerHTML = "</br><label>greased: </label>"
    addEventListenerToGreasedCheckbox(newHog.id)
}

function createDeleteButton(newHog) {
    let deleteButton = document.createElement("button")
    document.getElementById(newHog.id).appendChild(deleteButton)
    deleteButton.innerHTML = "Delete"
    deleteButton.id = `${newHog.id}-delete`
    addEventListenerToDeleteButton(newHog.id)

}

function addEventListenerToGreasedCheckbox(id) {
    document.getElementById(`${id}-greased`).addEventListener("change", (e) => {
        console.log("you've checked", id, e.target.checked)
        changeHogGreased(id, e.target.checked)
    })
}

function addEventListenerToDeleteButton(id) {
    document.getElementById(`${id}-delete`).addEventListener("click", (e) => {
        console.log("youre tryin to delete", e.target.id)
        deleteHog(id)
    })
}

function deleteHog(id) {
    fetch(`http://localhost:3000/hogs/${id}`, {
        method: "DELETE"
    }).then(renderAllHogs)

}

function changeHogGreased(id, greased) {
    fetch(`http://localhost:3000/hogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({greased: greased})
    }).then(res => res.json())
    
}

function handleNewHogForm() {
    document.getElementById("hog-form").addEventListener("submit", (e) => {
        e.preventDefault()
        
        let name = e.target.name.value
        let specialty = e.target.specialty.value
        let medal = e.target.medal.value
        let weight = e.target.weight.value
        let image = e.target.img.value
        let greased = document.querySelector("span input").checked
        let newHogObj = {"name": name,
             "specialty": specialty,
             "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
             "highest medal achieved": medal,
            "image": image,
            "greased": greased}
        postNewHog(newHogObj)
        e.target.reset()
    })
}

function postNewHog(newHogObj) {
    fetch("http://localhost:3000/hogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(newHogObj)
    }).then(resp => resp.json()).then(json => {console.log("i added this new hog", json)})
    .then(renderAllHogs)
}
