import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewsFeedApiService } from './news-feed-api.service';
import { NewsListComponent } from './news-list/news-list.component';
import { NgxPaginationModule } from 'ngx-pagination';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerInterceptorService } from '../app/services/spinner-interceptor.service';
import { LoaderComponent } from '../app/loader/loader.component';
 

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    LoaderComponent,
   
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
    
     
  ],
  providers: [NewsFeedApiService, { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
