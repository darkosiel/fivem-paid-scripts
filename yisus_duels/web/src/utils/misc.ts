export const isEnvBrowser = (): boolean => !(window as any).invokeNative
export const delay = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms)); }