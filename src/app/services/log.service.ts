import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'something here',
        date: new Date('12/26/2018 12:54:22')
      },
      {
        id: '2',
        text: 'added something here',
        date: new Date('12/27/2018 8:54:22')
      },
      {
        id: '3',
        text: 'added a blog',
        date: new Date('12/29/2018 10:54:22')
      }
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs[this.logs.findIndex(curLog => curLog.id === log.id)] = log;
  }

  deleteLog(log: Log): Observable<Log[]> {
    this.logs = this.logs.filter(logs => logs.id !== log.id);
    return of(this.logs);
  }
}
