import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';


const VworldTileLayer = (map) => {
    let vectorLayer = new TileLayer({
        source: new XYZ({
          url: ' http://api.vworld.kr/req/wmts/1.0.0/7FA385D9-C3BF-381E-BFB3-FEFF17D51A83/Base/{z}/{y}/{x}.png' ,
          maxZoom: 19,
          crossOrigin:'anonymous'
        }),
        properties: {
          title: "브이월드",
        },
        zIndex: 0,
      });
      map.addLayer(vectorLayer);
      return vectorLayer
}

export default VworldTileLayer