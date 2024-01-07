import { callProcedure } from '@trpc/server';
import { APP_CHANNEL_NAME } from '@~/constants';
import { appRouter } from '@~/trpc';
import { BrowserWindow, app, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '..', '..', 'pre-load', 'dist', 'index.js'),
    },
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
    console.log('window-all-closed');
    app.quit();
  });

  await app.whenReady();

  ipcMain.handle(
    APP_CHANNEL_NAME,
    async (
      e,
      {
        id,
        type,
        path,
        input,
        context,
      }: {
        id: unknown;
        type: 'query' | 'mutation' | 'subscription';
        path: string;
        input: unknown;
        context: unknown;
      }
    ) => {
      console.log({ e, ...{ id, type, path, input, context } });

      const result = await callProcedure({
        procedures: appRouter._def.procedures,
        input: 5,
        ctx: context,
        rawInput: input,
        path,
        type,
      });
      // ここのログが発火しない
      console.log({ result });

      return result;
    }
  );

  await createWindow();

  app.on('activate', () => {
    const handler = async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    };

    handler().catch((err) => {
      throw err;
    });
  });
};

main().catch((err) => {
  throw err;
});
