import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'CODE BREAKER';
  valorIntento = '';
  bandera = false;
  respuesta = '';
  numeroSecreto = 'primero';
  urlApi = 'http://localhost:3000';

  constructor (private http: HttpClient) {}

  async ngOnInit() {
    // await this.getIniciarJuego('0').then((data) => {
    //   this.numeroSecreto = data.respuesta;
    // });
  }

  async jugar() {
    if (this.valorIntento === ''){
      this.respuesta = 'Valores incorrecto';
      return;
    }
    await this.getIntentar(this.valorIntento).then((data) => {
      this.bandera = true;
      this.respuesta = data.respuesta;
    });
  }

  async getIniciarJuego(tipo: string):
  Promise<any> {
    return await this.http.get<any>(`${this.urlApi}/iniciar?tipo=${tipo}`).toPromise();
  }

  async getIntentar(intento: string):
  Promise<any> {
    return await this.http.get<any>(`${this.urlApi}/codebreaker?numero=${intento}`).toPromise();
  }

}
