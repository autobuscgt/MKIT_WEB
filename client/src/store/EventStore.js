import {makeAutoObservable} from 'mobx'
import { deleteEventAPI, updateEventAPI } from '../http/eventsAPI'
export default class EventStore{
    constructor(){
        this._pages = 1  
        this._total = 0  
        this._limit = 8
        this._events = []
        makeAutoObservable(this)
    }
    setEvents(events) {
      this._events = events
    }
    
    
      async deleteEvent(id) {
        try {
          const currentEvents = Array.isArray(this._events) ? this._events : []
          
          await deleteEventAPI(id)
          this._events = currentEvents.filter(event => event.id !== id)
        } catch (e) {
          console.error('Error deleting event:', e)
          throw e 
        }
      }
      async updateEvent(id, updatedData) {
        try {
          await updateEventAPI(id, updatedData);
          this._events = this._events.map(event => 
            event.id === id ? { ...event, ...updatedData } : event
          );
        } catch (e) {
          console.error('Error updating event:', e);
          throw e;
        }
      }
    setPage(pages){
      this._pages = pages
    }
    setTotalCount(total){
      this._total = total
    }
    setLimit(limit){
      this._limit = limit
    }
    get pages(){
      return this._pages
    }
    get total(){
      return this._total
    }
    get limit(){
      return this._limit
    }
    get currentEvent() {
      return this._currentEvent
    }
    get events(){
        return this._events
    } 
}