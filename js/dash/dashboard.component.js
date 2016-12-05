window.dashboardComponent = Vue.extend({
    components: {
        'menu-component': menuReceberComponent
    },
    template: `
<div>
    <div class="container" v-cloak>
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>{{ titulo }}</h1>
                <h3>{{ status }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <hr>
                <h1>{{ saldo }}</h1>
            </div>
        </div>
    </div>
</div>
    `,
    data: function() {
        return {
            titulo: "Dashboard",
            conta: {
                vencimento: '',
                nome: '',
                valor: 0,
                pago: 0
            },
        };
    },
    computed: {
        status: function(){
            var countP = 0;
            var countR = 0;
            var lista = this.$root.$children[0];
            for(var i in lista.contasReceber){
                if (!lista.contasReceber[i].pago) {
                    countR++;
                }
            }
            for(var i in lista.contasPagar){
                if (!lista.contasPagar[i].pago) {
                    countP++;
                }
            }
            var strreturn = !countR ? "Nenhuma conta a receber e " : "Existem " + countR + " contas a receber e ";
            strreturn += !countR ? "nenhuma conta a pagar." : countP + " contas a pagar.";
            return strreturn;
        },
        saldo: function () {
            var saldo = 0;
            var lista = this.$root.$children[0];
            for(var i in lista.contasReceber){
                if (!lista.contasReceber[i].pago) {
                    saldo += lista.contasReceber[i].valor;
                }
            }
            for(var i in lista.contasPagar){
                if (!lista.contasPagar[i].pago) {
                    saldo -= lista.contasPagar[i].valor;
                }
            }
            if (saldo > 0){
                return "Você está no lucro! Vai receber R$ " + saldo.toFixed(2) +"!";
            }else if (saldo < 0){
                return "Cuidado! Você está em débito de R$ " + saldo.toFixed(2) +"!";
            }else{
                return "Tudo certo. Seus gastos estão em harmonia com seus ganhos.";
            }
        }
    }
});