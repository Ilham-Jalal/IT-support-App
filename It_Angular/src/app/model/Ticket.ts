import { TicketStatus } from "../enum/TicketStatus";
import { Utilisateur } from "./Utilisateur";
import { TechnicianIT } from "./TechnicianIT";
import { Equipment } from "./Equipment";
import { Incident } from "./Incident";

export class Ticket {
  id!: number;
  description!: string;
  dateCreated!: Date;
  status!: TicketStatus;
  utilisateur!: Utilisateur;
  technician!: TechnicianIT;
  equipment?: Equipment;
  incident?: Incident;

  get isAssigned(): boolean {
    return this.technician != null;
  }
}
