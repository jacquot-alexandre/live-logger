import { Injectable } from '@angular/core';
import { LibraryServiceService} from './Library/library-service.service';
import { DataServiceService } from './Data/data-service.service';
import { BackendServiceService } from './Backend/backend-service.service';
import { ProcessingServiceService } from './Processing/processing-service.service'; 
import { CommunicationServiceService } from './Communication/communication-service.service';
import { OptionsServiceService } from './Options/options-service.service';

/**
 * The front service responsibility is to be a container for other services.
 * @date 2/6/2024 - 10:34:14 AM
 * 
 * @export
 * @class FrontServiceService
 * @typedef {FrontServiceService}
 */
@Injectable({
  providedIn: 'root'
})


export class FrontServiceService {

  //#region private Fields

  private readonly _libraryService : LibraryServiceService;

  private readonly _dataService : DataServiceService;

  private readonly _backendService : BackendServiceService;

  private readonly _processingService : ProcessingServiceService;

  private readonly _communicationService : CommunicationServiceService;

  private readonly _optionsService : OptionsServiceService;

  //#endregion private Fields

  //#region Constructor


  constructor(
     libraryService : LibraryServiceService, 
     dataService : DataServiceService, 
     backendService : BackendServiceService, 
     processingService : ProcessingServiceService, 
     communicationService : CommunicationServiceService,
     options : OptionsServiceService) 
  {
    this._libraryService = libraryService;
    this._dataService = dataService;
    this._backendService = backendService;
    this._processingService = processingService;
    this._communicationService = communicationService;
    this._optionsService = options;
  }

  //#endregion constructor

  //#region public Properties

  public get libraryService() : LibraryServiceService 
  {
    return this._libraryService;
  }

  public get dataService() : DataServiceService 
  {
    return this._dataService;
  }

  public get backendService() : BackendServiceService 
  {
    return this._backendService;
  }

  public get processingService() : ProcessingServiceService 
  {
    return this._processingService;
  }

  public get communicationService() :  CommunicationServiceService 
  {
    return this._communicationService;
  }

  public get optionsService() : OptionsServiceService{
    return this._optionsService;
  }

  //#endregion public Properties

}
