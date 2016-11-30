const Foo = { template: "<div>Foo</div>" };
const Bar = { template: "<div>Bar</div>" };

var router = new VueRouter({
    routes: [
        { path: '/contas',      component: listaComponent },
        { path: '/conta/criar', component: formComponent },
        { path: '*',         component: listaComponent }
    ]
});

const app = new Vue({
    el: "#app",
    router: router,
    components: {
        'app-component': appComponent
    }
});