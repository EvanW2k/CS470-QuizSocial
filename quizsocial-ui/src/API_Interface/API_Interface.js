import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    // users
    async getUserInfo(userID) {
        return axiosAgent.get(`login/${userID}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async getUserById(userID) {
        return axiosAgent.get(`user/${userID}/user-info`);
    }

    async getUserByName(username) {
        return axiosAgent.get(`user/${username}/search`);
    }
    async getUserProfileById(userID) {
        return axiosAgent.get(`user/${userID}/user-profile`);
    }


    async createUserByIdAndPass (userID, password) {
        return axiosAgent.post(`user/create/${userID}`, {password});
    }

    async deleteUserById (userID) {
        return axiosAgent.delete(`user/delete/${userID}`);
    }

    async alterProfileById (userID, bio, image) {
        return axiosAgent.post(`user/${userID}/alter-profile`, {bio, image});
    }

    async alterUserById (userID, username) {
        return axiosAgent.post(`user/${userID}/alter-user`, {username});
    }


    // follows

    async getFollowsById (userID) {
        return axiosAgent.get(`user/${userID}/follows`);
    }
    async getFollowingByUserID (userID) {
        return axiosAgent.get(`follow/${userID}/following`);
    }

    async createFollowWithIDs (followerID, followedID) {
        return axiosAgent.post(`follow/createFollow/${followerID}/${followedID}`);
    }

    async deleteFollowWithIDs (followerID, followedID) {
        return axiosAgent.delete(`follow/deleteFollow/${followerID}/${followedID}`);
    }

    async getFollowingActivities(userID) {
        return axiosAgent.get(`follow/following/activities/${userID}`);
    }


    // quizzes
    async allQuizzes() {
        return axiosAgent.get(`quizzes/all-quizzes`);
    }

    async getQuestionsForQuiz(quizID){
        return axiosAgent.get(`quizzes/${quizID}/questions`);
    }

    async getQuizById(quizID) {
        return axiosAgent.get(`quizzes/${quizID}`);
    }

    async getQuizByUserId(userID) {
        return axiosAgent.get(`quizzes/byID/${userID}`);
    }

    async getQuizRatings(quizID) {
        return axiosAgent.get(`quizzes/rating/${quizID}`);
    }

    async rateQuiz(quizID, userID, rating) {
        return axiosAgent.post(`quizzes/rateQuiz/${quizID}/${userID}/${rating}`);
    }
    async getALlUserInfoByID(userName) {
        return axiosAgent.get(`/search-info?${userName}`);
    }

    async createQuiz(userID, title) {
        return axiosAgent.post(`quizzes/createQuiz/${userID}/${title}`);
    }

    async deleteQuestion(questionID) {
        return axiosAgent.delete(`quizzes/deleteQuestion/${questionID}`);
    }

    async addQuestion(quizID, question, answer) {
        return axiosAgent.post(`quizzes/addQuestion/${quizID}/${question}/${answer}`);
    }

    async changeTitle(quizID, title){
        return axiosAgent.post(`quizzes/changeTitle/${quizID}`, {title});
    }

    async changePrivacy(quizID, isPublic) {
        return axiosAgent.post(`quizzes/changePrivacy/${quizID}/${isPublic}`);
    }

    async getFavorites(userID){
        return axiosAgent.get(`quizzes/getFavorites/${userID}`)
    }
}