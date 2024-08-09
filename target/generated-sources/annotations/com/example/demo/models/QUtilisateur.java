package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUtilisateur is a Querydsl query type for Utilisateur
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUtilisateur extends EntityPathBase<Utilisateur> {

    private static final long serialVersionUID = 2078117593L;

    public static final QUtilisateur utilisateur = new QUtilisateur("utilisateur");

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

    public QUtilisateur(String variable) {
        super(Utilisateur.class, forVariable(variable));
    }

    public QUtilisateur(Path<? extends Utilisateur> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUtilisateur(PathMetadata metadata) {
        super(Utilisateur.class, metadata);
    }

}

