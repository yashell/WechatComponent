Page({
    data: {
        picList: null,
        ActionCheckboxShow: false,
        actionsheetShow: false,
        actionsheetGroups: [
            {text: '示例菜单', value: 1},
            {text: '示例菜单', value: 2},
            {text: '负向菜单', type: 'warn', value: 3}
        ],
        ActionCheckboxSource: ['选项一', '选项二', '选项三'],
        ActionCheckboxSelectedList: ['选项一']
    },
    onMyEvent(event) {
        this.setData({
            picList: event.detail
        })
    },
    ActionCheckboxSelectEvent(e) {
        this.setData({
            ActionCheckboxSelectedList: e.detail
        })
    },
    ActionCheckboxOpen() {
        this.setData({
            ActionCheckboxShow: true
        })
    },
    ActionCheckboxClose() {
        this.setData({
            ActionCheckboxShow: false
        })
    },
    actionsheetOpen() {
        this.setData({
            actionsheetShow: true
        })
    },
    aa() {
        console.log(321)
    },
    onLoad() {
        // wx.showActionSheet({
        //     itemList: ['A', 'B', 'C'],
        //     success() {
        //         // console.log(res.tapIndex)
        //     },
        //     fail() {
        //         // console.log(res.errMsg)
        //     }
        // })
    }
})
