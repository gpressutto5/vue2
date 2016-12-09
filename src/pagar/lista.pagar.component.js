window.listaPagarComponent = Vue.extend({
    template: `
<div>
    <div class="container" v-cloak>
        <div class="row">
            <h3 v-show="!contas.length" class="text-info text-center">Não há contas</h3>
            <table class="highlight z-depth-5 responsive-table" v-show="contas.length">
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
                        <td>{{ conta.valor | numero }}</td>
                        <td><span class="text-darken-1" :class="{ 'green-text': conta.pago, 'red-text': !conta.pago }">{{ conta.pago | status }}</span></td>
                        <td>
                            <ul :id="'dropdown'+index" class="dropdown-content">
                                <li><router-link :to="{name: 'update', params: {id: conta.id}}" class="pink-text"><i class="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Editar</router-link></li>
                                <li><a href="#" @click.prevent="pagarConta(conta)" class="pink-text"><i class="fa fa-fw fa-money" aria-hidden="true"></i> {{ conta.pago ? 'Não foi pago':'Pagar' }}</a></li>
                                <li><a href="#" @click.prevent="removerConta(index, conta)" class="pink-text"><i class="fa fa-fw fa-trash" aria-hidden="true"></i> Remover</a></li>
                            </ul>
                            <a class="dropdown-button btn pink waves-effect waves-light" :data-activates="'dropdown'+index">Ações</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    `,
    data(){
        return {
            contas: []
        };
    },
    beforeMount() {
        instance.get('contasP')
            .then((response) => {
                this.contas = response.data;
                this.$parent.$children[0].updateStatus();
            }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            Materialize.toast('Falha ao carregar os dados, tente novamente mais tarde.', 4000);
        });
    },
    updated() {
        $(".dropdown-button").dropdown({
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'right' // Displays dropdown with edge aligned to the left of button
        });
    },
    methods: {
        pagarConta(conta) {
            instance.put('pagar/' + conta.id).then((response) => {
                conta.pago = !conta.pago;
                this.$parent.$children[0].updateStatus();
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
                Materialize.toast('Falha ao pagar a conta, tente novamente mais tarde.', 4000);
            });
        },
        removerConta(index, conta) {
            if (confirm("Tem certeza que deseja apagar " + conta.nome + "?")) {
                instance.delete('contasP/' + conta.id).then((response) => {
                    this.contas.splice(index, 1);
                    this.$parent.$children[0].updateStatus();
                    Materialize.toast('Conta excluída com sucesso!', 4000);
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    Materialize.toast('Falha ao excluir a conta, tente novamente mais tarde.', 4000);
                });
            }
        }
    }
});