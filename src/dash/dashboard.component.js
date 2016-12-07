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
    data() {
        return {
            titulo: "Dashboard",
            total: 0,
            lista: {
                contasReceber: [],
                contasPagar: []
            }
        };
    },
    beforeMount() {
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
        status(){
            let countP = 0;
            let countR = 0;
            let lista = this.lista;
            for(let i in lista.contasReceber){
                if (!lista.contasReceber[i].pago) {
                    countR++;
                }
            }
            for(let i in lista.contasPagar){
                if (!lista.contasPagar[i].pago) {
                    countP++;
                }
            }
            let strreturn = !countR ? "Nenhuma conta a receber e " : "Existem " + countR + " contas a receber e ";
            strreturn += !countP ? "nenhuma conta a pagar." : countP + " contas a pagar.";
            return strreturn;
        },
        saldo() {
            let saldo = this.total;
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