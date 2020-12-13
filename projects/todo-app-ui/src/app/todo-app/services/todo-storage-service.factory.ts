import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { TodoStorageService } from './todo-storage.service';
import { TodoLocalStorageService } from './todo-local-storage.service';
import { TodoRestStorageService } from './todo-rest-storage.service';

export function todoStorageServiceFactory(config: AppConfigService, http: HttpClient): TodoStorageService {
  switch (config.get('storage')) {
    case 'TodoLocalStorageService':
      return new TodoLocalStorageService();

    case 'TodoRestStorageService':
      return new TodoRestStorageService(http);

    default:
      throw new Error(`"${ config.get('storage') }" is not defined. Maybe a configuration error?`);
  }
}
