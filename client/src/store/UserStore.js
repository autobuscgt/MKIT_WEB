import {makeAutoObservable} from 'mobx'
export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}

        this._PC_PASSWORD = ''

        const savedGroup = localStorage.getItem('selectedGroup');
        if (savedGroup) {
        this._user.group = JSON.parse(savedGroup);
        }
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setPCpassword(PC_PASSWORD){
        this._PC_PASSWORD = PC_PASSWORD
    }
    setUser(user){
        this._user = user
        localStorage.setItem('user', JSON.stringify(user));
    }
    get PC_PASSWORD(){
        return this._PC_PASSWORD
    }
    get isAuth(){
        return this._isAuth
    } 
    get user(){
        return this._user
    }
}