import  { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Monitor from "@apply-monitor/monitor";



let app=createApp(App)

new Monitor({
    url:'1111',
    apiKey:'22222'
})

app.mount("#app");
