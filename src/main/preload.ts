import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
      // whitelist channels
      let validChannels = ["toMain","closeApp",'minimizeApp','photoToCopy',"requestRegistration"];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
  },
  receive: (channel, func) => {
      let validChannels = ["fromMain","photosPath","registrationFiles"];
      if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender` 
          ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
  },
 
})
