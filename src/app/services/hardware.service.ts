import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Observable, merge, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ERRORS } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor() { }

  get isConnected(): Observable<boolean> {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    )
  }

  async saveToLocalStorage(dataKey: string, dataValue: any) {
    try {
      const stringifiedValue = JSON.stringify(dataValue);
      localStorage.setItem(dataKey, stringifiedValue);
    }
    catch (error) {
      throw (error);
    }
  }

  async getFromLocalStorage(dataKey: string) {
    try {
      const item = localStorage.getItem(dataKey);
      if (!item) throw (ERRORS.NOT_FOUND_IN_STORAGE);
      return JSON.parse(item);
    }
    catch (error) {
      throw (error);
    }
  }

  async clearLocalStorage() {
    try {
      localStorage.clear();
    }
    catch (error) {
      throw (error);
    }
  }

  triggerHardwareBackBtn() {
  }

  async quitApp() {
    if (confirm('Do you want to exit the app?')) {
      await App.exitApp();
    }
  }

}
