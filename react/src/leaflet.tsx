// TODO: This isn't a React compononent anymore and should be relocated.
import type { ComponentDescription, ComponentProperties, Project } from '@playful/runtime';
import L, { Map, TileLayer, Marker } from 'leaflet';

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

// TODO: Ideally these images would be hosted alongside the component.
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

const tilesets: {
  [tiles: string]: [string | undefined, string | undefined, number, number?, number?, number?];
} = {
  custom: [undefined, undefined, 18],
  google_satellite: ['&copy; google', 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', 18],
  openstreetmap: [
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    18,
    47.61213,
    -122.33945,
    15,
  ],
  opentopomap: [
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    17,
    47.61213,
    -122.33945,
    8,
  ],
  stamen_watercolor: [
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    16,
    47.61213,
    -122.33945,
    14,
  ],
  moon: [
    '&copy; OpenPlanetary',
    'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png',
    10,
    29.7,
    11.77,
    5,
  ],
  mars: [
    '&copy; OpenPlanetary',
    'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{-y}.png',
    5,
    13.56,
    -147.14,
    4,
  ],
  mars_elevation_color: [
    '&copy; OpenPlanetary',
    'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{-y}.png',
    6,
    13.56,
    -147.14,
    4,
  ],
  game_of_thrones: [
    '',
    'https://cartocdn-gusc.global.ssl.fastly.net//ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png',
    10,
    15.19,
    22.5,
    5,
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
  marker: boolean;
  markerLatitude: number;
  markerLongitude: number;
  zoomControl: boolean;
  attributionLabel: boolean;
} & ComponentProperties;

// TODO: How to type this to have inherited Component and ViewProperties
// and MapPoperties and private properties?

const MapPrototype = {
  // TODO: try classes so these can be inherited?
  latitude: 0,
  longitude: 0,
  zoom: 0,
  tiles: '',
  tilesUrl: '',
  attribution: '',
  maxZoom: 0,
  marker: false,
  markerLatitude: 0,
  markerLongitude: 0,
  zoomControl: true,
  attributionLabel: true,
  $tilesUrl: '',
  $attribution: '',
  $maxZoom: 0,
  $latitude: 0,
  $longitude: 0,
  $zoom: 0,

  project: undefined! as Project,

  _element: undefined! as HTMLDivElement,
  _map: undefined! as Map,
  _tileLayer: undefined! as TileLayer,
  _marker: undefined as Marker | undefined,

  mount(container: HTMLElement, insertBefore?: HTMLElement) {
    super.mount(container, insertBefore);

    this._map = L.map(this._element, {
      // TODO: Make these options properties
      attributionControl: true,
      zoomControl: true,
      center: [this.latitude, this.longitude],
      zoom: this.zoom,
    });

    if (!this.project.designMode) {
      this._map.on('move', (event) => {
        const { lat, lng } = this._map.getCenter();
        this.latitude = lat;
        this.longitude = lng;
      });

      this._map.on('zoom', (event) => {
        const zoom = this._map.getZoom();
        this.zoom = zoom;
      });
    }

    this._tileLayer = L.tileLayer(this.tilesUrl, {
      attribution: this.attribution,
      maxZoom: this.maxZoom,
    }).addTo(this._map);
  },

  unmount() {
    super.unmount();
    if (this._map) {
      this._map.remove();
    }
  },

  update(changed: any) {
    super.update(changed);

    if (changed.latitude || changed.longitude || changed.zoom) {
      this._map.setView([this.latitude, this.longitude], this.zoom, { animate: false });
    }

    if (changed.width || changed.height) {
      this._map.invalidateSize({ animate: false });
    }

    if (changed.tilesUrl) {
      this._tileLayer.setUrl(this.tilesUrl);
    }

    if (changed.maxZoom) {
      this._map.setMaxZoom(this.maxZoom);
    }

    if (changed.attributionLabel) {
    }

    if (changed.zoomControl) {
      if (this.zoomControl) {
        this._map.addControl(this._map.zoomControl);
      } else if (this._map.zoomControl) {
        this._map.removeControl(this._map.zoomControl);
      }
    }

    if (changed.attributionLabel) {
      if (this.attributionLabel) {
        this._map.addControl(this._map.attributionControl);
      } else if (this._map.attributionControl) {
        this._map.removeControl(this._map.attributionControl);
      }
    }

    if (changed.marker) {
      if (this.marker) {
        if (!this._marker) {
          this._marker = L.marker([this.markerLatitude, this.markerLongitude]).addTo(this._map);
        }
      } else {
        this._marker?.remove();
        this._marker = undefined;
      }
    }

    if ((changed.markerLatitude || changed.markerLongitude) && this._marker) {
      this._marker?.setLatLng([this.markerLatitude, this.markerLongitude]);
    }

    // Tiles is a menu of presets that is only active at design time.
    if (changed.tiles && this.project.designMode) {
      const [attribution, tilesUrl, maxZoom, lat, long, zoom] = tilesets[this.tiles];

      // TODO: Property editors are not listening for changes and only happen to show
      // these new values because saving causes them to update.
      this.$maxZoom = maxZoom;
      this.$zoom = Math.min(maxZoom, this.zoom);
      if (tilesUrl) {
        this.$tilesUrl = tilesUrl;
      }
      if (attribution !== undefined) {
        this.$attribution = attribution;
      }

      if (lat && long && zoom) {
        this.$latitude = lat;
        this.$longitude = long;
        this.$zoom = zoom;
      }
    }
  },
};

export const MapDescription: ComponentDescription = {
  name: 'Map',
  description: 'The Map Component...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'React Test Kit',
  prototype: MapPrototype,
  extends: 'Play Kit/View',
  properties: {
    latitude: {
      type: 'number',
      default: 47.61213,
      editor: { type: 'Number', min: -90, max: 90, step: 0.1 },
    },
    longitude: {
      type: 'number',
      default: -122.33945,
      editor: { type: 'Number', min: -180, max: 180, step: 0.1 },
    },
    zoom: { type: 'number', default: 13, editor: { type: 'Number', min: 0, max: 18, step: 1 } },
    tiles: {
      type: 'string',
      default: 'openstreetmap',
      editor: {
        fullWidthEditor: true,
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
    attribution: { type: 'string', editor: { type: 'MultilineString', fullWidthEditor: true } },
    tilesUrl: { type: 'string', editor: { type: 'MultilineString', fullWidthEditor: true } },
    marker: { type: 'boolean', default: false },
    markerLatitude: {
      type: 'number',
      default: 47.61213,
      editor: { type: 'Number', min: -90, max: 90, step: 0.1 },
    },
    markerLongitude: {
      type: 'number',
      default: -122.33945,
      editor: { type: 'Number', min: -180, max: 180, step: 0.1 },
    },
    maxZoom: { type: 'number', default: 18 },
    zoomControl: { type: 'boolean', default: true },
    attributionLabel: { type: 'boolean', default: true },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 400 },
  },
};
