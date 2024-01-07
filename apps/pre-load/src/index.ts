import {
  APP_API_KEY,
  APP_API_PROPERTY_NAME,
  APP_CHANNEL_NAME,
} from '@~/constants';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(APP_API_KEY, {
  [APP_API_PROPERTY_NAME]: async (arg: unknown) => {
    console.debug('preload: input', { arg });

    const result = await ipcRenderer.invoke(APP_CHANNEL_NAME, arg);
    console.debug('preload: result', { result });
    return result;
  },
});
