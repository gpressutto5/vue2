window.contasPagarComponent = Vue.extend({
    components: {
        'menu-component': menuPagarComponent
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
                <menu-component></menu-component>
                <br/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
    `,
    data() {
        return {
            titulo: "Contas a pagar",
            status: ""
        };
    },
    methods: {
        calcularStatus(contas) {
            if (!contas.length){
                status = "Nenhuma conta a pagar.";
            }
            let count = 0;
            for(let i in contas){
                if (!contas[i].pago) {
                    count++;
                }
            }
            this.status = !count ? "Nenhuma conta a pagar." : "Existem " + count + " contas a pagar.";
        },
        updateStatus() {
            instance.get('contasP')
                .then((response) => {
                    this.calcularStatus(response.data);
                });
        }
    }
});