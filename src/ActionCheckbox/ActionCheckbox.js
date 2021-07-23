// components/ActionCheckbox/ActionCheckbox.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: '请选择'
        },
        cancelText: {
            type: String,
            value: '取消'
        },
        overlay: {
            type: Boolean,
            value: true
        },
        source: {
            type: Object,
            value: []
            // observer(news, olds, path) {
            //     // var that = this
            //     // that.setSelect(that.data.selected)
            // }
        },
        selected: {
            type: Object,
            value: [],
            observer(news) {
                const that = this
                that.setSelect(news)
            }
        }

    },
    observers: {},

    /**
   * 组件的初始数据
   */
    data: {
        sourceBase: [],
        selectAll: false,
        color: '#2f5cfb'

    },
    attached() {

    },

    /**
   * 组件的方法列表
   */
    methods: {
        checkboxChange(e) {
            this.triggerEvent('event', e.detail.value)
        },
        selectAllChange(e) {
            // setSelect
            let arr = []
            if (e.detail.value.length > 0) {
                arr = this.data.source
            }
            this.triggerEvent('event', arr)
        },
        setSelectAll() {
            let isf = false
            if (this.data.source.length <= this.data.selected.length) {
                isf = true
            }
            this.setData({
                selectAll: isf
            })
        },
        setSelect(selected) {
            const that = this

            const sourceBase = that.data.source.map(item => ({
                value: item,
                name: item,
                checked: selected.filter(d => d === item).length > 0
            }))
            that.setData({
                sourceBase
            })
            that.setSelectAll()
        },
        cancel() {
            this.triggerEvent('closeEvent', false)
        }

    }
})
