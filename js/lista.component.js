window.listaComponent = Vue.extend({
    template: `
<div>
    <h3 v-show="!contas.length" class="text-info text-center">Não há contas</h3>
    <table class="table table-hover" v-show="contas.length">
        <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(conta,index) in contas">
                <td>{{ index + 1 }}</td>
                <td>{{ conta.vencimento }}</td>
                <td>{{ conta.nome }}</td>
                <td>{{ 'R$ ' + conta.valor.toFixed(2) }}</td>
                <td><span class="label" :class="{ 'label-success': conta.pago, 'label-danger': !conta.pago }">{{ conta.pago | status }}</span></td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Ações
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a href="#" @click.prevent="carregarConta(conta)"><i class="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Editar</a></li>
                            <li><a href="#" @click.prevent="pagarConta(conta)"><i class="fa fa-fw fa-money" aria-hidden="true"></i> {{ conta.pago ? 'Não foi pago':'Pagar' }}</a></li>
                            <li><a href="#" @click.prevent="removerConta(index,conta)"><i class="fa fa-fw fa-trash" aria-hidden="true"></i> Remover</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    `,
    data: function(){
        return{
            contas: [
                {vencimento: '20/12/2016', nome: 'Conta de Luz', valor: 153.47, pago: 1},
                {vencimento: '21/12/2016', nome: 'Conta de Água', valor: 84.32, pago: 0},
                {vencimento: '22/12/2016', nome: 'Conta de Telefone', valor: 174.87, pago: 0},
                {vencimento: '23/12/2016', nome: 'Supermercado', valor: 354.12, pago: 0},
                {vencimento: '24/12/2016', nome: 'Cartão de Crédito', valor: 1874.21, pago: 0},
                {vencimento: '25/12/2016', nome: 'Gasolina', valor: 354.11, pago: 0},
                {vencimento: '26/12/2016', nome: 'Aluguel', valor: 1300, pago: 0}
            ]
        };
    },
    methods: {
        carregarConta: function(conta){
            this.$dispatch('change-conta', conta);
            this.$dispatch('change-activatedview', 1);
            this.$dispatch('change-formtype', 'update');
        },
        pagarConta: function(conta){
            conta.pago = !conta.pago;
        },
        removerConta: function(conta){
            if (confirm("Tem certeza que deseja apagar " + conta.nome + "?")) {
                this.contas.$remove(conta);
            }
        }
    },
    events: {
        'nova-conta': function (conta) {
            this.contas.push(conta);
        }
    }
});