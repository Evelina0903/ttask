import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  @Input() currentElement: Element = {} as Element;
  @Input() isEditing: boolean = false;

  constructor(protected ref: NbDialogRef<DialogComponent>) {}

  ngOnInit() {
    if (!this.isEditing) {
      this.currentElement.creationDate = new Date();
    }
  }

  save() {
    this.ref.close(this.currentElement);
  }

  cancel() {
    this.ref.close();
  }
}
