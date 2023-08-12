import { hbspt } from "./hbspt";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";

describe("hbspt module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("create() adds a form to the DOM", () => {
    expect(document.body.querySelector("form")).toBeFalsy();
    hbspt.forms.create({});
    expect(document.body.querySelector("form")).toBeTruthy();
  });
  test("onFormReady", () => {
    const onFormReady = jest.fn();
    hbspt.forms.create({
      onFormReady,
    });
    expect(onFormReady).toHaveBeenCalled();
  });
  test("onFormSubmit is called before validation", () => {
    const onFormSubmit = jest.fn();
    hbspt.forms.create({
      onFormSubmit,
    });
    document.querySelector("input")?.setAttribute("value", "");
    document.querySelector("form")?.submit();
    expect(onFormSubmit).toHaveBeenCalled();
  });
  test("onFormSubmitted is called after validation", () => {
    const onFormSubmitted = jest.fn();
    hbspt.forms.create({
      onFormSubmitted,
    });
    document
      .querySelector("input")
      ?.setAttribute("value", "example@example.org");
    document.querySelector("form")?.submit();
    expect(onFormSubmitted).toHaveBeenCalled();
  });
});
