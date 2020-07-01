import {post} from '../tools/https'

function login(data) {
    return post({data, url: '/login'});
}

function updatePwd(data) {
    return post({data, url: '/login/updatePwd'});
}
//fetastfdsafdsf
////fdsafsd
export {
    login,
    updatePwd
}
///tet fsafds






