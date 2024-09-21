import axios from 'axios'

const api = {
    answerPre: '/api/answer'
}

// 填写问卷
export function addAnswersAPI(data) {
    return axios({
        url: `${api.answerPre}/addAnswers`,
        //url: "api/answer/addAnswers",
        method: 'POST',
        data
    })
}

export function reviewAnswersAPI(paperId) {
    return axios({
        url: `${api.answerPre}/${paperId}/reviewAnswers`,
        //url: "api/answer/${paperId}/reviewAnswers",
        method: 'GET'
    })
}