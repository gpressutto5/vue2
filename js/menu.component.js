window.menuComponent = Vue.extend({
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
                {id: 0, nome: "Listar contas", name: "lista"},
                {id: 1, nome: "Criar conta",   name: "form"}
            ]
        };
    },
    methods: {
        showView: function(opcao){
            /*this.$parent.activatedView = opcao;
            if (this.$parent.formType == 'update'){
                this.$parent.conta = {
                    vencimento: '',
                    nome: '',
                    valor: 0,
                    pago: 0
                };
            }*/
            //this.$dispatch('change-activatedview', opcao);
            if (opcao == 1) {
                // this.$parent.formType = 'insert';
                //this.$dispatch('change-formtype', 'insert');
            }
        }
    }
});