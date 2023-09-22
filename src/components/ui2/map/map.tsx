import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import styles from './map.module.scss';
import { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import { Icon } from 'leaflet';


const defaultIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [12, 41],
    shadowAnchor: [13, 41],
    popupAnchor: [0, -41]
});

interface Props { }

const LeafletMap: React.FC<Props> = (props) => {
    const center: LatLngTuple = [0, 0];

    const maxBounds: LatLngBounds = new LatLngBounds(
        new LatLng(-90, -180), // Southwest coordinates
        new LatLng(90, 180)    // Northeast coordinates
    );

    // State to hold markers
    const [markers, setMarkers] = useState<LatLngTuple[]>([]);

    const addMarker = (interval: number, positions: LatLngTuple[]) => {
        setInterval(() => {
            // Choose a random position from the provided positions array
            const position = positions[Math.floor(Math.random() * positions.length)];

            setMarkers((prevMarkers) => [...prevMarkers, position]);

            // Remove marker after 2 seconds
            setTimeout(() => {
                setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker !== position));
            }, 2000);
        }, interval);
    };

    useEffect(() => {
        // Coordinates on land for demo
        const positions1: LatLngTuple[] = [[20, 0], [30, 30], [40, -40]];
        const positions2: LatLngTuple[] = [[-20, 20], [-30, -30], [10, 50]];
        const positions3: LatLngTuple[] = [[50, 50], [-40, 40], [-10, -20]];

        // Create three intervals for adding markers
        addMarker(2000, positions1); // every 2 seconds
        addMarker(3000, positions2); // every 3 seconds
        addMarker(4000, positions3); // every 4 seconds
    }, []);

    return (
        <div className={styles.map}>
            <MapContainer
                center={center}
                zoom={2.3}
                minZoom={2.3}
                style={{ width: '100%', height: '100%' }}
                maxBounds={maxBounds}
                zoomSnap={0}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    noWrap={true} // To avoid repeating continents
                />
                {markers.map((position, idx) => (
                    <Marker key={idx} position={position} icon={defaultIcon}>
                        <Popup>A simple Popup</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
