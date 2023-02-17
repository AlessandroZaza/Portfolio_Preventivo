import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
let arrayDomain = [
  'www.google.com',
  'www.facebook.com',
  'www.microsoft.com',
  'www.sony.com',
  'www.nttdata.com',
];

@Component({
  selector: 'app-preventivo',
  templateUrl: './preventivo.component.html',
  styleUrls: ['./preventivo.component.css'],
})
export class PreventivoComponent {
  //script on/off textarea domain
  showDomainInput: boolean = false;

  onYesClick() {
    this.showDomainInput = true;
  }

  onNoClick() {
    this.showDomainInput = false;
  }
  //end script on/off textarea domain

  //script prezzo preventivo
  serviceType: string = '';
  hasDomain: boolean = false;
  needsMaintenance: boolean = false;
  basePrice: number = 0;
  totalPrice: number = 0;
  domainPrice: number = 0;
  maintenancePrice: number = 0;

  calculatePrice() {
    switch (this.serviceType) {
      case 'Static website':
        this.basePrice = 50;
        break;
      case 'CMS website':
        this.basePrice = 100;
        break;
      case 'E-Commerce':
        this.basePrice = 200;
        break;
      case 'Management service':
        this.basePrice = 300;
        break;
      case 'IoT service':
        this.basePrice = 400;
        break;
      case 'IA service':
        this.basePrice = 500;
        break;
      default:
        this.basePrice = 0;
        break;
    }
    //let domainPrice: number = 0; if(this.hasDomain===true){domainPrice = 50;}
    this.domainPrice = this.hasDomain ? 50 : 0;
    // let maintenancePrice: number = 0; if(this.needsMaintenance===true){maintenancePrice = 20;}
    this.maintenancePrice = this.needsMaintenance ? 20 : 0;
    this.totalPrice = this.basePrice + this.domainPrice + this.maintenancePrice;
  }
}
