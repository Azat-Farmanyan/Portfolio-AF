import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  previousPath = new BehaviorSubject<string>('');

  constructor() {}
}
