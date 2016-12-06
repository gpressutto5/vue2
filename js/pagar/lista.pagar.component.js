window.listaPagarComponent = Vue.extend({
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
                            <li><router-link :to="{name: 'update', params: {index: index}}"><i class="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Editar</router-link></li>
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
        return {
            contas: []
        };
    },
    beforeMount: function() {
        axios.get('http://127.0.0.1/api/bills')
            .then((response) => {
                 this.contas = response.data;
            });
    },
    methods: {
        pagarConta: function (conta) {
            conta.pago = !conta.pago;
        },
        removerConta: function (index, conta) {
            if (confirm("Tem certeza que deseja apagar " + conta.nome + "?")) {
                this.contas.splice(index, 1);
            }
        }
    }
});