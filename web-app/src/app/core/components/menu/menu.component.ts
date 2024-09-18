import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  model: any[];

  constructor(
    public appMain: MainComponent,
  ) { }

  ngOnInit() {
    this.model = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/'] }
    ];
  }

}
