import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NbButtonModule, NbCardModule, NbStepperModule, NbTabsetModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, NbCardModule, NbButtonModule, NbTabsetModule, NbStepperModule, NbEvaIconsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}

