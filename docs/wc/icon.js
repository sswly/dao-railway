import { DaoElement } from "./element.js";

class DaoIcon extends DaoElement {
  constructor() {
    super("icon");
  }
  static get observedAttributes() {
    return ["name"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this._name = newValue;
    }
    this.render();
  }
  render() {
    let svg = this.shadowRoot.querySelector("svg use");
    if (svg) {
        svg.setAttribute("href", "/media/icons.svg#icon-" + this._name);
    }
 }
}
window.customElements.define("dao-icon", DaoIcon);