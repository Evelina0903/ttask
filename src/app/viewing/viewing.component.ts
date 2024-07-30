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

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Component({
  selector: 'app-viewing',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbListModule, NbButtonModule, NbIconModule, NbInputModule],
  templateUrl: './viewing.component.html',
  styleUrl: './viewing.component.scss'
})
export class ViewingComponent implements OnInit {
  elements: Element[] = [];
  filterName: string = '';
  filterStartDate: Date | null = null;
  filterEndDate: Date | null = null;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) {}

  ngOnInit() {
    this.loadElements();
    this.checkDueDates();
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

  moveUp(index: number) {
    if (index > 0) {
      [this.elements[index], this.elements[index - 1]] = [this.elements[index - 1], this.elements[index]];
      this.saveElements();
    }
  }

  moveDown(index: number) {
    if (index < this.elements.length - 1) {
      [this.elements[index], this.elements[index + 1]] = [this.elements[index + 1], this.elements[index]];
      this.saveElements();
    }
  }

  viewElement(element: Element) {
    this.dialogService.open(DialogComponent, {
      context: {
        currentElement: element,
        isEditing: false
      }
    });
  }

  checkDueDates() {
    this.elements.forEach(element => {
      const dueDate = new Date(element.dueDate);
      if (dueDate <= new Date()) {
        this.toastrService.show(`Element "${element.name}" is due!`, 'Due Date Reached', { status: 'warning' });
      }
    });
  }

  filterElements(): Element[] {
    return this.elements.filter(element => {
      const nameMatch = element.name.toLowerCase().includes(this.filterName.toLowerCase());
      const startDateMatch = this.filterStartDate ? new Date(element.dueDate) >= this.filterStartDate : true;
      const endDateMatch = this.filterEndDate ? new Date(element.dueDate) <= this.filterEndDate : true;
      return nameMatch && startDateMatch && endDateMatch;
    });
  }
}
