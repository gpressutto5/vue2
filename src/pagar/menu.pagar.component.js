window.menuPagarComponent = Vue.extend({
    template: `
<nav class="light-blue">
    <ul>
        <router-link v-for="link in menus" tag="li" :to="{name: link.name}" active-class="active">
            <a>{{ link.nome }}</a>
        </router-link>
    </ul>
</nav>
`,
    data(){
        return {
            menus: [
                {id: 0, nome: "Listar contas", name: "lista"},
                {id: 1, nome: "Criar conta",   name: "form"}
            ]
        };
    }
});