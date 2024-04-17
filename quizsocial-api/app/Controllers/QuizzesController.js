const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allQuizzes = async (ctx) => {
    console.log('all quizzes called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            quizzes
                        ORDER BY quizID
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in RoutesController::allRoutes", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allRoutes.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getQuizById = (ctx) => {
    console.log("Getting quiz by ID")
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM
                users u
            JOIN
                quizzes q
            ON
                u.userID = q.userID
            WHERE
                q.quizID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.quizID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::getQuizById", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = tuples[0]; // should only have 1 quiz match
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getQuizById.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const getQuizByUserId = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
            FROM
                quizzes
            WHERE
                userID = ?
            `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID],
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::getQuizByUserId", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getQuizByUserId.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const getQuestionsForQuiz = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM questions WHERE quizID = ?";
        dbConnection.query({
            sql: query,
            values: [ctx.params.quizID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::getQuestionsForQuiz", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getQuestionsForQuiz.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

const getQuizzesByTitle = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT quizID, userID, title, description
            FROM quizzes
            WHERE title LIKE ?
        `;
        const titleSearch = `%${ctx.query.title}%`; // Prepare the search term with wildcards

        dbConnection.query({
            sql: query,
            values: [titleSearch]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::getQuizzesByTitle", error);
                ctx.body = "Error accessing the database";
                ctx.status = 500;
                return reject(error);
            }
            if (tuples.length === 0) {
                ctx.body = "No quizzes found with the given title part.";
                ctx.status = 404; // Not Found
            } else {
                ctx.body = tuples; // Returns all matching records
                ctx.status = 200;
            }
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getQuizzesByTitle.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}


module.exports = {
    getQuizById,
    getQuestionsForQuiz,
    allQuizzes,
    getQuizByUserId,
    getQuizzesByTitle
};
