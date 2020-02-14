import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.ajustes.aplicarTema(tema);
  }

  colocarCheck() {
    const tema = this.ajustes.ajustes.tema;
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
