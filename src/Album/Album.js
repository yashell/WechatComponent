// components/Album/Album.js
// import {
//     UPLOAD_URL
// } from '../config'

const {
    UPLOAD_URL
} = require('../utils')

Component({
    /**
   * 组件的属性列表
   */
    properties: {
        multiple: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 1
        },
        urls: {
            type: String,
            value: '',
            observer(news) {
                const urlsList = this.stringToArray(news)
                this.setData({
                    urlsList,
                })
            }
        },
        deleteBtn: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: 'edit'
        },
        uploadText: {
            type: String,
            value: '点击上传'
        }

    },

    /**
   * 组件的初始数据
   */
    data: {
        urlsList: [],
        failNum: 0,
        UploadTask: null,
        progressShow: false,
        currentUploadPaths: [],
        currentUploadIndex: 0,
        currentUploadProgress: 0

    },

    /**
   * 组件的方法列表
   */
    methods: {
        stringToArray: (string) => {
            if (string) {
                return string.split(',').map(String)
            } else {
                return []
            }
        },
        arrayToString: (arr) => arr.toString(),
        chooseImage() {
            const that = this
            let count = that.data.multiple
            if (that.data.multiple > (that.data.max - that.data.urlsList.length)) {
                count = that.data.max - that.data.urlsList.length
            }
            if (this.data.mode === 'premit') count = 1
            wx.chooseImage({
                count,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    that.setData({
                        currentUploadPaths: res.tempFilePaths,
                        progressShow: true,
                        currentUploadIndex: 0,
                        currentUploadProgress: 0
                    })
                    that.upload()
                }
            })
        },
        upload() {
            const that = this
            let hisProgress = 0
            const promise = Promise.all(that.data.currentUploadPaths.map((pic, index) => {
                that.setData({
                    currentUploadIndex: index
                })
                return new Promise(function (resolve, reject) {
                    const UploadTask = wx.uploadFile({
                        url: UPLOAD_URL,
                        filePath: pic,
                        name: 'file',
                        success(res) {
                            if (res.statusCode === 200) {
                                const request = JSON.parse(res.data)
                                if (request.code === 200 && request.data[0].success) {
                                    resolve(request.data[0].result)
                                } else {
                                    let num = that.data.failNum
                                    num++
                                    that.setData({
                                        failNum: num
                                    })
                                    reject(new Error('failed to upload file'))
                                }
                            } else {
                                let num = that.data.failNum
                                num++
                                that.setData({
                                    failNum: num
                                })
                                reject(new Error('failed to upload file'))
                            }
                        },
                        fail() {
                            let num = that.data.failNum
                            num++
                            that.setData({
                                failNum: num
                            })
                            reject(new Error('failed to upload file'))
                        },
                        complete() {
                            // that.setData({
                            //   submitDisabled: false
                            // })
                            // wx.hideNavigationBarLoading();
                        }
                    })
                    that.setData({
                        UploadTask
                    })
                    UploadTask.onProgressUpdate((res) => {
                        if (res.progress > hisProgress) {
                            hisProgress = res.progress
                        }
                        that.setData({
                            currentUploadProgress: hisProgress < 90 ? hisProgress : 90
                        })
                    })
                })
            }))
            promise.then((result) => {
                const arr = that.data.urlsList.concat(result).toString()
                that.triggerEvent('event', arr)
                that.setData({
                    currentUploadProgress: 100
                })
                setTimeout(function () {
                    that.setData({
                        progressShow: false,
                        currentUploadPaths: [],
                        currentUploadIndex: 0,
                        currentUploadProgress: 0
                    })
                }, 1500)
            }).catch(() => {
                that.setData({
                    progressShow: false,
                    currentUploadPaths: [],
                    currentUploadIndex: 0,
                    currentUploadProgress: 0
                })
                wx.showToast({
                    title: '上传失败',
                    icon: 'error',
                    duration: 2000
                })
            })
        },
        previewImage(e) {
            wx.previewImage({
                current: e.currentTarget.dataset.item,
                urls: this.data.urlsList
            })
        },
        taskAbort() {
            if (this.data.UploadTask) {
                this.data.UploadTask.abort()
                this.setData({
                    // progress: 0,
                    progressShow: false
                })
            }
            this.setData({
                progressShow: false,
                currentUploadPaths: [],
                currentUploadIndex: 0,
                currentUploadProgress: 0
            })
        },
        deleteImage(e) {
            const arr = this.data.urlsList
            arr.splice(parseFloat(e.currentTarget.dataset.index), 1)
            this.triggerEvent('event', arr.toString())
        }
    }
})
