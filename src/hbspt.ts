interface Options {
  onFormReady?: (form: HTMLFormElement) => void;
  onFormSubmit?: (form: HTMLFormElement) => void;
  onFormSubmitted?: (form: HTMLFormElement) => void;
}

export const hbspt = {
    forms: {
      create: ({ onFormReady, onFormSubmit, onFormSubmitted }: Options) => {
        const form = document.createElement("form");
        const input = document.createElement("input");
        const submit = document.createElement("button");
        submit.innerHTML = "Submit";
        submit.setAttribute("type", "submit");
        input.setAttribute("type", "email");
        form.appendChild(input);
        form.appendChild(submit);
  
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          if( onFormSubmit )
            onFormSubmit(form);
          if (!input.value) {
            return false;
          }
          if( onFormSubmitted )
            onFormSubmitted(form);
        });
  
        document.body.appendChild(form);
        if( onFormReady )
          onFormReady(form);
      },
    },
  }
