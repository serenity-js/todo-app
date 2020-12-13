import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { TodoAppModule } from './todo-app/todo-app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoAppModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfigService) => () => config.load(),
      multi: true,
      deps: [ AppConfigService ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
