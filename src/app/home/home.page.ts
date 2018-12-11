import { Component, OnInit } from '@angular/core';
import { Item, ItemService } from '../services/item-service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  items: Item[];
 
  constructor(private itemService: ItemService) { }
 
  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      this.items = res;
    });
  }
 
  remove(item) {
    this.itemService.removeItem(item.id);
  }

}