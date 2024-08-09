package com.example.demo.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAdminIT is a Querydsl query type for AdminIT
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdminIT extends EntityPathBase<AdminIT> {

    private static final long serialVersionUID = -498537712L;

    public static final QAdminIT adminIT = new QAdminIT("adminIT");

    public final QUser _super = new QUser(this);

    //inherited
    public final StringPath email = _super.email;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final StringPath password = _super.password;

    //inherited
    public final EnumPath<com.example.demo.Enum.Role> role = _super.role;

    //inherited
    public final StringPath username = _super.username;

    public QAdminIT(String variable) {
        super(AdminIT.class, forVariable(variable));
    }

    public QAdminIT(Path<? extends AdminIT> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAdminIT(PathMetadata metadata) {
        super(AdminIT.class, metadata);
    }

}

