import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  @Input() currentElement: Element = {} as Element;
  @Input() isEditing: boolean = false;
  @Input() isViewing: boolean = false;

  headerText: string = '';
  form: any;

  constructor(
    protected ref: NbDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [{ value: this.currentElement.name, disabled: this.isViewing }, Validators.required],
      dueDate: [{ value: this.currentElement.dueDate, disabled: this.isViewing }, Validators.required],
      description: [{ value: this.currentElement.description, disabled: this.isViewing }, Validators.required]
    });

    if (!this.isEditing && !this.isViewing) {
      this.currentElement.creationDate = new Date();
    }
    this.setHeaderText();
  }

  setHeaderText() {
    if (this.isViewing) {
      this.translate.get('DIALOG.HEADER.VIEW').subscribe((text: string) => this.headerText = text);
    } else if (this.isEditing) {
      this.translate.get('DIALOG.HEADER.EDIT').subscribe((text: string) => this.headerText = text);
    } else {
      this.translate.get('DIALOG.HEADER.ADD').subscribe((text: string) => this.headerText = text);
    }
  }


  save() {
    if (this.form.valid) {
      this.ref.close({ ...this.currentElement, ...this.form.value });
    }
  }

  cancel() {
    this.ref.close();
  }
}
