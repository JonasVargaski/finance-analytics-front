declare global {
  interface Window {
    reactQueryDebug: () => void;
    fbq(...args: any);
    _fbq: Window['fbq'];
  }
}

export {};
