const infoObject = { 
    welcome: "Thank you for checking out <em>Lando97</em>, the ultimate responsive-portfolio-landing-page creator. Feel free to mash and click around. If there is something you're not suppossed to do, an info box just like this one will let you know...Have fun!",
    sameTitleWarning: "The project title you've choosen is already being used. Click on <i>Edit Content</i> and rename your project.",
    noTitleWarning: "Each project must contain a title. Type in a title for your project before you click on <i>Set</i>.",
    editWarning: "There's nothing in the viewbox for you to edit.",
    addWarning: "'You have to press <i>set</i> before adding the project to your repository.",
    prematureAddWarning: "There is no data in the viewbox. Use <i>set</i> to place your current project description in the viewbox before you click on <i>Add To Projects</i>.",
    prematureSubmitWarning: "You have to at least <i>add</i> one Project to your project list before you <i>submit</i>.",
    editViewboxWarning: "Data is currently stored in the viewbox. Do you want to overwrite it?",
    editInputWarning: "There is currently data stored in the input fields. Do you want to overwrite it?",
    setInputWarning: "There is currently data stored in the viewbox. Do you want to overwrite it?",
}

const tutorialOverlay = document.querySelector('#tutorial-overlay')
const infoDiv = document.querySelector('#info-div')
const infoText = document.querySelector('#info-text')
const infoButtonDiv = document.querySelector('#info-button-div')
const cancelButton = document.querySelector('#cancel-button')
const deleteButton = document.querySelector('#delete-button')

//Overlay for Dropdown Menus
let menuOverlay = document.createElement('div')


const showInfo = keyword => {
    tutorialOverlay.classList.remove('hidden')
    infoDiv.classList.remove('hidden')
    infoDiv.classList.add('flex')
    switch(keyword) {
        case "welcome": 
            infoText.innerHTML = infoObject.welcome
            break
        case "noTitleWarning":
            infoText.innerHTML = infoObject.noTitleWarning
            break
        case "sameTitleWarning":
            infoText.innerHTML = infoObject.sameTitleWarning
            break
        case "editWarning":
            infoText.innerHTML = infoObject.editWarning
            break
        case "addWarning":
            infoText.innerHTML = infoObject.addWarning
            break
        case "prematureAddWarning":
            infoText.innerHTML = infoObject.prematureAddWarning
            break
        case "prematureSubmitWarning":
            infoText.innerHTML = infoObject.prematureSubmitWarning
            break
        case "editViewboxWarning": 
            infoText.innerHTML = infoObject.editViewboxWarning
            infoButtonDiv.classList.remove('hidden')
            infoButtonDiv.classList.add('flex')
            break
        case "editInputWarning": 
            infoText.innerHTML = infoObject.editInputWarning
            infoButtonDiv.classList.remove('hidden')
            infoButtonDiv.classList.add('flex')
            break
        case "setInputWarning":
            infoText.innerHTML = infoObject.setInputWarning
            infoButtonDiv.classList.remove('hidden')
            infoButtonDiv.classList.add('flex')
            break
    }
} 

const removeInfo = () => {
    tutorialOverlay.classList.add('hidden')
    infoDiv.classList.add('hidden')
    infoDiv.classList.remove('flex')
    if(infoButtonDiv.classList.contains('flex')) infoButtonDiv.classList.add('hidden')
}

//Overwrites the Viewbox or Input fields depending on the text in the infobox
const overwrite = () => {
    if(infoText.innerHTML === infoObject.editViewboxWarning) {
        toggleData(temporaryEvent)
        eraseMenuButton(temporaryEvent)
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
        return
    }
    if (infoText.innerHTML === infoObject.editInputWarning) {
        inputTitleField.value = projectTitlePlaceholder.innerText
        inputDescriptionField.value = projectDescriptionPlaceholder.innerText
        inputKeywordsField.value = projectKeywordsPlaceholder.innerText.substr(10)
        projectTitlePlaceholder.innerText = "Your title..."
        projectDescriptionPlaceholder.innerText = "Your project description lands here.."
        projectKeywordsPlaceholder.innerText = "Keywords: "
        return
    }
    
    if (infoText.innerHTML === infoObject.setInputWarning) {
        projectTitlePlaceholder.innerText = inputTitleField.value
        projectDescriptionPlaceholder.innerText = inputDescriptionField.value
        projectKeywordsPlaceholder.innerText = `Keywords: ${inputKeywordsField.value}`
        inputTitleField.value = ""
        inputDescriptionField.value = ""
        inputKeywordsField.value = ""
        return
    }
}



const spanOverlay = () => {
    menuOverlay.classList.add('fixed', 'opacity-0', 'inset-0', 'z-40')
    document.querySelector('body').appendChild(menuOverlay)
    menuOverlay.addEventListener('click', removeOverlay)
}

//For the language/framework/database dropdown menu
const removeOverlay = () => {
    if (fontDescriptionMenu.classList.contains('flex')) {
        fontDescriptionMenu.classList.remove('flex', 'shadow-lg')
        fontDescriptionMenu.classList.add('hidden')
        menuOverlay.remove()
        return
    }
    if (fontLinkMenu.classList.contains('flex')) {
        fontLinkMenu.classList.remove('flex', 'shadow-lg')
        fontLinkMenu.classList.add('hidden')
        menuOverlay.remove()
        return
    }
    if (languageMenu.classList.contains('flex')) {
        languageMenu.classList.remove('flex', 'shadow-lg')
        languageMenu.classList.add('hidden')
        menuOverlay.remove()
        return
    }
    if (frameworkMenu.classList.contains('flex')) {
        frameworkMenu.classList.add('hidden')
        frameworkMenu.classList.remove('flex', 'shadow-lg')
        menuOverlay.remove()
        return
    }
    if (databaseMenu.classList.contains('flex')) {
        databaseMenu.classList.remove('flex', 'shadow.lg')
        databaseMenu.classList.add('hidden')
        menuOverlay.remove()
        return
    }
    if (projectMenu.classList.contains('flex')) {
        projectMenu.classList.remove('flex', 'shadow.lg')
        projectMenu.classList.add('hidden')
        menuOverlay.remove()
        return
    }
    menuOverlay.remove()
}

//Eventlistener
tutorialOverlay.addEventListener('click', removeInfo)
infoDiv.addEventListener('click', removeInfo)
cancelButton.addEventListener('click', removeInfo)
deleteButton.addEventListener('click', overwrite)

//Start APP with:
showInfo('welcome')

