import { DaoElement } from "./element.js";

class DaoLearningCard extends DaoElement {
    constructor() {
        super("learning-card");
    }
    regEventCallback() {

    }
}
window.customElements.define("dao-learning-card", DaoLearningCard);
