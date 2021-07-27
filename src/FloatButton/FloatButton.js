Component({
    properties: {
        inButtonRight: {
            type: Number,
            value: 100,
        },
        inButtonBottom: {
            type: Number,
            value: 100
        },
        color: {
            type: String,
            value: '#ff4f02'
        },
        textColor: {
            type: String,
            value: '#fff'
        },
        boxShadow: {
            type: String,
            value: '#0px 3rpx 14rpx 0px rgba(0, 160, 84, 0.18);'
        },
        zIndex: {
            type: Number,
            value: 90
        }
    },
    options: {},
    data: {
        x: 32,
        y: 32,
        hide: true
    },
    pageLifetimes: {
    },
    attached() {
        const that = this
        wx.getSystemInfo({
            success(res) {
                const {windowWidth, windowHeight} = res
                const {inButtonRight, inButtonBottom} = that.properties
                // 高度,宽度 单位为px
                that.setData({
                    x: windowWidth - (windowWidth / 750 * inButtonRight),
                    y: windowHeight - (windowWidth / 750 * inButtonBottom),
                })
                setTimeout(() => {
                    that.setData({
                        hide: false
                    })
                }, 500)
            }
        })
    // 在组件实例进入页面节点树时执行
    },
    methods: {
        btnSuspensionClick() {
            // 这里是点击购物车之后将要执行的操作
            this.triggerEvent('icre')
        }
    }
})
