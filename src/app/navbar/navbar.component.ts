import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NbButtonModule, NbCardModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";

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
      title: 'Редактирование',
      route: '/edit',
      icon: 'edit-outline'
    },
    {
      title: 'Просмотр',
      route: '/viewing',
      icon: 'book-outline'
    }
  ];
}
