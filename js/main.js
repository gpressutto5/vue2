window.mainComponent = Vue.extend({
    components: {
        "contas-pagar-component": contasPagarComponent
    },
    template: "<contas-pagar-component></contas-pagar-component>",
    data: function(){
        return {
            contas: [
                {vencimento: '20/12/2016', nome: 'Conta de Luz', valor: 153.47, pago: 1},
                {vencimento: '21/12/2016', nome: 'Conta de Água', valor: 84.32, pago: 0},
                {vencimento: '22/12/2016', nome: 'Conta de Telefone', valor: 174.87, pago: 0},
                {vencimento: '23/12/2016', nome: 'Supermercado', valor: 354.12, pago: 0},
                {vencimento: '24/12/2016', nome: 'Cartão de Crédito', valor: 1874.21, pago: 0},
                {vencimento: '25/12/2016', nome: 'Gasolina', valor: 354.11, pago: 0},
                {vencimento: '26/12/2016', nome: 'Aluguel', valor: 1300, pago: 0}
            ]
        };
    }
});

var router = new VueRouter({
    routes: [
        { path: '/list',        name: 'lista',   component: listaComponent },
        { path: '/form',        name: 'form',    component: formComponent },
        { path: '/form/:index', name: 'update',  component: formComponent },
        { path: '*',            redirect: { name: 'lista' } }
    ]
});

const app = new Vue({
    el: "#app",
    router: router,
    template: "<main-component></main-component>",
    components: {
        'main-component': mainComponent
    }
});