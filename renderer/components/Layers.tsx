import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapContext from './context/MapContext';
import VworldTileLayer from './layer/VworldTileLayer';


const style = {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    zIndex: 1200,
    minWidth: '200px',
} as const;

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
        <>
        <div style={{
            position: "absolute",
            top: 0,
        }}
            // onMouseDown={gridClick}
        >
            {/* <Rnd minWidth={730} minHeight={400} bounds="body" default={{ x: 400, y: 400, width: 730, height: 400, }} style={style} dragHandleClassName="featureHandle">
                <div className="featureHandle" style={{ width: '100%', display: "flex", cursor: "move", backgroundColor: "#30459A" }}>
                    <ListItem sx={{ paddingTop: '3px', paddingBottom: '3px' }}>
                        <ListItemIcon sx={{ fontSize: 10, minWidth: '30px' }}>
                            <SvgIcon sx={{ fill: '#fff', width: '20px' }}>
                                <Layer_icon />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText sx={{ color: "#fff" }}>
                            <Typography variant="subtitle2">
                                {title}
                            </Typography>
                        </ListItemText>
                        <IconButton onClick={tableClose}>
                            <CloseIcon fontSize="small" sx={{ fill: '#fff' }} />
                        </IconButton>
                    </ListItem>
                </div>
                <div style={{ flexGrow: 1, width: '100%', padding:'0px' }}>
                    <FeatureItem index={1} source={source} />
                </div>
            </Rnd> */}
        </div>
        <div>{children}</div>
        </>
      )



}

export default Layers