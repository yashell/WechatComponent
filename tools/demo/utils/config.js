// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync()
const env = accountInfo.miniProgram.envVersion || null
if (!env) {
    wx.showModal({
        title: '提示',
        content: '获取运行环境失败'
    })
}

const baseApi = {
    // develop: "http://192.168.65.240:8080", // 接口ip lp - 生产环境
    // develop: "http://192.168.65.98:8080", // 接口ip lj - 生产环境
    develop: 'https://trail.anning.city', // 开发 - 生产环境
    trial: 'https://trail.anning.city', // 体验版
    release: 'https://www.anning.city'// 正式版
}

export const APP_SERVE_URL = baseApi[env]
export const App_IMAGES_URL = 'https://anxzfile.ynyplt.com' // 图片地址
// export const App_IMAGES_URL = 'http://192.168.12.12:19999'; // 图片地址

export const MAP_KEY = '5OFBZ-DEQKF-NVSJN-J3AMB-65E3K-6MBMY'
