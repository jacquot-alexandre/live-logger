import { Injectable } from '@angular/core';
import { CommunicationServiceService } from '../Communication/communication-service.service';
import { ParsableStack } from './parsable-stack';
import { ParsableStackElement } from './parsable-stackelement';
import { StackOperationEnum } from '../../stack-operation-enum';
import { StackElement } from './stack-element';
import { StackOperation } from '../../stack-operation';

/**
 * service that old data for presentation views.
 * @date 2/6/2024 - 10:56:39 AM
 *
 * @export
 * @class DataServiceService
 * @typedef {DataServiceService}
 */
@Injectable({
  providedIn: 'root'
})


export class DataServiceService {

  //#region private Fields

  private _unfilteredMessagesBatch: {}[] = []; //[{ "Name": "John", "Age": 30, "City": "New York", "Time stamp" : "2024-02-22 08:10:51.776"}, { "Name": "Jane", "Age": 25, "City": "London", "Time stamp" : "2024-02-22 08:10:51.777"}, { "productId": "5e6493b5-befe-4e14-bc9c-c9caf415ed0e", "Price": 12 }];

  private _filteredMessagesBatch: {}[] = [];

  private _calculationOnFilteredMessagesBatch: {[key: string]: any} = {};

  private _stackOfFilteredMessagesBatch : ParsableStack<ParsableStackElement>; 

  private _textMessages: {}[] = [];
  
  private readonly _communicationService : CommunicationServiceService;

  private _peekOrPokeMetadata: string | undefined = undefined;
  
  //#endregion private Fields

  //#region Constructors

  /**
   * The constructor.
   * @param communicationService for communication within the app.
   */
  constructor(communicationService : CommunicationServiceService) 
  { 
    this._communicationService = communicationService;
    this._stackOfFilteredMessagesBatch = new ParsableStack<ParsableStackElement>(new ParsableStackElement());
    this.subscribe();
  }

  //#endregion Constructor

  //#region public Properties

  
  /**
   * Either last receive unfiltered messages batch from back-end; Or set by taken one element from the stack. 
   * Is an array of json object.
   * @date 2/9/2024 - 8:48:03 PM
   *
   * @public
   * @readonly
   * @type {{}[]}
   */
  public get unfilteredMessageBatch(): {}[] 
  {
    return this._unfilteredMessagesBatch;
  }

  
  /**
   * Usually used to log exception.
   * @date 3/1/2024 - 6:47:48 PM
   *
   * @public
   * @readonly
   * @type {{}[]}
   */
  public get textMessages(): {}[]
  {
    return this._textMessages;
  }
   
  /**
   *  Either last receive unfiltered messages batch from back-end; Or set by taken one element from the stack. 
   *  Filtered means that those json object has been filtered using a filtering key.
   *  Those json object are intended to be display in tubular for when possible. 
   * @date 2/9/2024 - 8:47:41 PM
   *
   * @readonly
   * @type {{}[]}
   */
  get filteredMessageBatch() : {}[]
  {
    return this._filteredMessagesBatch
  }

  public set filteredMessageBatch(value: {}[])
  {
    this._filteredMessagesBatch = value;
  }
  
  /**
   * Get the stack. The object are json array.
   * @date 2/8/2024 - 12:14:39 PM
   *
   * @readonly
   * @type {ParsableStack<ParsableStackElement>}
   */
  get stack() : ParsableStack<ParsableStackElement> 
  {
    return this._stackOfFilteredMessagesBatch;
  }

  public get calculationOnFilteredMessagesBatch(): {[key: string]: any}
  {
    return this._calculationOnFilteredMessagesBatch;
  }

  public set calculationOnFilteredMessagesBatch(value: {[key: string]: any}) 
  {
    this._calculationOnFilteredMessagesBatch = value;
  }

  public get peekOrPokeMetadata(): string | undefined 
  {
    return this._peekOrPokeMetadata;
  }

  public set peekOrPokeMetadata(value: string | undefined) 
  {
    this._peekOrPokeMetadata = value;
  }

  //#region public Properties

  //#region private Methods

  private subscribe() {
    this._communicationService.clearLastReceivedDataSubject.subscribe(
      {
        next: data => {
          this._unfilteredMessagesBatch = [];
          this._filteredMessagesBatch = [];
          this._textMessages = [];
          console.log("Last received data cleared");
        },
      }
    );
    this._communicationService.newJsonMessageSubject.subscribe(
      {
        next: message => {
          this._unfilteredMessagesBatch.push(message);
        }
      }
    )
    this._communicationService.newTextMessageSubject.subscribe(
      {
        next: message => {
          this._textMessages.push(message);
          this._communicationService.updateSimpleViewSubject.next(null);
        }
      }
    )
    this._communicationService.copyProcessedIntoUnprocessedMessagesSubject.subscribe(
      {
        next: payload => {
          this._unfilteredMessagesBatch = this._filteredMessagesBatch;
          this.filteredMessageBatch = [];
          this._communicationService.updateSimpleViewSubject.next(null);
          this._communicationService.statusBarSubject.next("Processed messages copy into unprocessed messages; processed messages cleared.")
        }
      }
    )
    this._communicationService.clearCalculationsOnStageRequested.subscribe(
      {
        next: payload => {
          this._calculationOnFilteredMessagesBatch = {};
          this._communicationService.statusBarSubject.next("Calculation cleared on stage.")
        }
      }
    )
    this._communicationService.stackOperationRequested.subscribe(
      {
        next: stackOperation => {
          this.processStackOperations(stackOperation);
          this._communicationService.updateStackViewSubject.next(null);
        }
      }
    )
    this._communicationService.stackImportedSubject.subscribe(
      {
        next : importedStack => {
          this._stackOfFilteredMessagesBatch = this.stack.factory(importedStack) as ParsableStack<ParsableStackElement>;
          this._communicationService.statusBarSubject.next("Stack imported from server.")
        }
      }
    )
    
  }

  private pushStageOnStack(metadata : string) 
  {
    // structured clone is needed because other wise calculation are passed by reference.
    this.stack.push(new ParsableStackElement(metadata, this._unfilteredMessagesBatch, this._filteredMessagesBatch, structuredClone(this._calculationOnFilteredMessagesBatch)));
  }

  private processStackOperations(operation: StackOperation) 
  {
    console.log(operation.operationEnum);
    switch(operation.operationEnum)
    {
      case StackOperationEnum.CLEAR_STACK:
        this._stackOfFilteredMessagesBatch.clear();
        this._communicationService.stackUpdatedSubject.next("");
        break;
      case StackOperationEnum.PUSH_TO_STACK:
        this.pushStageOnStack(operation.metadata);
        this._communicationService.statusBarSubject.next("Stage push on the stack; Stack size is " +this._stackOfFilteredMessagesBatch.size()+".");
        this._communicationService.updateStackViewSubject.next(null);
        this._communicationService.stackUpdatedSubject.next("");
        break
      case StackOperationEnum.ROTATE_UPWARD:
        this.stack.rotate(true);
        break; 
      case StackOperationEnum.ROTATE_DOWNWARD:
        this.stack.rotate(false);
        break;
      case StackOperationEnum.POP_TO_STAGE:
        let stackElement_ : ParsableStackElement | undefined =  this.stack.pop();
        this.bringOnStage(stackElement_);
        this._communicationService.statusBarSubject.next("Pop upper most stack element and put it on stage.");
        this.peekOrPokeMetadata = stackElement_?.metaData;
        this._communicationService.stackUpdatedSubject.next("");
        break;
      case StackOperationEnum.PEEK_TO_STAGE:
        let stackElement : ParsableStackElement | undefined =  this.stack.peek();
        this.bringOnStage(stackElement);
        this.peekOrPokeMetadata = stackElement_?.metaData;
        this._communicationService.statusBarSubject.next("Poke upper most stack element and put it on stage.");
        break;
    }
  }
  private bringOnStage(stackElement: ParsableStackElement | undefined) 
  {
    // Note metadata are not brought to stage. This is done by design.
    this._unfilteredMessagesBatch = stackElement !== undefined ? stackElement.unprocessedMessages : [];
    this._filteredMessagesBatch = stackElement !== undefined ? stackElement.processedMessages : [];
    this._calculationOnFilteredMessagesBatch = stackElement !== undefined ? stackElement.calculations : [];
  }

  //#endregion private methods
}
