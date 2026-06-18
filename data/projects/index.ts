// import * as macro from './macro'; // temporarily hidden
import * as betashares from './betashares';
import * as afterpay from './afterpay';
import * as latitude from './latitude';
import * as paypal from './paypal';
import * as designSystems from './design-systems';

// Display order on homepage (highest id first)
// macro temporarily hidden — re-add to this array to restore
const all = [betashares, afterpay, latitude, paypal, designSystems];

export const projects    = all.map((p) => p.card);
export const projectDetails = all.map((p) => p.detail);
