window.dashboardComponent = Vue.extend({
    components: {
        'menu-component': menuReceberComponent
    },
    template: `
<div id="card-stats" class="container" v-cloak>
    <div class="row">
        <div class="col s12 m12 l6">
            <div class="card">
                <div class="card-content  indigo white-text">
                    <h5>Total de Contas:</h5>
                    <h3>{{ contasPagar + contasReceber }}</h4>
                    </p>
                </div>
            </div>
        </div>
        <div class="col s12 m12 l6">
            <div class="card">
                <div class="card-content red white-text">
                    <h5>Saldo Total</h5>
                    <h3>{{ total | numero }}</h4>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content  green white-text">
                    <p class="card-stats-title"><i class="fa fa-university"></i> Contas a pagar</p>
                    <h4 class="card-stats-number">{{ contasPagar }}</h4>
                    </p>
                </div>
                <div class="card-action  green darken-2">
                    <a href="#">Adicionar Conta</a>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content pink lighten-1 white-text">
                    <p class="card-stats-title"><i class="fa fa-credit-card"></i> Total a pagar</p>
                    <h4 class="card-stats-number">R$ 124,54</h4>
                    </p>
                </div>
                <div class="card-action  pink darken-2">
                    <a href="#">Ver Lista</a>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content blue-grey white-text">
                    <p class="card-stats-title"><i class="fa fa-money"></i> Contas a receber</p>
                    <h4 class="card-stats-number">{{ contasReceber }}</h4>
                    </p>
                </div>
                <div class="card-action blue-grey darken-2">
                    <a href="#">Adicionar Conta</a>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content purple white-text">
                    <p class="card-stats-title"><i class="fa fa-gavel"></i> Total a receber</p>
                    <h4 class="card-stats-number">R$ 990,63</h4>
                    </p>
                </div>
                <div class="card-action purple darken-2">
                    <a href="#">Ver Lista</a>
                </div>
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
            },
            contasPagar: 0,
            contasReceber: 0
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
    updated(){
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
        this.contasPagar = countP;
        this.contasReceber = countR;
    }
});