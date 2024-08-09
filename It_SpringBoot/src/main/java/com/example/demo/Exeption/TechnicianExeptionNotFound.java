package com.example.demo.Exeption;

public class TechnicianExeptionNotFound extends RuntimeException{
    public TechnicianExeptionNotFound(String id){super("Technician not found"+id);}
}
