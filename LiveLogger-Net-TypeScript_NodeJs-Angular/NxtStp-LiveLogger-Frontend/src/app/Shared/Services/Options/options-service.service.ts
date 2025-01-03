import { Injectable } from '@angular/core';
import { CommunicationServiceService } from '../Communication/communication-service.service';
import { OptionsEnum } from '../../options-enum';
import { LibraryServiceService } from '../Library/library-service.service';
import { DataServiceService } from '../Data/data-service.service';

/**
 * Hold all options of the app.
 * @date 2/8/2024 - 6:26:41 PM
 *
 * @export
 * @class OptionsServiceService
 * @typedef {OptionsServiceService}
 */
@Injectable({
  providedIn: 'root'
})

export class OptionsServiceService {

  //#region private Fields

  private _communicationsService : CommunicationServiceService;

  private _libraryServices : LibraryServiceService;

  private _dataServices : DataServiceService;

  // Filtering Begin

  private _noFiltering = true;

  private _selectedFilteringKey: string = "";

  private _filteringKeys: {}[] = [
    { name: 'Key 1' },
    { name: 'Key 2' },
    { name: 'Key 3' },
  ];

  
  private _filteringByValueChecked: boolean = false;

  private _selectedFilteringValue: string = "";

  private _filteringValues: {}[] = [
    { value: 'Value 1' },
    { value: 'Value 2' },
    { value: 'Value 3' }
  ];

  // Filtering End

  // Sorting Begin

  private readonly ascending : string = "Ascending";

  private readonly descending : string = "Descending";

  private readonly _defaultSortingDirection: string = this.descending;

  private readonly _sortingDirections: Array<String> = [this.ascending, this.descending];

  private _disabledSorting: boolean = true;

  private _selectedSortingColumn: string = "";

  private _selectedSortingDirection: string = this.descending;

  private _sortingColumns: {}[] = [
    { name: 'Column 1' },
    { name: 'Column 2' },
    { name: 'Column 3' },
    { name: 'Column 4' },
    { name: 'Column 5' },
    { name: 'Column 6' },
    { name: 'Column 7' },
  ];

  private _noSortingPossible: boolean = true;

  // Sorting End

  // Calculate and aggregate Begin

  private _useToken: boolean = false;

  private _selectedToken: string = "";

  private _tokens: {}[] = [
    { name: '<token1>' },
    { name: '<token2>' },
    { name: '<token3>' },
  ];

  private _selectedDataSource: string = "";

  private _dataSources: {}[] = [
    { name: 'pick' },
    { name: 'diff' },
    { name: 'sum' },
    { name: 'mean'}
  ];

  private _isMeanOrSumCalculationOnStackDisabled : boolean = true;

  private _isDiffCalculationOnStackDisabled: boolean = true;

  private _isFractionCalculationOnStackDisabled: boolean = true;

  private _convertMicroMilliSecond: boolean = false;

  private _renamePickToDiff: boolean = false;

  private _minusDiff: boolean = false;

  private _swapInputOnStack: boolean = false;

  // Calculate and aggregate End

  //#endregion private Fields

  //#region Constructor

  /**
   *  The constructors.
   * @param communicationsService // will update actions view when columns and messages keys changed because of the batch of messages received.
   */
  constructor(communicationsService : CommunicationServiceService, libraryServices : LibraryServiceService, dataServices : DataServiceService) 
  {
    this._communicationsService = communicationsService;
    this._libraryServices = libraryServices;
    this._dataServices = dataServices;
  }

  //#endregion Constructor

  //#region public Properties

  // Filtering begin

  public set noFiltering(value : boolean)
  {
    console.log("options-service", value);
    this._noFiltering = value;
    this.publishOnOptionChangedSubject(OptionsEnum.NO_FILTERING);
  }

  public get noFiltering() : boolean
  {
    return this._noFiltering;
  }

  public get selectedFilteringKey(): string 
  {
    return this._selectedFilteringKey;
  }

  public set selectedFilteringKey(value: string) 
  {
    console.log("options-services", value)
    this._selectedFilteringKey = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SELECTED_FILTERING_KEY);
  }

  public get filteringKeys(): {}[] 
  {
    return this._filteringKeys;
  }

  public set filteringKeys(value: {}[])
  {
    this._filteringKeys = value;
  }

  public get filteringByValueChecked(): boolean 
  {
    return this._filteringByValueChecked;
  }

  public set filteringByValueChecked(value: boolean)
  {
    console.log("options-service:", value)
    this._filteringByValueChecked = value;
    
    this.publishOnOptionChangedSubject(OptionsEnum.FILTERING_VALUE_CHECKED);
  }

  public get selectedFilteringValue(): string 
  {
    return this._selectedFilteringValue;
  }

  public set selectedFilteringValue(value: string) 
  {
    console.log("options-service:", value)
    this._selectedFilteringValue = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SELECTED_FILTERING_VALUE);
  }

  public get filteringValues(): {}[] 
  {
    return this._filteringValues;
  }
  
  public set filteringValues(value: {}[]) 
  {
    this._filteringValues = value;
  }
  
  // Filtering End

  // Sorting Begin

  public get disabledSorting(): boolean 
  {
    return this._disabledSorting;
  }
  public set disabledSorting(value: boolean) 
  {
    console.log("options-service:", value)
    this._disabledSorting = value;
    this.publishOnOptionChangedSubject(OptionsEnum.DISABLING_SORTING);
  }

  public get selectedSortingColumn(): string 
  {
    return this._selectedSortingColumn;
  }

  public set selectedSortingColumn(value: string) 
  {
    console.log("options-service:", value)
    this._selectedSortingColumn = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SELECTED_SORTING_COLUMN);
  }

  public get sortingColumns(): {}[] 
  {
    return this._sortingColumns;
  }
  public set sortingColumns(value: {}[]) 
  {
    this._sortingColumns = value;
  }

  public get selectedSortingDirection(): string 
  {
    return this._selectedSortingDirection;
  }

  public set selectedSortingDirection(value: string) 
  {
    console.log("options-services", value)
    this._selectedSortingDirection = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SORTING_DIRECTION);
  }

  public get sortingDirections(): Array<String> 
  {
    return this._sortingDirections;
  }

  public get defaultSortingDirection(): string 
  {
    return this._defaultSortingDirection;
  }

  public get noSortingPossible(): boolean 
  {
    return this._noSortingPossible;
  }

  public set noSortingPossible(value: boolean) 
  {
    this._noSortingPossible = value;
  }

  // Sorting End

  //#region Aggregate and calculate

  get isCalculationOnStageDisabledForSumAndMean() 
  {
    return this.isCalculationOnStageBetweenRowDisabledBase();
  }

  public get isCalculationOnStageDisabledForPick(): boolean 
  {
    return this.isCalculationOnStageBetweenRowDisabledBase() || this._dataServices.filteredMessageBatch.length !== 1;
  }

  public get isCalculationOnStageDisabledForDiff(): boolean 
  {
    if (this._dataServices.filteredMessageBatch.length === 1) // calculation on two column of a single row
    {
      let message = this._dataServices.filteredMessageBatch[0];
      return !(this._libraryServices.doesJsonOjectContainsAtLeastTwoTimeStamps(message)[0] || this._libraryServices.doesJsonOjectContainsAtLeastTwoNumbers(message)[0]);
    } 
    else // calculation between to row on same column
    {
      return this.isCalculationOnStageBetweenRowDisabledBase() || this._dataServices.filteredMessageBatch.length !== 2;
    }
  }

  public get useToken(): boolean 
  {
    return this._useToken;
  }

  public set useToken(value: boolean) 
  {
    this._useToken = value;
    this.publishOnOptionChangedSubject(OptionsEnum.USE_TOKEN);
  }

  public get selectedToken(): string 
  {
    return this._selectedToken;
  }

  public set selectedToken(value: string) 
  {
    this._selectedToken = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SELECTED_TOKEN_CHANGED);
  }

  public get tokens(): {}[] 
  {
    return this._tokens;
  }

  public set tokens(value: {}[])
  {
    this._tokens = value;
  }

  public get selectedDataSource(): string 
  {
    return this._selectedDataSource;
  }

  public set selectedDataSource(value: string) 
  {
    this._selectedDataSource = value;
    this.publishOnOptionChangedSubject(OptionsEnum.SELECTED_DATA_SOURCE_CHANGED);
  }

  public get dataSources(): any[] 
  {
    return this._dataSources;
  }

  public set dataSources(value : {}[])
  {
    this._dataSources =  value;
  }

  public get isMeanOrSumCalculationOnStackDisabled(): boolean 
  {
    return this._isMeanOrSumCalculationOnStackDisabled;
  }

  public set isMeanOrSumCalculationOnStackDisabled(value : boolean)
  {
    this._isMeanOrSumCalculationOnStackDisabled = value;
  }

  public get isDiffCalculationOnStackDisabled(): boolean 
  {
    return this._isDiffCalculationOnStackDisabled;
  }

  public set isDiffCalculationOnStackDisabled(value : boolean) 
  {
    this._isDiffCalculationOnStackDisabled = value;
  }

  public get isFractionCalculationOnStackDisabled(): boolean 
  {
    return this._isFractionCalculationOnStackDisabled;
  }

  public set isFractionCalculationOnStackDisabled(value : boolean) 
  {
    this._isFractionCalculationOnStackDisabled = value;
  }

  public get convertMicroMilliSecond(): boolean 
  {
    return this._convertMicroMilliSecond;
  }

  public set convertMicroMilliSecond(value: boolean) 
  {
    this._convertMicroMilliSecond = value;
  }

  public get renamePickToDiff(): boolean 
  {
    return this._renamePickToDiff;
  }

  public set renamePickToDiff(value: boolean) 
  {
    this._renamePickToDiff = value;
  }

  public get minusDiff(): boolean 
  {
    return this._minusDiff;
  }

  public set minusDiff(value: boolean) 
  {
    this._minusDiff = value;
  }

    public get swapInputOnStack(): boolean 
  {
    return this._swapInputOnStack;
  }

  public set swapInputOnStack(value: boolean) 
  {
    this._swapInputOnStack = value;
  }


  //#endregion Aggregate and calculate

  //#endregion public Properties

  //#region private Methods

  private isCalculationOnStageBetweenRowDisabledBase() 
  {
    return this.selectedSortingColumn == "" || this.disabledSorting || this.sortingColumnContainsEitherNoNumberOrTimeStamp();
  }

  private publishOnOptionChangedSubject(option : OptionsEnum )
  {
    this._communicationsService.optionChangedSubject.next(option); 
  }

  private sortingColumnContainsEitherNoNumberOrTimeStamp() : boolean
  {
    return !this._libraryServices.doesAllValuesAssociatedWithKeyBeNumber(this._selectedSortingColumn, this._dataServices.filteredMessageBatch) &&  !this._libraryServices.doesAllValuesAssociatedWithKeyBeTimeStamp(this._selectedSortingColumn, this._dataServices.filteredMessageBatch);
  }

  //#endregion private Methods


}
