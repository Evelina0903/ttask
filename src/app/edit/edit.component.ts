import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbListModule} from "@nebular/theme";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ElementService} from "../services/element.service";

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbListModule, NbButtonModule, TranslateModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  elements$ = this.elementService.elements$;
  currentElement: Element = {} as Element;
  isEditing = false;
  editingIndex: number | null = null;

  constructor(
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private elementService: ElementService,
    private cdr: ChangeDetectorRef
  ) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    this.elementService.elements$.subscribe(elements => {
      this.elements$ = this.elementService.elements$;
    });
  }

  openAddPopup() {
    this.currentElement = {} as Element;
    this.isEditing = false;
    this.editingIndex = null;
    this.openDialog();
  }

  editElement(element: Element, index: number) {
    this.currentElement = { ...element };
    this.isEditing = true;
    this.editingIndex = index;
    this.openDialog();
  }

  deleteElement(index: number) {
    this.elementService.deleteElement(index);
  }

  openDialog() {
    this.dialogService.open(DialogComponent, {
      context: {
        currentElement: this.currentElement,
        isEditing: this.isEditing,
        isViewing: false
      }
    }).onClose.subscribe((element: Element) => {
      if (element) {
        if (this.isEditing && this.editingIndex !== null) {

          this.elementService.updateElement(this.editingIndex, element);
        } else {

          this.currentElement.creationDate = new Date();
          this.elementService.addElement(element);
        }
        this.cdr.markForCheck();
      }
    });
  }
}
