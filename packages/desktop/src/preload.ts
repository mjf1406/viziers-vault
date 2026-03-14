/** @format */

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("__IS_ELECTRON__", true);
contextBridge.exposeInMainWorld("getApiPort", () =>
	ipcRenderer.invoke("get-api-port"),
);
