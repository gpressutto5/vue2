window.formPagarComponent = Vue.extend({
    template: `
<div class="container">
    <div class="row">
        <form  class="col s12" @submit.prevent="cadastrar">
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">event</i>
                    <input name="vencimento" type="text" class="form-control" v-model="conta.vencimento">
                    <label for="nome">Vencimento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">receipt</i>
                    <input name="nome" type="text" class="form-control" v-model="conta.nome">
                    <label for="nome">Nome</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">monetization_on</i>
                    <label for="valor">Valor</label>
                    <input name="valor" type="number" min="0" step="0.01" class="form-control" v-model="conta.valor">
                </div>
            </div>
            <div class="col-md-5 col-md-offset-2">
                <div class="row">
                    <button class="btn btn-primary form-control" type="submit">Cadastrar</button>
                </div>
            </div>
        </form>
    </div>
</div>
`,
    data() {
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
    created(){
        if (this.$route.name == "update") {
            this.getConta(this.$route.params.id);
            this.formType = "update";
        }
    },
    updated(){
        Materialize.updateTextFields();
    },
    methods: {
        cadastrar(){
            if (this.formType == "insert"){
                instance.post('contasP', this.conta).then((response) => {
                    this.$router.push({name: "lista"});
                });
            } else {
                instance.put('contasP/'+this.conta.id, this.conta).then((response) => {
                    this.$router.push({name: "lista"});
                });
            }
        },
        getConta(id) {
            instance.get('contasP/'+id)
                .then((response) => {
                    this.conta = response.data;
                });
        }
    }
});