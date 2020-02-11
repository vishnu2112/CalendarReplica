import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';


Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false;

firebase.initializeApp({
    apiKey: "AIzaSyA0jdqNWqU_bm5pNpDNjwWsu2RSrxDzDO8",
    authDomain: "vue-calendar-70e73.firebaseapp.com",
    databaseURL: "https://vue-calendar-70e73.firebaseio.com",
    projectId: "vue-calendar-70e73",
    storageBucket: "vue-calendar-70e73.appspot.com",
    messagingSenderId: "622685328588",
    appId: "1:622685328588:web:aba6feed614b3932569e69"
});

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
