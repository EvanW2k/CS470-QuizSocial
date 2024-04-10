const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:userID', LoginController.authorizeUser, (err) => console.log("quiz_social_routes.js: login-route error:", err));

// Pages router configuration.

const QuizzesController = require('../app/Controllers/QuizzesController.js');
const quizzesRouter = require('koa-router')({
    prefix: '/routes'
});

quizzesRouter.use(VerifyJWT);
quizzesRouter.get('/all-quizzes', QuizzesController.allQuizzes, err => console.log(`allRoutes ran into an error: ${err}`));
quizzesRouter.get('/:quizID/', QuizzesController.getQuizById);
quizzesRouter.get('/:quizID/questions', QuizzesController.getQuestionsForQuiz);


/**
 * Register all the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    quizzesRouter.routes(),
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
