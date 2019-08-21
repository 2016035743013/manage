import {
    getData,
    addOrEdit,
    deleteData
} from './BombHttp'
function getStaffData(organization, keyword, pageNum) {
    return new Promise((resolve, rejected) => {
        const query = Bmob.Query('staffManage');
        query.limit(10);
        query.skip(pageNum * 10);
        query.find().then((res) => {
            let tempRes = res.filter((val) => {
                if (val.organization.search(organization) != -1 && val.name.search(keyword) != -1) {
                    return val;
                }
            })
            resolve(tempRes);
        }).catch(err => {
            rejected(err);
        })
    })
}
function addOrEditStaff(data) {
    return addOrEdit('staffManage', data);
}
function delStaff(id) {
    return deleteData('staffManage', id);
}
function getCount() {
    return new Promise((resolve, rejected) => {
        const query = Bmob.Query('staffManage');
        query.count().then(res => {
            resolve(res);
        });
    })
}
export {
    getStaffData,
    addOrEditStaff,
    delStaff,
    getCount
}