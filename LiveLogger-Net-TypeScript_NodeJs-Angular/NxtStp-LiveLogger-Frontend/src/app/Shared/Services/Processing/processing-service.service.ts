import { Injectable } from '@angular/core';
import { OptionsServiceService } from '../Options/options-service.service';
import { CommunicationServiceService } from '../Communication/communication-service.service';
import { OptionsEnum } from '../../options-enum';
import { LibraryServiceService } from '../Library/library-service.service';
import { DataServiceService } from '../Data/data-service.service';
import { CalculationsEnum } from '../../calculations-enum';
import { mean, sum,  standardDeviation} from 'simple-statistics';
import { StackElement } from '../Data/stack-element';
import { DataSourcesEnum as DataSourcesEnum } from './data-sources-enum';

/**
 * Service that process the data received from the backend according to settings selected by user so that they can be consumed by the views.
 * Handle things like doing sorting, aggregation...
 * @date 2/6/2024 - 11:09:28 AM
 *
 * @export
 * @class ProcessingServiceService
 * @typedef {ProcessingServiceService}
 */
@Injectable({
  providedIn: 'root'
})

export class ProcessingServiceService {

  //#region private Fields

  private readonly PICK = "pick";

  private readonly DIFF = "diff";

  private readonly SUM = "sum";

  private readonly MEAN = "mean";

  private readonly STD = "stack.std";

  private readonly STACK_SUM = "stack.sum";

  private readonly STACK_MEAN = "stack.mean";

  private readonly STACK_FRACTION ="stack.fraction";

  private readonly STACK_DIFF = "stack.diff"

  private _optionsService : OptionsServiceService;

  private _communicationService : CommunicationServiceService;

  private _libraryService : LibraryServiceService;

  private _dataService : DataServiceService;

  //#endregion private Fields

  //#region Constructor

  /**
   * The constructor.
   * @param options Filtering, sorting and aggregation options.
   */
  constructor( 
    options : OptionsServiceService, 
    communicationService : CommunicationServiceService, 
    libraryService : LibraryServiceService,
    dataService : DataServiceService) 
  { 
    this._optionsService = options;
    this._communicationService = communicationService;
    this._libraryService = libraryService;
    this._dataService = dataService;
    this.subscribe();
  }

  //#endregion Constructor

  //#region private Methods

  /**
   * Subscribe subjects from communication service.
   */
  private subscribe()
  {
    this._communicationService.newJsonMessageSubject.subscribe(
      {
        next: subjectPayLoad => {
          console.log("processing-service: message arrived_");
          this.onMessageArrived();
        },
      });
    this._communicationService.optionChangedSubject.subscribe(
      {
        next: subjectPayload => {
          console.log("processing-service", subjectPayload);
          this.onOptionChanged(subjectPayload);
        }
      }
    );
    this._communicationService.calculationOnStageRequested.subscribe(
      {
        next: calculationType => {
          console.log("processing-service", calculationType);
          this.performCalculation(calculationType);
        }
      }
    )
    this._communicationService.stackUpdatedSubject.subscribe(
      {
        next: payload => {
          this.updateTokensAvailable();
          this.updateDataSourceAvailable();
          this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
        }
      }
    )
  }

  private performCalculation(calculationType: CalculationsEnum) 
  {
    let stageValues : number[] = this._libraryService.extractValuesFromJsonArray(this._optionsService.selectedSortingColumn,  this._dataService.filteredMessageBatch);
    switch (calculationType)
    {
      case CalculationsEnum.PICK_REQUESTED_ON_STAGE:
        {
          let key = this.PICK;
          let value = stageValues[0];
          if (this._optionsService.renamePickToDiff){
            key = this.DIFF;
          }
          if (this._optionsService.convertMicroMilliSecond){
            value =  value / 1000;
          }
          this._dataService.calculationOnFilteredMessagesBatch[key] = value;
          this._communicationService.statusBarSubject.next("Value picked from filtered messages.");
        }
        break;

      case CalculationsEnum.DIFF_REQUESTED_ON_STAGE:
        {
          let sign = (this._optionsService.minusDiff) ? -1 : 1;
          if (this._dataService.filteredMessageBatch.length == 2)
          {
            this._dataService.calculationOnFilteredMessagesBatch[this.DIFF] = sign*(stageValues[0]-stageValues[1]);
            this._communicationService.statusBarSubject.next("Difference calculated on filtered messages.");
            return;
          }
          let message = this._dataService.filteredMessageBatch[0];
          let test = this._libraryService.doesJsonOjectContainsAtLeastTwoTimeStamps(message);
          if (test[0]) 
          {
            this._dataService.calculationOnFilteredMessagesBatch[this.DIFF] = sign*(Date.parse(test[1][0]).valueOf() - Date.parse(test[1][1]).valueOf());
            this._communicationService.statusBarSubject.next("Difference of time stamps calculated on a single row of filtered messages.");
            return;
          }
          let test2 = this._libraryService.doesJsonOjectContainsAtLeastTwoNumbers(message);
          if (test2[0]) 
          {
            this._dataService.calculationOnFilteredMessagesBatch[this.DIFF] = sign*(test2[1][0] - test2[1][1]);
            this._communicationService.statusBarSubject.next("Difference of number calculated on a single row of filtered messages.");
            return;
          }
        }
        break;

      case CalculationsEnum.MEAN_REQUESTED_ON_STAGE:
        this._dataService.calculationOnFilteredMessagesBatch[this.MEAN] = mean(stageValues);
        this._dataService.calculationOnFilteredMessagesBatch[this.STD] = standardDeviation(stageValues);
        this._communicationService.statusBarSubject.next("Mean and standard deviation calculated from filtered messages.");
      break;
      
      case CalculationsEnum.SUM_REQUESTED_ON_STAGE:
        this._dataService.calculationOnFilteredMessagesBatch[this.SUM] = sum(stageValues);
        this._communicationService.statusBarSubject.next("Sum calculated from filtered message.");
      break;

      case CalculationsEnum.SUM_REQUESTED_ON_STACK:
        this.processSumCalculationOnStack();
        this._communicationService.statusBarSubject.next("Sum calculated on the stack.");
        break;

      case CalculationsEnum.MEAN_REQUESTED_ON_STACK:
        this.processMeanCalculationOnStack();
        this._communicationService.statusBarSubject.next("Mean calculated on the stack.");
        break;

      case CalculationsEnum.DIFF_REQUESTED_ON_STACK:
        this.processDiffCalculationOnStack();
        this._communicationService.statusBarSubject.next("Difference calculated on the stack.");
        break;

      case CalculationsEnum.FRACTION_REQUESTED_ON_STACK:
        this.processFractionCalculationOnStack();
        this._communicationService.statusBarSubject.next("Fraction calculated on the stack.");
        break;
    
    }
  }
  processSumCalculationOnStack() 
  {
    let stackValues = this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
    this._dataService.calculationOnFilteredMessagesBatch[this.STACK_SUM] = sum(stackValues);
  }

  private processMeanCalculationOnStack() 
  {
    let stackValues = this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
    this._dataService.calculationOnFilteredMessagesBatch[this.STACK_MEAN] = mean(stackValues);
    this._dataService.calculationOnFilteredMessagesBatch[this.STD] = standardDeviation(stackValues);
  }

  private processFractionCalculationOnStack() 
  {
    let stackValues = this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
    let target = this._optionsService.swapInputOnStack ? stackValues[1] : stackValues[0];
    this._dataService.calculationOnFilteredMessagesBatch[this.STACK_FRACTION]= Number(target / (stackValues[0]+stackValues[1]) * 100).toFixed(2)+"%";
  }
  
  private processDiffCalculationOnStack() 
  {
    let stackValues = this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
    let result = this._optionsService.swapInputOnStack ? stackValues[1]-stackValues[0] : stackValues[0]-stackValues[1];
    this._dataService.calculationOnFilteredMessagesBatch[this.STACK_DIFF] = result;
  }

  /**
   * Executed when message arrive on the backend. 
   */
  private onMessageArrived() 
  {
    if (!this._optionsService.noFiltering)
    {
      this.updateFilteringKeysAvailable();
    }
    this.processWithFilteringAndSorting();
  }

  private onOptionChanged(option : OptionsEnum) 
  {
    switch(option){
      case OptionsEnum.NO_FILTERING:
        if (!this._optionsService.noFiltering)
        {
          this.updateFilteringKeysAvailable();
        }
        break;
      case OptionsEnum.DISABLING_SORTING, OptionsEnum.SELECTED_FILTERING_KEY:
        if (!this._optionsService.disabledSorting && this._optionsService.selectedFilteringKey!='')
        {
          this.updateSortingKeysAvailable(this._optionsService.selectedFilteringKey);
          this.updateFilteringValues();
        }
        break;
      case OptionsEnum.FILTERING_VALUE_CHECKED:
        this.updateFilteringValues();
        break;
      // Options for calculations done on the stack: 
      case OptionsEnum.USE_TOKEN:
        this.updateTokensAvailable();
        this.updateDataSourceAvailable();
        this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
        break;
      case OptionsEnum.SELECTED_TOKEN_CHANGED:
        this.updateDataSourceAvailable();
        this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);
        break;
      case OptionsEnum.SELECTED_DATA_SOURCE_CHANGED:
        this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(this._optionsService.selectedDataSource)]);  
        break;

      default:
    }
    this.processWithFilteringAndSorting();
    this._communicationService.updateSimpleViewSubject.next(null);
  }

  private updateDataSourceAvailable() 
  {
    this._optionsService.dataSources = [];
    const dataSourcesKeys = Object.keys(DataSourcesEnum).filter((key) => isNaN(Number(key)));
    dataSourcesKeys.forEach(dataSourceKey => {
      let values = this.setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(DataSourcesEnum[<keyof typeof DataSourcesEnum>(dataSourceKey)]);
      if (values.length !== 0) 
      {
        this._optionsService.dataSources.push({"name" : dataSourceKey});  
      }
    });
  }

  /**
   * Tell if it is possible to execute sum or mean calculation on  the stack.
   * @param selectedDataSource either this.SUM or this.MEAN.
   * @returns an array containing the calculation values of the stack for a specific calculation type.
   */
  private setDisablingOfCalculationsOnStackAndReturnInputValuesForSelectedDataSource(selectedDataSource : DataSourcesEnum) : number[]
  {
    this.enableAllOperationOnStack();
    if (this._optionsService.useToken) 
    {
      return this.updateDisablingOfCalculationOnStackWhenTokenUse(selectedDataSource);
    }
    else 
    {
      return this.updateDisablingOfCalculationOnStackWhenTokenNotUse(selectedDataSource);
    }
  }

  private updateDisablingOfCalculationOnStackWhenTokenUse(selectedDataSource : DataSourcesEnum) : number[] 
  {
    // look in metadata of the stack if the token selected is present. Return the number of occurrence.

    let arrayOfStackElement = this._dataService.stack.clonedStorage;
    let arrayOfStackElementContainingToken : StackElement [] = []; 
    let arrayOfStackElementContainingTokenAndCalculation : StackElement[] = [];
    if (this._optionsService.selectedToken === "")
    {
      this.disableAllOperationOnStack();
      return [];
    }
    for (const stackElement of arrayOfStackElement) 
    {
      if (this._libraryService.containsToken([this._optionsService.selectedToken], stackElement.metaData)) 
      {
        arrayOfStackElementContainingToken.push(stackElement);
        if (!isNaN(stackElement.calculations[DataSourcesEnum[<keyof typeof DataSourcesEnum>selectedDataSource]]))
        {
          arrayOfStackElementContainingTokenAndCalculation.push(stackElement);
        }
      };
    };
    if (arrayOfStackElementContainingToken.length !== arrayOfStackElementContainingTokenAndCalculation.length)
    {
      this.disableMeanOperationOnStack();
    }
    if (arrayOfStackElementContainingTokenAndCalculation.length !== 2)
    {
      this.disableDiffOperationOnStack();
      this.disableFractionOperationOnStack();
    }
    let calculationValues = arrayOfStackElementContainingTokenAndCalculation.map(e => e.calculations[DataSourcesEnum[<keyof typeof DataSourcesEnum>selectedDataSource]])
    return calculationValues;
  }

  private enableAllOperationOnStack() 
  {
    this.enableMeanOperationOnStack();
    this.enableDiffOperationOnStack();
    this.enableFractionOperationOnStack();
  }
  
  private enableMeanOperationOnStack()
  {
      this._optionsService.isMeanOrSumCalculationOnStackDisabled = false;
  }

  private enableDiffOperationOnStack() 
  {
    this._optionsService.isDiffCalculationOnStackDisabled = false;
  }

  private enableFractionOperationOnStack() 
  {
    this._optionsService.isFractionCalculationOnStackDisabled = false;
  }

  private disableAllOperationOnStack()
  {
    this.disableMeanOperationOnStack();
    this.disableDiffOperationOnStack();
    this.disableFractionOperationOnStack();
  }

  private disableMeanOperationOnStack()
  {
      this._optionsService.isMeanOrSumCalculationOnStackDisabled = true;
  }

  private disableDiffOperationOnStack()
  {
      this._optionsService.isDiffCalculationOnStackDisabled = true;
  }

  private disableFractionOperationOnStack()
  {
      this._optionsService.isFractionCalculationOnStackDisabled = true;
  }


  private updateDisablingOfCalculationOnStackWhenTokenNotUse(selectedDataSource : DataSourcesEnum) : number[]
  {
    var calculationValues : number[] = []; //returned
    let calculationsArray = this._dataService.stack.clonedStorage.map((e) => e.calculations);
    if (calculationsArray.length == 0)
    {
      this.disableAllOperationOnStack()
      return [];
    }
    for (const calculation of calculationsArray) 
    {
      if (isNaN(calculation[DataSourcesEnum[<keyof typeof DataSourcesEnum>selectedDataSource]]))
      {
       continue;
      }
      else
      {
        calculationValues.push(calculation[DataSourcesEnum[<keyof typeof DataSourcesEnum>selectedDataSource]]);
      }
    }
    if (this._dataService.stack.size() !== calculationValues.length)
    {
      this.disableMeanOperationOnStack()
    }
    if (calculationValues.length !== 2)
    {
      this.disableDiffOperationOnStack();
      this.disableFractionOperationOnStack();
    }
    return calculationValues;
  }

  /**
   * the tokens comes from metadata stored in each stack element.
   */
  private updateTokensAvailable() 
  {
    if (this._optionsService.useToken)
    {
      this._optionsService.tokens = this._libraryService.buildJsonOjectArrayFromArray("name", this._libraryService.extractTokenFromStringArray(this.getMetadataArrayFromStack()));
    }
    
  }

  private getMetadataArrayFromStack() : string[]
  {
    return this._dataService.stack.clonedStorage.map((e) => e.metaData);
  }

  /**
   * -Update the columns lists used for sorting and filtering.
   * - enable filtering if columns is not empty.
   * The lists content are data driven.
   */
  private updateFilteringKeysAvailable()
  {
    var filteringKeys = this._libraryService.extractDistinctKeysFromArrayOfJsonObject(this._dataService.unfilteredMessageBatch);
    console.log("processing-service - filtering keys", filteringKeys);
    this._optionsService.filteringKeys = this._libraryService.buildJsonOjectArrayFromArray("name", filteringKeys); // necessary because UI expect the data structure.
  }

  private updateSortingKeysAvailable(filteringKey : string)
  {
    var byValueSortableColumnNames = this._libraryService.extractDistinctKeysFromArrayOfJsonObjectAssociatedWithNumberOrTimeStamp(this.performFilteringWhenPossible(filteringKey)[1]);
    console.log("processing-service -sortable columns", byValueSortableColumnNames);
    this._optionsService.sortingColumns = this._libraryService.buildJsonOjectArrayFromArray("name", byValueSortableColumnNames); // necessary because UI expect the data structure.
    this._optionsService.noSortingPossible = byValueSortableColumnNames.length === 0;
  }

  private updateFilteringValues() 
  {
    this._optionsService.filteringValues =  this._libraryService.buildJsonOjectArrayFromArray(
      "value", this._libraryService.extractDistinctValuesGivenAColumnNameFromArrayOfJsonObject(
        this._optionsService.selectedFilteringKey, 
        this._dataService.unfilteredMessageBatch));
  }

  /**
   * Return true if filtering is ready to be made.
   * @returns true or false.
   */
  private isFilteringPossible() : boolean
  {
    let o = this._optionsService;
    let result = !o.noFiltering && !(o.selectedFilteringKey==='');
    return result;
  }

  private performFilteringWhenPossible(filteringKey : string) : [possible : boolean, {[key: string]: any}[]]
  {
    let isFilteringPossible = this.isFilteringPossible();
    console.log("processing-view is filtering possible:", isFilteringPossible);
    if (isFilteringPossible)
    {
      let filteredMessageBatch = this._libraryService.filterByKeyJsonArray(filteringKey, this._dataService.unfilteredMessageBatch);
      console.log("processing-view - Filtering", filteredMessageBatch);
      return [true, filteredMessageBatch]
    }
    return [false, []];
  }

  /**
   * return true if sorting is ready to be made.
   * @returns true or false.
   */
  private isSortingPossible() : boolean 
  {
    let o = this._optionsService;
    let result = this.isFilteringPossible() && !o.disabledSorting && !(o.selectedSortingColumn==='');
    return result;
  }

  /**
   * Helper to convert sorting option in a type that is neutral so that library can use it, and still be reusable.
   * @param sortingDirection Ascending or Descending string.
   * @returns return true if descending and false if ascending.
   */
  private sortingDirectionToBoolean(sortingDirection : string) : boolean
  {
    return sortingDirection === "Descending" ? true : false;
  }

  /**
   * Perform first filtering and then sorting when possible.
   * Enable disable options accordingly.
   */
  private processWithFilteringAndSorting() 
  {
    let isFilteringPerformed = this.performFilteringWhenPossibleAndUpdateOptions();
    let isFilteringByValuePerformed = this.performFilteringByValueWhenPossible();
    let isSortingPerformed = this.performSortingWhenPossible();
    this.updateStatusBarAfterProcess(isFilteringPerformed, isFilteringByValuePerformed, isSortingPerformed);
    this._communicationService.updateSimpleViewSubject.next(null);
  }

  private performFilteringByValueWhenPossible() : boolean
  {
    if (this._optionsService.filteringByValueChecked && this._optionsService.selectedFilteringKey !== "" && this._optionsService.selectedFilteringValue !== "")
    {
      this._dataService.filteredMessageBatch = this._libraryService.filterByValueJsonArray(
        this._optionsService.selectedFilteringKey, 
        this._optionsService.selectedFilteringValue, this._dataService.filteredMessageBatch);
      return true;
    }
    return false;
  }

  private updateStatusBarAfterProcess(isFilteringPerformed: boolean, isFilteringByValuePerformed : boolean, isSortingPerformed: boolean) 
  {
    let message = "";
    if (isFilteringPerformed) 
    {
      message += "Messages filtered by key;";
    };

    if (isFilteringByValuePerformed ) 
    {
      message += " Filtered also by value";
    }
    if (isSortingPerformed) 
    {
      message += " Sorted as well;"
    }
    this._communicationService.statusBarSubject.next(message);
  }

    /**
   *  Perform sorting when possible.
   * @returns return a tuple. first element is if the sorting was possible. the second element are the sorted json object array.
   */
    private performSortingWhenPossible() : boolean
    {
      let isSortingPossible = this.isSortingPossible();
      console.log("processing-view - is sorting possible:", isSortingPossible);
      if (isSortingPossible)
      {
        let filteredMessageBatch :  {}[] = [];
        if (this._libraryService.doesAllValuesAssociatedWithKeyBeNumber(this._optionsService.selectedSortingColumn, this._dataService.filteredMessageBatch))
        {
            filteredMessageBatch = this._libraryService.sortJsonArrayByValues(
            this._optionsService.selectedSortingColumn, 
            this.sortingDirectionToBoolean(this._optionsService.selectedSortingDirection), 
            this._dataService.filteredMessageBatch);
        }
        if (this._libraryService.doesAllValuesAssociatedWithKeyBeTimeStamp(this._optionsService.selectedSortingColumn, this._dataService.filteredMessageBatch))
        {
            filteredMessageBatch = this._libraryService.sortJsonArrayByTimeStamps(
            this._optionsService.selectedSortingColumn, 
            this.sortingDirectionToBoolean(this._optionsService.selectedSortingDirection), 
            this._dataService.filteredMessageBatch);
        }
        console.log("processing-view - Sorting", this._dataService.filteredMessageBatch);
        this._dataService.filteredMessageBatch = filteredMessageBatch;
        return true
      }
      return false;
    }

  private performFilteringWhenPossibleAndUpdateOptions() : boolean
  {
    let filteringResultsTuple = this.performFilteringWhenPossible(this._optionsService.selectedFilteringKey);
    if (filteringResultsTuple[0]) // filtering possible
    {
      this._dataService.filteredMessageBatch = filteringResultsTuple[1];
      this._optionsService.noSortingPossible = false;
    }
    else // filtering not possible
    {
      this._optionsService.noSortingPossible = true;
    }
    return filteringResultsTuple[0];
  }
  //#endregion private Methods
}
