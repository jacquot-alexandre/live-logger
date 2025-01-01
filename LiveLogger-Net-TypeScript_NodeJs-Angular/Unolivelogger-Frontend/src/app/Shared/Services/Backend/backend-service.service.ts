import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LiveLoggerReturnedMessage } from './live-logger-returned-message.model';
import { CommunicationServiceService } from '../Communication/communication-service.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ExportOperationsEnum } from '../../export-operations-enum';
import { Observable } from 'rxjs';
import { LibraryServiceService } from '../Library/library-service.service';

/**
 * This is te service that is responsible for the communication with the backend.
 * @date 2/6/2024 - 10:43:53 AM
 *
 * @export
 * @class BackendServiceService
 * @typedef {BackendServiceService}
 */
@Injectable({
  providedIn: 'root'
})

export class BackendServiceService {

  // #region private Fields and Constants

  private readonly _http : HttpClient; 

  private readonly _webSocket : WebSocketSubject<any>; 

  private readonly httpProtocol = 'http://';

  private readonly websocketProtocol = 'ws://';

  private readonly host = 'localhost'

  private readonly serverHttpPort = ':3000';

  private readonly serverWebSocketPort = ':8080';

  private readonly clearResource = '/clear';

  private readonly saveResource = '/save';

  private readonly saveAsUrlResource = '/saveAsCsv';

  private readonly saveStageAsJsonResource = '/saveStageAsJson';

  private readonly saveStackAsJsonResource = '/saveStackAsJson';

  private readonly saveStageAsCsvResource = '/saveStageAsCsv';

  private readonly importStack = '/importStack'

  private readonly resourcesInfo = '/resourcesInfo'

  private readonly _communication : CommunicationServiceService;

  private readonly _library :LibraryServiceService;

  // #endregion private Fields and Constants

  // #region Constructor

  /**
   * The constructor.
   */
  constructor(http : HttpClient, communication : CommunicationServiceService, library : LibraryServiceService)
  { 
    this._http = http;
    this._communication = communication;
    this._library = library;
    this._webSocket = webSocket(this.websocketProtocol+this.host+this.serverWebSocketPort);
    this.subscribe();
  }

  // #endregion Constructor

  // #region public Methods

  onImportStackRequested() 
  {
    this.requestStackOnServer(this.importStack);
  }

  onRequestResourcesInfo()
  {
    this.requestResourcesInfo(this.resourcesInfo);
  }


  public clearInBackEndReceivedData() 
  {
    this.triggerActionOnServer(this.clearResource);
  }

  public saveReceivedDataOnBackend() 
  {
    this.triggerActionOnServer(this.saveResource);
  }  

  public saveReceivedDataOnBackendAsCsv() 
  {
    this.triggerActionOnServer(this.saveAsUrlResource);
  }

  public exportToServer(exportOperation : ExportOperationsEnum, payload : any)
  {
    this._communication.statusBarSubject.next(exportOperation);
    switch (exportOperation){
      case ExportOperationsEnum.STACK_AS_JSON:
        this.postRequest(this.saveStackAsJsonResource, payload).subscribe(
          (response: any) => {
            console.log(response);
          }
        )
        break;
      case ExportOperationsEnum.STAGE_AS_JSON:
        this.postRequest(this.saveStageAsJsonResource, payload).subscribe(
          (response: any) => {
            console.log(response);
          }
        )
        break;
      case ExportOperationsEnum.STAGE_AS_CSV:
        this.postRequest(this.saveStageAsCsvResource, payload).subscribe(
          (response: any) => {
            console.log(response);
          }
        )
        break;
      default:
    }
  }

  // #endregion public Methods

  // #region private Methods

  private subscribe() 
  {
    this._webSocket.subscribe(
      (message) => {
        console.log('Received message:', message);
        let jsonObjectLiteralCandidate =  JSON.parse(JSON.stringify(message));
        if (this._library.isObjLiteral(jsonObjectLiteralCandidate))
        {
          this._communication.newJsonMessageSubject.next(jsonObjectLiteralCandidate); // pas the json object
        }
        else // probably not json but text/plain as for logging exception
        {
          this._communication.newTextMessageSubject.next(jsonObjectLiteralCandidate);
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket connection closed.');
      }
    );  
  }

  private url(resourceUrl : string) : string {
    return this.httpProtocol+this.host+this.serverHttpPort+resourceUrl;
  }

  private triggerActionOnServer(resourceUrl : string) 
  {
    this._http.get<LiveLoggerReturnedMessage>(this.url(resourceUrl)).subscribe(
      {
        next: (data) => {
          this.publishInStatusBar(data);
        }
      });
  }

  private requestStackOnServer(resourceUrl : string)
  { this._http.get<LiveLoggerReturnedMessage>(this.url(resourceUrl)).subscribe(
    {
      next: (response) => {
        let stackAsJson = response["Message"];
        let parsedStack = JSON.parse(JSON.stringify(stackAsJson));
        this._communication.stackImportedSubject.next(parsedStack);
      }
    });
  }

  private requestResourcesInfo(resourceUrl : string)
  {
    { this._http.get<LiveLoggerReturnedMessage>(this.url(resourceUrl)).subscribe(
      {
        next: (response) => {
          let resourcesInfo = response["Message"];
          this._communication.newJsonMessageSubject.next(resourcesInfo);
          this._communication.statusBarSubject.next("Resources information obtained.")
        }
      });
    }
  }

  private publishInStatusBar(liveLoggerReturnedMessage : LiveLoggerReturnedMessage)
  {
    this._communication.statusBarSubject.next(liveLoggerReturnedMessage.Message);
  }

  private postRequest(resource : string, payload : string) : Observable<any>
  {
    return this._http.post<any>(this.url(resource), payload);
  }


  //#endregion private Methods

}
