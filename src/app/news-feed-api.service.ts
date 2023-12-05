import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class NewsFeedApiService {
  // Add your API key here
  api_key = "";
  

  constructor(private http: HttpClient) { }
 
  getNewsFeedList(pageNumber: number): Observable<any> {
    return this.http.get(environment.domain + "api/NewsFeed/getNewsFeedList?pageNumber=" + pageNumber + "&PageRecords=10");
  }

  getLatestFeedList(pageNumber: number): Observable<any> {
    return this.http.get(environment.domain + "api/NewsFeed/getLatestFeedList?pageNumber=" + pageNumber + "&PageRecords=10");
  }

   


}