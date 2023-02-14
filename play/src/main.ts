import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Monitor from "@apply-monitor/monitor";

new Monitor({
    url:'1111',
    apiKey:'22222'
})
aalert("hello!")

createApp(App).mount("#app");
