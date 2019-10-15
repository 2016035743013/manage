
import { get, post, del, put } from '../../tools/https';
function getOrganizationData() {
    return get({ url: '/organizationManage' })
}
function addOrganization(data) {
    return post({ data, url: '/organizationManage' });
}
function editOrganization(data) {
    console.log(data);
    return put({ data, url: '/organizationManage' });
}
function delOrganization(id) {
    return del({ data: { objectId: JSON.stringify(id) }, url: '/organizationManage' });
    // {data: {objectId: JSON.stringify(id)}, url: '/positionManage'}
}
export {
    getOrganizationData,
    addOrganization,
    editOrganization,
    delOrganization
}