<template>
  <div>
    <div id="map_container" style="width:100%;height:800px;"></div>
  </div>
</template>

<script>
import geoJsonData from '../assets/yati_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson
import yati_all_ali from '../assets/yati_all_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson
import yati_all_fix from '../assets/yati_fix.json';
import medicalsvg from '../../img/medical.svg';
import fiximg from '../../img/1128dae09060f69d71e5fae7e3688d51.jpeg';
import chalk from "chalk";

export default {
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    async initMap() {
      // 1. 初始化地图
      const map = new window.BMapGL.Map("map_container");
      map.centerAndZoom(new window.BMapGL.Point(121.457204, 37.472776), 19);
      map.enableScrollWheelZoom(true);
      map.setHeading(64.5);   //设置地图旋转角度
      map.setTilt(73);       //设置地图的倾斜角度
      // 添加必要控件
      map.addControl(new window.BMapGL.NavigationControl3D());
      map.addControl(new window.BMapGL.ScaleControl());
      map.addControl(new window.BMapGL.ZoomControl());

      const yati_all_fix_data = yati_all_fix
      // 2. 处理 GeoJSON 数据，提取多边形坐标
      const boundaryPointsArrays = this.extractCoordinates(geoJsonData);
      const boundaryyati_all_ali = this.extractCoordinates(yati_all_ali);
      // 遍历每个多边形，创建并添加到地图
      boundaryPointsArrays.forEach(boundaryPoints => {
        // 确保多边形闭合（首尾坐标相同）
        if (!this.isPolygonClosed(boundaryPoints)) {
          boundaryPoints.push(boundaryPoints[0].clone());
        }

        // 3. 创建掩膜多边形（外框+孔洞，如果有的话）
        // 注意：这里假设每个 feature 只有一个多边形，且不考虑孔洞
        // const maskPolygon = new window.BMapGL.Polygon([boundaryPoints], {
        //   strokeColor: 'none',
        //   fillColor: 'rgba(97,164,255,0.88)',
        //   fillOpacity: 0.8
        // });
        // map.addOverlay(maskPolygon);

        // 4. 绘制高亮边界
        const border = new window.BMapGL.Polyline(boundaryPoints, {
          strokeColor: 'rgba(21,87,238,0.88)',
          strokeWeight: 3,
          strokeOpacity: 1
        });
        map.addOverlay(border);

      });
      map.setDisplayOptions({
        poiIcon: false,
        poiText: true,
        indoor: false
      });
      // boundaryyati_all_ali.forEach(boundaryPoints => {
      //   var mapmask = new BMapGL.MapMask(boundaryPoints, {
      //     isBuildingMask: true,
      //     isPoiMask: true,
      //     isMapMask: true,
      //     showRegion: 'inside',
      //     topFillColor: '#5679ea',
      //     topFillOpacity: 0.5,
      //     sideFillColor: '#5679ea',
      //     sideFillOpacity: 0.9
      //   });
      //   map.addOverlay(mapmask);
      // })

      // 处理医院标记点
      yati_all_fix_data.forEach(item => {
      // let item = {
      //   "LAT": "37.535769",
      //   "LNG": "121.389746",
      //   "NAME": "烟台毓璜顶医院"
      // }
      console.log('000', item)
      console.log('1111', item.LNG, item.LAT)
      // 转换坐标系
      const [bdLng, bdLat] = this.gcj02ToBd09(
        parseFloat(item.LNG),
        parseFloat(item.LAT)
      );
      console.log('2222', bdLng, bdLat)

      // var pointbd = new BMapGL.Point(aaa[0],aaa[1]);
      // var marker = new BMapGL.Marker(pointbd);
      // bm.addOverlay(marker);
      // var label = new BMapGL.Label("转换后的百度标注（正确）",{offset:new BMapGL.Size(20,-10)});
      // marker.setLabel(label); //添加百度label
      // bm.setCenter(pointbd);

      // // 创建标注点
      const point = new window.BMapGL.Point(bdLng, bdLat);
      const marker = new window.BMapGL.Marker(point
        , {
        icon: new window.BMapGL.Icon(
          medicalsvg,
          new window.BMapGL.Size(30, 40)
        )
      }
      )
      // 添加信息窗口         <img src="${item.VALUE5}"
        const infoWindow = new window.BMapGL.InfoWindow(`
    <div style="min-width:200px">
        <h4 style="margin:5px 0;font-size:16px;">${item.NAME}</h4>
        <img src="${fiximg}"
             style="max-width:220px;
                    max-height:150px;
                    border-radius:4px;
                    margin:8px 0;
                    object-fit: cover;">
        <div style="padding:5px 0;border-top:1px solid #eee;">
            <p style="margin:3px 0;">地址：${item.VALUE4}</p>
            <p style="margin:3px 0;">级别：${item.VALUE3}</p>
            <p style="margin:3px 0;">类型：${item.VALUE2}</p>
        </div>
    </div>
`, {width: 280});  // 增加窗口宽度

      marker.addEventListener('click', () => {
        map.openInfoWindow(infoWindow, point);
      })

      map.addOverlay(marker);
      })
      map.setMapStyleV2({styleJson: stylejson});
    },

    // 提取 GeoJSON 数据中的多边形坐标
    extractCoordinates(geoJson) {
      const pointsArrays = [];
      geoJson.features.forEach(feature => {
        if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach(polygon => {
            const points = polygon.map(ring => {
              return ring.map(coord => new window.BMapGL.Point(coord[0], coord[1]));
            }).flat(); // 将嵌套的数组展平
            pointsArrays.push(points);
          });
        } else if (feature.geometry.type === 'Polygon') {
          const points = feature.geometry.coordinates[0].map(coord => new window.BMapGL.Point(coord[0], coord[1]));
          pointsArrays.push(points);
        }
      });
      return pointsArrays;
    },

    // 检查多边形是否闭合
    isPolygonClosed(points) {
      return points[0].equals(points[points.length - 1]);
    },


    gcj02ToBd09(lng, lat) {
      const x_PI = (Math.PI * 3000.0) / 180.0;
      const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      return [z * Math.cos(theta) + 0.0065, z * Math.sin(theta) + 0.006];
    },

// 批量转换方法（输入高德坐标数组，返回百度坐标数组）
    batchGCJ02ToBD09(coordsArray) {
      return coordsArray.map(coord => gcj02tobd09(coord.lng, coord.lat));
    }
  }
}
</script>

<style scoped>
#map_container {
  background: #f0f2f5; /* 地图加载前的背景色 */
}
</style>
