package com.example.demo.Exeption;

public class TicketExeptionNotFound extends RuntimeException {
    public TicketExeptionNotFound(String id){
        super("Ticket not found:"+id);
    }
}
