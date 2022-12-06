import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Observable, merge, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ERRORS } from '../models/models';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

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

  get geoPosition(): Promise<google.maps.LatLngLiteral> {
    return (
      (Capacitor.getPlatform() === 'web') ?
        this.getGeoPositionFromNavigator() :
        this.getGeoPositionForHybridDevices()
    )
  }

  saveToLocalStorage(dataKey: string, dataValue: any) {
    try {
      const stringifiedValue = JSON.stringify(dataValue);
      localStorage.setItem(dataKey, stringifiedValue);
    }
    catch (error) {
      throw (error);
    }
  }

  getFromLocalStorage(dataKey: string) {
    try {
      const item = localStorage.getItem(dataKey);
      if (!item) throw (ERRORS.NOT_FOUND_IN_STORAGE);
      return JSON.parse(item);
    }
    catch (error) {
      throw (error);
    }
  }

  clearLocalStorage() {
    try {
      localStorage.clear();
    }
    catch (error) {
      throw (error);
    }
  }

  triggerHardwareBackBtn() {
    App.addListener('backButton', (evt) => {
      if (evt.canGoBack) {
        window.history.back();
        return;
      }
      this.quitApp();
    })
  }

  async quitApp() {
    if (confirm('Do you want to exit the app?')) {
      await App.exitApp();
    }
  }

  private async getGeoPositionForHybridDevices(): Promise<google.maps.LatLngLiteral> {
    const userPosition = await Geolocation.getCurrentPosition();
    return {
      lat: userPosition.coords.latitude,
      lng: userPosition.coords.longitude
    };
  }

  private async getGeoPositionFromNavigator(): Promise<google.maps.LatLngLiteral> {
    const options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    };
    const setupPositionPromise = new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    const userPosition = await setupPositionPromise;
    return {
      lat: userPosition.coords.latitude,
      lng: userPosition.coords.longitude
    }
  }

}
