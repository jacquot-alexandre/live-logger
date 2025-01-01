import { TestBed } from '@angular/core/testing';

import { LibraryServiceService } from './library-service.service';

describe('LibraryServiceService', () => {
  let service: LibraryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parseJsonIfKeyExist - Test N°1', () => {
    expect((service as any).returnJsonObjectIfKeyExist('',{"Name": "John", "Age": 30, "City": "New York"})).
    toEqual([false,undefined]);
  });

  it('parseJsonIfKeyExist - Test N°2', () => {
    expect((service as any).returnJsonObjectIfKeyExist('City',{"Name": "John", "Age": 30, "City": "New York"}))
    .toEqual([true,JSON.parse('{"Name": "John", "Age": 30, "City": "New York"}')]);
  });

  it('extractKeyDictionaryFromArrayOfJsonObject - Test N°1' , () => {
    expect(service.extractDistinctKeysFromArrayOfJsonObject([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "John", "Minimum Age": 10}]))
    .toEqual(["Name", "Age", "City", "Minimum Age"]);
  });

  it('getKeysOfJsonObject - Test N°1', () => {
    expect(service.getKeysOfJsonObject({"Name": "John", "Age": 30, "City": "New York"}))
    .toEqual(["Name", "Age", "City"]);
  });

  it('doesJsonObjectInArrayHaveSameKeysAndSize - Test N°1' , () => {
    expect(service.doesJsonObjectInArrayHaveSameKeysAndSize([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual(false);
  });

  it('doesJsonObjectInArrayHaveSameKeysAndSize - Test N°2' , () => {
    expect(service.doesJsonObjectInArrayHaveSameKeysAndSize([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(true);
  });

  it('doesJsonObjectInArrayHaveSameKeysAndSize - Test N°3' , () => {
    expect(service.doesJsonObjectInArrayHaveSameKeysAndSize([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age2": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('isValueOfKeyANumber - Test N°1' , () => {
    expect((service as any).isValueOfKeyANumber("Age", {"Name": "John", "Age": 30, "City": "New York"})) // service as any
    .toEqual(true);
  });

  it('isValueOfKeyANumber - Test N°2' , () => {
    expect((service as any).isValueOfKeyANumber("Name", {"Name": "John", "Age": 30, "City": "New York"}))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeNumber - Test N°1' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeNumber("Age", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(true);
  });

  it('doesAllValuesAssociatedWithKeyBeNumber - Test N°2' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeNumber("Name", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeNumber - Test N°3' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeNumber("City", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeNumber - Test N°4' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeNumber("DoesNotExistKey", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber - Test N°1' , () => {
    expect((service as any).extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(["Age"]);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber - Test N°2' , () => {
    expect((service as any).extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber([{"Name": "John", "Age": 30, "City": "New York", "Salary": 80000}, {"Name": "Jane", "Age": 25, "City": "London", "Salary": 70000}]))
    .toEqual(["Age", "Salary"]);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber - Test N°2' , () => {
    expect((service as any).extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([]);
  });

  it('sortJsonArrayByValues - Test N°1' , () => {
    expect((service as any).sortJsonArrayByValues("Age", true, [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]);
  });

  it('sortJsonArrayByValues - Test N°2' , () => {
    expect((service as any).sortJsonArrayByValues("Age", false, [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual([{"Name": "Jane", "Age": 25, "City": "London"}, {"Name": "John", "Age": 30, "City": "New York"}]);
  });

  it('filterJsonArray - Test N°1' , () => {
    expect(service.filterByKeyJsonArray("Name",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]);
  });

  it('filterJsonArray - Test N°2' , () => {
    expect(service.filterByKeyJsonArray("Age",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]);
  });

  it('filterJsonArray - Test N°3' , () => {
    expect(service.filterByKeyJsonArray("productId",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([{"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]);
  });

  it('checkIfKeyExistInAllJsonObjectOfTheArray - Test N°1' , () => {
    expect((service as any).checkIfKeyExistInAllJsonObjectOfTheArray("City",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(true);
  });

  it('checkIfKeyExistInAllJsonObjectOfTheArray - Test N°2' , () => {
    expect((service as any).checkIfKeyExistInAllJsonObjectOfTheArray("ToTo",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('checkIfKeyExistInAllJsonObjectOfTheArray - Test N°3' , () => {
    expect((service as any).checkIfKeyExistInAllJsonObjectOfTheArray("Name",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25}]))
    .toEqual(true);
  });

  it('checkIfKeyExistInAllJsonObjectOfTheArray - Test N°4' , () => {
    expect((service as any).checkIfKeyExistInAllJsonObjectOfTheArray("City",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25}]))
    .toEqual(false);
  });

  it('extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject - Test N°1' , () => {
    expect(service.extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject("City",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(["New York", "London"]);
  });

  it('extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject - Test N°2' , () => {
    expect(service.extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject("ToTo",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual([]);
  });

  it('extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject - Test N°3' , () => {
    expect(service.extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject("productId",[{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([]);
  });

  it('filterByValueJsonArray - Test N°1' , () => {
    expect(service.filterByValueJsonArray("Name", "John", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([{'Name': 'John', "Age": 30, "City": "New York"}]);
  });

  it('extractValuesFromJsonArray - Test N°1' , () => {
    expect(service.extractValuesFromJsonArray("Age", [{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([30, 25]);
  });

  it('extractValuesFromJsonArray - Test N°2' , () => {
    expect(service.extractValuesFromJsonArray("Age", [{"Name": "John", "Age_": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([25]);
  });

  it('extractValuesFromJsonArray - Test N°3' , () => {
    expect(service.extractValuesFromJsonArray("Age", [{"Name": "John", "Age_": 30, "City": "New York"}, {"Name": "Jane", "Age_": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([]);
  });

  it('extractValuesFromJsonArray - Test N°4' , () => {
    expect(service.extractValuesFromJsonArray("Age", [{"Name": "John", "Age_": 30, "City": "New York"}, {"Name": "Jane", "Age_": 25, "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([]);
  });

  it('extractValuesFromJsonArray - Test N°5' , () => {
    expect(service.extractValuesFromJsonArray("Time stamp", [{"Name": "John", "Time stamp": "2024-02-22 08:38:09.141", "City": "New York"}, {"Name": "Jane", "Time stamp": "2024-02-22 08:39:09.141", "City": "London"}, {"productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }]))
    .toEqual([1708587489141, 1708587549141]);
  });

  it('extractTokenFromString - Test N°1' , () => {
    expect((service as any).extractTokenFromString("This is a simple test with two different token <token1> and <token2>"))
    .toEqual(["<token1>", "<token2>"]);
  });

  it('extractTokenFromString - Test N°2' , () => {
    expect((service as any).extractTokenFromString("This is a simple test with two different token <token1> and <token1>"))
    .toEqual(["<token1>"]);
  });

  it('extractTokenFromStringArray - Test N°1' , () => {
    expect(service.extractTokenFromStringArray(["This is a simple test with two different token <token1> and <token2>", "and <token3>"]))
    .toEqual(["<token1>", "<token2>", "<token3>"]);
  });

  it('extractTokenFromStringArray - Test N°2' , () => {
    expect(service.extractTokenFromStringArray(["This is a simple test with two different token <token1> and <token2> and <token3>", "and <token3> and <token1>"]))
    .toEqual(["<token1>", "<token2>", "<token3>"]);
  });

  it('extractTokenFromStringArray - Test N°3' , () => {
    expect(service.extractTokenFromStringArray([]))
    .toEqual([]);
  });

  it('extractTokenFromStringArray - Test N°1' , () => {
    expect(service.containsToken(["<Token1>", "<Token2>"], "The text contains one of the token, <Token2>"))
    .toEqual(true);
  });

  it('extractTokenFromStringArray - Test N°1' , () => {
    expect(service.containsToken(["<Token1>", "<Token2>"], "The text contains one of the token"))
    .toEqual(false);
  });

  it('sortTimeStampArray - Test N°1' , () => {
    expect((service as any).sortTimeStampArray(["2024-02-22 08:38:09.143", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.183", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.140", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.143"]))
    .toEqual(["2024-02-22 08:38:09.140", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.141", "2024-02-22 08:38:09.143", "2024-02-22 08:38:09.143", "2024-02-22 08:38:09.183"]);
  });

  it('isTimeStamp - Test N°1' , () => {
    expect((service as any).isTimeStamp("2024-02-22 08:38:09.143"))
    .toEqual(true);
  });

  it('isTimeStamp - Test N°2' , () => {
    expect((service as any).isTimeStamp("XXX"))
    .toEqual(false);
  });

  it('isTimeStamp - Test N°3' , () => {
    expect((service as any).isTimeStamp(1))
    .toEqual(false);
  });

  it('isTimeStamp - Test N°4' , () => {
    expect((service as any).isTimeStamp("1"))
    .toEqual(false);
  });

  it('isTimeStamp - Test N°5' , () => {
    expect((service as any).isTimeStamp("9834577a-153c-4f70-aacd-85cd37d0e8b6"))
    .toEqual(false);
  });

  it('isTimeStamp - Test N°6' , () => {
    expect((service as any).isTimeStamp(1.4))
    .toEqual(false);
  });


  it('sortJsonArrayByTimeStamps - Test N°1' , () => {
    expect((service as any).sortJsonArrayByTimeStamps("Time stamp", false, [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-22 08:10:52.776"}]))
    .toEqual([{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-22 08:10:52.776"}]);
  });

  it('sortJsonArrayByTimeStamps - Test N°2' , () => {
    expect((service as any).sortJsonArrayByTimeStamps("Time stamp", true, [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-22 08:10:52.776"}]))
    .toEqual([{"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-22 08:10:52.776"}, {"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}]);
  });

  it('isValueOfKeyATimeStamp - Test N°1' , () => {
    expect((service as any).isValueOfKeyATimeStamp("Time stamp", {"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"})) 
    .toEqual(true);
  });

  it('isValueOfKeyATimeStamp - Test N°2' , () => {
    expect((service as any).isValueOfKeyATimeStamp("Name", {"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeTimeStamp - Test N°1' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeTimeStamp("Time stamp", [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-23 08:10:51.777"}]))
    .toEqual(true);
  });

  it('doesAllValuesAssociatedWithKeyBeTimeStamp - Test N°2' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeTimeStamp("Age", [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-23 08:10:51.777"}]))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeTimeStamp - Test N°3' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeTimeStamp("Name", [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "2024-02-23 08:10:51.777"}]))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeTimeStamp - Test N°4' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeTimeStamp("Time stamp", [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London", "Time stamp": "A"}]))
    .toEqual(false);
  });

  it('doesAllValuesAssociatedWithKeyBeTimeStamp - Test N°5' , () => {
    expect((service as any).doesAllValuesAssociatedWithKeyBeTimeStamp("Time stamp", [{"Name": "John", "Age": 30, "City": "New York", "Time stamp": "2024-02-22 08:10:51.776"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(false);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps - Test N°1' , () => {
    expect((service as any).extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps([{"Name": "John", "Age": 30, "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774"}, {"Time stamp1": "2024-02-22 08:10:51.773", "Time stamp2": "2024-02-22 08:10:51.777", "Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(["Time stamp1", "Time stamp2"]);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps - Test N°2' , () => {
    expect((service as any).extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps([{"Name": "John", "Age": 30, "City": "New York"}, {"Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual([]);
  });

  it('extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumberOrTimeStamp - Test N°1' , () => {
    expect(service.extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumberOrTimeStamp([{"Name": "John", "Age": 30, "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774"}, {"Time stamp1": "2024-02-22 08:10:51.773", "Time stamp2": "2024-02-22 08:10:51.777", "Name": "Jane", "Age": 25, "City": "London"}]))
    .toEqual(["Age", "Time stamp1", "Time stamp2"]);
  });

  it('doesJsonOjectContainsAtLeastTwoNumbers - Test N°1' , () => {
    expect(service.doesJsonOjectContainsAtLeastTwoNumbers({"Name": "John", "Age": 30, "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774", "Age_": 32}))
    .toEqual([true, [30, 32]]);
  });

  it('doesJsonOjectContainsAtLeastTwoNumbers - Test N°2' , () => {
    expect(service.doesJsonOjectContainsAtLeastTwoNumbers({"Name": "John", "Age": 30, "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774"}))
    .toEqual([false, []]);
  });

  it('doesJsonOjectContainsAtLeastTwoTimeStamps - Test N°1' , () => {
    expect(service.doesJsonOjectContainsAtLeastTwoTimeStamps({"Name": "John", "Age": 30, "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774", "Age_": 32}))
    .toEqual([true, ["2024-02-22 08:10:51.771", "2024-02-22 08:10:51.774"]]);
  });

  
  it('doesJsonOjectContainsAtLeastTwoTimeStamps - Test N°1' , () => {
    expect(service.doesJsonOjectContainsAtLeastTwoTimeStamps({"Name": "John", "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Time stamp2": "2024-02-22 08:10:51.774"}))
    .toEqual([true, ["2024-02-22 08:10:51.771", "2024-02-22 08:10:51.774"]]);
  });

  it('doesJsonOjectContainsAtLeastTwoTimeStamps - Test N°1' , () => {
    expect(service.doesJsonOjectContainsAtLeastTwoTimeStamps({"Name": "John", "City": "New York", "Time stamp1": "2024-02-22 08:10:51.771", "Age": 30}))
    .toEqual([false, []]);
  });
  


  // doesJsonOjectContainsAtLeastTwoNumbers

  // doesJsonOjectContainsAtLeastTwoTimeStamps



});
