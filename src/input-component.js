//ADD/BUILD BUTTON
const addButton = document.querySelector('#add-button')
const buildButton = document.querySelector('#build-button')

//INPUT FIELDS
const inputTitleField = document.querySelector('#input-title-field')
const inputDescriptionField = document.querySelector('#input-description-field')
const inputKeywordsField = document.querySelector('#input-keywords-field')

//CURRENT PROJECT DESCRIPTION PLACEHOLDER
const projectTitlePlaceholder = document.querySelector('#project-title-placeholder')
const projectDescriptionPlaceholder = document.querySelector('#project-description-placeholder')
const projectKeywordsPlaceholder = document.querySelector('#project-keywords-placeholder')

//EDIT/SET BUTTON
const setButton = document.querySelector('#set-button')
const editButton = document.querySelector('#edit-button')

//PROJECT MENU
const selectProjectButton = document.querySelector('#select-project-button')
const projectMenu = document.querySelector('#project-menu')
let placeholderDiv = document.querySelector('#project-menu > div')

//HIDDEN VIEW/DOWNLOAD MODAL
const viewModal = document.querySelector('#view-modal')
const viewButtonDiv = document.querySelector('#view-button-div')
const viewButton = document.querySelector('#view-button')
const downloadButton = document.querySelector('#download-button')


let projectCount = 0

let newProjectMenuButton
let projectMenuButtonList = []

let clientId

let temporaryEvent
let projectData = {
    title: "",
    description: "",
    keywords: "",
    language: "",
    framework: "",
    database: "",
}

let projectCollection = []

let clientData = {
    id: "",
    background: { color: "", shade: 100 },
    text: { color: "", shade: 100 },
    gradient: "monochrome",
    gradientRange: "",
    hoverShade: 500,
    cover: "black",
    font: { description: "", links: "" },
    projectCount: 0,
    projectCollection: [],
}


//EDIT/SET HANDLERS

const setProject = () => {
    if(!inputTitleField.value) {
        showInfo('noTitleWarning')
        return
    }
    if (projectTitlePlaceholder.innerText !== "Your title...") {
        removeOverlay()
        showInfo('setInputWarning')
        return
    }
    projectTitlePlaceholder.innerText = inputTitleField.value
    projectDescriptionPlaceholder.innerText = inputDescriptionField.value
    projectKeywordsPlaceholder.innerText = `Keywords: ${inputKeywordsField.value}`
    inputTitleField.value = ""
    inputDescriptionField.value = ""
    inputKeywordsField.value = ""
}

const editProject = () => {
    if (projectTitlePlaceholder.innerText === "Your title...") {
        showInfo('editWarning')
        return
    }
    if (inputTitleField.value !== "" || inputDescriptionField.value !== "" || inputKeywordsField.value !== "") {
        removeOverlay()
        showInfo('editInputWarning')
        return
    }
    inputTitleField.value = projectTitlePlaceholder.innerText
    inputDescriptionField.value = projectDescriptionPlaceholder.innerText
    inputKeywordsField.value = projectKeywordsPlaceholder.innerText.substr(10)
    projectTitlePlaceholder.innerText = "Your title..."
    projectDescriptionPlaceholder.innerText = "Your project description lands here.."
    projectKeywordsPlaceholder.innerText = "Keywords: "
}

//PROJECT MENU HANDLERS
const chooseProject = () => {
    if (projectMenu.classList.contains('hidden')) {
        projectMenu.classList.remove('hidden')
        projectMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    projectMenu.classList.remove('flex', 'shadow-lg')
    projectMenu.classList.add('hidden')
}


createNewProjectEntry = () => {
    let button = document.createElement('button')
    button.classList.add('px-1', 'mx-1', 'hover:bg-lightBlue-300', 'hover:text-white', 'text-left', 'rounded', 'w-48')
    button.id = `${projectData.title}`
    newProjectMenuButton = document.querySelector('#project-menu').appendChild(button)
    newProjectMenuButton.innerText = projectData.title
    newProjectMenuButton.addEventListener('click', editOldProject)
    projectMenuButtonList.push(newProjectMenuButton)
}


const checkForTitleDuplication = () => {
    let duplication = false
    projectCollection.forEach(project => {
        if (project.title === projectTitlePlaceholder.innerText) {
            duplication = true
            return
        }
    })
    return duplication
}


const addProject = () => {
    let duplication = checkForTitleDuplication()
    if(duplication) {
        showInfo('sameTitleWarning')
        return
    } 
    if (projectTitlePlaceholder.innerText === "Your title...") {
        showInfo('prematureAddWarning')
        return
    }
    if (!clientData.projectCount) {
      placeholderDiv.classList.add('hidden') 
    }
    projectData.title = projectTitlePlaceholder.innerText
    projectData.description = projectDescriptionPlaceholder.innerText
    projectData.keywords = projectKeywordsPlaceholder.innerText.substr(10)
    clientData.projectCount++
    createNewProjectEntry()
    projectCollection.push(projectData)
    clearViewBox()
}


toggleData = (e) => {
    projectCollection.forEach((entry, index) => {
        if(entry.title === e.target.id) {
            if (index === 0) {
                projectData = entry
                projectCollection.shift()
                return
            }
        projectData = entry
        console.log(index)
        projectCollection.splice(index,index)  
        }
    })
}

const eraseMenuButton = (e) => {
    projectMenuButtonList.forEach((button, index) => { 
        if (button.id == e.target.id) {
            projectMenuButtonList[index].removeEventListener("click", editOldProject)
            if(index === 0) {
                projectMenuButtonList.shift()
                e.target.remove()
            }
            projectMenuButtonList.splice(index, index)
            e.target.remove()
            return
        }
    })
}

const editOldProject = (e) => {
    if (projectTitlePlaceholder.innerText !== "Your title...") {
        removeOverlay()
        showInfo('editViewboxWarning')
        temporaryEvent = e
        return
    }
    toggleData(e)
    eraseMenuButton(e)
    projectTitlePlaceholder.innerText = projectData.title
    projectDescriptionPlaceholder.innerText = projectData.description
    projectKeywordsPlaceholder.innerText = `Keywords: ${projectData.keywords}`
    clientData.projectCount--
    if (projectData.language !== "") placeLanguageIcon()
    if (projectData.framework !== "") placeFrameworkIcon()
    if (projectData.database !== "") placeDatabaseIcon()
    if (!clientData.projectCount) {
        placeholderDiv.classList.remove('hidden')
    }
    projectData.title = ""
    projectData.description = ""
    projectData.keywords = ""
    removeOverlay()
}

const clearViewBox = () => {
    projectTitlePlaceholder.innerText = "Your title..."
    projectDescriptionPlaceholder.innerText = "Your project description lands here.."
    projectKeywordsPlaceholder.innerText = "Keywords: "
    languageIcon.removeAttribute('src')
    frameworkIcon.removeAttribute('src')
    databaseIcon.removeAttribute('src')
    document.querySelectorAll('#icon-div > img').forEach(img => img.remove())
    projectData = {
        title: "",
        description: "",
        keywords: "",
        language: "",
        framework: "",
        database: "",
    }  
}


const submitWebsite = () => {
    if(projectCollection.length === 0) {
        showInfo('prematureSubmitWarning')
        return
    }
    clientData.projectCollection = projectCollection
    fetch("/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData), 
    })
    .then(res => res.json())
    .then(res => {
        clientId = res.id
        viewModal.classList.remove('hidden')
        viewButtonDiv.classList.remove('hidden')
        viewButtonDiv.classList.add('flex')
        downloadButton.classList.remove('hidden')
        downloadButton.classList.add('flex')
        viewButton.classList.remove('hidden')
        downloadButton.href = `/download/?id=${clientId}`
        viewButton.href = `/views/?id=${clientId}`
        clearViewBox()    
    })
}

//EVENT-LISTENERS
setButton.addEventListener('click', setProject)
editButton.addEventListener('click', editProject)
selectProjectButton.addEventListener('click', chooseProject)
addButton.addEventListener('click', addProject)
buildButton.addEventListener('click', submitWebsite)
