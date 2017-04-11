// Observable Version
import { Injectable }              from '@angular/core';
import {Http, Response, Jsonp}          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Item } from './item';

@Injectable()
export class ItemService {
  videoUrl: SafeResourceUrl;
  constructor (private http: Http) {}

  private url = 'https://cdn.playbuzz.com/content/feed/items';

  getItems(): Observable<Item[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    let videos = body.items;
    // for (let video of videos) {
    //   if (video.source === 'youtube') {
    //     this.videoUrl = 'https://www.youtube.com/embed/' + video.videoId;
    //     console.log(this.videoUrl);
    //   }
    // }
    return body.items || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
