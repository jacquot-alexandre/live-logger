import { ParsableStack } from './parsable-stack';
import { ParsableStackElement } from './parsable-stackelement';
import { StackElement } from './stack-element';

describe('ParsableStack', () => {
  it('should create an instance', () => {
    expect(new ParsableStack(new ParsableStackElement())).toBeTruthy();
  });

  it('toJson - Test N°1' , () => {
    let parsableStack =  new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    expect(parsableStack.toJson())
    .toEqual([]);
  });

  it('toJson - Test N°2' , () => {
    let parsableStack =  new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    parsableStack.push(new ParsableStackElement());
    expect(parsableStack.toJson())
    .toEqual(
      [
        {
          "metadata" : "",
          "unprocessedMessages": [],
          "processedMessages": [],
          "calculations": {}
        }
      ]);
  });

  it('toJson - Test N°3' , () => {
    let parsableStack =  new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    parsableStack.push(new ParsableStackElement());
    parsableStack.push(new ParsableStackElement());
    expect(parsableStack.toJson())
    .toEqual(
      [
        {
          "metadata" : "",
          "unprocessedMessages": [],
          "processedMessages": [],
          "calculations": {}
        },
        {
          "metadata" : "",
          "unprocessedMessages": [],
          "processedMessages": [],
          "calculations": {}
        }
      ]);
  });

  it('toJson - Test N°4' , () => {
    let parsableStack =  new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    let el1 = new ParsableStackElement();
    el1.metaData = "Some description";
    el1.unprocessedMessages = [];
    el1.processedMessages = [
      {"transformation" : "a transformation"},
      {"execution time" : 1}
    ];
    el1.calculations = {
      "sum" : 2,
      "mean" : 1,
      "standard deviation" : 0
    }
    parsableStack.push(el1);
    parsableStack.push(new ParsableStackElement());
    expect(parsableStack.toJson())
    .toEqual(
      [
        {
          "metadata" : "",
          "unprocessedMessages": [],
          "processedMessages": [],
          "calculations": {}
        },
        {
          "metadata" : "Some description",
          "unprocessedMessages": [],
          "processedMessages": [
            {"transformation" : "a transformation"},
            {"execution time" : 1}
          ],
          "calculations": {
            "sum" : 2,
            "mean" : 1,
            "standard deviation" : 0
          }
        }
      ]);
  });

  it('factory - Test N°1' , () => {
    let parsableStackBuilder =  new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    let parsableStack = parsableStackBuilder.factory(
      [
        {
          "metadata" : "",
          "unprocessedMessages": [],
          "processedMessages": [],
          "calculations": {}
        },
        {
          "metadata" : "Some description",
          "unprocessedMessages": [],
          "processedMessages": [
            {"transformation" : "a transformation"},
            {"execution time" : 1}
          ],
          "calculations": {
            "sum" : 2,
            "mean" : 1,
            "standard deviation" : 0
          }
        }
      ]
    )
    let el1 = parsableStack.pop() as unknown as StackElement;
    let el2 = parsableStack.pop() as unknown as StackElement;
    expect(el1.metaData).toEqual("Some description");
    expect(el1.processedMessages).toEqual([
      {"transformation" : "a transformation"},
      {"execution time" : 1}
    ]);
    expect(el1.calculations).toEqual({
      "sum" : 2,
      "mean" : 1,
      "standard deviation" : 0
    })
    expect(el2.metaData).toEqual("");
    expect(el2.processedMessages).toEqual([]);
    expect(el2.calculations).toEqual({});
  });

});
