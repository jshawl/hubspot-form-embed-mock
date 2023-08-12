import { hbspt } from "./hbspt";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";

const options = {
  portalId: "",
  formId: "",
};

const submitForm = (valid = true) => {
  document
    .querySelector("input")
    ?.setAttribute("value", valid ? "example@example.org" : "");
  document.querySelector("form")?.submit();
};

describe("hbspt module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("create() adds a form to the DOM", () => {
    expect(document.body.querySelector("form")).toBeFalsy();
    hbspt.forms.create({
      ...options,
    });
    expect(document.body.querySelector("form")).toBeTruthy();
  });

  test("target", () => {
    const id = btoa(Math.random().toString()).substring(10, 15);
    document.body.innerHTML = `<div id="${id}"></div>`;
    hbspt.forms.create({
      ...options,
      target: `#${id}`,
    });
    expect(document.body.querySelector(`#${id} form`)).toBeTruthy();
  });

  test("cssClass", () => {
    const cssClass = btoa(Math.random().toString()).substring(10, 15);
    hbspt.forms.create({
      ...options,
      cssClass,
    });
    expect(
      document.body.querySelector("form")?.classList.contains(cssClass),
    ).toBe(true);
  });

  test("submitButtonClass", () => {
    const submitButtonClass = btoa(Math.random().toString()).substring(10, 15);
    hbspt.forms.create({
      ...options,
      submitButtonClass,
    });
    expect(
      document.body
        .querySelector("form input[type='submit']")
        ?.classList.contains(submitButtonClass),
    ).toBe(true);
  });

  test("submitText", () => {
    const submitText = "Submit, please!";
    hbspt.forms.create({
      ...options,
      submitText,
    });
    const submit = document.body.querySelector(
      "input[type='submit']",
    ) as HTMLInputElement;
    expect(submit?.value).toBe(submitText);
  });

  test("inlineMessage", () => {
    const inlineMessage = "Thank you!";
    hbspt.forms.create({
      ...options,
      inlineMessage,
    });
    submitForm();
    expect(document.body.innerHTML).toEqual(inlineMessage);
  });

  test("redirectUrl", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: "/",
      },
      writable: true,
    });
    const redirectUrl = "https://example.org/";
    hbspt.forms.create({
      ...options,
      redirectUrl,
    });
    submitForm();
    expect(window.location.href).toEqual(redirectUrl);
  });

  test("onBeforeFormInit", () => {
    const onBeforeFormInit = jest.fn();
    hbspt.forms.create({
      ...options,
      onBeforeFormInit,
    });
    expect(onBeforeFormInit).toHaveBeenCalled();
  });

  test("onFormReady", () => {
    const onFormReady = jest.fn();
    hbspt.forms.create({
      ...options,
      onFormReady,
    });
    expect(onFormReady).toHaveBeenCalled();
  });

  test("onBeforeFormSubmit", () => {
    const onBeforeFormSubmit = jest.fn();
    hbspt.forms.create({
      ...options,
      onBeforeFormSubmit,
    });
    document.querySelector("form")?.submit();
    expect(onBeforeFormSubmit).toHaveBeenCalled();
  });

  test("onFormSubmit is called before validation", () => {
    const onFormSubmit = jest.fn();
    hbspt.forms.create({
      ...options,
      onFormSubmit,
    });
    submitForm(false);
    expect(onFormSubmit).toHaveBeenCalled();
  });

  test("onFormSubmitted is called after validation", () => {
    const onFormSubmitted = jest.fn();
    hbspt.forms.create({
      ...options,
      onFormSubmitted,
    });
    submitForm();
    expect(onFormSubmitted).toHaveBeenCalled();
  });
});
