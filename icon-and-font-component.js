//FONT-DESCRIPTION-BUTTON
const fontDescriptionButton = document.querySelector('#font-description-button')
const fontDescriptionMenu = document.querySelector('#font-description-menu')
const descriptionFonts = document.querySelectorAll('#font-description-menu > button')


//FONT-LINK-BUTTON
const fontLinkButton = document.querySelector('#font-link-button')
const fontLinkMenu = document.querySelector('#font-link-menu')
const linkFonts = document.querySelectorAll('#font-link-menu > button')

//LANGUAGE-BUTTON
const languageButton = document.querySelector('#language-button')
const languageMenu = document.querySelector('#language-menu')
const languages = document.querySelectorAll('#language-menu > button')
let languageIcon = document.createElement('img')

//FRAMEWORK-BUTTON
const frameworkButton = document.querySelector('#framework-button')
const frameworkMenu = document.querySelector('#framework-menu')
const frameworks = document.querySelectorAll('#framework-menu > button')
let frameworkIcon = document.createElement('img')

//DATABASE-BUTTON
const databaseButton = document.querySelector('#database-button')
const databaseMenu = document.querySelector('#database-menu')
const databases = document.querySelectorAll('#database-menu > button')
let databaseIcon = document.createElement('img')

//REMOVE ICONS BUTTON
const removeIconsButton = document.querySelector('#remove-icons-button')


//FONT-DESCRIPTION-HANDLERS
const openDescriptionFontMenu = () => {
    if (fontDescriptionMenu.classList.contains('hidden')) {
        fontDescriptionMenu.classList.remove('hidden')
        fontDescriptionMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    fontDescriptionMenu.classList.remove('flex', 'shadow-lg')
    fontDescriptionMenu.classList.add('hidden')
}

const setDescriptionFont = (e) => {
    document.querySelector('#current-project').classList.remove(`font-${clientData.font.description}`)
    clientData.font.description = e.target.value
    document.querySelector('#current-project').classList.add(`font-${clientData.font.description}`)
    fontDescriptionMenu.classList.add('hidden')
    removeOverlay()
}

//FONT-LINK-HANDLERS
const openLinkFontMenu = () => {
    if (fontLinkMenu.classList.contains('hidden')) {
        fontLinkMenu.classList.remove('hidden')
        fontLinkMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    fontLinkMenu.classList.remove('flex', 'shadow-lg')
    fontLinkMenu.classList.add('hidden')
}

const setLinkFont = (e) => {
    document.querySelector('#nav-bar').classList.remove(`font-${clientData.font.links}`)
    clientData.font.links = e.target.value
    document.querySelector('#nav-bar').classList.add(`font-${clientData.font.links}`)
    //console.log(projectFont)
    fontLinkMenu.classList.add('hidden')
    removeOverlay()
}


//LANGUAGE-HANDLERS
const openLanguageMenu = () => {
    if (languageMenu.classList.contains('hidden')) {
        languageMenu.classList.remove('hidden')
        languageMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    languageMenu.classList.remove('flex', 'shadow-lg')
    languageMenu.classList.add('hidden')
}

const setLanguage = (e) => {
    projectData.language = e.target.value
    languageMenu.classList.add('hidden')
    removeOverlay()
    placeLanguageIcon()
}

const placeLanguageIcon = () => {
    if (languageIcon) {
        languageIcon.remove()
    }
    languageIcon = document.createElement('img')
    document.querySelector('#icon-div').appendChild(languageIcon)
    languageIcon.classList.add("h-16", "w-16", "rounded", "m-2")
    languageIcon.src = `./views/icons/language/${projectData.language}.png` //projectLanguage
}

//FRAMEWORK-HANDLERS
const openFrameworkMenu = () => {
    if (frameworkMenu.classList.contains('hidden')) {
        frameworkMenu.classList.remove('hidden')
        frameworkMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    frameworkMenu.classList.add('hidden')
    frameworkMenu.classList.remove('flex', 'shadow-lg')
}

const setFramework = (e) => {
    projectData.framework  = e.target.value
    frameworkMenu.classList.add('hidden')
    removeOverlay()
    placeFrameworkIcon()
}

const placeFrameworkIcon = () => {
    if (frameworkIcon) {
        frameworkIcon.remove()
    }
    frameworkIcon = document.createElement('img')
    document.querySelector('#icon-div').appendChild(frameworkIcon)
    frameworkIcon.classList.add("h-16", "w-16", "rounded", "m-2")
    frameworkIcon.src = `./views/icons/framework/${projectData.framework}.png` 
}

//DATABASE-HANDLERS
const openDatabaseMenu = () => {
    if (databaseMenu.classList.contains('hidden')) {
        databaseMenu.classList.remove('hidden')
        databaseMenu.classList.add('flex', 'shadow-lg')
        spanOverlay()
        return
    }
    databaseMenu.classList.remove('flex', 'shadow.lg')
    databaseMenu.classList.add('hidden')
}

const setDatabase = (e) => {
    projectData.database = e.target.value
    databaseMenu.classList.add('hidden')
    removeOverlay()
    placeDatabaseIcon()
}

const placeDatabaseIcon = () => {
    if (databaseIcon) {
        databaseIcon.remove()
    }
    databaseIcon = document.createElement('img')
    document.querySelector('#icon-div').appendChild(databaseIcon)
    databaseIcon.classList.add("h-16", "w-16", "rounded", "m-2")
    databaseIcon.src = `./views/icons/database/${projectData.database}.png` //projectDatabase

}

const removeIcons = () => {
    document.querySelectorAll('#icon-div > img').forEach(img => img.remove())
    projectData.language = ""
    projectData.framework = ""
    projectData.database = ""
}



//EVEN-LISTENERS 

fontDescriptionButton.addEventListener('click', openDescriptionFontMenu)
descriptionFonts.forEach(item => item.addEventListener('click', setDescriptionFont))

fontLinkButton.addEventListener('click', openLinkFontMenu)
linkFonts.forEach(item => item.addEventListener('click', setLinkFont))

languageButton.addEventListener('click', openLanguageMenu)
languages.forEach(item => item.addEventListener('click', setLanguage))

frameworkButton.addEventListener('click', openFrameworkMenu)
frameworks.forEach(item => item.addEventListener('click', setFramework))

databaseButton.addEventListener('click', openDatabaseMenu)
databases.forEach(item => item.addEventListener('click', setDatabase))

removeIconsButton.addEventListener('click', removeIcons)