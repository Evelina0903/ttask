import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
/* other imports */
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
}
