import React, { useRef, useState, useEffect } from "react"
import styles from './HdMap.module.css';
import CloseIcon from '@mui/icons-material/Close';
import 'ol/ol.css';
import { Map, Overlay, View } from 'ol';
import MapContext from "./context/MapContext";
import { Box, IconButton } from "@mui/material";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { fromLonLat, get } from "ol/proj";
import { defaults as defaultInteraction, DragBox, Modify, Select, Snap, Translate } from 'ol/interaction';

const HdMap = ({ children, zoom, center }) => {
    //지도 객체 관련 상태 저장!!
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const overlayRef = useRef(null);
  const [overlay, setOverlay] = useState(null);

  const dellOverlay = function () {
    overlay?.setPosition(undefined);
    return false;
};

  // on component mount - 구성요소가 마운트되면 맵개체를 초기화하고 현재 상태로 저장
  // useEffect를 사용하여 컴포넌트가 마운트될 때, ol.Map 객체를 생성하고 지도를 초기화
  useEffect(() => {
    //mapRef.current를 통해 해당 지도를 화면에 출력합니다. 
    //setMap 함수를 사용하여 지도 객체를 상태에 저장합니다.
    
    let options = {
      view: new View({
        projection: get('EPSG:5186'),
        center: fromLonLat( 
          [126.9779228388393, 37.56643948208262], //[경도, 위도] 값 설정! 필자는 시청으로 설정
          get('EPSG:3857')
        ),
        zoom: 15,
        minZoom: 8,
        constrainResolution: true,
      }),
      layers: [],
      controls: [],
      overlays: [],
      interactions: defaultInteraction({
        doubleClickZoom: false, keyboard: false,
    }),
    };

    let mapObject = new Map(options);
    //html 타겟
    mapObject.setTarget(mapRef.current);


    // 다 집어넣음
    setMap(mapObject);

    //마운트가 해제되면 맵을 폐기하는, return 구문을 사용하여 컴포넌트가 unmount될 때, 지도 객체를 해제
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  //useEffect를 사용하여 zoom이 변경될 때, map.getView().setZoom() 메서드를 사용하여 지도를 확대/축소
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  //useEffect를 사용하여 center가 변경될 때, map.getView().setCenter() 메서드를 사용하여 지도의 중심 좌표를 변경
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])







  

  

  return (
    // MapContext.Provider 컴포넌트를 사용하여 map 객체를 하위 컴포넌트에서 공유할 수 있도록 합니다. 
    //mapRef를 사용하여 지도를 출력하고, children을 렌더링
    <>
    <MapContext.Provider value={map}>
      <div ref={mapRef} className="map">
        {children}
      </div>
      <Box className={styles.windowHDMapOverlay} ref={overlayRef} component={'div'} sx={{ padding: '15px' }}>
                <IconButton onClick={dellOverlay} sx={{ backgroundColor: '#E5E5E5', position: 'absolute', right: '10px', top: '7px', width: '26px', height: '26px', borderRadius: '0' }} >
                    <CloseIcon fontSize="small" sx={{ fill: '##4A4C55' }} />
                </IconButton>
                {/* {content && (
                    Object.entries(content).map(([attKey, attValue]) => {
                        return <Typography key={attKey}> {`${attKey} : ${attValue}`} </Typography>
                    })
                )} */}
            </Box >
      
    </MapContext.Provider>

    <style jsx>{`
      .map {
    min-width: 600px;
    min-height: 500px;
    height: 500px;
    width: "100%";
  }

  .ol-full-screen {
    top: .5em;
    right: .5em;
  }
        `}</style>
    </>
  )
}
export default HdMap;
