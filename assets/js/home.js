

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
        name:'restaurantes',
        color:'#ff9e00',
        icon:'/assets/img/iconos/comida-rapida.png'
    },
    {
        name:'Supermercado',
        color:'#691b9a',
        icon:'/assets/img/iconos/tienda.png'
    },
    {
        name:'Bebidas',
        color:'#1b9a8f',
        icon:'/assets/img/iconos/coctel.png'
    },
    {
        name:'Salud',
        color:'#558b2f',
        icon:'/assets/img/iconos/salud.png'
    },
    {
        name:'Tecnologia',
        color:'#c50b0b',
        icon:'/assets/img/iconos/gadgets.png'
    }
];


(async function () {
  

  await sleep(2000);
  $('#categorias').html(' ');

  for (let i = 0; i < elements.length; i++) {
      $('#categorias').append('<div onClick="catSelect(this);" data-CatID="'+i+'" style="background-color: '+elements[i]['color']+';"'+'class="animate__animated animate__bounceIn categoria-elemet">'+
      '<div class="contenido" >'+
          '<h3>'+elements[i]['name']+'</h3>'+
          '<img class="animate__animated animate__backInDown" src="'+elements[i]['icon']+'" alt="">'+
      '</div>'+
'</div>');
  }
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

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


function closeCatSel() {
    animateCSS('.catselec', 'fadeOutDown').then((message) => {
        // Do something after the animation
        $('.catselec').css('display', 'none');
        $('.catselec').css('z-index', '-10');
    });
}

function catSelect(categoria) {
    var index = $(categoria).attr('data-CatID');
    $('#nameCatSel').html(elements[index]['name']);
    $('.catselec').css('display', 'flex');
    $('.catselec').css('z-index', '10');
    animateCSS('.catselec', 'fadeInUp');
}

