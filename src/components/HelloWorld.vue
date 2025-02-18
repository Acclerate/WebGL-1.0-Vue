<template>
  <div>
    <div id="map_container" style="width:100%;height:800px;"></div>
  </div>
</template>

<script>
import geoJsonData from '../assets/yati_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson
import yati_all_ali from '../assets/yati_all_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson
import yati_all_fix from '../assets/yati_fix.json';
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
      map.centerAndZoom(new window.BMapGL.Point(121.457204, 37.472776), 17);
      map.enableScrollWheelZoom(true);

      // 添加必要控件
      map.addControl(new window.BMapGL.NavigationControl3D());
      map.addControl(new window.BMapGL.ScaleControl());
      map.addControl(new window.BMapGL.ZoomControl());

      const  yati_all_fix_data=yati_all_fix
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
      boundaryyati_all_ali.forEach(boundaryPoints => {
        var mapmask = new BMapGL.MapMask(boundaryPoints, {
          isBuildingMask: true,
          isPoiMask: true,
          isMapMask: true,
          showRegion: 'inside',
          topFillColor: '#5679ea',
          topFillOpacity: 0.5,
          sideFillColor: '#5679ea',
          sideFillOpacity: 0.9
        });
        map.addOverlay(mapmask);
      })
      // 处理医院标记点
      yati_all_fix_data.forEach(item => {
        // 转换坐标系
        const [bdLng, bdLat] = this.gcj02ToBd09(
          parseFloat(item.LNG),
          parseFloat(item.LAT)
        );

        // 创建标注点
        const point = new window.BMapGL.Point(bdLng, bdLat);
        const marker = new window.BMapGL.Marker(point, {
          icon: new window.BMapGL.Icon(
            'image://data:image/png;base64,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',
            new window.BMapGL.Size(30, 40)
          )
        });

        // 添加信息窗口
        const infoWindow = new window.BMapGL.InfoWindow(`
          <div style="min-width:200px">
            <h4>${item.NAME}</h4>
            <p>地址：${item.VALUE4}</p>
            <p>级别：${item.VALUE3}</p>
          </div>
        `, { width: 250 });

        marker.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, point);
        });

        map.addOverlay(marker);
      });
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
