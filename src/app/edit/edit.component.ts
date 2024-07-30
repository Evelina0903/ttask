import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbListModule} from "@nebular/theme";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbListModule, NbButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  elements: Element[] = [];
  currentElement: Element = {} as Element;
  isEditing = false;

  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {
    this.loadElements();
  }

  loadElements() {
    const storedElements = localStorage.getItem('elements');
    if (storedElements) {
      this.elements = JSON.parse(storedElements);
    }
  }

  saveElements() {
    localStorage.setItem('elements', JSON.stringify(this.elements));
  }

  openAddPopup() {
    this.currentElement = {} as Element;
    this.isEditing = false;
    this.openDialog();
  }

  editElement(element: Element) {
    this.currentElement = { ...element };
    this.isEditing = true;
    this.openDialog();
  }

  deleteElement(element: Element) {
    this.elements = this.elements.filter(el => el !== element);
    this.saveElements();
  }

  openDialog() {
    this.dialogService.open(DialogComponent, {
      context: {
        currentElement: this.currentElement,
        isEditing: this.isEditing
      }
    }).onClose.subscribe((element: Element) => {
      if (element) {
        if (this.isEditing) {
          const index = this.elements.findIndex(el => el.creationDate === element.creationDate);
          this.elements[index] = element;
        } else {
          this.currentElement.creationDate = new Date();  // Initialize creationDate here
          this.elements.push(element);
        }
        this.saveElements();
      }
    });
  }
}
