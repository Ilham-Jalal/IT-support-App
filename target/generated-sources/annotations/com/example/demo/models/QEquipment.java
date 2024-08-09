package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEquipment is a Querydsl query type for Equipment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEquipment extends EntityPathBase<Equipment> {

    private static final long serialVersionUID = -1298522524L;

    public static final QEquipment equipment = new QEquipment("equipment");

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final SetPath<Incident, QIncident> incidents = this.<Incident, QIncident>createSet("incidents", Incident.class, QIncident.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final EnumPath<com.example.demo.Enum.EquipmentStatus> status = createEnum("status", com.example.demo.Enum.EquipmentStatus.class);

    public final ListPath<Ticket, QTicket> ticketList = this.<Ticket, QTicket>createList("ticketList", Ticket.class, QTicket.class, PathInits.DIRECT2);

    public QEquipment(String variable) {
        super(Equipment.class, forVariable(variable));
    }

    public QEquipment(Path<? extends Equipment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEquipment(PathMetadata metadata) {
        super(Equipment.class, metadata);
    }

}

