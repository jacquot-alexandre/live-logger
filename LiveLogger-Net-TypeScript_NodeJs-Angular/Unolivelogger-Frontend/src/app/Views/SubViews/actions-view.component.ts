import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { FrontServiceService } from '../../Shared/Services/front-service.service';
import { CalculationsEnum } from '../../Shared/calculations-enum';
import { ExportOperationsEnum } from '../../Shared/export-operations-enum';
import { ParsableStackElement } from '../../Shared/Services/Data/parsable-stackelement';
import { StackOperationEnum } from '../../Shared/stack-operation-enum';
import { StackOperation } from '../../Shared/stack-operation';

/**
 * This is the view model for the view that contains UI related to action that the user can do to interact with settings and back-end.
 * @date 2/6/2024 - 10:35:53 AM
 *
 * @export
 * @class ActionsViewComponent
 * @typedef {ActionsViewComponent}
 */
@Component({
  selector: 'app-actions-view',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './actions-view.component.html',
  styleUrl: './actions-view.component.css'
})

export class ActionsViewComponent {

  //#region private constants

  private readonly clearReceivedDataOnFrontEnd : string = "Last received batch of message cleared on front end.";

  private readonly clearStackMessage : string = "Stack cleared.";

  private readonly stackSizeMessage : string = "Stack size is ";

  private readonly _frontServices : FrontServiceService;

  //#endregion private constants

  //#region Constructor

  /**
  * The constructor.
  * @param frontServices containers for all available services.
  */
  constructor(frontServices : FrontServiceService) 
  {
    this._frontServices = frontServices;
    this.selectedFilteringKey = this._frontServices.optionsService.selectedFilteringKey;
    this.selectedFilteringColumn = this._frontServices.optionsService.selectedSortingColumn;
    this.sortingDirections = this._frontServices.optionsService.sortingDirections;
    this.defaultSortingDirection = this._frontServices.optionsService.defaultSortingDirection;
    this.subscribe();
  }

  //#endregion Constructor.

  //#region public Fields

  // Filtering Begin

  public get noFiltering(): boolean 
  {
    return this._frontServices.optionsService.noFiltering;
  }

  public set noFiltering(value: boolean) 
  {
    this._frontServices.optionsService.noSortingPossible = value;
    this._frontServices.optionsService.disabledSorting = value;
    this._frontServices.optionsService.noFiltering = value;
  }

  selectedFilteringKey : string;

  get filteringKeys(): any[] 
  {
    return this._frontServices.optionsService.filteringKeys;
  }

  public get noSortingPossible(): boolean 
  {
    return this._frontServices.optionsService.noSortingPossible;
  }

  public get filteringByValueChecked() : boolean 
  {
    return this._frontServices.optionsService.filteringByValueChecked;
  }

  public set filteringByValueChecked(value : boolean)
  {
    this._frontServices.optionsService.filteringByValueChecked = value;
  }

  public get filterByValueDisabled() : boolean
  {
    return !(!this.noFiltering && this._frontServices.optionsService.selectedFilteringKey !== "" 
    && this._frontServices.libraryService.doesJsonObjectInArrayHaveSameKeysAndSize(this._frontServices.dataService.unfilteredMessageBatch)) ;
  }

  get selectedFilteringValue() : string 
  {
    return this._frontServices.optionsService.selectedFilteringValue;
  }

  set selectedFilteringValue(value : string)
  {
    this._frontServices.optionsService.selectedFilteringValue = value;
  } 

  get filteringValues() : any[]
  {
    return this._frontServices.optionsService.filteringValues;
  }

  // Filtering End

  // Sorting Begin

  title ="Actions view";

  public get disabledSorting(): boolean 
  {
    return this._frontServices.optionsService.disabledSorting;
  }

  public set disabledSorting(value: boolean) 
  {
    this._frontServices.optionsService.disabledSorting = value;
  }

  selectedFilteringColumn : string;

  get sortingColumns(): any[]
  {
    return this._frontServices.optionsService.sortingColumns;
  }

  defaultSortingDirection : string;

  readonly sortingDirections: Array<String>;

  // Sorting End

  // Aggregate and calculate Begin

  private _descriptionOfElementToBePushedOnStack: string = "";

  get isCalculationOnStageDisabledForSumAndMean() : boolean 
  {
    return this._frontServices.optionsService.isCalculationOnStageDisabledForSumAndMean;
  }

  public get descriptionOfElementToBePushedOnStack(): string 
  {
    return this._descriptionOfElementToBePushedOnStack;
  }

  public set descriptionOfElementToBePushedOnStack(value: string) 
  {
    this._descriptionOfElementToBePushedOnStack = value;
  }
  
  public get useToken(): boolean 
  {
    return this._frontServices.optionsService.useToken;
  }
  public set useToken(value: boolean) 
  {
    this._frontServices.optionsService.useToken = value;
  }

  public get selectedToken(): string 
  {
    return this._frontServices.optionsService.selectedToken;
  }
  
  public set selectedToken(value: string)
  {
    this._frontServices.optionsService.selectedToken = value;
  }

  public get tokens(): any[]
  {
    return this._frontServices.optionsService.tokens;
  }

  public get isMeanCalculationOnStackDisabled(): boolean 
  {
    return this._frontServices.optionsService.isMeanOrSumCalculationOnStackDisabled;
  }

  public get isDiffCalculationOnStackDisabled(): boolean 
  {
    return this._frontServices.optionsService.isDiffCalculationOnStackDisabled;
  }

  public get isFractionCalculationOnStackDisabled(): boolean 
  {
    return this._frontServices.optionsService.isFractionCalculationOnStackDisabled;
  }

  public get isCalculationOnStageDisabledForPick(): boolean 
  {
    return this._frontServices.optionsService.isCalculationOnStageDisabledForPick;
  }

  public get isCalculationOnStageDisabledForDiff(): boolean 
  {
    return this._frontServices.optionsService.isCalculationOnStageDisabledForDiff;
  }

  public get selectedDataSource(): string 
  {
    return this._frontServices.optionsService.selectedDataSource;
  }

  public set selectedDataSource(value: string) 
  {
    this._frontServices.optionsService.selectedDataSource = value;
  }

  public get dataSources(): any[] 
  {
    return this._frontServices.optionsService.dataSources;
  }

  public get convertMicroMilliSecond(): boolean 
  {
    return this._frontServices.optionsService.convertMicroMilliSecond;
  }

  public set convertMicroMilliSecond(value: boolean) 
  {
    this._frontServices.optionsService.convertMicroMilliSecond = value;
  }

  public get renamePickToDiff(): boolean 
  {
    return this._frontServices.optionsService.renamePickToDiff;
  }

  public set renamePickToDiff(value: boolean) 
  {
    this._frontServices.optionsService.renamePickToDiff = value;
  }

  public get minusDiff(): boolean 
  {
    return this._frontServices.optionsService.minusDiff;
  }

  public set minusDiff(value: boolean) 
  {
    this._frontServices.optionsService.minusDiff = value;
  }

  public get fromStack(): string
  {  
    let metaData =  this._frontServices.dataService.peekOrPokeMetadata;
    return metaData === undefined ? "-" : metaData;
  }

  public get isCalculationOnStageDisabledForDiffAndFraction(): boolean 
  {
    return this._frontServices.optionsService.isDiffCalculationOnStackDisabled && this._frontServices.optionsService.isFractionCalculationOnStackDisabled;
  }

  public get swapInputOnStack(): boolean 
  {
    return this._frontServices.optionsService.swapInputOnStack;
  }

  public set swapInputOnStack(value: boolean) 
  {
    this._frontServices.optionsService.swapInputOnStack  = value;
  }

  // Aggregate and calculate End 

  //#endregion public Fields

  //#region view event handler

  //#region Manage

  onImportStackRequested() 
  {
    this._frontServices.backendService.onImportStackRequested();
  }

  onClearInBackEndReceivedData() 
  {
    this._frontServices.backendService.clearInBackEndReceivedData();
  }

  onSaveReceivedDataOnBackEndAsJSON() 
  {
    this._frontServices.backendService.saveReceivedDataOnBackend();
  }

  onSaveReceivedDataOnBackEndAsCSV() 
  {
    this._frontServices.backendService.saveReceivedDataOnBackendAsCsv();
  }

  onCopyProcessedIntoUnprocessedMessage() 
  {
    this._frontServices.communicationService.copyProcessedIntoUnprocessedMessagesSubject.next(null);
  };

  onClearCalculationsOnStageRequested() 
  {
    this._frontServices.communicationService.clearCalculationsOnStageRequested.next(null);
  }

  onRequestOsResourcesInfo() 
  {
    this._frontServices.backendService.onRequestResourcesInfo();
  }

  //#endregion Manage

  //#region Filter and sort

  onColumnNameChange($event: MatSelectChange) {
    this._frontServices.optionsService.selectedSortingColumn = this.selectedFilteringColumn;
    console.log('selected column:', this.selectedFilteringColumn);
  }

  sortingDirectionChanged(event: any) {
    this._frontServices.optionsService.selectedSortingDirection = event.value;
    console.log("actions-view :", event.value);
  }

  onDisabledSortingChange($event: Event) {
    this._frontServices.optionsService.disabledSorting = this.disabledSorting;
    console.log('disabled sorting', this.disabledSorting)
  }

  onNoFilteringChange($event: Event) {
    this._frontServices.optionsService.noFiltering = this.noFiltering;
    console.log('No filtering', this.noFiltering);
  }

  onFilteringKeyChange($event: MatSelectChange) {
    this._frontServices.optionsService.selectedFilteringKey = this.selectedFilteringKey;
    console.log('selected message key', this.selectedFilteringKey);
  }

  //#endregion Filter and sort

  //#region Calculate and aggregate.

  onClearBatchOfMessagesOnFrontEnd() {
    console.log('clicked on Clear last received data on front end.');
    this._frontServices.communicationService.ClearBatchOfMessagesOnFrontEnd(this.clearReceivedDataOnFrontEnd);
  }

  onPushBatchOfMessagesInFrontEndStack() {
    console.log('clicked on Push');
    let stackOperation = new StackOperation();
    stackOperation.metadata = this._descriptionOfElementToBePushedOnStack;
    stackOperation.operationEnum = StackOperationEnum.PUSH_TO_STACK;
    this._frontServices.communicationService.stackOperationRequested.next(stackOperation);
  }

  onClearStack() {
    console.log('clicked on Clear stack.')
    let stackSize = this.stackSizeMessage + this._frontServices.dataService.stack.size() + '.';
    this._frontServices.communicationService.ClearStack(this.clearStackMessage + ' ' + stackSize);
  }

  onSumOnStageRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.SUM_REQUESTED_ON_STAGE);
  }

  onMeanOnStageRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.MEAN_REQUESTED_ON_STAGE);
  }

  onSumOnStackRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.SUM_REQUESTED_ON_STACK);
  }

  onMeanOnStackRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.MEAN_REQUESTED_ON_STACK);
  }

  onPickOnStageRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.PICK_REQUESTED_ON_STAGE);
  }

  onDiffOnStageRequested()
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.DIFF_REQUESTED_ON_STAGE);
  }

  onFractionOnStackRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.FRACTION_REQUESTED_ON_STACK);
  }
  
  onDiffOnStackRequested() 
  {
    this._frontServices.communicationService.calculationOnStageRequested.next(CalculationsEnum.DIFF_REQUESTED_ON_STACK);
  }
    
    
  //#endregion Calculate and aggregate

  //#region Export


  OnExportStageAsJsonRequested() 
  {
    this._frontServices.backendService.exportToServer(ExportOperationsEnum.STAGE_AS_JSON, this.GetStage().toJson());
  }

  OnExportStageAsCsvRequested() 
  {
    this._frontServices.backendService.exportToServer(ExportOperationsEnum.STAGE_AS_CSV, this.GetStage().toJson());
  }

  OnExportStackAsJsonRequested() 
  {
    this._frontServices.backendService.exportToServer(ExportOperationsEnum.STACK_AS_JSON, this._frontServices.dataService.stack.toJson());
  }
  
  //#endregion Export
    
  //#endregion view event handler

  //#region private Methods

  private subscribe() 
  {
    //
  }

  private GetStage(): ParsableStackElement {
    return new ParsableStackElement(
      "Stage", this._frontServices.dataService.unfilteredMessageBatch, this._frontServices.dataService.filteredMessageBatch, this._frontServices.dataService.calculationOnFilteredMessagesBatch
    );
  }
  //#endregion private Methods
}
