import { AfterViewInit, Component, ElementRef, SimpleChanges, ViewChild} from '@angular/core';
import { FrontServiceService} from '../../Shared/Services/front-service.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { CommonModule } from '@angular/common';

/**
 * Description placeholder
 * @date 2/6/2024 - 10:42:29 AM
 * This is teh view model for the view that presents teh last received data from the backend.
 * @export
 * @class SimpleViewComponent
 * @typedef {SimpleViewComponent}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-simple-view',
  standalone: true,
  imports: [NgxJsonViewerModule, CommonModule],
  templateUrl: './simple-view.component.html',
  styleUrl: './simple-view.component.css'
})

export class SimpleViewComponent implements AfterViewInit{
  //#region private Fields and Constants

  private readonly _frontService : FrontServiceService;

  @ViewChild('placeHolderForTableOfUnfilteredData') placeHolderTableOfUnfilteredData!: ElementRef;

  @ViewChild('placeHolderForTableOfFilteredData') placeHolderTableOfFilteredData!: ElementRef;

  //#region Constructor
  
  /**
   * The constructor.
   * @param frontService container for all services
   */
  constructor(frontService : FrontServiceService) 
  {
      this._frontService = frontService;
      this.subscribe();
  }

  //#endregion Constructor

  //#region view event Handlers

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
    
  //#endregion view event handlers

  //#region public Fields

  title ="Stage view   ";

  unfilteredJsonViewVisible = true;

  filteredJsonViewVisible = true;

  textMessagesVisible = true;

  unfiltered : any = "no messages";

  filtered : any = "no messages filtered";

  textMessages : any = "no text messages"


  //#endregion public Fields

  //#region public Properties

  get noJsonMessages() : string
  {
    return (this._frontService.dataService.unfilteredMessageBatch.length === 0)? "No messages of json type received" : "";
  }

  get noTextMessages() : string
  {
    const noMessages = () : boolean =>
    {
      let result =  this._frontService.dataService.textMessages.length === 0;
      this.textMessagesVisible = !result;
      return result;
    }
    return noMessages() ? "No plain text messages received" : "";
  }


  get filter() : string 
  {
    var message = "";
    if (this._frontService.optionsService.noFiltering){
      return "No filtering applied";
    };
    if (this._frontService.dataService.filteredMessageBatch.length === 0){
      return "No results";
    }
    return "";
  }

  get resultMessage() : string
  {
    return this.noResults? "No calculation done" : "";
  }

  get noResults() : boolean {
    return  this._frontService.libraryService.isEmpty(this._frontService.dataService.calculationOnFilteredMessagesBatch);
  }

  get results() 
  {
    return this._frontService.dataService.calculationOnFilteredMessagesBatch;
  }

  //#endregion public Properties

  //#region private Methods

  subscribe() 
  {
    this._frontService.communicationService.updateSimpleViewSubject.subscribe(
      {
        next: subjectPayLoad => {
          this.deletedAndUpdateUI();
        },
      });
  }

  private deletedAndUpdateUI() 
  {
    this.unfiltered = [];
    this.filtered = [];
    this.textMessages = [];
    const targetTable = this.placeHolderTableOfUnfilteredData.nativeElement;
    targetTable.innerHTML = "";
    const targetTable2 = this.placeHolderTableOfFilteredData.nativeElement;
    targetTable2.innerHTML = "";
    this.ngAfterViewInit();
  }
    

  private updateViewForUnfilteredMessageBatch() {
    if (this._frontService.libraryService.doesJsonObjectInArrayHaveSameKeysAndSize(this._frontService.dataService.unfilteredMessageBatch)) 
    {
      const targetTable = this.placeHolderTableOfUnfilteredData.nativeElement;
      const tableHtml = this._frontService.libraryService.convertJsonToTable(this._frontService.dataService.unfilteredMessageBatch);
      targetTable.innerHTML = tableHtml;
      this.unfiltered = [];
      this.unfilteredJsonViewVisible = false;
    }

    else {
      this.unfiltered = this._frontService.dataService.unfilteredMessageBatch;
      this.unfilteredJsonViewVisible = true;
    }
  }

  updateTextMessages() 
  {
    this.textMessages = this._frontService.dataService.textMessages;
  }

  private updateViewForFilteredMessageBatch() {
    if (this._frontService.libraryService.doesJsonObjectInArrayHaveSameKeysAndSize(this._frontService.dataService.filteredMessageBatch)) 
    {
      const targetTable = this.placeHolderTableOfFilteredData.nativeElement;
      const tableHtml = this._frontService.libraryService.convertJsonToTable(this._frontService.dataService.filteredMessageBatch);
      targetTable.innerHTML = tableHtml;
      this.filtered = [];
      this.filteredJsonViewVisible = false;
    }

    else {
      this.filtered = this._frontService.dataService.filteredMessageBatch;
      this.filteredJsonViewVisible = true;
    }
  }

  private UpdateUi() 
  {
    this.updateViewForUnfilteredMessageBatch();
    this.updateViewForFilteredMessageBatch();
    this.updateTextMessages();
  }

    //#endregion private Methods

}
