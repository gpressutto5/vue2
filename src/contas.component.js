window.contasComponent = Vue.extend({
    template: `
<div>
    <div class="navbar">
        <nav class="light-blue">
            <div class="nav-wrapper">
                <div class="container">
                    <router-link :to="{name: 'lista'}" class="brand-logo">Contas</router-link>
                    <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <router-link class="waves-effect" v-for="link in menus" tag="li" :to="{path: link.path}"  active-class="active">
                            <a>{{ link.nome }}</a>
                        </router-link>
                    </ul>
                    <ul id="mobile-demo" class="side-nav">
                        <router-link v-for="link in menus" tag="li" :to="{path: link.path}"  active-class="active">
                            <a><i class="material-icons">{{ link.icon }}</i> {{ link.nome }}</a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <router-view></router-view>
    <footer class="page-footer light-blue">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h4 class="white-text">Sobre</h4>
                    <p class="grey-text text-lighten-4">Este site foi feito durante os meus estudos de Vue.js 2 e Axios.</p>
                </div>
                <div class="col l4 offset-l1 s12">
                    <h4 class="white-text">Mais</h4>
                    <h4>
                        <a href="https://github.com/gpressutto5" class="tooltipped waves-effect waves-light white-text" data-tooltip="Github" data-position="top" data-delay="0"><i class="fa fa-fw fa-github"></i></a>
                        <a href="https://fb.com/salamandra5" class="tooltipped waves-effect waves-light white-text" data-tooltip="Facebook" data-position="top" data-delay="0"><i class="fa fa-fw fa-facebook"></i></a>
                    </h4>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                Copyright © 2016 <a class="grey-text text-lighten-4" href="https://github.com/gpressutto5">Guilherme Pressutto</a>
                <a class="grey-text text-lighten-4 right" href="https://github.com/gpressutto5">Veja mais</a>
            </div>
        </div>
    </footer>
</div>
`,
    data(){
        return {
            menus: [
                {nome: "Dashboard",          path: "/dashboard", icon: "dashboard"},
                {nome: "Contas a pagar",     path: "/pagar",     icon: "money_off"},
                {nome: "Contas a receber",   path: "/receber",   icon: "attach_money"}
            ]
        };
    }
});