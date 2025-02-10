<template>
<div>
	<div>this is a ytai map demo</div>
  <div id="map_container" style="width: 100%; height: 500px;"></div>
  </div>
</template>
<script>
    export default {
        data() {
            return{

            }
        },
        mounted () {
            this.$nextTick(() => {
                this.drawMap()
            })
        },
        methods: {
            drawMap () {
              var map = new window.BMapGL.Map("map_container");    // 创建Map实例
              //初始化地图,设置中心点坐标和地图级别
              // map.centerAndZoom(new BMapGL.Point(121.56847909,29.8100979777), 17)
              map.centerAndZoom(new BMapGL.Point(121.457204,37.472776), 17)
              //开启鼠标滚轮缩放
              map.enableScrollWheelZoom(true);

              var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
              map.addControl(navi3DCtrl);

              var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
              map.addControl(scaleCtrl);

              var zoomCtrl = new BMapGL.ZoomControl();   // 添加缩放控件
              map.addControl(zoomCtrl);
              map.setDisplayOptions({
                poiIcon: false,
                poiText: true,
                indoor: false
              });
              map.setMapStyleV2({styleJson: stylejson});
            }
        }
	}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body, #map_container{
			width: 100%;
			height: 100%;
			overflow: hidden;
			margin:0;
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
