import { App_IMAGES_URL } from './config.js'

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 字符串格式的时间进行大小比较，如果time1大于time2则返回true,否则返回false
 * @param  time1 时间1
 * * @param  time1 时间2
 */
const compareTime = (time1, time2) => {
    const timeA = new Date(time1).getTime(), timeB = new Date(time2).getTime(), timestamp = (new Date()).getTime()
    if (timeB - timeA < 0) {
        return true
    } else {
        return false
    }
}

/**
 *追溯码： 前3位+*****（4到12）+后12位
 * @param  code 要处理的追溯码，类型必须传字符串类型
 */
const adornCode = (code) => {
    if (typeof code === 'number') code = code.toString()
    if (!code) {
        return ''
    } else if (code.length < 16) {
        return code
    } else if (code.length > 15) {
        let toCode = '', strLen = code.length
        for (const a in code) {
            if (a < 3) {
                toCode += code[a]
            } else if (a > 2 && a < strLen - 12) {
                if (toCode.indexOf('*') === -1) toCode = toCode + '*****'
            } else {
                toCode += code[a]
            }
        }
        return toCode
    }
}

const throttle = function (fn, gapTime) {

    if (gapTime == null || gapTime == undefined) {

        gapTime = 1500

    }

    let _lastTime = null

    // 返回新的函数

    return function () {

        let _nowTime = +new Date()

        if (_nowTime - _lastTime > gapTime || !_lastTime) {

            fn.apply(this, arguments) //将this和参数传给原函数

            _lastTime = _nowTime

        }

    }

}

/**
 * 上传图片至服务器
 * @param  imagesuUrl 图片临时地址
 */
const uploadFile = (imagesuUrl) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: App_IMAGES_URL + '/api/upload',
            filePath: imagesuUrl,
            name: 'file',
            formData: {
                user: 'test'
            },
            success (res) {
                let { code } = JSON.parse(res.data)
                if (code === 200) {
                    resolve(res)
                } else {
                    reject(res)
                }

            },
            fail (res) {
                reject(res)
            }
        })
    })
}

/**
 * 获取当前时间的前后时间
 * @param  type 前后时间的类型，比如前后几年，几月，几日，几天
 * @param  number 前后时间的数量，比如前后5年，10年，12年 20年
 */
const getDateFn = (type=null,number=0) => {
    let nowdate = new Date();
    switch (type) {
        case "day":   //取number天前、后的时间
            nowdate.setTime(nowdate.getTime() + (24 * 3600 * 1000) * number);
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth() + 1;
            var d = nowdate.getDate();
            var retrundate = y + '-' + m + '-' + d;
            break;
        case "week":  //取number周前、后的时间
            var weekdate = new Date(nowdate + (7 * 24 * 3600 * 1000) * number);
            var y = weekdate.getFullYear();
            var m = weekdate.getMonth() + 1;
            var d = weekdate.getDate();
            var retrundate = y + '-' + m + '-' + d;
            break;
        case "month":  //取number月前、后的时间
            nowdate.setMonth(nowdate.getMonth() + number);
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth() + 1;
            var d = nowdate.getDate();
            var retrundate = y + '-' + m + '-' + d;
            break;
        case "year":  //取number年前、后的时间
            nowdate.setFullYear(nowdate.getFullYear() + number);
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth() + 1;
            var d = nowdate.getDate();
            var retrundate = y + '-' + m + '-' + d;
            break;
        default:     //取当前时间
            var y = nowdate.getFullYear();
            var m = nowdate.getMonth() + 1;
            var d = nowdate.getDate();
            var retrundate = y + '-' + m + '-' + d;
    }
    return retrundate;
}

/**
 * 上传图片的校验
 * @param  url 校验图片的地址
 * @param  access_token 小程序全局唯一后台接口调用凭据
 */
const imgSecCheck = (url, access_token) => {
    return new Promise((resolve, reject) => {
        if (access_token) {
            let params = {
                media_url: url,
                media_type: 2
            }
            wx.request({
                url: `https://api.weixin.qq.com/wxa/media_check_async?access_token=${access_token}`,
                data: params,
                method: 'POST',
                success (res) {
                    let {
                        errcode
                    } = res.data
                    if (errcode === 0) {
                        resolve(true)
                    } else {
                        reject(res)
                    }
                },
                fail (res) {
                    reject(res)
                }
            })
        }
    })
}

/**
 * 返回时间格式 yyyy-mm-dd
 * @param {*} date 
 */
function formatTimeBase (date) {
    date = new Date(date);
    let month = date.getMonth() + 1
    let idate = date.getDate()
    if (month < 10) {
        month = "0" + month
    }
    if (idate < 10) {
        idate = "0" + idate
    }
    return `${date.getFullYear()}-${month}-${idate}`
}

/**
 * 返回时间格式 mm月dd日
 * @param {*} date 
 */
function formatTimeTemp (date) {
    date = new Date(date);
    let month = date.getMonth() + 1
    let idate = date.getDate()
    return `${month}月${idate}日`
}

function GetNumberOfDays (date1, date2) { //获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
    return day
}



function Distance (lat1, lon1, lat2, lon2) {
    if (lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0) {
        return 0
    }
    //用haversine公式计算球面两点间的距离。
    //经纬度转换成弧度

    lat1 = ConvertDegreesToRadians(lat1);
    lon1 = ConvertDegreesToRadians(lon1);
    lat2 = ConvertDegreesToRadians(lat2);
    lon2 = ConvertDegreesToRadians(lon2);
    //差值
    const vLon = Math.abs(lon1 - lon2);
    const vLat = Math.abs(lat1 - lat2);
    const EARTH_RADIUS = 6371.0;
    const h = HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(vLon);
    const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
    let text = ''
    if (distance > 1) {
        text = distance.toFixed(2) + 'km'
    } else {
        text = parseInt(distance * 1000) + 'm'
    }
    return text;
}

function DistanceNum (lat1, lon1, lat2, lon2) {
    if (lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0) {
        return 0
    }
    //用haversine公式计算球面两点间的距离。
    //经纬度转换成弧度

    lat1 = ConvertDegreesToRadians(lat1);
    lon1 = ConvertDegreesToRadians(lon1);
    lat2 = ConvertDegreesToRadians(lat2);
    lon2 = ConvertDegreesToRadians(lon2);
    //差值
    const vLon = Math.abs(lon1 - lon2);
    const vLat = Math.abs(lat1 - lat2);
    const EARTH_RADIUS = 6371.0;
    const h = HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(vLon);
    const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
    return distance;
}

/**
 * 将角度换算为弧度。
 * @param {*} degrees  角度
 * returns 弧度
 */
function ConvertDegreesToRadians (degrees) {
    return degrees * Math.PI / 180;
}

function HaverSin (theta) {
    const v = Math.sin(theta / 2);
    return v * v;
}

/**
 * 校验字符串是否由字母和数字组成
 * @param {*} str  所校验的字符串
 */
const checkS = (str) => {
    let zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
    if (!zg.test(str)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 根据key返回字典value
 */

const ReDicName = (key, arr) => {
    let text = ''
    arr.forEach(item => {
        if (item.value === key) {
            text = item.text
        }
    })
    return text
}
/**
 * 返回二维码地址
 * @param {*} sourceCode 
 * @param {*} width  默认200，可不传
 * @param {*} heigh  默认200，可不传
 * @param {*} title  默认空，可不传
 */
const qrcodeURL = (sourceCode, width = 150, heigh = 150, title = '') => {
    // const urlEncode = 'https%3a%2f%2fqkl.ynyplt.com%2f%3ftype%3d1%26sourceCode%3d' + sourceCode
    // return App_IMAGES_URL + '/qrcode/createQrcode?title=' + title + '&content=' + urlEncode + '&width=' + width + '&height=' + heigh
    return '/assets/images/code_logo.png'
}


module.exports = {
    formatTime: formatTime,
    formatTimeBase: formatTimeBase,
    GetNumberOfDays: GetNumberOfDays,
    formatTimeTemp: formatTimeTemp,
    Distance: Distance,
    DistanceNum: DistanceNum,
    throttle,
    checkS,
    imgSecCheck,
    uploadFile,
    ReDicName,
    qrcodeURL,
    compareTime,
    adornCode,
    getDateFn
}