import {TicketStatus} from "../enum/TicketStatus";
import {Utilisateur} from "./Utilisateur";
import {User} from "./User";
import {Equipment} from "./Equipment";
import {Incident} from "./Incident";
import {TechnicianIT} from "./TechnicianIT";


export class Ticket {
  id!: number;
  description!: string;
  dateCreated!: Date;
  status!: TicketStatus;
  utilisateur!: Utilisateur;
  technician!: TechnicianIT;
  equipment!: Equipment;
  incident!: Incident;
}
