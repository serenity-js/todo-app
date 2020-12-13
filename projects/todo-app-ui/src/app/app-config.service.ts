import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private config;

  constructor(private http: HttpClient) { }

  load(): Promise<void> {
    return this.http.get('/config.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get(key: string): string {
    return this.config[key];
  }
}
