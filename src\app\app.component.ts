import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { title } from './config'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = title;
  constructor(private logger: NGXLogger) {
    this.logger.info(`${title} app started`);
  }
}
