import { DaoElement } from "./element.js";

class DaoLogin extends DaoElement {
    constructor() {
        super("login");
    }
    regEventCallback() {
        this.shadowRoot
            .querySelector("#login")
            .addEventListener("click", () => {
                this.onLogin();
            });
    }
    onLogin() {
        let user = this.shadowRoot.querySelector("#user").value;
        let password = this.shadowRoot.querySelector("#password").value;
        if (user == "ssw" && password == "sswly") {
            console.log("login", user);
            this.dispatchEvent(
                new CustomEvent("login-ok", {
                    bubbles: true,
                    composed: true,
                })
            );
        } else {
            alert("login failed");
        }
    }
}
window.customElements.define("dao-login", DaoLogin);
