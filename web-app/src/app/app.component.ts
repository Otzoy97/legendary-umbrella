import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  horizontal = true;
  ripple = true;
  compactMode = false;
  topbarColor = 'layout-topbar-night';
  menuColor = 'layout-menu-light';
  topbarSize = 'large';
  inputStyle = 'outlined';
}
