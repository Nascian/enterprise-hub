import { Injectable } from '@angular/core';

import { UserApp } from './core';


const USER_KEY : string = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItemString(key: string)  {
    return localStorage.getItem(key);
  }
  stringifyItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  parseItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  setItem(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  getItemJSON(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  }
  

  removeItem(key: string) {  
    localStorage.removeItem(key);
  }

  cleanUser(){
    window.sessionStorage.removeItem(USER_KEY);
  }

  public saveUser(user: UserApp): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserApp | null {
    const userJson = window.sessionStorage.getItem(USER_KEY);
    if (userJson) {
      const user = JSON.parse(userJson) as UserApp;
      return user;
    }
    return null;
  }
  

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);    
    if (user) {
      return true;
    }
    return false;
  }

  public getToken(): any {
    const user = sessionStorage.getItem(USER_KEY);
    
    var token = null;
    if (user) {
      return JSON.parse(user).accessToken;
    }
    return '';
  }

  clean(): void {
    sessionStorage.clear();
  }

  removeToken() {
    sessionStorage.removeItem(USER_KEY);
  }

}

