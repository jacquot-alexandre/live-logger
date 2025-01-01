import { IParsableStackElement } from "./iparsable-stackelement";
import { StackElement } from "./stack-element";


/**
 * Add parsing capabilities to base class.
 */
export class ParsableStackElement extends StackElement implements IParsableStackElement
{
    //#region private Constants

    private readonly METADATA = "metadata";

    private readonly UNPROCESSED_MESSAGES = "unprocessedMessages";

    private readonly PROCESSED_MESSAGES = "processedMessages";

    private readonly CALCULATIONS = "calculations";

    //#endregion private Constants

    //#region implement IParsableStackElement

    factory(jsonObject: { [key: string]: any; }): any
    {
        return this.factoryImplementation(jsonObject)
    }

    toJson() : {}
    {
        let jsonObject : {[key: string]: any} = {};
        jsonObject["metadata"] =  this.metaData;
        jsonObject["unprocessedMessages"] = this.unprocessedMessages;
        jsonObject["processedMessages"] = this.processedMessages;
        jsonObject["calculations"] = this.calculations;
        return jsonObject;
    }

    //#endregion implement IParsableStackElement

    //#region private Methods

    private factoryImplementation(jsonObject : {[key: string]: any}) : ParsableStackElement | null
    {
       if (!this.areExpectedKeysPresent(jsonObject) || !this.containMetaDataString(jsonObject) || !this.containUnprocessedMessageArray(jsonObject) || !this.containProcessedMessageArray(jsonObject) || !this.isCalculationsJsonObject(jsonObject))
       {
        return null;
       }

       return new ParsableStackElement(jsonObject[this.METADATA], jsonObject[this.UNPROCESSED_MESSAGES],jsonObject[this.PROCESSED_MESSAGES], jsonObject[this.CALCULATIONS]);
    }

    private areExpectedKeysPresent(jsonObject : {[key: string]: any}) : boolean
    {
        let keys =  Object.keys(jsonObject);
        return this.areArraysEqual(keys, [this.METADATA, this.UNPROCESSED_MESSAGES, this.PROCESSED_MESSAGES, this.CALCULATIONS]);
    }

    /**
     * Return true is the array are equals
     * @param a an array
     * @param b an other array
     * @returns 
     */
    private areArraysEqual(a: string[] | any[], b: string[] | any[]) : boolean 
    {
        return (a.length === b.length && a.every((v, i) => v === b[i]));
    }

    private containMetaDataString(jsonObject : {[key: string]: any}) : boolean 
    {
        return typeof jsonObject[this.METADATA] === "string";
    }

    private containUnprocessedMessageArray(jsonObject : {[key: string]: any}) : boolean 
    {
        return this.isArray(jsonObject[this.UNPROCESSED_MESSAGES]);
    }

    private containProcessedMessageArray(jsonObject : {[key: string]: any}) : boolean 
    {
        return this.isArray(jsonObject[this.PROCESSED_MESSAGES]);
    }

    private isArray(what: any) : boolean 
    {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    private isCalculationsJsonObject(jsonObject : {[key: string]: any}) : boolean 
    {  
        return typeof jsonObject[this.CALCULATIONS] === "object" &&  jsonObject[this.CALCULATIONS]!==null && jsonObject[this.CALCULATIONS] !== undefined && !this.isArray(jsonObject[this.CALCULATIONS]);
    }

    //#endregion private Methods
}
