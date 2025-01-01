import { GenericStack } from "./generic-stack";
import { IParsableStackElement } from "./iparsable-stackelement";

/**
 * The derived class that add parsing from and into JSON capability.
 */
export class ParsableStack<T extends IParsableStackElement> extends GenericStack<T> 
{
    //#region private Fields

    /**
     * Build stack element.
     * The question mark means it cannot be null or undefined.
     * @date 2/18/2024 - 1:52:20 PM
     * @private
     * @readonly
     * @type {!IParsableStackElement}
     */
    private readonly _parsableStackElementBuilder!: IParsableStackElement;

    //#endregion private Fields

    /**
     * The constructor.
     * @param parsableStackElementBuilder will build stack element put on the stack when parsing jSon Object.
     */
    constructor(parsableStackElementBuilder : IParsableStackElement)
    {
        super();
        this._parsableStackElementBuilder = parsableStackElementBuilder;
    }

    //#region public Methods

    factory<T extends IParsableStackElement>(arrayOfJsonObject : {}[]) : ParsableStack<IParsableStackElement> 
    {
        let parsableStack = new ParsableStack<IParsableStackElement>(this._parsableStackElementBuilder);
        arrayOfJsonObject.forEach(jsonObject => {
            parsableStack.push(this._parsableStackElementBuilder.factory(jsonObject));
        });
        return parsableStack;
    }

    toJson() : {}[]
    {
        let result : {}[] = [];
        let storageDeepCopy = this.clonedStorage;
        while (storageDeepCopy.length !== 0)
        {
            var element = storageDeepCopy.pop();
            if (element !== undefined){
                result.push(element.toJson()); 
            }
        }
        return result;
    }

    //#endregion public Methods

    


}
