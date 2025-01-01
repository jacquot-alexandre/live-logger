import { ParsableStackElement } from './parsable-stackelement';

describe('ParsableStackElement', () => {
  it('should create an instance', () => {
    expect(new ParsableStackElement("", [], [], {})).toBeTruthy();
  });

  it('ParsableStackElement.factory - Test N°1' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : {}
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(new ParsableStackElement("", [], [], {}));
  });

  it('ParsableStackElement.factory - Test N°2' , () => {
    let jsonOject = {
      "_metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : {}
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°4' , () => {
    let jsonOject = {
      "metadata" : null,
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : {}
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°5' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : null,
      "calculations" : {}
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°6' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : null
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°7' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : []
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°8' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : ""
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°9' , () => {
    let jsonOject = {
      "metadata" : "",
      "unprocessedMessages" : [],
      "processedMessages" : [],
      "calculations" : 1
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(null);
  });

  it('ParsableStackElement.factory - Test N°10' , () => {
    let jsonOject = {
      "metadata" : "did reprocess",
      "unprocessedMessages" : [],
      "processedMessages" : [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}],
      "calculations" : {"sum": 55, "mean": 27.5, "standard deviation": 2.5}
    }
    let parsableStackElement = new ParsableStackElement();
    expect(parsableStackElement.factory(jsonOject))
    .toEqual(new ParsableStackElement("did reprocess", [], [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}], {"sum": 55, "mean": 27.5, "standard deviation": 2.5}));
  });

  it('ParsableStackElement.factory - Test N°11' , () => {
    expect(new ParsableStackElement("did reprocess", [], [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}], {"sum": 55, "mean": 27.5, "standard deviation": 2.5}).toJson())
    .toEqual(
      {
        "metadata" : "did reprocess",
        "unprocessedMessages" : [],
        "processedMessages" :  [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}],
        "calculations" :  {"sum": 55, "mean": 27.5, "standard deviation": 2.5}
      }
    );
  });
  
});
