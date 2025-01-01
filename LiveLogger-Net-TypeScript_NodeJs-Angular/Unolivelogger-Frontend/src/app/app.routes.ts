import { signal } from '@angular/core';
import { Routes } from '@angular/router';
import { SimpleViewComponent } from './Views/SubViews/simple-view.component';
import { AdvancedViewComponent } from './Views/SubViews/advanced-view.component';
import { ActionsViewComponent } from './Views/SubViews/actions-view.component';

export const routes: Routes = [
    {path: '', component: SimpleViewComponent},
    {path: 'simple', component: SimpleViewComponent},
    {path: 'advanced', component: AdvancedViewComponent},
    {path: 'actions', component: ActionsViewComponent}
];
