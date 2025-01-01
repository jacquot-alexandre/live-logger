import { Component } from '@angular/core';
import { RouterOutlet,  RouterLink, RouterLinkActive} from '@angular/router';
import { SimpleViewComponent } from '../SubViews/simple-view.component';
import { AdvancedViewComponent } from '../SubViews/advanced-view.component';
import { ActionsViewComponent } from '../SubViews/actions-view.component';

/**
 * Description placeholder
 * @date 2/6/2024 - 10:39:05 AM
 * This is the view model for the navigation bar view.
 * @export
 * @class NavigationViewComponent
 * @typedef {NavigationViewComponent}
 */
@Component({
  selector: 'app-navigation-view',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SimpleViewComponent, AdvancedViewComponent, ActionsViewComponent],
  templateUrl: './navigation-view.component.html',
  styleUrl: './navigation-view.component.css'
})

export class NavigationViewComponent {

}
