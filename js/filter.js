Vue.filter('status', function(value){
    if (value) {
        return 'Pago';
    }
    return 'Não pago';
});