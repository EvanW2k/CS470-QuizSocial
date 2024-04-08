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
    return ctx.body = 'Connected';
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
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("quizsocial_routes.js: login-route error:", err));

// Routes router configuration.

const QuizController = require('../app/Controllers/QuizController.js');
const quizzesRouter = require('koa-router')({
    prefix: '/quizzes'
});

quizzesRouter.use(VerifyJWT);
quizzesRouter.get('/quizzes/:quizID', Authorize('admin'), QuizController.getQuizById, err => console.log(`getQuizById ran into an error: ${err}`));
quizzesRouter.get('/quizzes/:quizID/questions', Authorize('admin'), QuizController.getQuestionsForQuiz);

const UserController = require('../app/Controllers/UserController.js');
const usersRouter = require('koa-router')({
    prefix: '/users'
});

usersRouter.use(VerifyJWT);
usersRouter.get('/users/:userID', Authorize('admin'), UserController.getUserById, err => console.log(`getQuizById ran into an error: ${err}`));
usersRouter.get('/users/:userID/profile', Authorize('admin'), UserController.getUserProfileById);

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    quizzesRouter.routes(),
    usersRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
