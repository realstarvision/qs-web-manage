import { Column } from '@/components/Table'
const columns: Column[] = [
  {
    align: 'center',
    title: '数据名称',
    key: 'identifier',
  },
  {
    align: 'center',
    title: '卫星',
    key: 'satelliteName',
  },
  {
    align: 'center',
    title: '数据级别',
    key: 'productLevel',
  },
  {
    align: 'center',
    title: '采集时间',
    key: 'endTime',
  },
  {
    align: 'center',
    title: '云量',
    key: 'cloudCoverage',
  },
]

export default columns
