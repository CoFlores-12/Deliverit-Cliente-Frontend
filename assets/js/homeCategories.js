var elements = [
    {
        name:'Restaurants',
        color:'#ff9e00',
        icon:'/assets/img/iconos/comida-rapida.png'
    },
    {
        name:'Supermarket',
        color:'#691b9a',
        icon:'/assets/img/iconos/tienda.png'
    },
    {
        name:'Drinks',
        color:'#1b9a8f',
        icon:'/assets/img/iconos/coctel.png'
    },
    {
        name:'Health',
        color:'#558b2f',
        icon:'/assets/img/iconos/salud.png'
    },
    {
        name:'Tech',
        color:'#c50b0b',
        icon:'/assets/img/iconos/gadgets.png'
    }
];

const category = new URLSearchParams(document.URL).get('category');
document.title = 'Deliverit | ' + category;

$('#categoryNameNav').html(elements[category]['name']);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//data from API
const dataShop = [
    {
        name: 'Buger King',
        description: 'Bugers only :)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Burger_King_logo_%281999%29.svg',
        banner: 'https://wallsbazar.com/wp-content/uploads/2022/08/Burger-Wallpaper.jpg',
    },
    {
        name: 'Pizza X',
        description: 'Pizzas only :)',
        logo: 'https://image.similarpng.com/very-thumbnail/2020/05/Pizza-logo-design-template-Vector-PNG.png',
        banner: 'https://c4.wallpaperflare.com/wallpaper/578/614/334/pizza-wallpaper-preview.jpg',
    },
    {
        name: 'KFC',
        description: 'KFC only :)',
        logo: 'https://i.pinimg.com/originals/ee/fd/cf/eefdcf8f23c277bfac155152c6ab3a20.jpg',
        banner: 'https://cdn.vox-cdn.com/thumbor/muDadA_TB9nYccztk8OUYx_g6Ds=/0x0:3334x1875/1320x743/filters:focal(1401x672:1933x1204):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/71028467/US_Fried_Chicken_Chain_Bracket_Lead.0.png',
    },
    {
        name: 'Pizza Hut',
        description: 'Pizzas only :)',
        logo: 'https://i.pinimg.com/originals/63/37/8e/63378ef1f8d6fae6ec06a4fa63888552.png',
        banner: 'https://www.duna.cl/media/2021/10/pizza.jpeg',
    },
    {
        name: 'Wendys',
        description: 'wendys only :)',
        logo: 'https://www.companyfolders.com/blog/media/2015/01/wendys-300x300.jpg',
        banner: 'https://www.domicilio.co/wp-content/uploads/2021/07/hamburguesa-wendys-honduras-1024x532.png',
    },
    {
        name: 'Dominos',
        description: 'Dominos only :)',
        logo: 'https://fastly.4sqi.net/img/general/width960/87388367_vVdutIA_SS9jLMKIhvFYUnWs51rJYdvXhGoecGS-7RE.jpg',
        banner: 'https://cdn.forbes.co/2021/04/dominos_pizza_cyber_monday.jpg',
    },
    {
        name: 'Dunkin Donuts',
        description: 'Dunkin only :)',
        logo: 'https://checkyourdecaf.org/images/dunkin_donuts.png',
        banner: 'http://www.worldcomplianceassociation.com//componentes/editor/ckfinder/userfiles/files/Dunkin.jpg',
    },
    {
        name: 'McDonalds',
        description: 'McDonalds only :)',
        logo: 'https://javiereldegilmarquez.files.wordpress.com/2012/06/mcdonald-y-el-sr-pc3a9rez.jpg',
        banner: 'https://previews.123rf.com/images/rouslan/rouslan1902/rouslan190200016/131040531-moscú-rusia-12-de-febrero-de-2019-menú-de-hamburguesas-big-mac-en-mcdonald.jpg?fj=1',
    }
];

(async () => {
    await sleep(2000);
    $('#main').html('');
    dataShop.forEach(shop => {
        const banner = (shop['banner'] == '') ? '/assets/img/banners/food.webp' : shop['banner'];
        const logo = (shop['logo'] == '') ? '/assets//img/iconos/comida-rapida.png' : shop['logo'];
        let elementShop= '<div onclick="goToStore(this)" class="animate__animated animate__bounceIn element touchable">'+
                '<img class="bannerShop" src="'+banner+'" width="100%" loading="lazy">'+
                '<div class="dataShop row center-y">'+
                    '<img class="logoShop" src="'+logo+'" loading="lazy">'+
                    '<div class="shopinfo col">'+
                        '<strong>'+shop['name']+'</strong><br>'+
                        '<span class="desc">'+shop['description']+'</span>'+
                    '</div>'+
                '</div>'+
            '</div>';
        $('#main').append(elementShop);
    });
})
();

function goToStore(store) {
    window.location.href = 'store.html'
}