import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {EditComponent} from "./app/edit/edit.component";
import {importProvidersFrom} from "@angular/core";
import {NbButtonModule, NbCardModule, NbLayoutModule, NbThemeModule} from "@nebular/theme";
import {provideAnimations} from "@angular/platform-browser/animations";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {NavbarComponent} from "./app/navbar/navbar.component";
import {ViewingComponent} from "./app/viewing/viewing.component";

const routes: Routes = [
  { path: 'edit', component: EditComponent},
  { path: '', component: NavbarComponent},
  { path: 'viewing', component: ViewingComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbCardModule,
      NbButtonModule,
      NbEvaIconsModule
    ),
    provideAnimations()
  ],
}).catch(err => console.error(err));
