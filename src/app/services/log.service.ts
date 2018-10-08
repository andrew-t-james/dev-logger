import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

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

  getLogs() {
    return this.logs;
  }
}
