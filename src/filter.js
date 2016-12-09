Vue.filter('status', (value) => value?'Pago':'Não pago');

Vue.filter('numero', (value) => {
    let number = 0;
    if (value && typeof value !== undefined){
        number = value.toString().match(/\d+([.,]{1}\d{1,2}){0,1}/g)[0] || 0;
    }
    return new Number(number).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
    });
});