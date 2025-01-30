import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TransferenciaRequest } from '../interface/transferencia-request';
import { TransferenciaResponse } from '../interface/transferencia-response';


@Injectable({
  providedIn: 'root'
})
export class TranferenciaService {

  url = 'http://localhost:8084/agendamento';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  agendar(request: TransferenciaRequest): Observable<TransferenciaRequest> {
    return this.httpClient.post<TransferenciaRequest>(this.url + '/agendar', JSON.stringify(request), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  obterAgendamentos(): Observable<TransferenciaResponse[]> {
    return this.httpClient.get<TransferenciaResponse[]>(`${this.url}/obter_agendamentos`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error !== null){
      console.log(`Código do erro: ${error.error.status}, ` + `mensagem: ${error.error.message}`);
      errorMessage = error.error.message;
    } else {
      console.log(`Código do erro: ${error.status}, ` + `menssagem: ${error.message}`);
      errorMessage = 'Ocorreu um erro de sistema.';
    }
    return throwError(errorMessage);
  };

}
