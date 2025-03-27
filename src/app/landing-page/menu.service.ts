import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private scrollToComponentSource = new Subject<string>();
  scrollToComponent$ = this.scrollToComponentSource.asObservable();

  constructor() { }

  triggerScrollToComponent(componentId: string) {
    this.scrollToComponentSource.next(componentId);
  }
}
