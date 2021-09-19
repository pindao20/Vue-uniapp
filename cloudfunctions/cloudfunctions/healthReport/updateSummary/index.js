const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let id = event.data.id;
  if(event.data.type == 'healthy'){
    await db.collection('summary').doc(id).update({
        data: {
            reportCount: _.inc(1),
            todayCount: _.inc(1),
            statusSummary:{
                healthy: _.inc(1)
            }
        }
    })
  }
  else if(event.data.type == 'fever'){
    await db.collection('summary').doc(id).update({
        data: {
            reportCount: _.inc(1),
            todayCount: _.inc(1),
            statusSummary:{
                fever: _.inc(1)
            }
        }
    })
  }
  else{
    await db.collection('summary').doc(id).update({
        data: {
            reportCount: _.inc(1),
            todayCount: _.inc(1),
            statusSummary:{
                otherSymptoms: _.inc(1)
            }
        }
    })
  }
  return {
    success: true
  }
}