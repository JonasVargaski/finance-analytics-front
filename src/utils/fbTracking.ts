interface IOptions {
  autoConfig?: boolean;
  debug?: boolean;
}

type tFbTrackEvents =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent';

interface IFbAdvancedMatching {
  em?: string;
  fn?: string;
  ln?: string;
  ph?: number;
  external_id?: string;
  ge?: string;
  db?: number;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
}

class FbTracking {
  private initialized = false;
  private fbq = window.fbq;

  private options: IOptions = {
    autoConfig: true,
    debug: false,
  };

  constructor(options?: IOptions) {
    Object.assign(this.options, options);
  }

  private isInitilized() {
    if (!this.initialized) {
      this.warn('Pixel not initialized before using call ReactPixel.init with required params');
    }
    return this.initialized;
  }

  private log(...args: any) {
    if (!this.options.debug) return;
    console.info(...['[facebook-pixel]'].concat(args));
  }

  private warn(...args: any) {
    if (!this.options.debug) return;
    console.warn(...['[facebook-pixel]'].concat(args));
  }

  public init(pixelId: string, advancedMatching?: IFbAdvancedMatching) {
    if (window.fbq) {
      this.fbq = window.fbq;
    } else {
      (function (f: Window, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
        n = f.fbq = function () {
          // eslint-disable-next-line prefer-spread, prefer-rest-params
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    if (!window.fbq) {
      return this.warn('initialization failure');
    }

    this.fbq = window.fbq;

    if (!pixelId) {
      this.warn('Please insert pixel id for initializing');
    } else {
      if (this.options.autoConfig === false) {
        this.fbq('set', 'autoConfig', false, pixelId);
      }

      this.fbq('init', pixelId, advancedMatching || {});

      this.initialized = true;
    }
  }

  public pageView() {
    if (!this.isInitilized()) return;

    this.fbq('track', 'PageView');

    this.log("called fbq('track', 'PageView');");
  }

  public track(title: tFbTrackEvents, data?: Record<string, unknown>) {
    if (!this.isInitilized()) return;

    this.fbq('track', title, data);

    this.log(`called fbq('track', '${title}');`, data || '');
  }

  trackCustom(event: string, data?: Record<string, unknown>) {
    if (!this.isInitilized()) return;

    this.fbq('trackCustom', event, data);

    this.log(`called fbq('trackCustom', '${event}');`, data || '');
  }

  public grantConsent() {
    if (!this.isInitilized()) return;

    this.fbq('consent', 'grant');

    this.log(`called fbq('consent', 'grant');`);
  }

  public revokeConsent() {
    if (!this.isInitilized()) return;

    this.fbq('consent', 'revoke');

    this.log(`called fbq('consent', 'revoke');`);
  }
}

const fbTracking = new FbTracking();

fbTracking.init(import.meta.env.VITE_FB_TRACKING);

export { fbTracking };
