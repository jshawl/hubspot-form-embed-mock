import {hbspt} from "./hbspt";
import {describe, expect, test} from '@jest/globals';

describe('hbspt module', () => {
  test('create() adds a form to the DOM', () => {
    expect(document.body.querySelector("form")).toBeFalsy();
    hbspt.forms.create({})
    expect(document.body.querySelector("form")).toBeTruthy();
  });
});
