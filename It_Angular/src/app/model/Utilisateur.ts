import {User} from "./User";
import {Ticket} from "./Ticket";

export class Utilisateur extends User {
  ticketList: Ticket[] = [];
}
