import $ from 'jquery'
import config from './config'
function http(option) {
    return new Promise((resolve, rejected) => {
        $.ajax({
            url: config.baseUrl + option.url,
            type: option.type,
            data: option.data,
            async: option.async,
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                rejected(err);
            }
        })
    })
}
function get(option) {
    console.log(option);
    option.type = 'get';
    return http(option);
}
export default{
    get
}