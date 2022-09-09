import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state = true;
  stateEvent: EventEmitter<boolean> | undefined;

  constructor() {
    this._state = true;
    this.stateEvent = new EventEmitter<boolean>();
  }

  get state(): boolean {
    return this._state;
  }

  stateChanged(newState: boolean): void {
    this._state = newState;
    // this.stateEvent.emit(newState);
  }
}
