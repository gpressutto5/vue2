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
            total: 0,
            lista: {
                contasReceber: [],
                contasPagar: []
            }
        };
    },
    beforeMount: function() {
        instance.get('contas/total')
            .then((response) => {
                this.total = response.data.total;
            });
        instance.get('contasP')
            .then((response) => {
                this.lista.contasPagar = response.data;
            });
        instance.get('contasR')
            .then((response) => {
                this.lista.contasReceber = response.data;
            });
    },
    computed: {
        status: function(){
            countP = 0;
            countR = 0;
            var lista = this.lista;
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
            strreturn += !countP ? "nenhuma conta a pagar." : countP + " contas a pagar.";
            return strreturn;
        },
        saldo: function () {
            var saldo = this.total;
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