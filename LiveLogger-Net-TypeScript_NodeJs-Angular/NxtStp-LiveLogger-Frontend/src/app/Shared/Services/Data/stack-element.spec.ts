import { StackElement } from './stack-element';

describe('StackElement', () => {
  it('should create an instance', () => {
    expect(new StackElement("", [], [], {})).toBeTruthy();
  });

});
