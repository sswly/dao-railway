export class DaoElement extends HTMLElement {
  constructor(name) {
    super();
    this.name = name;
    this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    this.fetchAndParse("/wc/" + this.name + ".html");
    this.pos_rect = this.getBoundingClientRect();
  }

  static get observedAttributes() {
    return ["data"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      this._data = JSON.parse(newValue);
      this.render();
    }
  }

  fetchAndParse(url) {
    console.log("> ", url);
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const head = document.head;
        if (head.querySelector("style")) {
          this.shadowRoot.appendChild(
            head.querySelector("style").cloneNode(true)
          );
        }
        this.shadowRoot.appendChild(
          head.querySelector("template").content.cloneNode(true)
        );
        this.regEventCallback();
        this.render();
      });
  }

  regEventCallback() {}
  render() {}

  getElementPos(selector) {
    let rect = this.shadowRoot.querySelector(selector).getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    return {
      top: rect.top + scrollTop,
      bottom: rect.bottom + scrollTop,
      left: rect.left + scrollLeft,
      right: rect.right + scrollLeft,
      width: rect.width,
    };
  }
}
