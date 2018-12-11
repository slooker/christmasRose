import { Component, OnInit } from '@angular/core';
import { Item, ItemService } from '../services/item-service';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: Item[];
  sortField: string;
  sortOrder: string;
 
  constructor(private itemService: ItemService, private alertCtrl: AlertController) { }
 
  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      this.items = res;
      this.handleSort("location", "alpha")
    });
  }

  handleSort(sortField, sortOption) {
    this.items = this.items.sort((a,b) => {
      if (sortOption === "alpha") {
        if (a[sortField] < b[sortField])
          return -1;
        if (a[sortField] > b[sortField])
          return 1;
        return 0;
      }
      if (sortOption === "reverseAlpha") {
        if (a[sortField] > b[sortField])
          return -1;
        if (a[sortField] < b[sortField])
          return 1;
        return 0;
      }
    })
  }
 
  remove(name, id) {
    console.log(`nAme: ${name}, id: ${id}`)
    let alert = this.alertCtrl.create({
      message: `Do you want to delete ${name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this.itemService.removeItem(id);
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
