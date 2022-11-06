import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
      // whitelist channels
      let validChannels = ["toMain","closeApp",'minimizeApp'];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
  },
  receive: (channel, func) => {
      let validChannels = ["fromMain","photosPath"];
      if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender` 
          ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
  }
})
