import { makeAutoObservable } from 'mobx'

export default class HomeworkStore {
    constructor() {
        this._homeworks = []
        this._page = 1  
        this._total = 0  
        this._limit = 8
        this._selectedGroupId = null 
        makeAutoObservable(this)
    }

    setHomeworks(data) {
        this._homeworks = Array.isArray(data) ? data : data.homeworks || []
    }
    setSelectedGroupId(groupId) {
        this._selectedGroupId = groupId
    }

    setPage(page) {
        this._page = page;
      }
      setTotalCount(total) {
        this._total = total;
      }
    
      setLimit(limit) {
        this._limit = limit;
      }
    get homeworks() {
        return this._homeworks;
      }
    
      get page() {
        return this._page;
      }
    
      get total() {
        return this._total;
      }
    
      get limit() {
        return this._limit;
      }
    
      get totalPages() {
        return Math.ceil(this._total / this._limit);
      }
    
      get selectedGroupId() {
        return this._selectedGroupId;
      }
    }