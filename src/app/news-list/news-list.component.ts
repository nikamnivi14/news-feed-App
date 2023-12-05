import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, interval, takeUntil, timer } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { NewsFeedApiService } from '../news-feed-api.service';
import { Feeds, FeedsResponse } from '../feed.model'

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsList: Feeds[] = [];
  query: string = '';
  page: number = 1;
  totalPages: number = 0;
  totalRecords: number = 0;
  unlisten!: () => void;
  
  interval = interval(1000);
   
  unSubscribe!: Subscription;
searchType :string="";

  
  currentIndex = -1;
  title = '';


  count = 0;
  pageSize =1;
  pageSizes = [];
  constructor(private newsapi: NewsFeedApiService, private router: ActivatedRoute, private rd: Renderer2) {

  }
  ngOnInit() {
    this.router.queryParams.subscribe(p => {
      if (p['query']) {
        this.query = p['query'];
        this.totalPages = 1;
        this.page = 1;
       
        this.getNewsList(this.query);

      }
      else {
        this.page = 1;
        this.totalPages = 1
        this.getNewsList();
      }
    });

 
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getNewsList();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getNewsList();
  }

   
  //populate newslist[] with articles from news api
  getNewsList(query: string = "") {
    if (query == "TopNews" || query == "LatestNews") {
      this.searchType =query;
    }
     
    else{
      this.searchType ="";
    }
    if ( this.searchType == "TopNews" ||  this.searchType == "LatestNews") {
      
      if (this.page <= this.totalPages) {
        if ( this.searchType == "TopNews") {
          this.newsapi.getNewsFeedList(this.page).subscribe(news => {

            this.newsList = news?.data;
            this.totalPages = news?.totalPages;
            this.totalRecords = news?.data?.length;

          })
        }
        else {
          this.newsapi.getLatestFeedList(this.page).subscribe(news => {

            this.newsList = news?.data;
            this.totalPages = news?.totalPages;
            this.totalRecords = news?.data?.length;

          })
        }

      }
    }
    else if (query != "") {

      this.newsList = this.newsList.filter(
        news => news?.title?.toLowerCase().includes(query.toLowerCase())
      );
    }
    else {
      this.newsapi.getNewsFeedList(this.page).subscribe(news => {

        this.newsList = news?.data;
        this.totalPages = news?.totalPages;
        this.totalRecords = news?.data?.length;

      })
    }


  }

  ngOnDestroy() {
    // destroy all listeners and subscription
    this.unlisten();
    this.unSubscribe.unsubscribe();

  }

}
