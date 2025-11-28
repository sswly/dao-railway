import { DaoElement } from "./element.js";

class DaoLayout extends DaoElement {
    constructor() {
        super("layout");
        this.router = "login"
    }
    render() {
        this.renderSide();
        this.renderMain();
    }
    renderSide() {
        let side = this.shadowRoot.querySelector("#side");
        if (!side) {
            return;
        }
        side.innerHTML = '<dao-dropdown class="menu" data=\'["Menu 1.1", "Menu 1.2", "Menu 1.3"]\'><span slot="title">Menu 1</span></dao-dropdown>';
        side.innerHTML += '<dao-dropdown class="menu" data=\'["Menu 1.1", "Menu 1.2", "Menu 1.3"]\'><span slot="title">Menu 2</span></dao-dropdown>';
        this.shadowRoot.querySelectorAll(".menu").forEach(element => {
            element.addEventListener("click", (e) => {
                this.onSystemMenu(e)
            });
        });
    }
    renderMain() {
        let main = this.shadowRoot.querySelector(".main");
        if (!main) {
            return;
        }
        switch (this.router) {
            case "login":
                main.innerHTML = '<dao-login></dao-login>';
                break;
            case "learning-card":
                main.innerHTML = '<dao-learning-card></dao-learning-card>';
                break;
        }
    }
    regEventCallback() {
        this.shadowRoot.querySelector("#sys-menu").addEventListener("click", (e) => {
            this.onSystemMenu(e)
        });
        this.shadowRoot.querySelector(".main").addEventListener("login-ok", (e) => {
            console.log("login-ok", e);
            this.router = "learning-card";
            this.renderMain();
        });
    }
    onSystemMenu(e) {
        console.log(e.dao.dropdown.title, e.dao.dropdown.selected)
        if (e.target.classList.contains("dropdown-item")) {
            console.log("You clicked on: " + e.target.textContent);
        }
    }
}
window.customElements.define("dao-layout", DaoLayout);
