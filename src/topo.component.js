window.topoComponent = Vue.extend({
    template: `
<div id="card-stats" class="container" :class="this.$route.name == 'dashboard'?'':'hide-on-small-only'" v-cloak>
    <div class="row">
        <div class="col s12 m6 l3">
            <div class="card z-depth-5">
                <div class="card-content  green white-text">
                    <p class="card-stats-title"><i class="fa fa-university"></i> Contas a pagar</p>
                    <h4 class="card-stats-number">{{ count.pagar }}</h4>
                    </p>
                </div>
                <router-link :to="{name: 'form'}">
                    <div class="waves-effect waves-block card-action  green darken-2">
                        <a>Adicionar Conta</a>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card z-depth-5">
                <div class="card-content pink lighten-1 white-text">
                    <p class="card-stats-title"><i class="fa fa-credit-card"></i> Total a pagar</p>
                    <h4 class="card-stats-number">{{ total.pagar | numero }}</h4>
                    </p>
                </div>
                <router-link :to="{name: 'lista'}">
                    <div class="waves-effect waves-block card-action  pink darken-2">
                        <a>Ver Lista</a>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card z-depth-5">
                <div class="card-content blue-grey white-text">
                    <p class="card-stats-title"><i class="fa fa-money"></i> Contas a receber</p>
                    <h4 class="card-stats-number">{{ count.receber }}</h4>
                    </p>
                </div>
                <router-link :to="{name: 'formR'}">
                    <div class="waves-effect waves-block card-action blue-grey darken-2">
                        <a>Adicionar Conta</a>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card z-depth-5">
                <div class="card-content purple white-text">
                    <p class="card-stats-title"><i class="fa fa-gavel"></i> Total a receber</p>
                    <h4 class="card-stats-number">{{ total.receber | numero }}</h4>
                    </p>
                </div>
                <router-link :to="{name: 'listaR'}">
                    <div class="waves-effect waves-block card-action purple darken-2">
                        <a>Ver Lista</a>
                    </div>
                </router-link>
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
            axios.all([
                instance.get('contasP'),
                instance.get('contasR'),
                instance.get('contasP/total'),
                instance.get('contasR/total')
            ]).then(axios.spread((calcp, calcr, totalp, totalr) => {
                this.calcularStatus(calcp.data, 'p');
                this.calcularStatus(calcr.data, 'r');
                this.total.pagar = totalp.data.total;
                this.total.receber = totalr.data.total;
            })).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
                Materialize.toast('Falha ao carregar os dados, tente novamente mais tarde.', 4000);
            });
        },
        methods: {

        }
    }

});