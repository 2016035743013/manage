

import {get, post, put, del} from '../organizationManageApi/http'

function getManagerData() {
    return get({url: '/managers'});
}
function addManager(data) {
    return post({data, url: '/managers'});
}
function editManager(data) {
    return put({data, url: '/managers'});
}
function delManager(id) {
    return del({data: {objectId: JSON.stringify(id)}, url: '/managers'});
}

function resetPwd(objectId, data) {
    return new Promise((resolve, rejected) => {
        Bmob.updateUserPassword(objectId, data).then(res => {
            resolve(res)
        }).catch(err => {
            rejected(err)
        })
    })
}
export {
    getManagerData,
    addManager,
    editManager,
    delManager,
    resetPwd
}