export {};

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: Options) => void;
      };
    };
  }
}

window.hbspt = window.hbspt || {};
