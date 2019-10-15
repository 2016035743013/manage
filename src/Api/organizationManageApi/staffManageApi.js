import { get, post, del, put } from '../../tools/https';

function getStaffData(organization, keyword,pageNum) {
    return get({data: {name: keyword, rank: organization, pageNum: pageNum}, url: '/staffManage'});
}
function addStaff(data) {
    return post({data, url: '/staffManage'});
}
function editStaff(data) {
    return put({data, url: '/staffManage'});
}

function delStaff(id) {
    return del({data: {objectId: JSON.stringify(id)}, url: '/staffManage'});
}

function getCount() {
    return get({url: '/staffManage/count'})
}
export {
    getStaffData,
    addStaff,
    editStaff,
    delStaff,
    getCount
}