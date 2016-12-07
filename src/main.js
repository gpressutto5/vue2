let instance = axios.create({
    baseURL: 'http://127.0.0.1/api/',
    timeout: 1000
});

let router = new VueRouter({
    routes: [
        { path: '/pagar',   component: contasPagarComponent,
            children: [
                { path: 'list',        name: 'lista',   component: listaPagarComponent },
                { path: 'form',        name: 'form',    component: formPagarComponent },
                { path: 'form/:id', name: 'update',  component: formPagarComponent },
                { path: '/',            redirect: { name: 'lista' } }
            ]
        },
        { path: '/receber',   component: contasReceberComponent,
            children: [
                { path: 'list',        name: 'listaR',   component: listaReceberComponent },
                { path: 'form',        name: 'formR',    component: formReceberComponent },
                { path: 'form/:id', name: 'updateR',  component: formReceberComponent },
                { path: '/',            redirect: { name: 'listaR' } }
            ]
        },
        { path: '/dashboard',     name: 'dashboard', component: dashboardComponent, },
        { path: '*',            redirect: { name: 'lista' } }
    ]
});

const app = new Vue({
    el: "#app",
    router: router,
    template: "<contas-component></contas-component>",
    components: {
        'contas-component': contasComponent
    }
});