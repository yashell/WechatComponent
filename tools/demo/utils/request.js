// eslint-disable-next-line import/extensions
import {APP_SERVE_URL} from './config.js'

// eslint-disable-next-line no-undef
const app = getApp()
const request = (url, options) => new Promise((resolve, reject) => {
    let header = null; let
        token = null
    if (url.search('meat') > -1) {
        const userData = wx.getStorageSync('userData') || {}
        if (JSON.stringify(userData) !== '{}') token = userData.extraData.token
        if (token === null || token === '') token = app.globalData.token
        header = {
            'Content-Type': 'application/json; charset=UTF-8',
            token,
            position: app.globalData.longitude + ',' + app.globalData.latitude
        }
    } else if (url.search('oauth2') > -1) {
        header = {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    } else {
        header = {'Content-Type': 'application/json; charset=UTF-8'}
    }
    wx.request({
        url: APP_SERVE_URL + url, // 域名接口地址
        method: options.method, // 配置method方法
        // eslint-disable-next-line no-nested-ternary
        data: options.method === 'GET' ? options.data : url.search('oauth2') > -1 ? options.data : JSON.stringify(options.data), // 如果是GET,GET自动让数据成为query String,其他方法需要让options.data转化为字符串
        header,
        timeout: 60000,
        success(request) { // 监听成功后的操作
            if (request.statusCode === 200) {
                resolve(request.data)
            } else {
                reject(request.data)
            }
        },
        fail(error) { // 返回失败也同样传入reject()方法
            wx.hideLoading()
            reject(error)
        },
        complete() {
            wx.hideLoading()
        }
    })
})

// 封装get方法
const get = (url, options = {}) => request(url, {
    method: 'GET',
    data: options
})

// 封装post方法
const post = (url, options = {}) => request(url, {
    method: 'POST',
    data: options
})

// 封装put方法
const put = (url, options) => request(url, {
    method: 'PUT',
    data: options
})
// 封装remove方法，DELETE关键字不能声明
const remove = (url, options = {}) => request(url, {
    method: 'DELETE',
    data: options
})

module.exports = {
    get,
    post,
    put,
    remove
}
