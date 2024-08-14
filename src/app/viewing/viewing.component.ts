import {Component, OnInit} from '@angular/core';
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbDialogService, NbIconModule,
  NbInputModule,
  NbListModule,
  NbToastrService
} from "@nebular/theme";
import {DialogComponent} from "../dialog/dialog.component";
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ElementService} from "../services/element.service";
import {map} from "rxjs";

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
  notificationShown?: boolean;
}

@Component({
  selector: 'app-viewing',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbListModule, NbButtonModule, NbIconModule, NbInputModule, NbDatepickerModule, TranslateModule],
  templateUrl: './viewing.component.html',
  styleUrl: './viewing.component.scss'
})

export class ViewingComponent implements OnInit {
  filterName: string = '';
  filterStartDate: Date | null = null;
  filterEndDate: Date | null = null;

  elements$ = this.elementService.elements$;

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    private elementService: ElementService
  ) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    this.checkDueDates();
  }

  moveUp(index: number) {
    this.elementService.moveElement(index, 'up');
  }

  moveDown(index: number) {
    this.elementService.moveElement(index, 'down');
  }

  viewElement(element: Element) {
    this.dialogService.open(DialogComponent, {
      context: {
        currentElement: element,
        isEditing: false,
        isViewing: true
      }
    }).onClose.subscribe(() => {
      this.checkDueDates();
    });
  }

  checkDueDates() {
    const now = new Date();
    this.elements$.subscribe(elements => {
      elements.forEach(element => {
        if (!element.notificationShown) {
          const dueDate = new Date(element.dueDate);
          const timeDifference = dueDate.getTime() - now.getTime();

          if (timeDifference <= 5 * 60 * 1000 && timeDifference > 0) {
            const translatedMessage = this.translate.instant('NOTIFICATION.MESSAGE', { name: element.name });
            const translatedTitle = this.translate.instant('NOTIFICATION.TITLE');
            this.toastrService.show(translatedMessage, translatedTitle, { status: 'warning', preventDuplicates: true });

            element.notificationShown = true;
            this.elementService.updateElement(elements.indexOf(element), element);
          }
        }
      });
    });
  }

  get filteredElements$() {
    return this.elements$.pipe(
      map(elements => elements.filter(element =>
        (!this.filterName || element.name.includes(this.filterName)) &&
        (!this.filterStartDate || new Date(element.dueDate) >= new Date(this.filterStartDate)) &&
        (!this.filterEndDate || new Date(element.dueDate) <= new Date(this.filterEndDate))
      ))
    );
  }
}

