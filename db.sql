CREATE TABLE planes(
	id serial PRIMARY KEY,
	model varchar(255),
	lastWarningId int
);

CREATE TABLE messages(
	id serial PRIMARY KEY,
	plane_id int references planes(id),
	lat float8,
	lng float8,
	altitude float,
	timestamp int
);

CREATE TABLE warnings(
	id serial PRIMARY KEY,
	plane_id int references planes(id),
	lat float8,
	lng float8,
	altitude float,
	timestamp int
);

INSERT INTO planes (model) VALUES('BOEING 737')
INSERT INTO planes (model) VALUES('BOEING 477')

INSERT INTO messages (plane_id, lat, lng, altitude, "timestamp") VALUES (1, 0, 0, 0, 0);