import QRCodeURL from 'url!./qrcode.min.js';

export const QRCodePrototype = {
  mount(container, insertBefore) {
    super.mount(container, insertBefore);

    // We'd rather not have components making global changes, but this is an example
    if (window.QRCode === undefined) {
      const script = document.createElement('script');
      script.onload = () => {
        this.initialized = true;
      };
      script.src = QRCodeURL;
      document.head.appendChild(script);
    } else {
      this.initialized = true;
    }
  },

  update(changed) {
    super.update(changed);

    if (changed.initialized || changed.content || changed.width || changed.height) {
      if (this.initialized) {
        const qr = new window.QRCode({
          content: this.content,
          width: this.width,
          height: this.height,
          join: true,
        });
        this._element.innerHTML = qr.svg();
      }
    }
  },
};

export const QRCodeDescription = {
  name: 'QRCode',
  title: 'QR Code',
  prototype: QRCodePrototype,
  extends: 'Play Kit/View',
  properties: {
    content: {
      type: 'string',
      default: 'https://play.playful.software',
      editor: { type: 'MultilineString' },
    },
    width: { type: 'number', default: 256 },
    height: { type: 'number', default: 256 },
  },
};
