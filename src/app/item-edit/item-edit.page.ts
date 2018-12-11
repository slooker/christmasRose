import { Item, ItemService } from '../services/item-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
 
@Component({
  selector: 'app-item-details',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit {
  item: Item = {
    name: 'test',
    count: 30,
    gender: 'male',
    itemType: 'fake item',
    location: 'no location',
    notes: '',
    size: 'no size',
    createdAt: new Date().getTime(),
  };
 
  itemId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private itemService: ItemService, private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId)  {
      this.loadItem();
    }
  }
 
  async loadItem() {
    const loading = await this.loadingController.create({
      message: 'Loading Item..'
    });
    await loading.present();
 
    this.itemService.getItem(this.itemId).subscribe(res => {
      loading.dismiss();
      this.item = res;
    });
  }
 
  async saveItem() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Item..'
    });
    await loading.present();
 
    if (this.itemId) {
      this.itemService.updateItem(this.item, this.itemId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.itemService.addItem(this.item).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }
}