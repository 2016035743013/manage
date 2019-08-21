function getData(table) {
    return new Promise((resolve, rejected) => {
        const query = Bmob.Query(table);
        query.find().then((res) => {
            resolve(res);
        }).catch(err => {
            rejected(err);
        })
    })
}
function addOrEdit(table, data) {
    return new Promise((resolve, rejected) => {
        const query = Bmob.Query(table);
        for (let val in data) {
            query.set(val, data[val])
        }
        query.save().then((res) => {
            resolve(res);
        }).catch(err => {
            rejected(err);
        })
    })
}
function deleteData(table, id) {
    return new Promise((resolve, rejected) => {
        const query = Bmob.Query(table);
        query.destroy(id).then(res => {
            console.log(res);
            resolve(res);
        }).catch(err => {
            rejected(err);
        })
    })
}
export {
    getData,
    addOrEdit,
    deleteData
}