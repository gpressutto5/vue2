window.topoComponent = Vue.extend({
    template: `
<div id="card-stats" class="container" v-cloak>
    <div class="row">
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content  green white-text">
                    <p class="card-stats-title"><i class="fa fa-university"></i> Contas a pagar</p>
                    <h4 class="card-stats-number">{{ count.pagar }}</h4>
                    </p>
                </div>
                <div class="card-action  green darken-2">
                    <router-link :to="{name: 'form'}">Adicionar Conta</router-link>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content pink lighten-1 white-text">
                    <p class="card-stats-title"><i class="fa fa-credit-card"></i> Total a pagar</p>
                    <h4 class="card-stats-number">{{ total.pagar | numero }}</h4>
                    </p>
                </div>
                <div class="card-action  pink darken-2">
                    <router-link :to="{name: 'lista'}">Ver Lista</router-link>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content blue-grey white-text">
                    <p class="card-stats-title"><i class="fa fa-money"></i> Contas a receber</p>
                    <h4 class="card-stats-number">{{ count.receber }}</h4>
                    </p>
                </div>
                <div class="card-action blue-grey darken-2">
                    <router-link :to="{name: 'formR'}">Adicionar Conta</router-link>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content purple white-text">
                    <p class="card-stats-title"><i class="fa fa-gavel"></i> Total a receber</p>
                    <h4 class="card-stats-number">{{ total.receber | numero }}</h4>
                    </p>
                </div>
                <div class="card-action purple darken-2">
                    <router-link :to="{name: 'listaR'}">Ver Lista</router-link>
                </div>
            </div>
        </div>
        <!--<div class="row">
            <div class="center-align pink-text text-darken-1">
                <h1>{{ titulo }}</h1>
            </div>
            <menu-component></menu-component>
        </div>-->
    </div>
</div>
`,
    data() {
        return {
            titulo: "Contas a pagar",
            count: {
                pagar: 0,
                receber: 0
            },
            total: {
                pagar: 0,
                receber: 0
            }
        };
    },
    created() {
        this.updateStatus();
    },
    methods: {
        calcularStatus(contas, tipo) {
            if (!contas.length) {
                status = "Nenhuma conta a pagar.";
            }
            let count = 0;
            for (let i in contas) {
                if (!contas[i].pago) {
                    count++;
                }
            }
            if (tipo == 'p'){
                this.count.pagar = count;
            }else if(tipo == 'r'){
                this.count.receber = count;
            }
        },
        updateStatus() {
            instance.get('contasP')
                .then((response) => {
                    this.calcularStatus(response.data, 'p');
                });
            instance.get('contasR')
                .then((response) => {
                    this.calcularStatus(response.data, 'r');
                });
            instance.get('contasP/total')
                .then((response) => {
                    this.total.pagar = response.data.total;
                });
            instance.get('contasR/total')
                .then((response) => {
                    this.total.receber = response.data.total;
                });
        }
    }

});