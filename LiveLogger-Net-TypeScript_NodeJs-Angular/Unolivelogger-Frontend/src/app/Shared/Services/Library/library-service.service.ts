import { Injectable } from '@angular/core';

/**
 * Routines used by others services.
 * Must not contain states.
 * Routines must be small and reusable.
 * @date 2/6/2024 - 10:57:33 AM
 *
 * @export
 * @class LibraryServiceService
 * @typedef {LibraryServiceService}
 */
@Injectable({
  providedIn: 'root'
})

export class LibraryServiceService {

  //#region Constructor. 

  /**
   * The constructor.
   */
  constructor() 
  {
    //
  }

  //#endregion constructor 

  //#region public method 

  /**
  * Converts JSON data into an HTML table.
  *
  * @param jsonData - The JSON data to be converted into a table.
  *
  * @returns {string} - The HTML table representation of the JSON data.
  */
  public convertJsonToTable(jsonData: any): string 
  {
    // Create the table header row
    let tableHtml = '<table class="table table-dark table-striped"><thead><tr>';
    for (let key in jsonData[0]) {
      tableHtml += `<th>${key}</th>`;
    }
    tableHtml += '</tr></thead><tbody class="table-group-divider">';

    // Create the table rows
    for (let item of jsonData) {
      tableHtml += "<tr>";
      for (let key in item) {
        tableHtml += `<td>${item[key]}</td>`;
      }
      tableHtml += "</tr>";
    }

    // Close the table
    tableHtml += "</tbody></table>";

    //return '<div class="table-responsive">'+tableHtml+'</div>';

    return tableHtml;
  }

  /**
   * extract all values associated with a key. If key are time stamp, the convert the time stamp in millisecond
   * @param key the key
   * @param jsonArray the json array
   * @returns 
   */
  public extractValuesFromJsonArray(key : string, jsonArray : {[key: string]: any}[]) : any[]
  {
    let result : any[] = [];
    jsonArray.forEach(jsonObject => {
      let value = jsonObject[key];
      if (this.isTimeStamp(value))
      {
        value = Date.parse(value).valueOf();
      }
      if (!isNaN(value))
      {
        if  (typeof value === 'string' || value instanceof String)
        {
          result.push(Number(value));
        }
        else 
        {
          result.push(value);
        }
      }
    });
    return result;
  }

  /**
   * Assuming the function takes an array of json object and that those json object does have no necessary the same set of keys,
   * Assuming that the key provided as parameter exist in all json object of the array,
   * then the function return an array of json object, with the constrain that they does contain the provided key and value pair.
   * @param key the key
   * @param value the value associated with the key.
   * @param jsonArray the json array of object that must be filtered.
   * @returns 
   */
  public filterByValueJsonArray(key : string, value : string, jsonArray : {[key: string]: any}[]) : {[key: string]: any}[]
  {
    var result = [];
    result = jsonArray.filter((jsonObject) => {
      return (jsonObject[key] === value);
    });
    return result;
  }

  /**
   * Assuming the function takes an array of json object and that those json object does have no necessary the same set of keys,
   * then this function will extract the json objects having the key provided as parameter to the function and return an array of those.
   * @param key the filtering key
   * @param jsonArray the json array of json object that may or not contain the filtering key.
   * @returns 
   */
  public filterByKeyJsonArray(key : string, jsonArray : {[key: string]: any}[]) : {[key: string]: any}[]
  {
    var result : {[key: string]: any}[] = [];
    jsonArray.forEach(jsonObject => {
      let jsonObjectTuple = this.returnJsonObjectIfKeyExist(key,jsonObject);
      if (jsonObjectTuple[0])
      {
        result.push(jsonObjectTuple[1]);
      }
    });
    return result;
  }

  /**
   * Extract an array of disctinct key from a messages batch.
   * @param jsonArray the batch of message as an array of json object. The json objects can have different numbers of key/value pairs. 
   * @returns an array of key
   */
  public extractDistinctKeysFromArrayOfJsonObject(jsonArray : {[key: string]: any}[] ) : string[]
  {
    var returnedArray : string[] = [];
    jsonArray.forEach(jsonObject => { 
      returnedArray.push.apply(returnedArray, Object.keys(jsonObject));
    });
    returnedArray = this.removeDuplicates(returnedArray);
    return returnedArray;
  }

  /**
   * Get the keys of a json object.
   * @param jsonObject json object
   * @returns an array of keys
   */
  public getKeysOfJsonObject(jsonObject : {[key: string]: any}) : string[]{
    return Object.keys(jsonObject);
  }

  /**
   * Return true if the array is suitable for example to build a table.
   * @param jsonArray an array containing json oject that may be different in size and concerning their keys.
   * @returns 
   */
  public doesJsonObjectInArrayHaveSameKeysAndSize(jsonArray : {[key: string]: any}[]) : boolean
  {
    return this.doesJsonObjectInArrayHaveSameSize(jsonArray) && this.doesJsonObjectInArrayHaveSameKeysSet(jsonArray);
  }

  /**
   * Sort a json array assuming that the json array is formed so that teh data could be put in tabular form.
   * @param key the key that defined the values used for the sorting.
   * @param descending true, means that sorting is done in the descending direction. False means that the sorting is done in teh ascending direction.
   * @param jsonArray 
   * @returns 
   */
  public sortJsonArrayByValues(key: string, descending : boolean, jsonArray : {[key: string]: any}[]) : {[key: string]: any}[]
  {
    return descending ? jsonArray.sort((a, b) => parseFloat(b[key])-parseFloat(a[key])) : jsonArray.sort((a, b) => parseFloat(a[key])-parseFloat(b[key]));
  }

    /**
   * Sort a json array assuming that the json array is formed so that teh data could be put in tabular form.
   * @param key the key that defined the time stamp used for the sorting.
   * @param descending true, means that sorting is done in the descending direction. False means that the sorting is done in teh ascending direction.
   * @param jsonArray 
   * @returns 
   */
    public sortJsonArrayByTimeStamps(key: string, descending : boolean, jsonArray : {[key: string]: any}[]) : {[key: string]: any}[]
    {
      return descending ? jsonArray.sort((a, b) => Date.parse(b[key])-Date.parse(a[key])) : jsonArray.sort((a, b) => Date.parse(a[key])-Date.parse(b[key]));
    }

  /**
   * Given a key, return all value associated with that value that are not number.
   * @param key The key for which the values are search. For tabular data, the key correspond to a column name.
   * @param jsonArray an array of json object assumed to be such that data could be put in tabular form, i.e. all objects contains teh sames set of keys.
   * @returns the value associated with the key; return empty array if not possible.
   */
  public extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject(key : string, jsonArray : {[key: string]: any}[]) : string[]
  {
    if (!this.doesJsonObjectInArrayHaveSameKeysAndSize(jsonArray) || !this.checkIfKeyExistInAllJsonObjectOfTheArray(key, jsonArray))
    {
      return [];
    }
    var result : string[] = [];
    jsonArray.forEach(jsonObject => {
      result.push(jsonObject[key]);
    });
    return this.removeDuplicates(result);
  }

  /**
   * Check if an object is empty
   * @param obj a jsonObject
   * @returns true if empty.
   */
  public isEmpty(obj: {}) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }

  /**
   * Extract the tokens from an array of string and return them without duplicates.
   * @param stringArray an array of string containing token that are of the form <token>, when token could be anything.
   * @returns an array of tokens.
   */
  public extractTokenFromStringArray(stringArray : string[]) : string[] 
  {
    let result : string[] = [];
    stringArray.forEach(aString => {
      result = result.concat(this.extractTokenFromString(aString));
    });
    return [...new Set(result)];
  }

  /**
   * Tell if a token of teh list is present in the input string.
   * @param tokens array of tokens
   * @param inputString 
   * @returns true is at least one token is found in input string.
   */
  public containsToken(tokens: string[], inputString: string): boolean 
  {
    for (const token of tokens) {
        if (inputString.includes(token)) {
            return true;
        }
    }
    return false;
  }

   /**
    * Return an array of distinct keys that are paired with number only in the array of json object.
    * @param jsonArray 
    * @returns an array of key.
    */
   public extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumberOrTimeStamp(jsonArray : {[key: string]: any}[]) : string[]
   {
     let keysAssociatedWithNumber =  this.extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber(jsonArray);
     let keyAssociatedWithTimeStamp =  this.extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps(jsonArray);
     let result = keysAssociatedWithNumber.concat( keyAssociatedWithTimeStamp);
     return result;
   }

      /**
   * Return true if the values associated with the key in all json objects of array are number. 
   * @param key the key being evaluated
   * @param jsonArray thee array of json object.
   * @returns true or false
   */
      public doesAllValuesAssociatedWithKeyBeNumber(key:string, jsonArray : {[key: string]: any}[]) : boolean
      {
        return jsonArray.every(array =>
         this.isValueOfKeyANumber(key, array));
      }
   
         /**
      * Return true if the values associated with the key in all json objects of array are  time stamp. 
      * @param key the key being evaluated
      * @param jsonArray the array of json object.
      * @returns true or false
      */
         public doesAllValuesAssociatedWithKeyBeTimeStamp(key:string, jsonArray : {[key: string]: any}[]) : boolean
         {
           return jsonArray.every(array =>
            this.isValueOfKeyATimeStamp(key, array));
         }

    
    /**
    * Create an array of json object from an array of name as required because this format is required by the UI in actions-view.
    * @param array an array of string containing names
    * @param keyName the key name.
    * @returns an array of json object as required by the UI.
    */
    public buildJsonOjectArrayFromArray(keyName : string, array : string[]) : {[key: string]: any}[] 
    {
      let result: { [key: string]: any; }[] = [];
      if (keyName === "name") {
        array.forEach(name => {
          let column = { "name": name };
          result.push(column);
        });
      };
      if (keyName === "value") {
        array.forEach(name => {
          let column = { "value": name };
          result.push(column);
        });
      };

      return result;
    }

    public doesJsonOjectContainsAtLeastTwoNumbers(jsonObject : {[key: string]: any}) : [boolean, number []]
    {
      let keys =  Object.keys(jsonObject);
      let numbers : number[] = []; 
      for (const key of keys) 
      {
        let value = jsonObject[key];
        if (!isNaN(value))
        {
          numbers.push(value);
          if (numbers.length == 2)
          {
            return [true, numbers];
          }
        }
      } 
      return [false, []];
    }

    
    public doesJsonOjectContainsAtLeastTwoTimeStamps(jsonObject : {[key: string]: any}) : [boolean, string []]
    {
      let keys =  Object.keys(jsonObject);
      let timeStamps : string[] = []; 
      for (const key of keys) 
      {
        let value = jsonObject[key];
        if (this.isTimeStamp(value))
        {
          timeStamps.push(value);
          if (timeStamps.length == 2)
          {
            return [true, timeStamps];
          }
        }
      } 
      return [false, []];
    }

    /**
     * https://www.w3schools.com/Js/js_json_objects.asp
     * @param obj 
     * @returns 
     */
    public isObjLiteral(obj: any) {
      var _test = obj;
      return (typeof obj !== 'object' || obj === null ?
        false :
        (
          (function () {
            while (!false) {
              if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
                break;
              }
            }
            return Object.getPrototypeOf(obj) === _test;
          })()
        )
      );
    }

    //#endregion public Methods

    //#region private Methods

          /**
   * Test if it is a time stamp.
   * @param timeStamp 
   * @returns return true if the timeStamp pass as parameter as string can be converted to a sortable number.
   */
  private isTimeStamp(timeStamp : string) : boolean 
  {
    if (!isNaN(+timeStamp)) //+ is an operator that convert the string to a number
    {
      return false;
    }
    return !isNaN(Date.parse(timeStamp));
  }

    /**
    * Return an array of distinct keys that are paired with number only in the array of json object.
    * @param jsonArray 
    * @returns an array of key.
    */
    private extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumber(jsonArray : {[key: string]: any}[]) : string[]
    {
      let keys = this.extractDistinctKeysFromArrayOfJsonObject(jsonArray);
      var returnedArray : string[] = [];
      keys.forEach(key => {
        if (this.doesAllValuesAssociatedWithKeyBeNumber(key, jsonArray)){
          returnedArray.push(key)
        }
      });
      return returnedArray;
    }
  
    /**
     * Return an array of distinct keys that are paired with time stamp only in the array of json object.
     * @param jsonArray 
     * @returns an array of key.
     */
    private extractDistinctKeysFromArrayOfJsonObjectAssociatedWithTimeStamps(jsonArray : {[key: string]: any}[]) : string[]
    {
      let keys = this.extractDistinctKeysFromArrayOfJsonObject(jsonArray);
      var returnedArray : string[] = [];
      keys.forEach(key => {
        if (this.doesAllValuesAssociatedWithKeyBeTimeStamp(key, jsonArray)){
          returnedArray.push(key)
        }
      });
      return returnedArray;
    }

  /**
   * This function sort array in ascending order.
   * Note: this function is not use in code but is provided as a working example how to sort time stamp array.
   * @param timeStampArray 
   * @returns 
   */
  private sortTimeStampArray(timeStampArray : string[]) : string[]
  {
    timeStampArray.sort(
      function(a, b)
      {
        return Date.parse(a) - Date.parse(b)
      });
    return timeStampArray;
  }

  /**
   * Extract the tokens from a string and return them without duplicates.
   * @param metadata string containing token that are of the form <token>, when token could be anything.
   * @returns 
   */
    private extractTokenFromString(metadata : string) : string[] 
    {
      let result : string[] = [];
      const regex = /<([^>]+)>/g;
      const matches = metadata.match(regex);
      if (matches) 
      {
          matches.forEach(match => { 
            result.push(match);
          });
          result = [...new Set(result)]; // return only unique token.
          return result;
      }
      return [];
    }

    /**
   * @param key a key to look for
   * @param jsonString the json string (must be JSON Object not an array) that may contain the key.
   * @returns if the key exist, then exist is true and json return the json object otherwise exist return false and json is undefined.
   */
    private returnJsonObjectIfKeyExist(key:string, jsonObject : {}) : [exist: boolean, json: any] 
    {
      try {
        if (jsonObject.hasOwnProperty(key))
        {
          return [true, jsonObject];
        } 
        else 
        {
          return [false, undefined];
        }
      } 
      catch (error) 
      {
        return [false, undefined];
      }
    }

    private checkIfKeyExistInAllJsonObjectOfTheArray(key : string, jsonArray : {[key: string]: any}[])
    {
      return jsonArray.every((jsonObject) => this.doesKeyExistInJsonObject(key, jsonObject));
    }

    private doesKeyExistInJsonObject(key:string, jsonObject : {}) : boolean
    {
      return this.returnJsonObjectIfKeyExist(key, jsonObject)[0];
    }

  /**
   * Remove duplicates from array.
   * @param array 
   * @returns 
   */
  private removeDuplicates(array: any[]): any[] 
  {
    return [...new Set(array)];
  }

  /**
   *  Return true if the size of the json object in the array are the same.
   * @param jsonArray an array containing json oject that may be different in size.
   * @returns 
   */
  private doesJsonObjectInArrayHaveSameSize(jsonArray: { [key: string]: any; }[]) : boolean
  {
    var sizeArray = jsonArray.map(jsonObject => Object.keys(jsonObject).length);
    return this.areNumberInArrayAllIdentical(sizeArray);
  }

  /**
   *  Return true if the keys-set of the json object are the same assuming that the number of key for each object is the same.
   * @param jsonArray an array containing json oject that are the same size but for those the keys-set may differs.
   * @returns 
   */
    private doesJsonObjectInArrayHaveSameKeysSet(jsonArray: { [key: string]: any; }[]) : boolean
    {
      var arrayOfKeyArrays = jsonArray.map(jsonObject => Object.keys(jsonObject));

      return arrayOfKeyArrays.every( (array, index, arrayOfKeyArrays) => this.areArraysEqual(array, arrayOfKeyArrays[0]));
    }

  /**
   * Check if an array does contains all same value.
   * @param array an array of integer
   * @returns true is all array element do have the same value.
   */
  private areNumberInArrayAllIdentical(array : number[]) : boolean 
  {
    return array.every((element, index, array) => {
      return element === array[0];
    });
  }

  /**
   * Return true is the array does contains the same element regardless of the order.
   * @param arr1 the first
   * @param arr2 and second array that are compared
   * @returns 
   */
  private areArraysEqual(arr1 : any[], arr2 : any[]) : boolean
  {
    if (arr1.length === arr2.length)
    {
      return arr1.every( element => {
        if (arr2.includes(element)) {
          return true;
        }
        return false;
      })
    }
    return false;
  }

  /**
   * Return true if the key in the Json object is a number.
   * @param keyEvaluated the key that is evaluated.
   * @param jsonObject the json object that does eventually contains the key.
   * @returns return true or false
   */
  private isValueOfKeyANumber(keyEvaluated : string, jsonObject:  {[key: string]: any;}) :  boolean
  {
   try 
   {
    var evaluatedValue = jsonObject[keyEvaluated];
    var result = !isNaN(evaluatedValue);
   } 
   catch (error) 
   {
     return false;
   }

   return result;
  }

  /**
   * Return true if the key in the Json object is a time stamp.
   * @param keyEvaluated
   * @param jsonObject
   */
  private isValueOfKeyATimeStamp(keyEvaluated: string, jsonObject: { [key: string]: any; }): boolean
  {
    try 
    {
     var evaluatedValue = jsonObject[keyEvaluated];
     var result = this.isTimeStamp(evaluatedValue);
    } 
    catch (error) 
    {
      return false;
    }
 
    return result;
  }


  //#endregion private Methods

}

