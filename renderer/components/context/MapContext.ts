import React, { createContext } from "react";
import {Map} from "ol";
const MapContext = createContext<Map | null>(null);
export default MapContext;