window.contasPagarComponent = Vue.extend({
    components: {
        'menu-component': menuComponent
    },
    template: `
<div>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="navbar-brand">
                        Contas
                    </div>
                </div>
            </div>
        </div>
    </nav>
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
    data: function() {
        return {
            titulo: "Contas a pagar",
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
            var count = 0;
            var lista = this.$root.$children[0];
            for(var i in lista.contas){
                if (!lista.contas[i].pago) {
                    count++;
                }
            }
            return !count ? "Nenhuma conta a pagar." : "Existem " + count + " contas a pagar.";
        }
    }
});