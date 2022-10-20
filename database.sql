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