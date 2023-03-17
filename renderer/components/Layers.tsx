import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapContext from './context/MapContext';
import VworldTileLayer from './layer/VworldTileLayer';

const Layers = ({children}:any) => {
    const map = useContext(MapContext);

    const [layers, setLayers] = useState([]);

    //     const [showTableLayers, setShowTableLayers] = useState([]);
//     const wrapRef = useRef(null);
    
    
      useEffect(() => {
        if (!map) return;
        setLayers([VworldTileLayer(map)])
      
        return () => {
          
        }
      }, [map])



      return(
        <div>{children}</div>
      )



}

export default Layers