import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react'
import L from 'leaflet'
import { Box } from '@mui/material'
import { MapContainer, TileLayer, useMap, Polygon } from 'react-leaflet'

// import '@geoman-io/leaflet-geoman-free'
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import * as turf from '@turf/turf'
import { getPolygonData, getCenter } from '@/utils/data'
import './map.scss'

// 地图接口类型
interface MapList {
  imageUrl?: string
  mapName?: string
  mapUrl?: string
}

/**  map组件  **/
function index(
  {
    geojson,
    onChangeUploadGeometry,
    scaleVisivle = true,
    mapType,
    polygon,
  }: {
    geojson?: any
    onChangeUploadGeometry?: Function
    scaleVisivle?: boolean
    mapType?: MapList
    polygon?: {
      topLeft: { lon: ''; lat: '' }
      bottomRight: { lon: ''; lat: '' }
    }
  },
  ref
) {
  const map = useRef(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const [optionsData, setOptionsData] = useState({})
  let [geometry, setGeometry] = useState(null)
  let [checkedGeometry, setCheckedGeometry] = useState(null)
  const [center, setCenter] = useState<any>([39.92, 116.46])

  // 标尺
  const [scaleValue, setScaleValue] = useState('')
  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    // 获取画图的内容
    getRectangles,
    // 添加图层
    addLayer,
    // 删除指定图层
    removeLayer,
    // 清空图层
    clearLayers,
    // 显示隐藏控件
    toggleControls,
    // 自定义启用控件   Clear / Rectangle / Polygon / Edit
    ControlBtn,
    // 删除已上传的多边形
    deleteUploadGeometry,
  }))

  /* 初始化  */
  useEffect(() => {
    setTimeout(() => {
      if (map.current) {
        // draw()
        // 标尺
        Scale()
      }
    }, 0)
  }, [])

  /* 监听语言的变化 */
  useEffect(() => {}, [])

  /* 监听修改地图 */
  useEffect(() => {
    setTimeout(() => {
      if (map.current) {
        if (mapType.mapUrl) {
          tileLayerRef.current.setUrl(mapType.mapUrl)
        }
      }
    }, 0)
  }, [mapType])

  /* 监听多边形改变 */
  useEffect(() => {
    if (polygon.topLeft) {
      clearLayers()
      let left = polygon.topLeft.lon
      let top = polygon.topLeft.lat
      let right = polygon.bottomRight.lon
      let bottom = polygon.bottomRight.lat
      let latlngs = [
        [top, left],
        [top, right],
        [bottom, right],
        [bottom, left],
        [top, left],
      ]
      let polygonLatlngs = L.polygon(latlngs, { color: 'red' }).addTo(map.current)
      map.current.fitBounds(polygonLatlngs.getBounds())
      setCenter(getCenter(polygonLatlngs))
    }
  }, [polygon])

  /* 标尺 */
  function Scale() {
    // 添加标尺控件
    let scale = L.control.scale()
    map.current.addControl(scale)
    scale.getContainer().style.display = 'none'
    setScaleValue(scale.getContainer().childNodes[0].innerText)
    // 监听缩放
    map.current.on('zoomend', (e) => {
      setScaleValue(scale.getContainer().childNodes[0].innerText)
      //获取当前放大或者缩小的等级
      console.log(e.target.getZoom())
    })
    // 监听移动
    map.current.on('move', (e) => {
      setScaleValue(scale.getContainer().childNodes[0].innerText)
    })
  }
  /* 删除图层工具按钮触发 监听删除Polygon (因为做删除事件的时候传入的值始终是初始值) */
  useEffect(() => {
    // 删除
    if (geometry && geometry.length > 0) {
      for (let i = 0; i < geometry.length; i++) {
        if (geometry[i]._leaflet_id === checkedGeometry.layer._leaflet_id) {
          geometry.splice(i, 1)
          break
        }
      }
      setGeometry([...geometry])
      onChangeUploadGeometry(geometry)
    }
  }, [checkedGeometry])

  /* 监听geojson变化 */
  useEffect(() => {
    if (map.current) {
      deleteUploadGeometry()
      const newUploadGeometry = []
      for (let i = 0; i < geojson.length; i++) {
        const latlngs = getPolygonData(JSON.parse(geojson[i].coordinates), geojson[i].type)
        for (let i = 0; i < latlngs.length; i++) {
          // 添加多边形
          const polygon = addLayer(latlngs[i], '#aebde8')
          // 定位边界位置
          map.current.fitBounds(polygon.getBounds())
          // 存储上传的图形
          newUploadGeometry.push(polygon)
          // 中心点
          if (i === latlngs.length - 1) {
            setCenter(getCenter(latlngs[i]))
          }
        }
      }
      setGeometry(newUploadGeometry)
    }
  }, [geojson])

  /* 删除已上传文件 */
  function deleteUploadGeometry() {
    // 移除覆盖上传
    if (geometry && geometry.length > 0) {
      for (let i = 0; i < geometry.length; i++) {
        map.current.removeLayer(geometry[i])
      }
      // 清空
      setGeometry([])
    }
  }

  /* 获取全部多边形的最小矩形 */
  function getRectangles() {
    const layers = map.current._layers
    const boundsArray = []
    const multiPolygon = []
    for (let i in layers) {
      if (layers[i]._latlngs) {
        const bounds = layers[i].getBounds()
        const newBounds = [bounds.getNorthEast(), bounds.getSouthWest()]
        boundsArray.push(newBounds)
        const latlng = layers[i]._latlngs[0]
        let polygon = []
        for (let j = 0; j < latlng.length; j++) {
          polygon.push([latlng[j].lat, latlng[j].lng])
        }
        multiPolygon.push(polygon)
      }
    }
    // 转为geojson
    let multiPoly
    if (multiPolygon.length > 0) {
      if (multiPolygon.length > 1) {
        multiPoly = turf.multiPolygon([multiPolygon])
      } else {
        // 一个多边形需要加个结束点
        multiPolygon[0].push(multiPolygon[0][0])
        multiPoly = turf.polygon(multiPolygon, { name: 'poly1' })
      }
    }

    // 获取最小矩形
    let arr = []
    let topLeft = null
    let bottomRight = null
    if (boundsArray.length > 0) {
      for (let i = 0; i < boundsArray.length; i++) {
        for (let j = 0; j < boundsArray[i].length; j++) {
          arr.push([boundsArray[i][j].lat, boundsArray[i][j].lng])
        }
      }
      let line = turf.lineString(arr)
      let bbox = turf.bbox(line)
      topLeft = {
        lat: bbox[2],
        lon: bbox[1],
      }
      bottomRight = {
        lat: bbox[0],
        lon: bbox[3],
      }
    }
    // 转经纬度
    if (multiPoly) {
      multiPoly = turf.flip(multiPoly)
    }
    return { multiPoly, topLeft, bottomRight }
  }

  /* 绘制多边形 */
  // const draw = () => {
  //   const mapDom = map.current
  //   // 设置绘制后的线条颜色等
  //   mapDom.pm.setPathOptions({
  //     color: '#aebde8',
  //     fillColor: '#aebde8',
  //     fillOpacity: 0.6,
  //   })
  //   mapDom.pm.setLang('zh')

  //   // 隐藏控件
  //   // mapDom.pm.addControls({
  //   //   // position: 'bottomright',
  //   //   position: 'topleft',
  //   //   drawMarker: false, // 绘制标记
  //   //   drawCircle: false, // 绘制圆形
  //   //   drawPolyline: false, // 绘制折线
  //   //   drawRectangle: true, // 绘制矩形
  //   //   drawPolygon: true, // only五级网格绘制
  //   //   drawCircleMarker: false, // 绘制圆形标记
  //   //   removalMode: true, // 清除图层
  //   //   cutPolygon: false, // 删除图层里的部分内容
  //   //   editMode: true, // 编辑多边形
  //   //   dragMode: false, // 拖动多边形
  //   //   rotateMode: false,
  //   //   drawText: false,
  //   // })
  //   // 点击控件时调用
  //   mapDom.on('pm:drawstart', (e) => {
  //     console.log(e, '点击控件绘制时调用')
  //   })
  //   // 绘制完成时调用
  //   mapDom.on('pm:create', (e) => {
  //     // 按钮选中状态
  //   })
  //   // 删除图层时调用
  //   mapDom.on('pm:remove', (e) => {
  //     console.log(e, '清除图层时调用')
  //     setCheckedGeometry(e)
  //   })
  // }

  /* 地图控件按钮自定义启用 */
  function ControlBtn(type) {
    if (map.current) {
      switch (type) {
        case 'Clear':
          map.current.pm.enableGlobalRemovalMode()
          break
        case 'Rectangle':
          map.current.pm.enableDraw('Rectangle')
          break
        case 'Polygon':
          map.current.pm.enableDraw('Polygon')
          break
        case 'Edit':
          map.current.pm.enableGlobalEditMode()
          break
      }
    }
  }

  /* 添加多边形图层 */
  function addLayer(latlngs, color) {
    let polygon
    polygon = L.polygon(latlngs, {
      color,
    }).addTo(map.current)
    return polygon
  }

  /* 删除多边形图层 */
  function removeLayer(layer) {
    map.current.removeLayer(layer)
  }

  /* 清除所有图层 */
  function clearLayers() {
    const layers = map.current._layers
    for (let i in layers) {
      if (layers[i]._latlngs) {
        map.current.removeLayer(layers[i])
      }
    }
  }

  // 控件是否可见
  const toggleControls = (value) => {
    if (map.current) {
      map.current.pm.toggleControls(value)
    }
  }
  return (
    <>
      <MapContainer
        ref={map}
        // @ts-ignore
        center={center}
        zoom={5}
        zoomControl={false}
        attributionControl={false}
        className="map-container"
      >
        <TileLayer
          ref={tileLayerRef}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Box
          className="scaleplate"
          sx={{
            display: !scaleVisivle ? 'none' : '',
          }}
        >
          <span>{scaleValue}</span>
          <i className="scaleplate-scale"></i>
        </Box>
      </MapContainer>
    </>
  )
}

export default forwardRef(index)