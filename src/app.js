import Items from "./components/Items.js";

console.log('asdf')

class App {
  constructor() {
    const $app = document.querySelector("#app");
    new Items($app);
  }
}

new App();
