window.contasPagarComponent = Vue.extend({
    components: {
        'menu-component': menuPagarComponent,
        'topo-component': topoComponent
    },
    template: `
<div>
    <topo-component></topo-component>
    <router-view></router-view>
</div>
    `
});