<template>
  <div>
    <div id="map_container" style="width:100%;height:800px;"></div>
  </div>
</template>

<script>
import geoJsonData from '../assets/yati_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson
import yati_all_ali from '../assets/yati_all_ali.json'; // 假设新的 GeoJSON 数据文件名为 ytai.geojson

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

      // 2. 处理 GeoJSON 数据，提取多边形坐标
      const boundaryPointsArrays = this.extractCoordinates(geoJsonData);
      const boundaryyati_all_ali = this.extractCoordinates(yati_all_ali);
      console.log(boundaryyati_all_ali)
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
    }
  }
}
</script>

<style scoped>
#map_container {
  background: #f0f2f5; /* 地图加载前的背景色 */
}
</style>
