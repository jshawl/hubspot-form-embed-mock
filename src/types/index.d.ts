export {};

interface Options {
  onFormReady: (form: HTMLFormElement) => void;
  onFormSubmit: (form: HTMLFormElement) => void;
  onFormSubmitted: (form: HTMLFormElement) => void;
}

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
