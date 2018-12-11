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
 
  constructor(private itemService: ItemService, private alertCtrl: AlertController) { }
 
  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      this.items = res;
    });
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
