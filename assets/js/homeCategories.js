let dataShop = [];

(async () => {
    const IDcategory = new URLSearchParams(document.URL).get('category');

    let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deliverit-backend.vercel.app/stores/" + IDcategory,
            "method": "GET"}
    await $.ajax(settings).done(function (response) {
        dataShop = response
    });

    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deliverit-backend.vercel.app/categories/" + IDcategory,
        "method": "GET"}
    await $.ajax(settings).done(function (response) {
        $('#categoryNameNav').html(response[0].name);
    });
        

    $('#main').html('');
    dataShop.forEach((shop, index) => {
        const banner = (shop['banner'] == '') ? '/assets/img/banners/food.webp' : shop['banner'];
        const logo = (shop['logo'] == '') ? '/assets//img/iconos/comida-rapida.png' : shop['logo'];
        let elementShop= '<div onclick="goToStore(this)" data-idStore="'+shop._id+'" class="animate__animated animate__bounceIn element touchable">'+
                '<img class="bannerShop" src="'+banner+'" width="100%" loading="lazy">'+
                '<div class="dataShop row center-y">'+
                    '<img class="logoShop" src="'+logo+'" loading="lazy">'+
                    '<div class="shopinfo col">'+
                        '<strong>'+shop['name']+'</strong><br>'+
                    '</div>'+
                '</div>'+
            '</div>';
        $('#main').append(elementShop);
    });
})
();

function goToStore(store) {
    window.location.href = 'store.html?app=deliverit&store='+$(store).attr('data-idStore')
}