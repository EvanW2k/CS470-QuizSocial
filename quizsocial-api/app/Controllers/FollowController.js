const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const createFollowWithIDs = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO user_follows (follower_id, followed_id) 
            VALUES (?, ?);
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.followerID, ctx.params.followedID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FollowController::createFollowWithIDs", error);
                ctx.body = [];
                ctx.status = 505;
                return reject(error);
            }
            ctx.body = "Follow created successfully"; // Assuming userID is unique, so only one record should be returned.
            ctx.status = 201;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in createFollowWithIDs.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 516;
        throw err; // Throw the error to be caught by the catch block in the API interface
    });
}

const deleteFollowWithIDs = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM user_follows  
            WHERE follower_id = ? AND followed_id = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.followerID, ctx.params.followedID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FollowController::deleteFollowWithIDs", error);
                ctx.body = [];
                ctx.status = 505;
                return reject(error);
            }
            ctx.body = "Follow deleted successfully";
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in deleteFollowWithIDs.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 516;
        throw err; // Throw the error to be caught by the catch block in the API interface
    });
}

const getFollowingByUserID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM user_follows
            WHERE follower_id = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in FollowController::getFollowingByUserID", error);
                ctx.body = [];
                ctx.status = 505;
                return reject(error);
            }
            if (tuples.length === 0) {
                ctx.body = "This user doesn't follow any other user.";
                ctx.status = 203; // Not Found
            } else {
                ctx.body = tuples;
                ctx.status = 200;
            }
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getFollowingByUserID.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}

module.exports = {
    getFollowingByUserID,
    createFollowWithIDs,
    deleteFollowWithIDs
};
