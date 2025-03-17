# map_demo

> A Vue.js project

内网离线 百度3D地图

该项目采用 ng作为瓦片的反向代理 成为离线地图的瓦片服务器

  'tiles_v_dir' : 'http://127.0.0.1:86/baidu_ytai_map/tiles/',     		//矢量瓦片图的地址，为空默认在 offlinemap/tiles_v/ 目录

  

常规地图按数据结构化分为：
1.    删格地图：由一层层固定大小的图片构成，256x256 或 512x512，数据量较大
2.    矢量地图：对地图数据元素进行矢量化的数据文件构成，显示效果，精度高

国内地图主要有以下三种坐标系：
1.    WGS84：为一种大地坐标系，也是目前广泛使用的GPS全球卫星定位系统使用的坐标系。例如：天地图
2.    GCJ02：又称火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。例如：高德地图、腾讯地图
3.    BD09 ：为百度坐标系，在GCJ02坐标系基础上再次加密。其中bd09ll表示百度经纬度坐标，bd09mc表示百度墨卡托米制坐标。例如：百度地图

实现离线地图的主要框架：
1.    Leaflet   https://leafletjs.com/ 
2.    OpenLayer    https://openlayers.org/
3.    百度离线js  
Leaflet和OpenLayer适合，高德，腾讯，谷歌，必应等WGS84和GCJ02坐标系的瓦片。当然也可以加载百度瓦片，但需要在加载设置为百度的坐标系

百度离线js分为API 3.0和WebGL 1.0
 API 3.0：适用于删格瓦片
WebGL 1.0：适用于矢量瓦片，其卫星图为地球模式，也是用的卫星图的删格瓦片
百度离线地图 API 3.0：http://www.wmksj.com/wzty/71.html
百度离线地图 WebGL 1.0：http://www.wmksj.com/wzty/83.html

百度个性离线地图：
setMapStyle：百度旧版的个性地图，使用的是删格瓦片
setMapStyleV2：百度新版个性地图，无论API 3.0还是WebGL 1.0都是使用矢量瓦片。
百度API 3.0离线个性地图：http://www.wmksj.com/wzty/92.html
百度WebGL 1.0离线个性地图：http://www.wmksj.com/wzty/93.html

高德离线地图，谷歌离线地图等
使用Leaflet或OpenLayer直接加载tiles瓦片。
Leaflet实现高德离线地图：http://www.wmksj.com/tutorial/7.html
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
