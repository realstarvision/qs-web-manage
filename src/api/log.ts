
import request from '@/utils/request'

const api = {
  logList: '/star-auth/log/findOperationLogByPage',
}


/**
 *  分页获取日志列表
*/
export function getLogList(data: { userId: string; dateTime: Date | null; pageNumber: number; pageSize: number; total: number }) {
  return request({
    url: api.logList,
    method: 'POST',
    data
  })
}
