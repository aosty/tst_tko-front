import { Component, OnInit } from '@angular/core';
import { TranferenciaService } from '../service/tranferencia.service';
import { TransferenciaRequest } from '../interface/transferencia-request';
import { TransferenciaResponse } from '../interface/transferencia-response';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  transferenciaRequest = {} as TransferenciaRequest;
  agendamentos: TransferenciaResponse[] = [];


  constructor(private tranferenciaService : TranferenciaService) { }

  ngOnInit(): void { 
    this.obterAgendamentos();
  }

  agendar(){

    if(!this.transferenciaRequest.dataAgendamento){
      return;
    }

    if(!this.transferenciaRequest.destino){
      return;
    }

    if(!this.transferenciaRequest.valor){
      return;
    }



    this.transferenciaRequest.dataAgendamento = formatDate(this.transferenciaRequest.dataAgendamento, 'yyyy-MM-ddThh:mm:ss', 'en-US');
    this.tranferenciaService.agendar(this.transferenciaRequest).subscribe(() => {
        this.obterAgendamentos();
    });
  }

  obterAgendamentos() {
    this.tranferenciaService.obterAgendamentos().subscribe((agendamentos: TransferenciaResponse[]) => {
        this.agendamentos = agendamentos;
        console.log(this.agendamentos);
    });
  }

}
