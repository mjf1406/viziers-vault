/** @format */

import { app as electronApp, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startLocalServer } from "./server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;
let apiPort = 3001;

function getWindowIconPath() {
	if (!electronApp.isPackaged) {
		return path.join(__dirname, "..", "..", "shared", "src", "favicon.ico");
	}

	return path.join(process.resourcesPath, "favicon.ico");
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		icon: getWindowIconPath(),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	const isDev = !electronApp.isPackaged;
	const indexUrl = isDev
		? `file://${path.join(__dirname, "..", "..", "app", "dist", "index.html")}`
		: `file://${path.join(process.resourcesPath, "app-dist", "index.html")}`;

	mainWindow.loadURL(indexUrl + "#/");
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

electronApp.whenReady().then(async () => {
	apiPort = await startLocalServer(electronApp.getPath("userData"));
	ipcMain.handle("get-api-port", () => apiPort);
	createWindow();
});

electronApp.on("window-all-closed", () => {
	electronApp.quit();
});
