import {IncidentStatus} from "../enum/IncidentStatus";
import {Equipment} from "./Equipment";
import {Ticket} from "./Ticket";


export class Incident {
  id!: number;
  description!: string;
  dateDetected!: Date;
  status!: IncidentStatus;
  equipmentList: Equipment[] = [];
  tickets: Ticket[] = [];
}
