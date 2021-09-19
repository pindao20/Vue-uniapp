const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let id = event.data[0].id;
  if(event.data[0].type == 'healthy'){
    await db.collection('summary').get().doc(id).update({
        data: {
            reportCount: _inc(1),
            todayCount: _inc(1),
            statusSummary:{
                healthy: _inc(1)
            }
        }
    })
  }
  else if(event.data[0].type == 'fever'){
    await db.collection('summary').doc(id).update({
        data: {
            reportCount: _inc(1),
            todayCount: _inc(1),
            statusSummary:{
                fever: _inc(1)
            }
        }
    })
  }
  else{
    await db.collection('summary').doc(id).update({
        data: {
            reportCount: _inc(1),
            todayCount: _inc(1),
            statusSummary:{
                otherSymptoms: _inc(1)
            }
        }
    })
  }
  return {
    success: true
  }
}