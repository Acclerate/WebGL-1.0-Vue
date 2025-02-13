<template>
  <div>
    <div>this is a ytai map demo</div>
    <div id="map_container" style="width: 100%; height: 800px;"></div>
  </div>
</template>
<script>
import boundaryData from '../assets/ytai.json'; // 引入 JSON 文件

export default {
  data() {
  },
  mounted() {
    this.$nextTick(() => {
      this.drawMap()
    })
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    drawMap() {
      // 创建地图实例
      var map = new window.BMapGL.Map("map_container");
      // 初始化地图, 设置中心点坐标和地图级别
      map.centerAndZoom(new window.BMapGL.Point(121.457204, 37.472776), 17);
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);

      // 添加控件
      var navi3DCtrl = new window.BMapGL.NavigationControl3D();
      map.addControl(navi3DCtrl);

      var scaleCtrl = new window.BMapGL.ScaleControl();
      map.addControl(scaleCtrl);

      var zoomCtrl = new BMapGL.ZoomControl();   // 添加缩放控件
      map.addControl(zoomCtrl);
      map.setDisplayOptions({
        poiIcon: false,
        poiText: true,
        indoor: false
      });
      map.setMapStyleV2({styleJson: stylejson});

      // 加载边界数据并初始化地图掩膜
      const boundaryPoints =  boundaryData.map(point => new BMapGL.Point(point.lng, point.lat));
      var mapBounds = map.getBounds();
      var maskPolygonPoints = [
        new BMapGL.Point(mapBounds.getSouthWest().lng, mapBounds.getSouthWest().lat),
        new BMapGL.Point(mapBounds.getNorthEast().lng, mapBounds.getSouthWest().lat),
        new BMapGL.Point(mapBounds.getNorthEast().lng, mapBounds.getNorthEast().lat),
        new BMapGL.Point(mapBounds.getSouthWest().lng, mapBounds.getNorthEast().lat)
      ];

      // 创建掩膜多边形，并在其中挖掉烟台市的边界区域
      var maskPolygon = new BMapGL.Polygon(maskPolygonPoints, {
        strokeColor: 'none',
        fillColor: '#ffffff',
        fillOpacity: 0.8
      });
      maskPolygon.holes = [boundaryPoints]; // 使用烟台市的边界点作为内孔

      // 添加掩膜到地图上
      map.addOverlay(maskPolygon);

      // 可选：绘制烟台市的边界线
      var border = new BMapGL.Polyline(boundaryPoints, {
        strokeColor: '#4ca7a2',
        strokeWeight: 3,
        strokeOpacity: 1
      });
      map.addOverlay(border);
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body, #map_container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}

.BMap_mask {
  z-index: 999;
}
</style>
