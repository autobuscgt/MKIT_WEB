import { makeAutoObservable, toJS } from 'mobx';
import {jwtDecode} from 'jwt-decode';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = { group: null }; 
    this._PC_PASSWORD = '';
    const savedGroup = localStorage.getItem('selectedGroup');
    if (savedGroup) {
      try {
        this._user.group = JSON.parse(savedGroup);
      } catch (e) {
        console.error('Error parsing group:', e);
      }
    }

    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setPCpassword(PC_PASSWORD) {
    this._PC_PASSWORD = PC_PASSWORD;
  }

  setUser(userData) {
    this._user = {
      id: userData.id,
      login: userData.login,
      group: userData.group || this._user.group ,
      role:userData.role
    };
    
    localStorage.setItem('user', JSON.stringify(toJS(this._user)));
  }
  async setUserFromToken(token) {
    const decoded = jwtDecode(token);
    this.setUser({
      id: decoded.id,
      login: decoded.login,
      group: decoded.group,
      role:decoded.role
    });
    localStorage.setItem('token', token);
  }

  get PC_PASSWORD() {
    return this._PC_PASSWORD;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}