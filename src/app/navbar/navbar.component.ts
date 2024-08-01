import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NbButtonModule, NbCardModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, NbCardModule, NbButtonModule, NbTabsetModule, NbStepperModule, NbEvaIconsModule, NbRouteTabsetModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  tabs = [
    {
      title: this.translate.instant('NAVBAR.HEADER.EDITING'),
      route: '/edit',
      icon: 'edit-outline'
    },
    {
      title: this.translate.instant('NAVBAR.HEADER.VIEWING'),
      route: '/viewing',
      icon: 'book-outline'
    }
  ];

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
    });
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  private updateTranslations() {
    this.tabs = [
      {
        title: this.translate.instant('NAVBAR.HEADER.EDITING'),
        route: '/edit',
        icon: 'edit-outline'
      },
      {
        title: this.translate.instant('NAVBAR.HEADER.VIEWING'),
        route: '/viewing',
        icon: 'book-outline'
      }
    ];
  }
}
