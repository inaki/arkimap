import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import { geojson } from "./data/cdmx";
import Pin from "./components/pin";
import prisma from "../../lib/prisma";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const DetailsPage = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const router = useRouter();
  const { latitude, longitude } = router.query;
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 12,
  });

  console.log(router.query);

  const pins = useMemo(
    () =>
      geojson.features.map((place, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={place.geometry.coordinates[0]}
          latitude={place.geometry.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            console.log(place);
            setPopupInfo(place);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div className="container">
      <Map
        mapStyle={"mapbox://styles/aranzadi/cl9ou4cyo000i17pggpo9dk9n"}
        mapboxAccessToken={process.env.mapboxglAccessToken}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        {...viewport}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.geometry.coordinates[0]}
            latitude={popupInfo.geometry.coordinates[1]}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div className="p-6 max-w-sm bg-white rounded-lg">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {popupInfo.properties.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {popupInfo.properties.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                more info
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default DetailsPage;
