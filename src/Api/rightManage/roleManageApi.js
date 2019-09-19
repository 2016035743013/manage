
import {get, post, put, del} from '../organizationManageApi/http'
function getRoleData() {
    return get({url: '/rolemanage'});
}

function addRole(data) {
    return post({data, url: '/rolemanage'});
}
function editRole(data) {
    return put({data, url: '/rolemanage'});
}
function delRole(id) {
    return del({data: {objectId: JSON.stringify(id)}, url: '/rolemanage'});
}
export {
    getRoleData,
    addRole,
    editRole,
    delRole
}