import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { OptionsEnum } from '../../options-enum';
import { CalculationsEnum } from  '../../calculations-enum';
import { StackOperation } from '../../stack-operation';
import { StackOperationEnum } from '../../stack-operation-enum';

/**
 * Responsible for communication within the app.
 * @date 2/7/2024 - 11:30:20 AM
 *
 * @export
 * @class CommunicationServiceService
 * @typedef {CommunicationServiceService}
 */
@Injectable({
  providedIn: 'root'
})

export class CommunicationServiceService {

  //#region private Fields and constant

  private readonly _statusBarSubject : Subject<string>;

  private readonly _clearLastReceivedDataSubject : Subject<any>;

  private readonly _updateStackViewSubject: Subject<any>;

  private readonly _stackUpdatedSubject: Subject<any>;

  private readonly _stackOperationRequested: Subject<StackOperation>;

  private readonly _newJsonMessageSubject: Subject<any>;

  private readonly _newTextMessageSubject: Subject<any>;

  private readonly _optionChangedSubject: Subject<OptionsEnum>;

  private readonly _updateSimpleViewSubject: Subject<any>;

  private readonly _copyProcessedIntoUnprocessedMessagesSubject: Subject<any>;

  private readonly _calculationOnStageRequested: Subject<CalculationsEnum>;

  private readonly _clearCalculationsOnStageRequested: Subject<any>;

  private readonly _stackImportedSubject: Subject<{}[]>;


  //#endregion private Fields and constant

  //#region Constructor

  /**
   * The constructor.
   */
  constructor()
  { 
    this._statusBarSubject = new Subject<string>();
    this._clearLastReceivedDataSubject = new Subject<any>();
    this._updateStackViewSubject = new Subject<any>();
    this._stackOperationRequested = new Subject<StackOperation>;
    this._stackUpdatedSubject = new Subject<any>();
    this._newJsonMessageSubject = new Subject<any>();
    this._newTextMessageSubject = new Subject<any>();
    this._optionChangedSubject = new Subject<OptionsEnum>();
    this._updateSimpleViewSubject = new Subject<any>();
    this._copyProcessedIntoUnprocessedMessagesSubject = new Subject<any>();
    this._calculationOnStageRequested = new Subject<CalculationsEnum>();
    this._clearCalculationsOnStageRequested = new Subject<any>();
    this._stackImportedSubject =  new Subject<{}[]>();
  }

  //#endregion Constructor

  //#region public Properties

  /**
   * Use for publishing message in status bar.
   * @date 2/7/2024 - 12:54:56 PM
   *
   * @readonly
   * @type {AsyncSubject<string>}
   */
  public get statusBarSubject() : Subject<string> 
  {
    return this._statusBarSubject;
  }

  public get clearLastReceivedDataSubject() : Subject<string | undefined>
  {
    return this._clearLastReceivedDataSubject;
  }

  public get newJsonMessageSubject(): Subject<any> 
  {
    return this._newJsonMessageSubject;
  }

  public get newTextMessageSubject(): Subject<any> 
  {
    return this._newTextMessageSubject;
  }

  public get optionChangedSubject(): Subject<OptionsEnum> 
  {
    return this._optionChangedSubject;
  }

  public get updateSimpleViewSubject(): Subject<any> 
  {
    return this._updateSimpleViewSubject;
  }

  public get copyProcessedIntoUnprocessedMessagesSubject(): Subject<any> 
  {
    return this._copyProcessedIntoUnprocessedMessagesSubject;
  }

  public get calculationOnStageRequested(): Subject<CalculationsEnum> 
  {
    return this._calculationOnStageRequested;
  }

  public get clearCalculationsOnStageRequested(): Subject<any> 
  {
    return this._clearCalculationsOnStageRequested;
  }

  public get updateStackViewSubject(): Subject<any> 
  {
    return this._updateStackViewSubject;
  }

  public get stackOperationRequested(): Subject<StackOperation> 
  {
    return this._stackOperationRequested;
  }

  public get stackUpdatedSubject(): Subject<string> 
  {
    return this._stackUpdatedSubject;
  }

  public get stackImportedSubject(): Subject<{}[]> 
  {
    return this._stackImportedSubject;
  }

  //#endregion public Properties

  //#region public Methods

  ClearBatchOfMessagesOnFrontEnd(message : string) 
  {
    this._clearLastReceivedDataSubject.next(null);
    this._statusBarSubject.next(message);
  }

  ClearStack(message : string)
  {
    let stackOperation = new StackOperation();
    stackOperation.operationEnum = StackOperationEnum.CLEAR_STACK;
    this.stackOperationRequested.next(stackOperation);
    this._statusBarSubject.next(message);
  }

  //#endregion public Methods

}
