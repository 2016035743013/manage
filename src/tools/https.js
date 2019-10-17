import $ from 'jquery'
let baseUrl = process.env.NODE_ENV !== 'development' ? 'http://localhost:8008' : 'http://39.105.8.57:8008';
function ajax(option) {
    return new Promise((resolve, rejected) => {
        $.ajax({
            type: option.type,
            async: option.async,
            url: baseUrl + option.url,
            data: option.data,
            success: function(res) {
                resolve(res);
            },
            error: function(err) {
                rejected(err);
            }
        })
    })
}

function get(option) {
    option.type = 'get';
    return ajax(option);
}

function post(option) {
    option.type = 'post';
    return ajax(option);
}

function del(option) {
    option.type = 'delete';
    console.log(option);
    return ajax(option);
}

function put(option) {
    option.type = 'put';
    return ajax(option);
}

export {
    get,
    post,
    del,
    put
}