CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name TEXT ,
    email TEXT ,
    passwrod TEXT
)

CREATE TABLE projects
(
    id SERIAL PRIMARY KEY,
    title TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user (id)
)

CREATE TABLE tasks
(
    id SERIAL PRIMARY KEY,
    time_to_pass TEXT,
    t_priority TEXT,
    t_description TEXT,
)

CREATE TABLE tasks
(
    id serial primary key ,
    description text,
    time_to_pass text,
    priority text,
    project_id integer,
    foreign key (project_id) references projects (id)

)

CREATE TABLE tokens
(
    refresh_token text,
    user_id integer,
    foreign key (user_id) references users (id)
)

