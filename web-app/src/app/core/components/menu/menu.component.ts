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
    //private authSvc: AuthenticationService,
  ) { }

  ngOnInit() {
    this.model = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/'] },
      {
        label: 'Evaluador', icon: 'pi pi-pencil',
        items: [
          { label: 'Periodos', routerLink: ['/evaluador'] }
        ]
      }
    ];
    /*
        this.authSvc.isAdmin().subscribe(isAdmin => {
          if (isAdmin) {
            this.model.push({
              label: 'Administración', icon: 'pi pi-users', routerLink: ['/admin'],
              items: [
                { label: 'Periodos', routerLink: ['/admin/periodos'] },
                { label: 'Evaluaciones', routerLink: ['/admin/evaluaciones'] },
                { label: 'Documentos', routerLink: ['/admin/documentos'] },
                { label: 'Formularios', routerLink: ['/admin/formularios'] },
                {
                  label: 'Usuarios',
                  items: [
                    { label: 'General', routerLink: ['/admin/usuarios'] },
                    { label: 'Perfiles', routerLink: ['/admin/usuarios-eval'] },
                    { label: 'Documentos', routerLink: ['/admin/usuarios-doc'] }
                  ]
                },
              ]
            });
          }
        });*/
  }

}
