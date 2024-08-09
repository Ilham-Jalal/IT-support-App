package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTicket is a Querydsl query type for Ticket
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTicket extends EntityPathBase<Ticket> {

    private static final long serialVersionUID = 947835382L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTicket ticket = new QTicket("ticket");

    public final DateTimePath<java.util.Date> dateCreated = createDateTime("dateCreated", java.util.Date.class);

    public final StringPath description = createString("description");

    public final QEquipment equipment;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QIncident incident;

    public final EnumPath<com.example.demo.Enum.TicketStatus> status = createEnum("status", com.example.demo.Enum.TicketStatus.class);

    public final QUser technician;

    public final QUtilisateur utilisateur;

    public QTicket(String variable) {
        this(Ticket.class, forVariable(variable), INITS);
    }

    public QTicket(Path<? extends Ticket> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTicket(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTicket(PathMetadata metadata, PathInits inits) {
        this(Ticket.class, metadata, inits);
    }

    public QTicket(Class<? extends Ticket> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.equipment = inits.isInitialized("equipment") ? new QEquipment(forProperty("equipment")) : null;
        this.incident = inits.isInitialized("incident") ? new QIncident(forProperty("incident")) : null;
        this.technician = inits.isInitialized("technician") ? new QUser(forProperty("technician")) : null;
        this.utilisateur = inits.isInitialized("utilisateur") ? new QUtilisateur(forProperty("utilisateur")) : null;
    }

}

