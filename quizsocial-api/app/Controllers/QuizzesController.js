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

const getQuizRatings = (ctx) => {
    console.log("Getting quiz ratings");
    return new Promise((resolve, reject) => {
        const query = `
            SELECT rating
            FROM quizzes
            WHERE quizID = ?
        `;

        dbConnection.query({
            sql: query,
            values: [ctx.params.quizID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::getQuizRatings", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = tuples[0];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connecttion error in getQuizRatings.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
    });
}


const rateQuiz = (ctx) => {
    console.log("Rating a quiz");
    return new Promise((resolve, reject) => {
        const deleteQuery = `
            DELETE FROM quiz_ratings
            WHERE quizID = ?
            AND userID = ?
        `;
        dbConnection.query({
            sql: deleteQuery,
            values: [ctx.params.quizID, ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizController::rateQuiz delete rating", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = [];
            ctx.status = 200;
            return resolve();
        })

        const rateQuery = `
            INSERT INTO quiz_ratings (quizID, userID, rating)
            VALUES (?, ?, ?)
        `;
        dbConnection.query({
            sql: rateQuery,
            values: [ctx.params.quizID, ctx.params.userID, ctx.params.rating]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::rateQuiz", error);
                ctx.body = [];
                ctx.status = 505;
                return reject(error);
            }
            ctx.body = "Rated quiz successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in rateQuiz.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}

const createQuiz = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO quizzes (userID, title)
            VALUES (?, ?)
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID, ctx.params.title]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::createQuiz", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body =  "Created quiz successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in createQuiz.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}

const deleteQuestion = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM questions
            WHERE questionID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.questionID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::deleteQuestion", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = "Deleted question successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in deleteQuestion.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}

const addQuestion = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO questions (quizID, question, answer)
            VALUES (?, ?, ?)
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.quizID, ctx.params.question, ctx.params.answer]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::addQuestion", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = "Added question successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in addQuestion.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}

const changeTitle = ctx => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE quizzes
            SET title = ?
            WHERE quizID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.title, ctx.params.quizID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::changeTitle", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = "Changed title successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in changeTitle.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}

const changePrivacy = ctx => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE quizzes
            SET isPublic = ?
            WHERE quizID = ?
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.isPublic, ctx.params.quizID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::changePrivacy", error);
                ctx.body = [];
                ctx.status = 500;
                return reject(error);
            }
            ctx.body = "Changed privacy successfully.";
            ctx.status = 200;
            return resolve;
        });
    }).catch(err => {
        console.log("Database connection error in changePrivacy.", err);
        ctx.body = "Error accessing the database";
        ctx.status = 500;
        throw err;
    });
}


const getFavorites = async (ctx) => {
    console.log('get favorites called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT
                            q.quizID AS ID,
                            q.title AS title,
                            u.username AS owner,
                            qf.favorited_date AS dateFav,
                            q.num_favorites AS num_favorites
                        FROM
                            quiz_favorites qf
                        JOIN
                            quizzes q ON qf.quizID = q.quizID
                        JOIN
                            users u ON q.userID = u.userID
                        WHERE
                            qf.userID = ?
                        ORDER BY
                            qf.favorited_date DESC
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in QuizzesController::getFavorites", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getFavorites.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    getQuizById,
    getQuestionsForQuiz,
    allQuizzes,
    getQuizByUserId,
    getQuizzesByTitle,
    getQuizRatings,
    rateQuiz,
    createQuiz,
    deleteQuestion,
    addQuestion,
    changeTitle,
    changePrivacy,
    getFavorites
};
