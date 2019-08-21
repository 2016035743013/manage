import {
    getData,
    addOrEdit,
    deleteData
} from '../organizationManageApi/BombHttp'

function getManagerData() {
    return getData('_User').then(res => {
        return res;
    })
}
function addOrEditManager(data) {
    return addOrEdit('_User', data).then(res => {
        return res;
    })
}
function delManager(id) {
    return deleteData('_User', id).then(res => {
        return res;
    })
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
    addOrEditManager,
    delManager,
    resetPwd
}