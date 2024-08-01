import { bootstrapApplication } from '@angular/platform-browser';
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
import {ViewingComponent} from "./app/viewing/viewing.component";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


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
      FormsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideAnimations()
  ],
}).catch(err => console.error(err));
