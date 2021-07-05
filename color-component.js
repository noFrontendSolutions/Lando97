let backgroundColorPalette = document.querySelectorAll('#background-color-palette > div')
let textColorPalette = document.querySelectorAll('#text-color-palette > div')
let gradientButtons = document.querySelectorAll('#gradient-buttons input')
let coverButtons = document.querySelectorAll('#cover-buttons input')


//Hover Shade for Links
const setHoverShade = () => {
    if (clientData.background.shade === 700 && clientData.text.shade === 300) {
        clientData.hoverShade = 100
        return
    }
    if(Math.abs(clientData.text.shade - clientData.background.shade) >= 500) {
        if (clientData.text.shade < 500) {
            clientData.hoverShade = 600
            return
        }
        if (clientData.text.shade >= 500) {
            clientData.hoverShade = 300
            return
        }
    }
    if (Math.abs(clientData.text.shade - clientData.background.shade) < 500) {
      if(clientData.text.shade < 500) {
          clientData.hoverShade = 500
          return
    } 
      if (clientData.text.shade >= 500) {
         clientData.hoverShade = 200
         return
      }
    }
}


//Project-Cover Black / White

const chooseCoverStyle = (e) => {
    removeCoverStyle()
    clientData.cover = e.target.value
    setCoverStyle()
}

const setCoverStyle = () => {
    if(clientData.cover == "black") {
        document.querySelector('#icon-div').classList.add('bg-black')
        languageIcon.classList.add("bg-black")
        frameworkIcon.classList.add("bg-black")
        databaseIcon.classList.add("bg-black")
    return
    }
    document.querySelector('#icon-div').classList.add('bg-white')
    languageIcon.classList.add("bg-white")
    frameworkIcon.classList.add("bg-white")
    databaseIcon.classList.add("bg-white")
}

const removeCoverStyle = () => {
    if (clientData.cover == "black") {
        document.querySelector('#icon-div').classList.remove('bg-black')
        languageIcon.classList.remove("bg-black")
        frameworkIcon.classList.remove("bg-black")
        databaseIcon.classList.remove("bg-black")
        return
    }
    document.querySelector('#icon-div').classList.remove('bg-white')
    languageIcon.classList.remove("bg-white")
    frameworkIcon.classList.remove("bg-white")
    databaseIcon.classList.remove("bg-white")
}


// Background-Color

const chooseBackgroundColor = (e) => {
    removeGradientTheme()
    removeBackgroundColor()
    clientData.background.color = e.target.name
    clientData.background.shade = parseInt(e.target.value)
    setHoverShade()
    setBackgroundColor()
    setGradientTheme()
}

const setBackgroundColor = () => {
    document.querySelector('#background-color-field').classList.add(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#nav-bar').classList.add(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#footer').classList.add(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#current-project').classList.add(`bg-${clientData.background.color}-${clientData.background.shade}`)
}

const removeBackgroundColor = () => {
    document.querySelector('#background-color-field').classList.remove(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#nav-bar').classList.remove(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#footer').classList.remove(`bg-${clientData.background.color}-${clientData.background.shade}`)
    document.querySelector('#current-project').classList.remove(`bg-${clientData.background.color}-${clientData.background.shade}`)
}

//Text-Color

const chooseTextColor = (e) => {
    removeTextColor()
    removeGradientTheme()
    clientData.text.color = e.target.name
    clientData.text.shade = parseInt(e.target.value)
    setHoverShade()
    setTextColor()
    setGradientTheme()
}


const setTextColor = () => {
    document.querySelector('#text-color-field').classList.add(`bg-${clientData.text.color}-${clientData.text.shade}`)
    document.querySelector('#current-project').classList.add(`text-${clientData.text.color}-${clientData.text.shade}`)
    document.querySelectorAll('#nav-bar > div').forEach(div => div.classList.add(`text-${clientData.text.color}-${clientData.text.shade}`, `border-${clientData.text.color}-${clientData.text.shade}`, `hover:text-${clientData.text.color}-${clientData.hoverShade}`, `hover:border-b-2`, `hover:border-${clientData.text.color}-${clientData.hoverShade}`))
}

const removeTextColor = () => {
    document.querySelector('#text-color-field').classList.remove(`bg-${clientData.text.color}-${clientData.text.shade}`)
    document.querySelector('#current-project').classList.remove(`text-${clientData.text.color}-${clientData.text.shade}`)
    document.querySelectorAll('#nav-bar > div').forEach(div => div.classList.remove(`text-${clientData.text.color}-${clientData.text.shade}`, `border-${clientData.text.color}-${clientData.text.shade}`, `hover:text-${clientData.text.color}-${clientData.hoverShade}`, `hover:border-b-2`, `hover:border-${clientData.text.color}-${clientData.hoverShade}`))
}


// GRADIENT-THEME

const chooseGradientStyle = (e) => {
    removeGradientTheme()
    clientData.gradient = e.target.value
    setGradientTheme()
}

const setGradientTheme = () => {
    if(clientData.gradient == "monochrome") {
        if (clientData.background.shade > clientData.text.shade && (clientData.background.shade && clientData.text.shade)) { //shades ought to be not null
            clientData.gradientRange = Math.max((clientData.background.shade - clientData.text.shade), 200)
            document.querySelector('#nav-bar').classList.add(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.add(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.add(`to-${clientData.background.color}-${(clientData.background.shade - clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.add(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.add(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.add(`to-${clientData.background.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade < clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.text.shade - clientData.background.shade), 200)
            document.querySelector('#nav-bar').classList.add(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.add(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.add(`to-${clientData.background.color}-${(clientData.background.shade + clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.add(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.add(`from-${clientData.background.color}-${clientData.background.shade + clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.add(`to-${clientData.background.color}-${clientData.text.shade}`)
            return
        }
    }
    if (clientData.gradient == "mixed") {
        if (clientData.background.shade > clientData.text.shade && (clientData.background.shade && clientData.text.shade)) { //shades ought to be not null
            clientData.gradientRange = Math.max((clientData.background.shade - clientData.text.shade), 200)
            document.querySelector('#nav-bar').classList.add(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.add(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.add(`to-${clientData.text.color}-${(clientData.background.shade - clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.add(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.add(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.add(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade < clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.text.shade - clientData.background.shade), 200)
            document.querySelector('#nav-bar').classList.add(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.add(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.add(`to-${clientData.text.color}-${(clientData.background.shade + clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.add(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.add(`from-${clientData.background.color}-${clientData.background.shade + clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.add(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade === clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange === 0
            document.querySelector('#nav-bar').classList.add(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.add(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.add(`to-${clientData.text.color}-${(clientData.background.shade)}`)
            document.querySelector('#footer').classList.add(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.add(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.add(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
    }
}

const removeGradientTheme = () => {
    if(clientData.gradient == "monochrome") {
        if (clientData.background.shade > clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.background.shade - clientData.text.shade), 200)
            document.querySelector('#nav-bar').classList.remove(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.remove(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.remove(`to-${clientData.background.color}-${(clientData.background.shade - clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.remove(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.remove(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.remove(`to-${clientData.background.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade < clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.text.shade - clientData.background.shade), 200)
            document.querySelector('#nav-bar').classList.remove(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.remove(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.remove(`to-${clientData.background.color}-${(clientData.background.shade + clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.remove(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.remove(`from-${clientData.background.color}-${clientData.background.shade + clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.remove(`to-${clientData.background.color}-${clientData.text.shade}`)
            return
        }
    }
    if (clientData.gradient == "mixed") {
        if (clientData.background.shade > clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.background.shade - clientData.text.shade), 200)
            document.querySelector('#nav-bar').classList.remove(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.remove(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.remove(`to-${clientData.text.color}-${(clientData.background.shade - clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.remove(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.remove(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.remove(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade < clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange = Math.max((clientData.text.shade - clientData.background.shade), 200)
            document.querySelector('#nav-bar').classList.remove(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.remove(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.remove(`to-${clientData.text.color}-${(clientData.background.shade + clientData.gradientRange / 2)}`)
            document.querySelector('#footer').classList.remove(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.remove(`from-${clientData.background.color}-${clientData.background.shade + clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.remove(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
        if (clientData.background.shade === clientData.text.shade && (clientData.background.shade && clientData.text.shade)) {
            clientData.gradientRange === 0
            document.querySelector('#nav-bar').classList.remove(`bg-gradient-to-r`)
            document.querySelector('#nav-bar').classList.remove(`from-${clientData.background.color}-${clientData.background.shade}`)
            document.querySelector('#nav-bar').classList.remove(`to-${clientData.text.color}-${(clientData.background.shade)}`)
            document.querySelector('#footer').classList.remove(`bg-gradient-to-l`)
            document.querySelector('#footer').classList.remove(`from-${clientData.background.color}-${clientData.background.shade - clientData.gradientRange / 2}`)
            document.querySelector('#footer').classList.remove(`to-${clientData.text.color}-${clientData.text.shade}`)
            return
        }
    }
}


//Event-Listeners

backgroundColorPalette.forEach(div => div.addEventListener('click', chooseBackgroundColor))
textColorPalette.forEach(div => div.addEventListener('click', chooseTextColor))
gradientButtons.forEach(button => button.addEventListener('click', chooseGradientStyle))
coverButtons.forEach(button => button.addEventListener('click', chooseCoverStyle))