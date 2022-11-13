import { app, BrowserWindow, ipcMain, session,shell } from "electron"
import { join, basename } from "path"
import contextMenu from "electron-context-menu"
contextMenu({
  showSaveImageAs: true,
  showInspectElement: false,
  showSearchWithGoogle: false,
  showSelectAll: false,
  shouldShowMenu: (event, parameters) => parameters.inputFieldType == "plainText",
})
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, readdir } from "fs"
import { readdirSync } from "original-fs"

const path = join(app.getAppPath(), "static", "db.json")
const photosPath = join(app.getAppPath(), "renderer", "/photos/")

const buffer = readFileSync(path)
var mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    transparent: true,

    resizable: false,
    frame: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`).then(() => {
      const path = join(app.getAppPath(), "static", "db.json")
      const buffer = readFileSync(path, "utf8")
      console.log(buffer)
      //mainWindow.webContents.on('dom-ready', () => {
      mainWindow.webContents.send("fromMain", JSON.parse(buffer))
      mainWindow.webContents.send("photosPath", photosPath)
      //})
    })
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"))
    const path = join(app.getAppPath(), "static", "db.json")
    const buffer = readFileSync(path, "utf8")
    mainWindow.webContents.on("dom-ready", () => {
      mainWindow.webContents.send("fromMain", JSON.parse(buffer))
      mainWindow.webContents.send("photosPath", photosPath)
    })
  }
}

app.whenReady().then(() => {
  createWindow()

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    })
  })

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
ipcMain.on("toMain", (event, args) => {
  console.log(args)
  const path = join(app.getAppPath(), "static", "db.json")
  writeFileSync(path, args)
})
ipcMain.on("closeApp", (event) => {
  var nowDate = new Date(); 
  const backupPath = join(app.getAppPath(), "static", "backup_")
var date = nowDate.getFullYear()+'_'+(nowDate.getMonth()+1)+'_'+nowDate.getDate(); 
copyFileSync(path,backupPath + date + ".json");
  app.quit()
})
ipcMain.on("minimizeApp", (event) => {
  mainWindow.minimize()
})
ipcMain.on("photoToCopy", (event, args) => {
  copyFileSync(args.photoPath, photosPath + basename(args.photoName))
})
ipcMain.on("copyKoc", (event, args) => {
  copyFileSync(args.photoPath, photosPath + `${args.id}/`+ basename(args.photoName))
})
ipcMain.on("copyIsg", (event, args) => {
  copyFileSync(args.photoPath, photosPath + `${args.id}/`+ basename(args.photoName))
})
ipcMain.on('requestRegistration',async (event,args)=>{
  readRegistrationFiles(args).then(result=>{
    
    shell.openPath(result);
    //mainWindow.webContents.send("registrationFiles", result)
  }).catch(err=>{
    //mainWindow.webContents.send("registrationFiles", err)
  })
 
  // if(result != false){
  //   mainWindow.webContents.send("registrationFiles", result)
  // }
  // else{
  //   mainWindow.webContents.send("registrationFiles", result)
  // }
})
function readRegistrationFiles(id) {
  return new Promise((resolve, reject) => {
    const path = join(photosPath, id)
    
    if (!existsSync(path)) {
      mkdirSync(path)
      return resolve(path)
    } else {
      
       
       return resolve(path)
      
      
    }
    
  })
}
