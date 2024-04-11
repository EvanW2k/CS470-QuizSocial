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
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM quizzes
            WHERE quizID = ?
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
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getQuizById.", err);
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


module.exports = {
    getQuizById,
    getQuestionsForQuiz,
    allQuizzes
};
