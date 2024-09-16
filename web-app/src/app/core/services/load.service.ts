import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private events: {
    [key: string]: BehaviorSubject<any>
  } = {};

  constructor() { }

  registerEvent(name: string) {
    if (!this.events[name]) {
      this.events[name] = new BehaviorSubject<any>(null);
    }
    return this.events[name].asObservable();
  }

  emitEvent(name: string, data: any) {
    if (this.events[name]) {
      this.events[name].next(data);
    }
  }
}