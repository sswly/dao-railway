import { DaoElement } from "./element.js";

class DaoApp extends DaoElement {
  constructor() {
    super("app");
  }
  regEventCallback() {
    this.closeableList = [];
    let app = this.shadowRoot.querySelector("#app");
    app.addEventListener("click", (event) => {
      this.closeableList.forEach((item) => {
        if (
          !(
            event.clientX >= item.pos.left &&
            event.clientX <= item.pos.right &&
            event.clientY >= item.pos.top &&
            event.clientY <= item.pos.bottom
          )
        ) {
          item.element.close();
        }
        this.closeableList = [];
      });
    });

    app.addEventListener("popup-element", (data) => {
      this.closeableList.push(data.detail);
    });
  }
}
window.customElements.define("dao-app", DaoApp);
