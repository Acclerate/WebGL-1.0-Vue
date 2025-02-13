const fs = require('fs');
const axios = require('axios');

// 配置参数 (需替换成你的百度AK)
const AK = 'vs82wCB9Ve09qKDGJloC2jvdyHAHZSt1'; // 从百度开发者平台获取
const INPUT_FILE = 'D:\\Downloads\\烟台市.json'; // 输入的原始GeoJSON文件
const OUTPUT_FILE = 'yantai_bd09.geojson'; // 输出的转换后文件
const MAX_RETRIES = 3; // 最大重试次数
const REQUEST_TIMEOUT = 10000; // 请求超时时间（毫秒）

async function convertCoord(lng, lat, retryCount = 0) {
  const url = `https://api.map.baidu.com/geoconv/v1/?coords=${lng},${lat}&from=1&to=5&ak=${AK}`;
  try {
    const response = await axios.get(url, { timeout: REQUEST_TIMEOUT });
    return response.data.result[0]; // 返回 {x: BD经度, y: BD纬度}
  } catch (error) {
    if (retryCount < MAX_RETRIES && error.code === 'ETIMEDOUT') {
      console.warn(`请求超时，正在重试... (${retryCount + 1}/${MAX_RETRIES})`);
      return convertCoord(lng, lat, retryCount + 1);
    } else {
      throw new Error(`坐标转换失败: ${error.message}`);
    }
  }
}

async function convertGeometry(coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    if (Array.isArray(coordinates[i][0])) {
      await convertGeometry(coordinates[i]);
    } else {
      const [lng, lat] = coordinates[i];
      const { x, y } = await convertCoord(lng, lat);
      coordinates[i] = [parseFloat(x.toFixed(6)), parseFloat(y.toFixed(6))];
    }
  }
}

async function main() {
  const geoData = JSON.parse(fs.readFileSync(INPUT_FILE));

  for (const feature of geoData.features) {
    await convertGeometry(feature.geometry.coordinates);

    const [centerLng, centerLat] = feature.properties.center;
    const centerBD = await convertCoord(centerLng, centerLat);
    feature.properties.center = [centerBD.x, centerBD.y];

    if (feature.properties.centroid) {
      const [centroidLng, centroidLat] = feature.properties.centroid;
      const centroidBD = await convertCoord(centroidLng, centroidLat);
      feature.properties.centroid = [centroidBD.x, centroidBD.y];
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(geoData, null, 2));
  console.log(`转换完成！已保存至 ${OUTPUT_FILE}`);
}

main().catch(console.error);
