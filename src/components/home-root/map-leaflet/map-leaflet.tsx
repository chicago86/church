import classNames from "classnames"
import * as L from "leaflet"
import { useEffect } from "react"
import { PreloadedQuery, usePreloadedQuery } from "react-relay/hooks"
import { guidToClassName, isMobile } from "../../../utils"
import { VACANCY_CLICK } from "../../../utils/constants"
import { homeRootQuery, homeRootQuery$data } from "../__generated__/homeRootQuery.graphql"
import defaultIcon from "./images/default-icon.svg"
import locationIcon from './images/location-icon.svg'
import selectedIcon from './images/selected-icon.svg'
import "./leaflet-styles.css"
import s from './map-leaflet.module.scss'
import { toGeoJSON } from './utils'

const preloadableRequest = require("../__generated__/homeRootQuery.graphql")



interface Props {
  preloadedQuery: PreloadedQuery<homeRootQuery>,
}

function MapLeaflet(props: Props) {
  const { preloadedQuery } = props;
  const data: homeRootQuery$data = usePreloadedQuery(preloadableRequest, preloadedQuery)


  //create map
  useEffect(() => {
    var map = L.map("map", {
      // center,
      minZoom: 1,
      maxZoom: 1,
      scrollWheelZoom: true,
      doubleClickZoom: false,
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // dispatch!(setMapRefAction(map))

    // const mapDiv = document.getElementById("map")
    // const resizeObserver = new ResizeObserver(() => map.invalidateSize())
    // resizeObserver.observe(mapDiv!)

    map.setView([0, 0], 0);
  }, [])

  return <div className={classNames(s.mapContainer)}>
    <div id="map" className={classNames(s.map, { [s.noZoomControl]: isMobile() })} />
  </div>
}

export default MapLeaflet