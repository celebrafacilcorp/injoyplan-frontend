import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'

const Map = ({ location }: any) => {

    const INITIAL_ZOOM = 15.12
    const [zoom, _setZoom] = useState(INITIAL_ZOOM)
    const mapRef: any = useRef()
    const mapContainerRef: any = useRef()

    let locations = location?.split(",")
    console.log(locations)

    useEffect(() => {
        if (location !== undefined) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2Y29kZXgiLCJhIjoiY20xaDRoN2c2MDA4aDJtb2I3bW85dmk1aSJ9.rCfKcWomIv7qTwNwKyniAA'
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [parseFloat(locations[1]), parseFloat(locations[0])],
                zoom: zoom
            });

            // Añade un marcador en la ubicación especificada
            new mapboxgl.Marker()
                .setLngLat([parseFloat(locations[1]), parseFloat(locations[0])])
                .addTo(mapRef.current);

            // Limpiar el mapa cuando el componente se desmonta
            return () => {
                mapRef.current.remove();
            };
        }
    }, [location])

    return (
        <div style={{ position: "relative" }}>
            {/* <div className="sidebar">
                Longitude: {locations[1]} | Latitude: {locations[0]} | Zoom: {zoom}
            </div> */}
            <div id='map-container' ref={mapContainerRef} />
        </div>
    );
};

export default Map;