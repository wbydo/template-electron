import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    // },
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000';

  await win.loadURL(appURL);

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
};

const main = async () => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  await app.whenReady().catch(() => {
    console.log('zxcv1');
    throw new Error();
  });
  await createWindow();

  app.on('activate', () => {
    const handler = async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    };

    handler().catch((err) => {
      console.log('asdf');
      throw err;
    });
  });
};

main().catch((err) => {
  console.log('zxcvzxcv');
  console.error(err);
  throw err;
});
