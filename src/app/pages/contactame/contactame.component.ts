import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactame',
  standalone: true,
  templateUrl: './contactame.component.html',
  styleUrls: ['./contactame.component.scss']
})
export class ContactameComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const emailData = {
      to: 'abelardocruzleos123@gmail.com',
      subject: `Nuevo mensaje de ${this.contact.name}`,
      body: `Nombre: ${this.contact.name}\nCorreo: ${this.contact.email}\nMensaje: ${this.contact.message}`
    };

    this.http.post('https://tudominio.com/api/send-email', emailData)
      .subscribe(response => {
        alert('Mensaje enviado exitosamente!');
      }, error => {
        alert('Hubo un error al enviar el mensaje.');
      });
  }
}
