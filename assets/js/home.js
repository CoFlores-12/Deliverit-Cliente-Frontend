//install SW
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}

//datos desde API
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

(function () {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/categories",
        "method": "GET",
        "headers": {}
      };
      
    $.ajax(settings)
        .done(async function (response) {
            $('#categorias').html('');
            response.forEach((element) => {
                $('#categorias').append('<div onClick="goTo(this);" data-CatID="'+element._id+'" style="background-color: '+element['color']+';"'+' class="animate__animated animate__bounceIn touchable categoria-elemet">'+
                '<div class="contenido" >'+
                    '<h3>'+element['name']+'</h3>'+
                    '<img class="animate__animated animate__bounceIn" src="'+element['icon']+'" alt="">'+
                '</div>'+
            '</div>')
            });
        })
        .fail(function() {
            alert( "error connecting to server [displaying temporary data]" );
            $('#categorias').html(' ');

            for (let i = 0; i < elements.length; i++) {
                $('#categorias').append('<div onClick="goTo(this);" data-CatID="'+i+'" style="background-color: '+elements[i]['color']+';"'+' class="animate__animated animate__bounceIn touchable categoria-elemet">'+
                '<div class="contenido" >'+
                    '<h3>'+elements[i]['name']+'</h3>'+
                    '<img class="animate__animated animate__bounceIn" src="'+elements[i]['icon']+'" alt="">'+
                '</div>'+
            '</div>');
            }
        })
})

();

var menuToggle = false;

async function sidebar() {
    if (!menuToggle) {
        $('.container-app').css('top', '4vh');
        $('.container-app').css('margin-left', '80%');
        $('.container-app').css('border-radius', '20px');
        $('.container-app').css('height', '100vh');
        $('.container-app').css('min-height', '100vh');
        $('.container-app').css('max-height', '100vh');
        $('.container-app').css('transform', 'rotate(-3deg)');
        $('.container-app').css('overflow', 'hidden');
        $('.backMenu').css('display', 'block');
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#3648CE');
        
    }else{
        $('.container-app').css('top', '0px');
        $('.container-app').css('margin-left', '0%');
        $('.container-app').css('border-radius', '0px');
        $('.container-app').css('height', 'auto');
        $('.container-app').css('min-height', '100vh');
        $('.container-app').css('max-height', 'auto');
        $('.backMenu').css('display', 'none');
        
        $('.container-app').css('overflow', 'auto');
        $('.container-app').css('transform', 'rotate(0deg)');
        await sleep(490);
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#E7EFF8');
    }
    menuToggle = !menuToggle;
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function logout() {
    console.log('exit');
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'login.html';
}

function goTo(category) {
    //window.location.href = 'homeCategories.html?app=deliverit&category='+$
    window.location.href = 'homeCategories.html?app=deliverit&category='+$(category).attr('data-CatID');
}
