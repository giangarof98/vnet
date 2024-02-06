import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faRightFromBracket, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faHome, faRightFromBracket, faPlus, faArrowLeft);

const app = createApp(App)

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')

