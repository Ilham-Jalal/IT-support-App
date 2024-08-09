package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTechnicianIT is a Querydsl query type for TechnicianIT
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTechnicianIT extends EntityPathBase<TechnicianIT> {

    private static final long serialVersionUID = 757471481L;

    public static final QTechnicianIT technicianIT = new QTechnicianIT("technicianIT");

    public final QUser _super = new QUser(this);

    //inherited
    public final StringPath email = _super.email;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final StringPath password = _super.password;

    //inherited
    public final EnumPath<com.example.demo.Enum.Role> role = _super.role;

    public final ListPath<Ticket, QTicket> ticketList = this.<Ticket, QTicket>createList("ticketList", Ticket.class, QTicket.class, PathInits.DIRECT2);

    //inherited
    public final StringPath username = _super.username;

    public QTechnicianIT(String variable) {
        super(TechnicianIT.class, forVariable(variable));
    }

    public QTechnicianIT(Path<? extends TechnicianIT> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTechnicianIT(PathMetadata metadata) {
        super(TechnicianIT.class, metadata);
    }

}

