const LocationPrototype = {
  _watchId: null,

  mount(container, insertBefore) {
    super.mount(container, insertBefore);

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    const options = {
      enableHighAccuracy: false,
      maximumAge: 0,
    };

    this._watchId = navigator.geolocation.watchPosition(
      this.updateCoords.bind(this),
      error,
      options
    );
  },

  unmount() {
    super.unmount();
    if (this._watchId !== null) {
      navigator.geolocation.clearWatch(this._watchId);
    }
  },

  updateCoords(pos) {
    this.latitude = pos.coords.latitude;
    this.longitude = pos.coords.longitude;
    this.altitude = pos.coords.altitude;
    this.heading = pos.coords.heading;
    this.speed = pos.coords.speed;
    this.timestamp = pos.timestamp;
  },
};

export const LocationDescription = {
  name: 'Location',
  description: 'Return the current location',
  extends: 'Play Kit/View',
  prototype: LocationPrototype,
  properties: {
    latitude: { type: 'number', default: 0, readonly: true },
    longitude: { type: 'number', default: 0, readonly: true },
    altitude: { type: 'number', default: 0, readonly: true },
    heading: { type: 'number', default: 0, readonly: true },
    speed: { type: 'number', default: 0, readonly: true },
    timestamp: { type: 'number', default: 0, readonly: true },
    height: { type: 'number', default: 50 },
    width: { type: 'number', default: 50 },
  },
};
