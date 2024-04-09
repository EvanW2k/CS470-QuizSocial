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
        try {
            const userInfo = await axiosAgent.get(`login/${userID}`);
            return userInfo.data;
        } catch (error) {
            return {
                error,
                user: undefined
            };
        }
    }

    async getQuizById(quizID) {
        return axiosAgent.get(`quizzes/${quizID}`)
    }

    async allQuizzes() {
        return axiosAgent.get(`quizzes/all-quizzes`);
    }

    async getQuestionsForQuiz(quizID) {
        return axiosAgent.get(`quizzes/${quizID}/questions`)
    }

    async getUserProfile(userID) {
        return axiosAgent.get(`users/${userID}/profile`)
    }
}