export class StackElement {

    //#region private Fields

    private _metaData: string ="";

    private _unprocessedMessages:  { [key: string]: any; }[] = [];

    private _processedMessages: { [key: string]: any; }[] = [];

    private _calculations: {} = {};

    //#endregion private Fields

    //#region constructor.


    /**
     * The constructor.
     * Typescript does not allow to have multiple constructor but we can make all parameter optional.
     * @param metadata optional parameter
     * @param processedMessages optional parameter
     * @param calculations optional parameter
     */
    constructor(metadata? : string, unprocessedMessages? : {[key: string]: any}[], processedMessages? : {[key: string]: any}[], calculations? : {[key: string]: any}) 
    {
        if (metadata)
        {
            this._metaData = metadata;
        }
        if (unprocessedMessages)
        {
            this._unprocessedMessages = unprocessedMessages;
        }
        if (processedMessages)
        {
            this._processedMessages = processedMessages;
        }
        if (calculations)
        {
            this._calculations = calculations;
        }
    }

    //#endregion constructors.

    //#region public Properties

    public get metaData(): string 
    {
        return this._metaData;
    }

    public set metaData(value: string) 
    {
        this._metaData = value;
    }

    public get unprocessedMessages(): { [key: string]: any; }[] 
    {
        return this._unprocessedMessages;
    }

    public set unprocessedMessages(value: { [key: string]: any; }[]) 
    {
        this._unprocessedMessages = value;
    }

    public get processedMessages(): { [key: string]: any; }[] 
    {
        return this._processedMessages;
    }

    public set processedMessages(value: { [key: string]: any; }[]) 
    {
        this._processedMessages = value;
    }

    public get calculations(): {[key: string]: any} 
    {
        return this._calculations;
    }

    public set calculations(value: {[key: string]: any}) 
    {
        this._calculations = value;
    }

    //#endregion public Properties
}
