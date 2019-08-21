import {
    getData,
    addOrEdit,
    deleteData
} from './BombHttp'
function getOrganizationData() {
    return getData('organizationManage').then(res => {
        res.reverse();
        return res;
    });
}
function addEditOrganization(data) {
    return addOrEdit('organizationManage', data);
}
function delOrganization(id) {
    return deleteData('organizationManage', id);
}
export {
    getOrganizationData,
    addEditOrganization,
    delOrganization
}