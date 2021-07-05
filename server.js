const express = require('express')
const zip = require('express-zip')
const path = require('path')
const fs = require('fs')
var ejs = require('ejs');
const app = express()
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8080
const IP = '127.0.0.1'

let runtimeDatabase = []



const createClientFile = (req, data) => {
    let skeleton = fs.readFileSync('./views/skeleton.ejs', 'utf-8')
    let indexHtml = ejs.render(skeleton, { clientData: data, path: path, __dirname: __dirname, Math: Math })
    fs.writeFileSync(`./client-files/${req.query.id}.html`, indexHtml, 'utf8')
}

const createClientFolderStructure = (req, data) => {
    let languages = []
    let frameworks = []
    let databases = []
    let folderStructure = []
    folderStructure.push({ path: `./client-files/${req.query.id}.html`, name: 'your-website/index.html' })
    folderStructure.push({ path: './views/public/styles.css', name: 'your-website/public/styles.css' })
    folderStructure.push({ path: './views/icons/tailwind.png', name: 'your-website/icons/tailwind.png' })
    data.projectCollection.forEach(project => {
        if (project.language && languages.indexOf(project.language) === -1) {
            languages.push(project.language)
            folderStructure.push({ path: `./views/icons/language/${project.language}.png`, name: `your-website/icons/language/${project.language}.png` })
        }
        if (project.framework && frameworks.indexOf(project.framework) === -1) {
            frameworks.push(project.framework)
            folderStructure.push({ path: `./views/icons/framework/${project.framework}.png`, name: `your-website/icons/framework/${project.framework}.png` })
        }
        if (project.database && databases.indexOf(project.database) === -1) {
            databases.push(project.database)
            folderStructure.push({ path: `./views/icons/database/${project.database}.png`, name: `your-website/icons/database/${project.database}.png` })
        }
    })
    return folderStructure
}


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded());


app.post('/', (req, res) => {
    let clientData = req.body
    clientData.id = uuidv4()
    runtimeDatabase.push(clientData)
    res.json({ id: `${clientData.id}`})
})

app.get('/download', (req, res) => {
    let matchingData = {}
    runtimeDatabase.forEach(entry => {
        if (entry.id === req.query.id) {
            matchingData = entry
            return
        }
    })
    
    createClientFile(req, matchingData)
    //console.log(matchingData)
    res.zip(createClientFolderStructure(req, matchingData))
})


app.get('/views', (req, res) => {
    let matchingData = {}
    runtimeDatabase.forEach(entry => {
        if (entry.id === req.query.id) {
            matchingData = entry
            return
        }
    })
    res.render('skeleton', { clientData: matchingData, path: path, __dirname: __dirname, Math: Math })
})


//app.get('/views/:id', (req, res) => {
//    const { id } = req.params
//    let matchingData = {}
//    runtimeDatabase.forEach(entry => {
//        if (entry.id === id) {
//            matchingData = entry
//            return
//        }
//    })
//    res.render('skeleton', { clientData: matchingData, path: path, __dirname: __dirname, Math: Math })
//})

app.use(express.static(__dirname))

app.listen(PORT, IP, () => { console.log(`Server listening on Ip: ${IP}, Port: ${PORT}`) })
