import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import React, { useEffect, useState } from 'react';

type XKCDProperties = { comic: number } & ComponentProperties;

function XKCD(props: XKCDProperties) {
  const { comic, component } = props;

  const [source, setSource] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(`/cors?url=https://xkcd.com/${comic}/info.0.json`)
      .then((response) => response.json())
      .then((json) => {
        setSource(json.img);
        component!.response = json;
      })
      .catch((err) => {
        setSource(undefined);
        setError(err.toString());
      });
  }, [comic]);

  // TODO: link to original comic
  // TODO: caption
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {source && (
        <img
          src={`/cors?url=${source}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      )}
      {error && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export const XKCDDescription: ComponentDescription = {
  name: 'XKCD',
  renderer: XKCD,
  extends: 'Play Kit/View',
  _meta: {
    description: 'The XKCD Component .... Content copyright',
    author: 'Playful Software', // TODO: userId or unique username?
    icon: '...', // TODO: local file?
    preview: '...', // TODO: local file?
    collection: 'React Test Kit',
    properties: {
      comic: { type: 'number', default: 2293 },
      width: { type: 'number', default: 400 },
      height: { type: 'number', default: 400 },
    },
  },
};
