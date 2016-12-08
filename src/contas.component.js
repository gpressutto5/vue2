window.contasComponent = Vue.extend({
    template: `
<div>
    <nav>
        <div class="nav-wrapper">
            <div class="container">
                <router-link :to="{name: 'lista'}" class="brand-logo">Contas</router-link>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <router-link v-for="link in menus" tag="li" :to="{path: link.path}"  active-class="active">
                        <a>{{ link.nome }}</a>
                    </router-link>
                </ul>
                <ul id="mobile-demo" class="side-nav">
                    <router-link v-for="link in menus" tag="li" :to="{path: link.path}"  active-class="active">
                        <a>{{ link.nome }}</a>
                    </router-link>
                </ul>
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