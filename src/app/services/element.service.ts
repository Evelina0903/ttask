import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

interface Element {
  name: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
  notificationShown?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ElementService {
  private elementsSubject = new BehaviorSubject<Element[]>([]);
  elements$ = this.elementsSubject.asObservable();

  constructor() {
    this.loadElements();
  }

  private loadElements() {
    const storedElements = localStorage.getItem('elements');
    if (storedElements) {
      this.elementsSubject.next(JSON.parse(storedElements));
    }
  }

  private saveElements(elements: Element[]) {
    localStorage.setItem('elements', JSON.stringify(elements));
    this.elementsSubject.next(elements);
  }

  addElement(element: Element) {
    const elements = this.elementsSubject.value;
    elements.push(element);
    this.saveElements(elements);
  }

  updateElement(index: number, updatedElement: Element) {
    const elements = this.elementsSubject.value.slice();
    elements[index] = updatedElement;
    this.saveElements(elements);
  }

  deleteElement(index: number) {
    const elements = this.elementsSubject.value.slice();
    elements.splice(index, 1);
    this.saveElements(elements);
  }

  moveElement(index: number, direction: 'up' | 'down') {
    const elements = this.elementsSubject.value.slice();
    if (direction === 'up' && index > 0) {
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
    } else if (direction === 'down' && index < elements.length - 1) {
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
    }
    this.saveElements(elements);
  }

}
