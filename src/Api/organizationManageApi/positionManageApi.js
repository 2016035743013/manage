import {
    getData,
    addOrEdit,
    deleteData
} from './BombHttp'
function getPositionData(rank) {
    return getData('positionManage').then(res => {
        res = res.filter((val) => { 
            return val.rank.search(rank) != -1;
        })
        res.reverse();
        return res;
    })
}
function addPosition(data) {
    return addOrEdit('positionManage', data);
}
function delPosition(id) {
    return deleteData('positionManage', id);
}
function editPosition(data) {
    return addOrEdit('positionManage', data);
}

export {
    getPositionData,
    addPosition,
    editPosition,
    delPosition,
}