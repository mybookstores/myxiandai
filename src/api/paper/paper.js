import axios from 'axios'

const api = {
    paperPre: '/api/paper'
}

// 查看用户所有问卷
export function getUserPapersAPI(userId) {
    return axios({
        url: `${api.paperPre}/getUserPapers`,
        //url: "api/paper/getUserPapers/",
        method: 'GET',
    })
}

// 查看完整问卷
export function checkPaperAPI(paperId) {
    return axios({
        url: `${api.paperPre}/${paperId}/checkPaper`,
        //url: "api/paper/${paperId}/checkPaper",
        method: 'GET',
    })
}

// 查看问卷统计信息
export function reviewPaperAPI(paperId) {
    return axios({
        url: `${api.paperPre}/${paperId}/reviewPaper`,
        //url: "api/paper/${paperId}/reviewPaper",
        method: 'GET',
    })
}

// 删除问卷
export function deletePaperAPI(paperId) {
    return axios({
        url: `${api.paperPre}/${paperId}/deletePaper`,
        //url: "api/paper/${paperId}/deletePaper",
        method: 'GET'
    })
}

// 添加问卷
export function addPaperAPI(data) {
    return axios({
        url: `${api.paperPre}/addPaper`,
        //url: "api/paper/addPaper",
        method: 'POST',
        data
    })
}

// 修改问卷
export function updatePaperAPI(data) {
    return axios({
        url: `${api.paperPre}/updatePaper`,
        //url: "api/paper/updatePaper",
        method: 'POST',
        data
    })
}
