import { Component, OnInit } from '@angular/core';
import { Observable }       from 'rxjs/Observable';

import { Item } from  './item';
import { ItemService } from  './item.service';

@Component({
  selector: 'items',
  templateUrl: './item-list.component.html',
  providers: [ItemService]
})
export class ItemListComponent {
  errorMessage: string;
  items: Item[];
  youtubeUrl = 'https://www.youtube.com/embed/';
  facebookUrl = 'http://www.facebook.com/video/embed?video_id=';

  constructor (private itemService: ItemService) {}

  ngOnInit() {this.getItems();}

  getItems() {
    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error =>  this.errorMessage = <any>error);
  }
}
