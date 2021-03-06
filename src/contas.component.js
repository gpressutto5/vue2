window.contasComponent = Vue.extend({
    template: `
<div>
    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="navbar-brand">
                        Contas
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <router-link v-for="link in menus" tag="li" :to="{path: link.path}" active-class="active">
                            <a>{{ link.nome }}</a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</div>
`,
    data(){
        return {
            menus: [
                {nome: "Dashboard",          path: "/dashboard"},
                {nome: "Contas a pagar",     path: "/pagar"},
                {nome: "Contas a receber",   path: "/receber"}
            ]
        };
    }
});