import { Component, Renderer2 } from '@angular/core';
import { NewsFeedApiService } from '../app/news-feed-api.service';
import { Observable, Subject } from 'rxjs';
import { Feeds } from './feed.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-app';
  newsQuery: string = '';
  modelChanged = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['query']) {
        this.newsQuery = p['query']
      }
    });
    
  }
  routeTo() {
    if (this.newsQuery != "") {
      this.router.navigate([''], { queryParams: { query: this.newsQuery } });
    }

  }

  debounceSearch(query: any) {
    if (query != "") {
      this.newsQuery = query;
    }
 
  }

  removeQueryParams() {
    this.newsQuery = "";
    this.router.navigate(
      [],
      {
        queryParams: {
          query: null,

        },
        queryParamsHandling: 'merge',
      }
    )
  }

  newestStories() {
    this.router.navigate(
      [],
      {
        queryParams: {
          query: "LatestNews",

        },
        queryParamsHandling: 'merge',
      }
    )
  }
  topStories() {
    this.router.navigate(
      [],
      {
        queryParams: {
          query: "TopNews",

        },
        queryParamsHandling: 'merge',
      }
    )
  }

}
