import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NbCardModule, NbLayoutModule} from "@nebular/theme";
import {NavbarComponent} from "./navbar/navbar.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NbCardModule, NbLayoutModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ttask';
  constructor(private translate: TranslateService) {
    // Устанавливаем язык по умолчанию
    this.translate.setDefaultLang('ru');
    // Устанавливаем текущий язык
    this.translate.use('ru');
  }
}
