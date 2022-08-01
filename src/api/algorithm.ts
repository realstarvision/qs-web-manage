import request from '@/until/request'

const api = {
  listOriginalSetByPage: '/star-dataset/data/listOriginalSetByPage',
  lsitLabelSetByPage: '/star-dataset/data/lsitLabelSetByPage'
}


/**
 *  模糊查询原始数据集列表
*/
export function getListOriginalSet(data: { tagName: string; taskName: string; pageNumber: number; pageSize: number; total: number }) {
  return request({
    baseURL: '/data-set',
    url: api.listOriginalSetByPage,
    method: 'post',
    data
  })
}

/**
 *  模糊查询标注数据数据集列表
*/
export function getListLabelSet(data: { tagName: string; taskName: string; pageNumber: number; pageSize: number; total: number }) {
  return request({
    baseURL: '/data-set',
    url: api.lsitLabelSetByPage,
    method: 'post',
    data
  })
}
