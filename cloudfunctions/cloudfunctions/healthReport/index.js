const getSummary = require('./getSummary/index')
const getReportList = require('./getReportList/index')
const pushNewReport = require('./pushNewReport/index')
const updateSummary = require('./updateSummary/index')

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
      case 'getSummary':
        return await getSummary.main(event, context)
      case 'getReportList':
          return await getReportList.main(event, context)
      case 'pushNewReport':
          return await pushNewReport.main(event, context)
      case 'updateSummary':
          return await updateSummary.main(event, context)
    }
  }
// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//     const wxContext = cloud.getWXContext()

//     return {
//         event,
//         openid: wxContext.OPENID,
//         appid: wxContext.APPID,
//         unionid: wxContext.UNIONID,
//     }
// }