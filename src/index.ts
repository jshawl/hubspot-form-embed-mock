window.hbspt = {
  forms: {
    create: ({ onFormReady, onFormSubmit, onFormSubmitted }) => {
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
        onFormSubmit(form);
        if (!input.value) {
          return false;
        }
        onFormSubmitted(form);
      });

      document.body.appendChild(form);
      onFormReady(form);
    },
  },
};
