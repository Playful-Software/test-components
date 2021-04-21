import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import L, { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { TileLayer } from 'react-leaflet';
import { MapContainer, Marker, Popup } from 'react-leaflet';

// List this as "external" in build.js esbuild options so esbuild will ignore it.
// A post-build step copies node_modules/leaflet/dist/leafleet.css to the output dir.
// Esbuild translates this into a require('url!./leaflet.css') and Play's require()
// will translate into e.g. '<component-domain>/leaflet.css'.
// @ts-ignore
import leafletCssUrl from 'url!./leaflet.css';

// Dynamically load leaflet's CSS.
// TODO: How to unload?
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = leafletCssUrl;
document.head.appendChild(link);

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

const tilesets: { [tiles: string]: [string | undefined, string | undefined, number] } = {
  custom: [undefined, undefined, 18],
  google_satellite: ['&copy; google', 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', 18],
  openstreetmap: [
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    18,
  ],
  opentopomap: [
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    17,
  ],
  stamen_watercolor: [
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    16,
  ],
  moon: [
    '&copy; OpenPlanetary',
    'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png',
    10,
  ],
  mars: [
    '&copy; OpenPlanetary',
    'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png',
    5,
  ],
  mars_elevation_color: [
    '&copy; OpenPlanetary',
    'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png',
    6,
  ],
  game_of_thrones: [
    '',
    'https://cartocdn-gusc.global.ssl.fastly.net//ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png',
    10,
  ],
};

type MapProperties = {
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  zoom: number;
  maxZoom: number;
  tiles: string;
  tilesUrl: string;
  attribution: string;
} & ComponentProperties;

function Map(props: MapProperties) {
  const { latitude, longitude, zoom, tiles, width, height, componentObject } = props;
  let { tilesUrl, attribution, maxZoom } = props;

  const mapRef = useRef<LeafletMap>();

  if (tiles !== 'custom') {
    const tileset = tilesets[tiles];
    attribution = tileset[0]!;
    tilesUrl = tileset[1]!;
    maxZoom = tileset[2];
  }

  // TODO: not sure react-leaflet is adding much value if everything has to be plumbed
  // through to Leaflet anyway.
  useEffect(() => {
    mapRef.current?.setView([latitude, longitude], zoom);
  }, [latitude, longitude, zoom]);

  useEffect(() => {
    mapRef.current?.invalidateSize(true);
  }, [width, height]);

  useEffect(() => {
    mapRef.current?.eachLayer((layer) => {
      const tileLayer = layer as LeafletTileLayer;
      if (!tileLayer.setUrl) {
        return;
      }
      tileLayer.setUrl(tilesUrl);
    });
  }, [tilesUrl]);

  useEffect(() => {
    const [newAttribution, newTilesUrl, newMaxZoom] = tilesets[tiles];

    componentObject!.$maxZoom = newMaxZoom;
    componentObject!.$zoom = Math.min(newMaxZoom, componentObject!.zoom);
    if (newTilesUrl) {
      componentObject!.$tilesUrl = newTilesUrl;
    }
    if (newAttribution) {
      componentObject!.$attribution = newAttribution;
    }
    mapRef.current?.setMaxZoom(newMaxZoom);
  }, [tiles]);

  return (
    <div style={{ width, height }}>
      <MapContainer
        whenCreated={(map) => (mapRef.current = map)}
        style={{ width: '100%', height: '100%' }}
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer attribution={attribution} url={tilesUrl} maxZoom={maxZoom} />
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
    tiles: {
      type: 'string',
      default: 'openstreetmap',
      editor: {
        type: 'Option',
        options: [
          { title: 'Custom', value: 'custom' },
          { title: 'OpenStreetMap', value: 'openstreetmap' },
          { title: 'OpenTopoMap', value: 'opentopomap' },
          { title: 'Google Satellite', value: 'google_satellite' },
          { title: 'Stamen Watercolor', value: 'stamen_watercolor' },
          { title: 'Moon', value: 'moon' },
          { title: 'Mars', value: 'mars' },
          { title: 'Mars Elevation Color', value: 'mars_elevation_color' },
          { title: 'Game Of Thrones', value: 'game_of_thrones' },
        ],
      },
    },
    attribution: { type: 'string' },
    tilesUrl: { type: 'string' },
    maxZoom: { type: 'number', default: 18 },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 400 },
  },
};
