import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  doAnything: async () => {
    await ipcRenderer.invoke('myAPI.doAnything');
  },
});
