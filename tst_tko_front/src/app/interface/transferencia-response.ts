import { Correntista } from './correntista';
import { Taxa } from './taxa';

export interface TransferenciaResponse {
  id : number;
  taxa : Taxa;
  correntista : Correntista;
  destino : string;
  valor : number;
  dataAgendamento : Date;
}


