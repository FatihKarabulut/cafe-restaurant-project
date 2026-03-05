create table if not exists products(
                                       products_id serial primary key,
                                       products_img  text not null,
                                       products_name varchar(500) unique not null,
    products_price numeric(10,2)  check(products_price > 0) not null,
    products_category varchar(50) not null check(products_category in ('hot','cold','dessert','meal'))

    );


create table if not exists users(
                                    users_id serial primary key not null,
                                    users_name varchar(200) unique not null,
    users_password varchar(500) not null,
    users_role varchar(100) not null

    );


