import { makeAutoObservable } from 'mobx'

export default class ScheduleStore {
    constructor() {
        this._schedules = []
        this._selectedGroupId = null 
        makeAutoObservable(this)
    }

    setSchedule(data) {
        this._schedules = Array.isArray(data) ? data : data.schedules || []
    }

    setSelectedGroupId(groupId) { 
        this._selectedGroupId = groupId
    }

    get schedules() {
        return this._schedules
    }

    get selectedGroupId() { 
        return this._selectedGroupId
    }
}