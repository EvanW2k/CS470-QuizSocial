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

    async getUserInfo(userID) {
        return axiosAgent.get(`login/${userID}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async getQuizById(quizID) {
        return axiosAgent.get(`/quizzes/${quizID}`)
            .then(quiz => quiz.data)
            .catch(error => ({ error, quiz: undefined }));
    }

    async getQuestionsForQuiz(quizID) {
        return axiosAgent.get(`/quizzes/${quizID}/questions`)
            .then(questions => questions.data)
            .catch(error => ({ error, questions: undefined }));
    }

    async getUserProfile(userID) {
        return axiosAgent.get(`/users/${userID}/profile`)
            .then(profile => profile.data)
            .catch(error => ({ error, profile: undefined }));
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }
}