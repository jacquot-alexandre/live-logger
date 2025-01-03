import { Component } from '@angular/core';
import { NavigationViewComponent } from './Views/MainView/navigation-view.component';
import { RouterOutlet} from '@angular/router';
import { CommunicationServiceService } from './Shared/Services/Communication/communication-service.service';

/**
 * This is the view model of the main view.
 * @date 2/6/2024 - 10:43:21 AM
 *
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = "NxtStp-LiveLogger-front";

  // #region private Fields

  private readonly _communication : CommunicationServiceService;

  // #endregion private Fields



  // #region Constructor

  /**
   * The constructor.
   * @param communication communication within the app
   */
  constructor(communication : CommunicationServiceService) 
  {
    this._communication = communication;
    this.subscribe();
  }

  // #endregion Constructor

  //#region public Fields

  statusBar : string = "";

  //#endregion public Fields

  //#region private Methods

  private subscribe()
  {
    this._communication.statusBarSubject.subscribe(
      {
        next: data => {
          console.log("Status bar: " + data);
          this.statusBar = data;
        },
        complete: () => {
          console.log("Communication with status bar complete");
        }
      }
    )
  }
  
  //#endregion private Methods
}
