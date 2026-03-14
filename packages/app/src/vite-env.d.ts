/// <reference types="vite/client" />

interface Window {
	__IS_ELECTRON__?: boolean;
	getApiPort?: () => Promise<number>;
}
