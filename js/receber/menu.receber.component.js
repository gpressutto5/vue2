window.menuReceberComponent = Vue.extend({
    template: `
<ul class="nav nav-tabs">
    <router-link v-for="link in menus" tag="li" :to="{name: link.name}" active-class="active">
        <a>{{ link.nome }}</a>
    </router-link>
</ul>
`,
    data: function(){
        return {
            menus: [
                {id: 0, nome: "Listar contas", name: "listaR"},
                {id: 1, nome: "Criar conta",   name: "formR"}
            ]
        };
    }
});