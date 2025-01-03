import {  AfterViewInit, Component } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { CommonModule } from '@angular/common';
import { FrontServiceService} from '../../Shared/Services/front-service.service';
import { StackOperationEnum } from '../../Shared/stack-operation-enum';
import { StackOperation } from '../../Shared/stack-operation';

/**
 * This is the view model for the view that present data received from the back-end in a aggregated ways.
 * @date 2/6/2024 - 10:38:05 AM
 * 
 * @export
 * @class AdvancedViewComponent
 * @typedef {AdvancedViewComponent}
 */
@Component({
  selector: 'app-advanced-view',
  standalone: true,
  imports: [NgxJsonViewerModule, CommonModule],
  templateUrl: './advanced-view.component.html',
  styleUrl: './advanced-view.component.css'
})

export class AdvancedViewComponent implements AfterViewInit{

  //#region private Fields

  private readonly _frontService : FrontServiceService;

  //#endregion private Fields

  /**
   * The constructor.
   * @param frontService container for all services
   */
  constructor(frontService : FrontServiceService) 
  {
    this._frontService = frontService;
    this.subscribe();
  }

  //#region public Fields

  Title ="Stack view";

  stack : any;

  //#endregion public Fields

  //#region public Properties

  get stackStatus() : string
  {
    return this._frontService.dataService.stack.size() === 0 ? "Stack empty" : "";
  }

  //#endregion public Properties

  //#region event handlers

    /**
   * Is triggered when the view is rendered
   * @returns {any}
   */
    ngAfterViewInit(): void { 
      setTimeout(() => { // setTimeout is necessary to prevent ExpressionChangedAfterItHasBeenCheckedError exception being throw 
                         // see https://hackernoon.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        this.UpdateUi();
      });
    }

  onRotateUpward() 
  {
    let stackOperation = new StackOperation();
    stackOperation.operationEnum = StackOperationEnum.ROTATE_UPWARD;
    this._frontService.communicationService.stackOperationRequested.next(stackOperation);
  }

  onRotateDownward()
  {
    let stackOperation = new StackOperation();
    stackOperation.operationEnum = StackOperationEnum.ROTATE_DOWNWARD;
    this._frontService.communicationService.stackOperationRequested.next(stackOperation);
  }

  onPopToStageRequested() 
  {
    let stackOperation = new StackOperation();
    stackOperation.operationEnum = StackOperationEnum.POP_TO_STAGE;
    this._frontService.communicationService.stackOperationRequested.next(stackOperation);
  }

  onPeekToStageRequested()
  {
    let stackOperation = new StackOperation();
    stackOperation.operationEnum = StackOperationEnum.PEEK_TO_STAGE;
    this._frontService.communicationService.stackOperationRequested.next(stackOperation);
  }

  //#endregion event handlers

  //#region private Methods

  private subscribe() 
  {
    this._frontService.communicationService.updateStackViewSubject.subscribe(
      {
        next: payload => {
          setTimeout(() => { // setTimeout is necessary to prevent ExpressionChangedAfterItHasBeenCheckedError exception being throw 
            // see https://hackernoon.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
            this.UpdateUi();
          });
        }
      }
    )
  }
  
  private UpdateUi() {
    this.stack = this._frontService.dataService.stack.toJson();
  }

  //#endregion private Methods

}
