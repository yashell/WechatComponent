import request from 'request'

// /*****原料*****
export const purchaseBatchAPI = () => request.get('/meat/inputVariety/getChaseNumber')// 获取投入品采购批次号

export const supplierSaveUpdateAPI = (params) => request.post('/meat/supplier/addSupplier', params)// 供应商新增

export const supplierQueryListAPI = (params) => request.post('/meat/supplier/listMySupplier', params)// 供应商查询带分页

export const supplierRemoveAPI = (id) => request.remove(`/meat/supplier/remove/${id}`)// 供应商删除

export const getCubsListAPI = (params) => request.get('/meat/dictionary/getValueByKey', params)// 幼崽类型字典查询

export const materialSaveUpdateAPI = (params) => request.post('/meat/inputVariety/addInputVariety', params)// 原料新增

export const materialQueryListAPI = (params) => request.post('/meat/inputVariety/listMyInputVariety', params)// 原料List查询

export const materialRemoveAPI = (id) => request.get('/meat/inputVariety/removeById', id)// 原料删除

export const materialQuerySingleAPI = (id) => request.get('/meat/inputVariety/' + id)// 原料单条查询

export const getVideoListAPI = () => request.get('/meat/monitor/realData')// 获取养殖列表

export const downloadCodeAPI = (params) => request.get('/trace/product/downloadCode', params)// 下载分享图片

export const tokenCheckAPI = (params) => request.post('/oauth2/check', params)// token校验

export const checkFirstLoginAPI = () => request.get('/trace/check/checkFirstLogin')// 校验是否第一次登陆


// 检验机构-列表
export const listMyAgencyApi = (params) => request.post('/meat/agency/listMyAgency', params)
// 检验机构-新增
export const addAgencyApi = (params) => request.post('/meat/agency/addAgency', params)
// 检验机构-删除
export const agencyRemoveApi = (id) => request.remove(`/meat/agency/remove/${id}`)
// 客户-列表
export const listCustomerApi = (params) => request.post('/meat/customer/listMyCustomer', params)
// 客户-新增
export const handleCustomerApi = (params) => request.post('/meat/customer/addCustomer', params)
// 客户-删除
export const deleteCustomerApi = (id) => request.remove(`/meat/customer/remove/${id}`)
// 客户-溯源企业-查询
export const listSourceCorpApi = (params) => request.post('/meat/customer/listSourceCorp', params)
// 交易记录-列表
export const pageMyOrderApi = (params) => request.post('/meat/order/pageMyOrder', params)
// 交易记录-明细
export const pageOrderDetailApi = (params) => request.post('/meat/orderItem/pageOrderItem', params)
// 产品-列表
export const listProductApi = (params) => request.post('/meat/storage/pageMyProduct', params)
// 库存-列表
export const listStorageApi = (params) => request.post('/meat/livestock/pageLivestock', params)
// 创建订单
export const createOrderApi = (params) => request.post('/meat/order/createOrder', params)
// 文章-列表
export const articleListApi = () => request.get('/meat/article/listTite')
// 文章-详情
export const articleDetailApi = (id) => request.get('/meat/article/' + id)
// 打印-列表
export const printLogListApi = (params) => request.post('/meat/printLog/queryLog', params)
// 打印-详情
export const printLogDetailApi = (params) => request.post('/meat/printLog/queryDetailLog', params)
// 打印-添加
export const printCodeApi = (params) => request.post('/meat/printLog/record', params)


// 新增养殖任务
export const addPlantTaskApi = (params) => request.post('/meat/farming/startTask', params)
// 查询养殖任务列表
export const plantTaskListApi = (params) => request.post('/meat/farming/listTask', params)
// 随机获取批次号
export const getFarmingNumberApi = (params) => request.get('/meat/farming/getFarmingNumber', params)
// 根据id查询任务详情
export const getFarmingById = (params) => request.get('/meat/farming/queryById', params)


// 日常管理列表
export const getListManageApi = (params) => request.post('/meat/manage/listManage', params)
// 添加日常管理
export const addManageApi = (params) => request.post('/meat/manage/addManage', params)
// 删除日常管理
export const deteleManageApi = (params) => request.get('/meat/manage/removeById', params)
export const getManageById = (params) => request.get('/meat/manage/queryById', params)
// 根据管理类型查询投入品
export const getInputByTypeApi = (params) => request.get('/meat/inputVariety/getInput', params)

// 养殖出栏列表
export const getHarvestListApi = (params) => request.post('/meat/harvest/listHarvest', params)
// 添加养殖出栏
export const addHarvestApi = (params) => request.post('/meat/harvest/addHarvest', params)
// 获取养殖任务获取出栏剩余量
export const getSurplusHarvestApi = (params) => request.get('/meat/harvest/surplusHarvest', params)
// 随机获取批次号
export const getHarvestNumberApi = (params) => request.get('/meat/harvest/HarvestNumber', params)
// 根据id查询出栏详情
export const getHarvestByIdApi = (id) => request.get('/meat/harvest/' + id)

// 库存交易

// 查询库存列表
export const getStoreListApi = (params) => request.post('/meat/livestock/pageStorage', params)
// 查询待处理库存
export const getWaitStoreListApi = (params) => request.post('/meat/storage/pageStorage', params)
// 查询待处理库存数量
export const unHandleCountApi = () => request.get('/meat/storage/unHandleCount')
// 分页查询禽畜库存明细
export const pageLivestockApi = (params) => request.post('/meat/livestock/pageLivestock', params)
// 根据id查询禽畜明细
export const geLivestockByIdApi = (params) => request.get('/meat/livestock/geLivestock', params)
// 交易记录明细
export const pageTradingRecordApi = (params) => request.post('/meat/storage/pageDetail', params)
// 处理库存
export const handleStorageApi = (params) => request.post('/meat/storage/handleStorage', params)
// 根据收获id查询分包记录
export const getPackageListApi = (params) => request.post('/meat/package/getPackageList', params)
// 新增分包信息
export const createPackageApi = (params) => request.post('/meat/package/create', params)
// 根据id查询分包后的产品
export const pageMeatById = (params) => request.post('/meat/meat/pageMeat', params)
// 交易提醒收货接口
export const remindHarvestApi = (params) => request.post('/meat/storage/remind', params)


// 产品添加检验信息
export const addExaminApi = (params) => request.post('/meat/examin/addExamin', params)
// 查询产品检验信息
export const listExaminApi = (params) => request.post('/meat/examin/listExamin', params)
// 查询产品检验信息
export const updateExaminApi = (params) => request.post('/meat/examin/updateExamin', params)

// 公共接口
// 查询字典接口
export const getValueByKeyApi = (params) => request.get('/meat/dictionary/getValueByKey', params)


export const emailPdfApi = (params) => request.get('/meat/qrcode/emailPdf', params)
