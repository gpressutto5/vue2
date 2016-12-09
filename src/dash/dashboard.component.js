window.dashboardComponent = Vue.extend({
    components: {
        'menu-component': menuReceberComponent,
        'topo-component': topoComponent
    },
    template: `
<div>
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
                        <h3>{{ total < 0 ? '-':'' }} {{ total | numero }}</h4>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <topo-component></topo-component>
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