const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

testConnection = () => {
    console.log('TESTING POSTGRES..');
    pool.query('SELECT NOW()', (err, res) => {
        if(!err)
            console.log('POSTGRES OK!');
        else
            console.log('CANNOT CONNECT TO POSTGRES')
    });
};

listPlanes = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`
        select distinct on(m.plane_id) * from messages m inner join planes p on m.plane_id = p.id where m.plane_id in (
            SELECT DISTINCT id FROM planes
        )
            `, (err, res) => {
            if(err) reject(err);
            resolve(res.rows)
        })
    })
};

insertMessage = async (plane_id, latitude, longitude, timestamp, altitude) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO messages (plane_id, lat, lng, timestamp, altitude) VALUES ($1, $2, $3, $4, $5)',
            [
                plane_id,
                latitude,
                longitude,
                timestamp,
                altitude
            ],
            (err) => {
                if(err) {
                    console.log(err)
                    reject();
                } else
                    resolve()
            }
        )
    })
}

insertWarning = async (plane_id, latitude, longitude, timestamp, altitude) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO warnings (plane_id, lat, lng, timestamp, altitude) VALUES ($1, $2, $3, $4, $5)',
            [
                plane_id,
                latitude,
                longitude,
                timestamp,
                altitude
            ],
            (err) => {
                if(err) {
                    console.log(err)
                    reject();
                } else
                    resolve()
            }
        )
    })
}

module.exports = {
    testConnection,
    listPlanes,
    insertMessage,
    insertWarning
};