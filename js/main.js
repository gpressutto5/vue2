window.mainComponent = Vue.extend({
    components: {
        "contas-component": contasComponent
    },
    template: "<contas-component></contas-component>",
    data: function(){
        return {
            contasPagar: [
                {vencimento: '20/12/2016', nome: 'Conta de Luz', valor: 153.47, pago: 1},
                {vencimento: '21/12/2016', nome: 'Conta de Água', valor: 84.32, pago: 0},
                {vencimento: '22/12/2016', nome: 'Conta de Telefone', valor: 174.87, pago: 0},
                {vencimento: '23/12/2016', nome: 'Supermercado', valor: 354.12, pago: 0},
                {vencimento: '24/12/2016', nome: 'Cartão de Crédito', valor: 1874.21, pago: 0},
                {vencimento: '25/12/2016', nome: 'Gasolina', valor: 354.11, pago: 0},
                {vencimento: '26/12/2016', nome: 'Aluguel', valor: 1300, pago: 0}
            ],
            contasReceber: [
                {vencimento: '20/12/2016', nome: 'Salário', valor: 7265.47, pago: 0},
                {vencimento: '21/12/2016', nome: 'Aluguel', valor: 800.00, pago: 1},
                {vencimento: '22/12/2016', nome: 'Venda', valor: 174.87, pago: 0}
            ]
        };
    }
});

var router = new VueRouter({
    routes: [
        { path: '/pagar',       name: 'pagar',   component: contasPagarComponent,
            children: [
                { path: 'list',        name: 'lista',   component: listaPagarComponent },
                { path: 'form',        name: 'form',    component: formPagarComponent },
                { path: 'form/:index', name: 'update',  component: formPagarComponent },
                { path: '/',            redirect: { name: 'lista' } }
            ]
        },
        { path: '/receber',       name: 'receber',   component: contasReceberComponent,
            children: [
                { path: 'list',        name: 'listaR',   component: listaReceberComponent },
                { path: 'form',        name: 'formR',    component: formReceberComponent },
                { path: 'form/:index', name: 'updateR',  component: formReceberComponent },
                { path: '/',            redirect: { name: 'listaR' } }
            ]
        },
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