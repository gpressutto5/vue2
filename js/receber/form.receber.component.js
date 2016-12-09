window.formReceberComponent = Vue.extend({
    template: `
<form  class="form-horizontal" @submit.prevent="cadastrar">
    <div class="form-group">
        <label for="nome" class="col-md-2 control-label">Vencimento</label>
        <div class="col-md-5">
            <input name="vencimento" type="text" class="form-control" v-model="conta.vencimento">
        </div>
    </div>
    <div class="form-group">
        <label for="nome" class="col-md-2 control-label">Nome</label>
        <div class="col-md-5">
            <input name="nome" type="text" class="form-control" v-model="conta.nome">
        </div>
    </div>
    <div class="form-group">
        <label for="valor" class="col-md-2 control-label">Valor</label>
        <div class="col-md-5">
            <div class="input-group">
                <span class="input-group-addon">R$</span>
                <input name="valor" type="number" min="0" step="0.01" class="form-control" v-model="conta.valor">
            </div>
        </div>
    </div>
    <div class="col-md-5 col-md-offset-2">
        <div class="form-group">
            <button class="btn btn-primary form-control" type="submit">Cadastrar</button>
        </div>
    </div>
</form>
`,
    data: function () {
        return {
            formType: "insert",
            conta: {
                vencimento: '',
                nome: '',
                valor: 0,
                pago: 0
            }
        }
    },
    created: function(){
        if (this.$route.name == "updateR") {
            this.getConta(this.$route.params.index);
            this.formType = "update";
        }
    },
    methods: {
        cadastrar: function(){
            if (this.formType == "insert")
                this.$root.$children[0].contasReceber.push(this.conta);
            this.$router.push({name: "listaR"});
        },
        getConta: function (index) {
            this.conta = this.$root.$children[0].contasReceber[index];
        }
    }
});