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
  private stateSource = new BehaviorSubject<boolean>(true);
  selectedLog = this.logSource.asObservable();
  stateClear = this.stateSource.asObservable();

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
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    }
    this.logs = JSON.parse(localStorage.getItem('logs'));
    return of(this.logs.sort((a, b) => b.date - a.date));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

  updateLog(log: Log) {
    const foundLogById = this.logs.findIndex(curLog => curLog.id === log.id);
    this.logs[foundLogById] = log;
    this.logs.splice(foundLogById, 1);
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log): Observable<Log[]> {
    this.logs = this.logs.filter(logs => logs.id !== log.id);
    localStorage.setItem('logs', JSON.stringify(this.logs));
    return of(this.logs);
  }
}
