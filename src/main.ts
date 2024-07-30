import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {EditComponent} from "./app/edit/edit.component";
import {importProvidersFrom} from "@angular/core";
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbThemeModule,
  NbToastrModule
} from "@nebular/theme";
import {provideAnimations} from "@angular/platform-browser/animations";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {NavbarComponent} from "./app/navbar/navbar.component";
import {ViewingComponent} from "./app/viewing/viewing.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'viewing', component: ViewingComponent },
  { path: '', redirectTo: 'viewing', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbCardModule,
      NbButtonModule,
      NbDialogModule.forRoot(),
      NbToastrModule.forRoot(),
      NbEvaIconsModule,
      NbDatepickerModule.forRoot(),
      FormsModule
    ),
    provideAnimations()
  ],
}).catch(err => console.error(err));
