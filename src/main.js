import { createApp } from 'vue';

import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import User from './components/User.vue';


const router = createRouter({
    history: createWebHistory(),
    
    routes: [
        {path: "/", name: 'home', component: Home},

        // 2
        // most of the time we don't need to run and check some logic in every routes we need to run them only in certon router like if we are doing some authentcation stuff we want user to visit some open routes if he is un authenticated and allow them to visit some route only if he is authenticated so for that we have to define guards in per route level    
        {path: '/user', name:'user', component: User, 
            beforeEnter(to, from, next){
                console.log("beforeEnter", to, from);
                next()
            }
        },
        // so hear we also have other kind of guard which will only execute per route level which is beforeEnter as name suggest it will be execute before we enter route where we define it
        // it also get 3 args to, from and next which is the same like beforeEach
        // as you can see in console beforeEnter will only execute in user because we define it only in user route


        // hear we are simulating api call with setTimeOut and when this promise resolve then we will be able to do to from page or we can also reject navigating by passing next(false) 
        {path: '/async-req-route', name: "async", component: User,
            beforeEnter(to, from, next){
                setTimeout(async () => await next(),5000)
            }
        }
        // keep in mind we can do this but we should not do it in every route only few routs because user have to wait for navigation until promise resolve or reject even in spa so do it only when we really need it 

    ]
})

const app = createApp(App)

// 1
// before we provide our routing configration to vue use we can create guards hear
router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from);
    next();
    // next(false);
    // next('/home')
    // next({name: "home"})
})
// hear we have one guard avalable by vue router which is beforeEach
// as name suggest this guard will call befoe each and every router navigation in our app
// beforeEach will need one function as argument where it will pass 3 arguments to us 1) to 2) from 3) next
// hear to will be object which contains details of route where we want to go
// from will be object which contains details of router from where we are comming
// next will be the function which use to determine what to do next 
// now it's our responsiblaty to call next to continue of reject routing if we don't call next vue-router will call it and continue routing 

// you can also pass false in next to cancle navigation and let user stay in current route. we can pass true in next to continue routing which will be same like next() because there default arg value is true

// we can also pass a '' or location object like {name: home} in next to navigate user to some other route and also note that to and from will also have params and query object like we have in $route to use hear


// 5
// we also have one other guard which is afterEach which will execute after a navigation done. unlike other methods we don't have next method hear because hear our navigation fineshed and we can't stop or continue navigatone because it's already done. this guard will call in very end and it will have least prority then other guards. this guard can be use to send analytics data to backend that how much time user go to perticular route and things like that
router.afterEach((to, from) => {
    console.log('afterEach', to, from);
}) 

app.use(router)

app.mount('#app');
