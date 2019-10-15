import { get, post, del, put } from '../../tools/https';

function getPositionData(rank) {
    return get({data:{rank}, url: '/positionManage'});
}
function addPosition(data) {
    return post({data, url: '/positionManage'});
}
function delPosition(id) {
    return del({data: {objectId: JSON.stringify(id)}, url: '/positionManage'});
}
function editPosition(data) {
    return put({data, url: '/positionManage'});
}

export {
    getPositionData,
    addPosition,
    editPosition,
    delPosition,
}