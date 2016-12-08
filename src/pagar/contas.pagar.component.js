window.contasPagarComponent = Vue.extend({
    components: {
        'menu-component': menuPagarComponent
    },
    template: `
<div>
    <div id="card-stats" class="container" v-cloak>
        <div class="row">
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-content  green white-text">
                        <p class="card-stats-title"><i class="fa fa-university"></i> Contas a pagar</p>
                        <h4 class="card-stats-number">{{ count }}</h4>
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
                        <h4 class="card-stats-number">3</h4>
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
            <!--<div class="row">
                <div class="center-align pink-text text-darken-1">
                    <h1>{{ titulo }}</h1>
                </div>
                <menu-component></menu-component>
            </div>-->
        </div>
    </div>
    <router-view></router-view>
</div>
    `,
    data() {
        return {
            titulo: "Contas a pagar",
            count: ""
        };
    },
    methods: {
        calcularStatus(contas) {
            if (!contas.length) {
                status = "Nenhuma conta a pagar.";
            }
            let count = 0;
            for (let i in contas) {
                if (!contas[i].pago) {
                    count++;
                }
            }
            this.count = count;
        },
        updateStatus() {
            instance.get('contasP')
                .then((response) => {
                    this.calcularStatus(response.data);
                });
        }
    }
});