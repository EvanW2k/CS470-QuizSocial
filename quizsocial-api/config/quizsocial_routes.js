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
loginRouter.get('/:userID', LoginController.authorizeUser, (err) => console.log("quizsocial_routes.js: login-route error:", err));

// Pages router configuration.
const UserController = require('../app/Controllers/UserController.js');
const userRouter = require('koa-router')({
    prefix: '/user'
});

userRouter.use(VerifyJWT);
userRouter.get('/:userID/user-info', UserController.getUserById, err => console.log(`getUserById ran into an error: ${err}`));
userRouter.get('/:userID/user-profile', UserController.getUserProfileById, err => console.log(`getUserProfileById ran into an error: ${err}`));
userRouter.get('/:userID/follows', UserController.getFollowsById, err => console.log(`getFollowsById ran into an error: ${err}`));

userRouter.get('/search', UserController.getUserByName);
userRouter.post('/create/:userID', UserController.createUserByIdAndPass, err => console.log(`createUserByIdAndPass ran into an error: ${err}`));
userRouter.delete('/delete/:userID', UserController.deleteUserById, err => console.log(`deleteUserById ran into an error: ${err}`));

userRouter.post('/:userID/alter-profile', UserController.alterProfileById, err=> console.log(`alterProfileById ran into an error: ${err}`));
userRouter.post('/:userID/alter-user', UserController.alterUserById, err=> console.log(`alterUserById ran into an error: ${err}`));

const FollowController = require('../app/Controllers/FollowController.js');
const followRouter = require('koa-router')({
    prefix: '/follow'
});

followRouter.get('/:userID/following', FollowController.getFollowingByUserID, err => console.log(`getFollowingByUserID ran into an error: ${err}`));
followRouter.post('/createFollow/:followerID/:followedID', FollowController.createFollowWithIDs, err => console.log(`createFollowWithIDs ran into an error: ${err}`));
followRouter.delete('/deleteFollow/:followerID/:followedID', FollowController.deleteFollowWithIDs, err => console.log(`deleteFollowWithIDs ran into an error: ${err}`));

const QuizzesController = require('../app/Controllers/QuizzesController.js');
const quizzesRouter = require('koa-router')({
    prefix: '/quizzes'
});

quizzesRouter.use(VerifyJWT);
quizzesRouter.get('/all-quizzes', QuizzesController.allQuizzes, err => console.log(`allRoutes ran into an error: ${err}`));
quizzesRouter.get('/byID/:userID', QuizzesController.getQuizByUserId);
quizzesRouter.get('/:quizID', QuizzesController.getQuizById);
quizzesRouter.get('/:quizID/questions', QuizzesController.getQuestionsForQuiz);
quizzesRouter.get('/search', QuizzesController.getQuizzesByTitle);
quizzesRouter.get('/rating/:quizID', QuizzesController.getQuizRatings);


/**
 * Register all the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    userRouter.routes(),
    followRouter.routes(),
    quizzesRouter.routes(),
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
