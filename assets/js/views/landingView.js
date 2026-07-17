import { renderHeader, renderHero, renderValue } from "./landingTop.js";
import { renderDemo } from "./landingDemo.js";
import { renderContact, renderFooter } from "./landingContact.js";
import { bindLanding } from "./landingEvents.js";

export function renderLanding(appRoot) {
  appRoot.innerHTML = `<div class="landing-page">${renderHeader()}<main>${renderHero()}${renderValue()}${renderDemo()}${renderContact()}</main>${renderFooter()}</div>`;
  bindLanding();
}
