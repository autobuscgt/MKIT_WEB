import { makeAutoObservable } from 'mobx';
import { fetchGroups } from '../http/groupsAPI';

export default class GroupStore {
  constructor() {
    this._groups = [];
    this._selectedGroupId = null;
    makeAutoObservable(this);
  }

  setGroups(groups) {
    this._groups = groups;
  }

  setSelectedGroupId(id) {
    this._selectedGroupId = id;
  }

  get groups() {
    return this._groups;
  }

  get selectedGroupId() {
    return this._selectedGroupId;
  }

  async loadGroups() {
    try {
      const data = await fetchGroups();
      this.setGroups(data.groups);
    } catch (e) {
      console.error('Ошибка загрузки групп:', e);
    }
  }
}