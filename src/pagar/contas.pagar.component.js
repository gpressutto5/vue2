window.contasPagarComponent = Vue.extend({
    components: {
        'menu-component': menuPagarComponent
    },
    template: `
<div>
    <div class="container" v-cloak>
        <div class="row">
            <div class="center-align teal-text text-darken-4">
                <h1>{{ titulo }}</h1>
                <h3>{{ status }}</h3>
            </div>
            <menu-component></menu-component>
        </div>
    </div>
    <router-view></router-view>
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
            if (!contas.length) {
                status = "Nenhuma conta a pagar.";
            }
            let count = 0;
            for (let i in contas) {
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