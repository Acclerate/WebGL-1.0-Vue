<template>
  <div>
    <div id="map_container" style="width:100%;height:800px;"></div>
  </div>
</template>
<script>
import boundaryData from '../assets/ytai.json';

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
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);

      // 添加必要控件
      map.addControl(new window.BMapGL.NavigationControl3D());
      map.addControl(new window.BMapGL.ScaleControl());
      map.addControl(new window.BMapGL.ZoomControl());

      // 2. 处理边界数据（确保使用BD09坐标系）
      const boundaryPoints = boundaryData.map(p => {
        return new window.BMapGL.Point(p.lng, p.lat);
      });
      map.setMapStyleV2({styleJson: stylejson});

      // 闭合多边形（首尾坐标相同）
      if (!this.isPolygonClosed(boundaryPoints)) {
        boundaryPoints.push(boundaryPoints[0].clone());
      }

      // 3. 创建掩膜多边形（外框+孔洞）
      const maskPolygon = this.createMaskPolygon(map, boundaryPoints);
      map.addOverlay(maskPolygon);

      // 4. 绘制高亮边界
      const border = new window.BMapGL.Polyline(boundaryPoints, {
        strokeColor: '#4ca7a2',
        strokeWeight: 3,
        strokeOpacity: 1
      });
      map.addOverlay(border);
    },

    // 检查多边形是否闭合
    isPolygonClosed(points) {
      return points[0].equals(points[points.length - 1]);
    },

    // 创建带孔洞的掩膜
    createMaskPolygon(map, holePoints) {
      // 获取地图最大范围作为外框
      const bounds = map.getBounds();
      const outer = [
        new window.BMapGL.Point(bounds.getSouthWest().lng, bounds.getSouthWest().lat),
        new window.BMapGL.Point(bounds.getNorthEast().lng, bounds.getSouthWest().lat),
        new window.BMapGL.Point(bounds.getNorthEast().lng, bounds.getNorthEast().lat),
        new window.BMapGL.Point(bounds.getSouthWest().lng, bounds.getNorthEast().lat),
        new window.BMapGL.Point(bounds.getSouthWest().lng, bounds.getSouthWest().lat) // 闭合
      ];

      // GL版多边形孔洞需要嵌套路径格式
      return new window.BMapGL.Polygon([outer, holePoints], {
        strokeColor: 'none',
        fillColor: 'rgba(255,255,255,0.8)',
        fillOpacity: 0.8
      });
    }
  }
}
</script>

<style scoped>
#map_container {
  background: #f0f2f5; /* 地图加载前的背景色 */
}
</style>
