import { DaoElement } from "./element.js";

class DaoDropdown extends DaoElement {
    constructor() {
        super("dropdown");
        this.listId = "#dropdown-list";
        this.listType = "menu";
    }
    static get observedAttributes() {
        return ["data", "list-style"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "data") {
            this._data = JSON.parse(newValue);
            this.render();
        } else if (name === "list-style") {
            if (newValue == "popup-select") {
                this.listId = "#dropdown-popup-list";
                this.listType = "select";
            } else if (newValue == "popup-menu") {
                this.listId = "#dropdown-popup-list";
                this.listType = "menu";
            } else {
                this.listId = "#dropdown-list";
            }
        }
        this.render();
    }
    render() {
        if (this.shadowRoot.querySelector('slot[name="title"]')) {
            this.title = this.shadowRoot.querySelector('slot[name="title"]').assignedNodes({ flatten: true })[0].textContent;
        }

        let list = this.shadowRoot.querySelector(this.listId);
        if (!list) {
            return;
        }
        list.innerHTML = "";

        this._data.forEach((e) => {
            const item = document.createElement("dd");
            item.textContent = e;
            item.className = "dropdown-item";
            list.appendChild(item);
        });
    }
    regEventCallback() {
        this.shadowRoot.querySelector("#dropdown-title").addEventListener("click", (event) => {
            if (this.shadowRoot.querySelector(this.listId).style.display != "block")
                this.onDropdownShow(true);
            else
                this.onDropdownShow(false);



            event.stopPropagation();
        });

        let list = this.shadowRoot.querySelector(this.listId);
        list.addEventListener("click", (event) => {
            this.onDropdownSelected(event);
            event.dao = {
                dropdown: {
                    title: this.title,
                    selected: event.target.textContent
                }
            };
        });
        list.style.userSelect = 'none';
        list.style.webkitUserSelect = 'none';
    }
    onDropdownShow(toggle) {
        if (toggle) {
            this.shadowRoot.querySelector("#dropdown-title dao-icon").setAttribute("name", "right");
            let pos = this.getElementPos("#dropdown-title");
            let list = this.shadowRoot.querySelector(this.listId);
            list.style.top = pos.bottom + "px";
            list.style.left = pos.left + "px";
            list.style.width = pos.width;
            list.style.display = "block";
            if (this.listId == "#dropdown-list") {
                return;
            }
            let list_pos = this.getElementPos(this.listId);
            list_pos.top = pos.top;
            this.dispatchEvent(new CustomEvent("popup-element", {
                detail: {
                    element: this,
                    pos: list_pos
                },
                bubbles: true,
                composed: true
            }));
        } else {
            this.shadowRoot.querySelector("#dropdown-title dao-icon").setAttribute("name", "down");
            this.shadowRoot.querySelector(this.listId).style.display = "none";
        }
    }
    onDropdownSelected(e) {
        if (this.listId == "#dropdown-popup-list" && e.target.classList.contains("dropdown-item")) {
            this.onDropdownShow(false);
            if (this.listType == "select") {
                this.shadowRoot.querySelector("#dropdown-title > span").innerHTML = e.target.textContent;
            }
        }
    }
    close() {
        this.onDropdownShow(false);
    }
}
window.customElements.define("dao-dropdown", DaoDropdown);
