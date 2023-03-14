import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Grid, FormLabel } from '@mui/material'
import { Modal } from 'antd'
import MyInput from '@/components/Input'
import Button from '@/components/Button'
import SvgIcon from '@/components/SvgIcon'
import Map from '@/components/Map'

function index({ onCancel }: { onCancel?: Function }, ref) {
  const [open, setOpen] = useState(false)
  const [coordinates, setCoordinates] = useState(null)

  /* 向外抛出 */
  useImperativeHandle(ref, () => ({
    coordinates,
    setCoordinates,
    setOpen,
  }))

  /* 地图点击事件 */
  const handleMapClick = (e) => {
    console.log(e)
    let arr = [e.latlng.lat, e.latlng.lng]
    setCoordinates([...arr])
  }

  /* 打开地图弹窗按钮 */
  const handleOpen = () => {
    setOpen(true)
  }

  /* 弹出框取消按钮 */
  const handleCancel = () => {
    onCancel(coordinates)
    setOpen(false)
  }
  return (
    <>
      <Grid item xs={6} sx={{ paddingTop: '0 !important', display: 'flex' }}>
        <div style={{ width: 'calc(100% - 80px)' }}>
          <div className="formItem" style={{ paddingBottom: '10px' }}>
            <FormLabel component="span" className="label">
              经纬度
            </FormLabel>
            <MyInput
              size="small"
              placeholder="经度"
              value={coordinates && coordinates[1]}
              autoComplete="off"
              sx={{ width: '100%' }}
              disabled
            />
          </div>
          <div className="formItem">
            <FormLabel component="span" className="label"></FormLabel>
            <MyInput
              size="small"
              placeholder="纬度"
              value={coordinates && coordinates[0]}
              autoComplete="off"
              sx={{ width: '100%' }}
              disabled
            />
          </div>
        </div>
        <Button
          className="search_btn"
          sx={{
            width: '80px',
            height: 'calc(100% - 20px)',
            marginLeft: '10px',
            background: '#165DFF !important',
          }}
          onClick={handleOpen}
        >
          <SvgIcon svgName="coordinate"></SvgIcon>
        </Button>
      </Grid>
      <Modal
        title="地图坐标"
        open={open}
        // onOk={() => setOpen(false)}
        onCancel={() => handleCancel()}
        width="50%"
        footer=""
        centered
      >
        <div
          style={{
            height: '60vh',
            background: '#333',
          }}
        >
          <Map markerCoordinates={coordinates} onClick={handleMapClick}></Map>
        </div>
      </Modal>
    </>
  )
}

export default forwardRef(index)
