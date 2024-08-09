import {EquipmentStatus} from "../enum/EquipmentStatus";
import {Incident} from "./Incident";
import {Ticket} from "./Ticket";


export class Equipment {
  id!: number;
  name!: string;
  description!: string;
  status!: EquipmentStatus;
  incidents: Incident[] = [];
  ticketList: Ticket[] = [];
}
