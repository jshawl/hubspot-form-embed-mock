interface Options {
  portalId: number | string;
  formId: string;
  region?: string;
  target?: string;
  redirectUrl?: string;
  inlineMessage?: string;
  pageId?: string;
  cssRequired?: string;
  cssClass?: string;
  css?: string;
  submitText?: string;
  submitButtonClass?: string;
  errorClass?: string;
  errorMessageClass?: string;
  locale?: string;
  translations?: Record<string, unknown>;
  manuallyBlockedEmailDomain?: string;
  formInstanceId?: string;
  sfdcCampaignId?: string;
  goToWebinarWebinarKey?: string;
  onBeforeFormInit?: (context: Options) => void;
  onFormReady?: (form: HTMLFormElement) => void;
  onFormSubmit?: (form: HTMLFormElement) => void;
  onBeforeFormSubmit?: (form: HTMLFormElement) => void;
  onFormSubmitted?: (form: HTMLFormElement) => void;
}

export const hbspt = {
  forms: {
    create: (options: Options) => {
      if (options.onBeforeFormInit) {
        options.onBeforeFormInit(options);
      }
      let container: HTMLElement | null;
      if (options.target) {
        container = document.querySelector(options.target);
      } else {
        container = document.body;
      }
      const form = document.createElement("form");
      if (options.cssClass) {
        form.classList.add(options.cssClass);
      }
      const input = document.createElement("input");
      const submit = document.createElement("input");
      submit.setAttribute("type", "submit");
      if (options.submitButtonClass) {
        submit.classList.add(options.submitButtonClass);
      }
      const label = document.createElement("label");
      label.innerHTML =
        "<span>Email</span><span class='hs-form-required'>*</span>";
      if (options.submitText) {
        submit.value = options.submitText;
      } else {
        submit.value = "Submit";
      }
      submit.setAttribute("type", "submit");
      input.setAttribute("type", "email");
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(submit);

      form.addEventListener("submit", (e) => {
        if (options.onBeforeFormSubmit) {
          options.onBeforeFormSubmit(form);
        }
        e.preventDefault();
        if (options.onFormSubmit) {
          options.onFormSubmit(form);
        }

        if (!input.value) {
          return false;
        }
        if (options.onFormSubmitted) options.onFormSubmitted(form);

        if (options.inlineMessage && container) {
          container.innerHTML = options.inlineMessage;
        }
        if (options.redirectUrl) {
          window.location.href = options.redirectUrl;
        }
      });

      container?.appendChild(form);

      if (options.onFormReady) options.onFormReady(form);
    },
  },
};
