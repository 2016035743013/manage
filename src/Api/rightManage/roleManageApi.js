import {
    getData,
    addOrEdit,
    deleteData
} from '../organizationManageApi/BombHttp'
function getRoleData() {
    return getData('roleManage').then((res) => {
        return res;
    })
}
function addOrEditRole(data) {
    return addOrEdit('roleManage', data).then((res) => {
        return res;
    })
}
function delRole(id) {
    return deleteData('roleManage', id).then((res) => {
        return res;
    })
}
export {
    getRoleData,
    addOrEditRole,
    delRole
}