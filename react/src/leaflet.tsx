import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import L, { Map as LeafletMap } from 'leaflet';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// List this as "external" in build.js esbuild options so esbuild will ignore it.
// A post-build step copies node_modules/leaflet/dist/leafleet.css to the output dir.
// Esbuild translates this into a require('url!./leaflet.css') and Play's require()
// will translate into e.g. '<component-domain>/leaflet.css'.
import leafletCssUrl from 'url!./leaflet.css';

// Dynamically load leaflet's CSS.
// TODO: How to unload?
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = leafletCssUrl;
document.head.appendChild(link);

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

type MapProperties = {
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  zoom: number;
} & ComponentProperties;

function Map(props: MapProperties) {
  const { latitude, longitude, zoom, width, height } = props;
  const mapRef = useRef<LeafletMap>();

  useEffect(() => {
    mapRef.current?.setView([latitude, longitude], zoom);
  }, [latitude, longitude, zoom]);

  useEffect(() => {
    mapRef.current?.invalidateSize(true);
  }, [width, height]);

  return (
    <div style={{ width, height }}>
      <MapContainer
        whenCreated={(map) => (mapRef.current = map)}
        style={{ width: '100%', height: '100%' }}
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export const MapDescription: ComponentDescription = {
  name: 'Map',
  description: 'The Map Component...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'React Test Kit',
  renderer: Map,
  extends: 'Play Kit/View',
  properties: {
    latitude: {
      type: 'number',
      default: 47.61213,
      editor: { type: 'Number', min: -90, max: 90, step: 1 },
    },
    longitude: {
      type: 'number',
      default: -122.33945,
      editor: { type: 'Number', min: -180, max: 180, step: 1 },
    },
    zoom: { type: 'number', default: 13, editor: { type: 'Number', min: 0, max: 18, step: 1 } },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 400 },
  },
};
