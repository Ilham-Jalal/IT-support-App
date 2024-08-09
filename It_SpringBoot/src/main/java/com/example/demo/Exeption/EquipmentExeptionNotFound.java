package com.example.demo.Exeption;

public class EquipmentExeptionNotFound extends RuntimeException{
    public EquipmentExeptionNotFound(String id){super("Equipment not found" + id);}
}
