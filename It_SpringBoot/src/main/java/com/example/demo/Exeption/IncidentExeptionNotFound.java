package com.example.demo.Exeption;

public class IncidentExeptionNotFound extends RuntimeException{
    public IncidentExeptionNotFound(String id){
        super("Incident not found: "+ id);
    }
}
