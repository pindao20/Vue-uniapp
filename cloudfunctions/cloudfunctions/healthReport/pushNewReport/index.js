const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  await db.collection('healthReport').add({
      data: {
          status: event.data.status,
          trip: event.data.trip,
          place: event.data.place
      },
      success: function(res){
      }
  })
  return {
    success: true
  }
}