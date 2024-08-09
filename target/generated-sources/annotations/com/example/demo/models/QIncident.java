package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIncident is a Querydsl query type for Incident
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIncident extends EntityPathBase<Incident> {

    private static final long serialVersionUID = -1513645764L;

    public static final QIncident incident = new QIncident("incident");

    public final DateTimePath<java.util.Date> dateDetected = createDateTime("dateDetected", java.util.Date.class);

    public final StringPath description = createString("description");

    public final SetPath<Equipment, QEquipment> equipmentList = this.<Equipment, QEquipment>createSet("equipmentList", Equipment.class, QEquipment.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<com.example.demo.Enum.IncidentStatus> status = createEnum("status", com.example.demo.Enum.IncidentStatus.class);

    public final ListPath<Ticket, QTicket> tickets = this.<Ticket, QTicket>createList("tickets", Ticket.class, QTicket.class, PathInits.DIRECT2);

    public QIncident(String variable) {
        super(Incident.class, forVariable(variable));
    }

    public QIncident(Path<? extends Incident> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIncident(PathMetadata metadata) {
        super(Incident.class, metadata);
    }

}

