/**
 * Interface providing all method necessary to create a typescript data structure from json object and to get a json representation from the typescript instance
**/ 
export interface IParsableStackElement 
{
    /**
     * Build an typescript instance from the json representation.
     * @param jsonObject 
     */
    factory(jsonObject : {[key: string]: any}) : any

    /**
     * Get a json representation of the instance.
     */
    toJson() : {}
}
