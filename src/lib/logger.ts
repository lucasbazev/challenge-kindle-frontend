export const DevLogger = {
  isDev: import.meta.env.DEV,

  log: function (...args: any[]) {
    if (!this.isDev) return;
    console.log(...args);
  },

  error: function (...args: any[]) {
    if (!this.isDev) return;
    console.error(...args);
  },
};
