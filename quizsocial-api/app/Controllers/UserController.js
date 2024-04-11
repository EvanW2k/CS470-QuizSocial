const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const getUserById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT userID, username, email, created_at, updated_at
            FROM users
            WHERE userID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::getUserById", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            if (tuples.length === 0) {
                ctx.body = "No user found with the given ID.";
                ctx.status = 404; // Not Found
            } else {
                ctx.body = tuples[0]; // Assuming userID is unique, so only one record should be returned.
                ctx.status = 200;
            }
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getUserById.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}

const getUserProfileById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT userID, bio
            FROM user_profile
            WHERE userID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::getUserProfileById", error);
                ctx.body = "Error accessing database for user profile";
                ctx.status = 500;
                return reject(error);
            }
            if (tuples.length === 0) {
                ctx.body = "No profile found for the given user ID.";
                ctx.status = 404; // Not Found
            } else {
                ctx.body = tuples[0]; // Assuming userID is unique, so only one profile record should be returned.
                ctx.status = 200;
            }
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getUserProfileById.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}

module.exports = {
    getUserById,
    getUserProfileById
};
