window.formPagarComponent = Vue.extend({
    template: `
<div class="container">
    <div class="row">
        <form  class="col s12" @submit.prevent="cadastrar">
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">event</i>
                    <input id="vencimento" name="vencimento" type="text" class="datepicker">
                    <label for="vencimento">Vencimento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">receipt</i>
                    <input id="nome" name="nome" type="text" v-model="conta.nome">
                    <label for="nome">Nome</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <i class="material-icons prefix">monetization_on</i>
                    <label id="valor" for="valor">Valor</label>
                    <input name="valor" type="number" min="0" step="0.01" v-model="conta.valor">
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
            },
            picker: false
        }
    },
    created(){
        if (this.$route.name == "update") {
            this.getConta(this.$route.params.id);
            this.formType = "update";
        }
    },
    mounted(){
        let $input = $('.datepicker').pickadate({
            monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            today: 'Hoje',
            clear: 'Limpar',
            close: 'Pronto',
            labelMonthNext: 'Próximo mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um mês',
            labelYearSelect: 'Selecione um ano',
            selectMonths: true,
            selectYears: 15,
            format: 'Você selecionou: dddd, dd !de mmmm !de yyyy',
            formatSubmit: 'dd/mm/yyyy',
            hiddenName: true
        });
        this.picker = $input.pickadate('picker');
        $(function() {
            Materialize.updateTextFields();
        });
    },
    updated(){
        $(function() {
            Materialize.updateTextFields();
        });
    },
    methods: {
        cadastrar(){
            this.conta.vencimento = $("input[name=vencimento]").val();
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
                    if (this.picker){
                        this.picker.set('select', this.conta.vencimento, { format: 'dd/mm/yyyy' });
                    }
                });
        }
    }
});