window.contasReceberComponent = Vue.extend({
    components: {
        'menu-component': menuReceberComponent,
        'topo-component': topoComponent
    },
    template: `
<div>
    <topo-component></topo-component>
    <router-view></router-view>
</div>
    `,
    data() {
        return {
            titulo: "Contas a receber",
            status: ""
        };
    }
});