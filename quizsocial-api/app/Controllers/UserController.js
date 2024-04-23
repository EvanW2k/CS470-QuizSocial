const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const getUserById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT userID, username, email, created_at, updated_at, num_follows
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
                ctx.status = 422;
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
        ctx.status = 509;
    });
}

const getUserByName = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT userID, username, email
            FROM users
            WHERE username LIKE ?
        `;
        const usernameSearch = `%${ctx.query.username}%`; // Use query instead of params
        dbConnection.query({
            sql: query,
            values: [usernameSearch]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::getUserByName", error);
                ctx.body = [];
                ctx.status = 440;
                return reject(error);
            }
            if (tuples.length === 0) {
                ctx.body = "No user found with the given username part.";
                ctx.status = 404;
            } else {
                ctx.body = tuples;
                ctx.status = 200;
            }
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getUserByName.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 506;
    });
}



const getUserProfileById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT userID, bio, imageURL, color
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
                ctx.status = 407;
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
        ctx.status = 501;
    });
}

const getFollowsById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT COUNT(*) AS count
            FROM user_follows
            WHERE followed_id = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::getFollowsById", error);
                ctx.body = [];
                ctx.status = 406;
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
        console.log("Database connection error in getFollowsById.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}

const createUserByIdAndPass = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (userID, username, password) 
            VALUES (?, ?, ?);
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID, ctx.params.userID, ctx.request.body.password]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::createUserByIdAndPass", error);
                ctx.body = [];
                ctx.status = 400;
                return reject(error);
            }

            ctx.body = "User created successfully"; // Assuming userID is unique, so only one record should be returned.
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in createUserByIdAndPass.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 502;
    });
}

const deleteUserById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM users  
            WHERE userID = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID, ctx.params.userID, ctx.request.body.password]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::deleteUserByIdAndPass", error);
                ctx.body = [];
                ctx.status = 400;
                return reject(error);
            }

            ctx.body = "User deleted successfully"; // Assuming userID is unique, so only one record should be returned.
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in deleteUserByIdAndPass.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 502;
    });
}

const alterProfileById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE user_profile
            set bio = ?, imageURL = ?
            where userID = ?
            ;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.bio, ctx.request.body.image, ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::alterProfileById", error);
                ctx.body = [];
                ctx.status = 400;
                return reject(error);
            }

            ctx.body = "Profile altered successfully"; // Assuming userID is unique, so only one record should be returned.
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in alterProfileById.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 502;
    });
}

const alterUserById = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE users
            set username = ?
            where userID = ?
            ;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.username, ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::alterUserById", error);
                ctx.body = [];
                ctx.status = 400;
                return reject(error);
            }

            ctx.body = "User altered successfully"; // Assuming userID is unique, so only one record should be returned.
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in alterUserById.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 502;
    });
}



module.exports = {
    getUserById,
    getUserByName,
    getUserProfileById,
    getFollowsById,
    createUserByIdAndPass,
    deleteUserById,
    alterProfileById,
    alterUserById
};
