import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNewLog: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(service => {
      if (service.id !== null) {
        this.isNewLog = false;
        this.id = service.id;
        this.text = service.text;
        this.date = service.text;
      }
    });
  }

  onSubmit() {
    if (this.isNewLog) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      this.logService.addLog(newLog);
    } else {
      // create log to update
      const logToUpdate = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(logToUpdate);
    }
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
