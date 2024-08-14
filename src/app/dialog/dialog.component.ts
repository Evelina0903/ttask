import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ElementService} from "../services/element.service";

interface DialogForm {
  name: FormControl<string>;
  dueDate:  FormControl<string>;
  description:  FormControl<string>;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NbCardModule, NbInputModule, NbButtonModule, NbDatepickerModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent implements OnInit {
  @Input() isEditing: boolean = false;
  @Input() isViewing: boolean = false;
  @Input() currentElement: any = {};
  @Input() elementIndex: number = -1;

  headerText: string = '';
  form!: FormGroup<DialogForm>;

  constructor(
    protected ref: NbDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private translate: TranslateService,
    private elementService: ElementService
  ) {}

  ngOnInit() {
    this.form = this.fb.group<DialogForm>({
      name: new FormControl({ value: this.currentElement.name || '', disabled: this.isViewing }, { validators: Validators.required, nonNullable: true }),
      dueDate: new FormControl({ value: this.currentElement.dueDate ? this.convertDateToLocalISOString(new Date(this.currentElement.dueDate)) : '', disabled: this.isViewing }, { validators: Validators.required, nonNullable: true }),
      description: new FormControl({ value: this.currentElement.description || '', disabled: this.isViewing }, { validators: Validators.required, nonNullable: true }),
    });

    if (!this.isEditing && !this.isViewing) {
      this.currentElement = {
        name: '',
        creationDate: new Date(),
        dueDate: new Date(),
        description: ''
      };
    }
    this.setHeaderText();
  }
  private convertDateToLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
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
