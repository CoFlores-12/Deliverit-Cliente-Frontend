let cartCount = 0;

const storeID = new URLSearchParams(document.URL).get('store');
let store = [];

(async ()=>{
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/store/"+storeID,
    "method": "GET",
    "headers": {}
  };

  $.ajax(settings).done(function (response) {
    store = response[0];
    renderInformation();
  });
})();

$.fn.animateTransform = function(/* [start,] end [, duration] [, callback] */){
    var start = null, end = null, duration = 400, callback = function(){};
    for(var i=0; i<arguments.length; i++){
      if(typeof(arguments[i]) == "string"){
        if(!start) start = arguments[i];
        else end = arguments[i];
      } else if(typeof(arguments[i]) == "number"){
        duration = arguments[i];
      } else if(typeof(arguments[i]) == "function"){
        callback = arguments[i];
      }
    }
    if(start && !end){
      end = start;
      start = null;
    }
    if(!end) return;
    if(start){
      this.css("transform", start);
    }
    if(duration < 16) duration = 16;
    var transitionB4 = this.css("transition");
    this.css("transition", "transform " + duration + "ms");
    this.css("transform", end);
    var $el = this;
    setTimeout(function(){
      $el.css("transition", transitionB4 || "");
      $el.css("transform", end);
      callback();
    }, duration);
  };

let productSelect;
let countPr = 1;

function openModalProduct(product) {
  countPr = 1;
    productSelect = store.products.find(productTMP => productTMP._id ===$(product).attr('data-idPr'));
    const imgSelect = $(product)[0].children[0];
    $('#modalPr').css('display', 'block');
    $('#imgPr').attr('src', productSelect.img);

    $('#modalPr').css('top', $(imgSelect).offset().top);
    $('#modalPr').css('left', $(imgSelect).offset().left);
    $('#modalPr').css('height', $(imgSelect)[0].offsetHeight+9);
    $('#modalPr').css('width', $(imgSelect)[0].offsetWidth+9);
    
    $('#modalPr').css('border-radius', '50%');

    $('#namePr').html(productSelect.name);
    $('#pricePr').html(productSelect.price);
    $('#dataPr').html(productSelect.description);

    $('.containeImgPr').animate({
      height: '30%'
    }, 'slow', function() {
      $('.footerPr').animate({
        bottom: '0px'
      }, 'slow')
    })

    $('#modalPr').animate({
        top: 0,
        left: 0,
        borderRadius: '0px',
        height: '100%',
        width: "100%"
    }, 'slow', function(){
      $('#navPr').css('display', 'flex');
    });

    
}

function closeModalProduct() {
  $('#modalPr').animate({
      top: '100vh',
      left: 0,
      height: '100%',
      width: "100%"
  }, 'slow', function(){
    $('#modalPr').css('display', 'none');
    $('#navPr').css('display', 'none');
    $('.containeImgPr').css('height', '100%');
    $('.footerPr').css('bottom', '-57px');
    $('.footerPr').css('borderRadius,', '50%');
  });
   
}

function favorites() {
  $('.fav').html('<i class="fa-solid fa-heart"></i>')
}

async function addToCart() {
  let cartTmp = [];
  if (window.localStorage.getItem('cart') != undefined) {
    cartTmp = await JSON.parse( window.localStorage.getItem('cart') );
  }else{
    window.localStorage.setItem('cart', JSON.stringify(cartTmp))
  }

  const repeat = cartTmp.find(Element => Element.id === productSelect._id);
  if (repeat != undefined) {
    const index = cartTmp.indexOf(repeat);
    cartTmp[index].cant = countPr;
    window.localStorage.setItem('cart', JSON.stringify(cartTmp))
    alert('added')
    return
  }

  cartTmp.push({
    id: productSelect._id,
    img: productSelect.img,
    name: productSelect.name,
    store: {
      id: store._id,
      name: store.name,
      location: store.location
    },
    price: productSelect.price,
    cant: countPr,
})
  window.localStorage.setItem('cart', JSON.stringify(cartTmp))
  alert('added')
}

function minus() {
  if (countPr>1) {
    countPr--;
    $('#countPr').html(countPr)
  }
}

function plus() {
  countPr++;
  $('#countPr').html(countPr)
}

function renderInformation() {
  $('#bannerStore').attr('src', store.banner);
  $('#logoStore').attr('src', store.logo);
  $('.nameStore').html(store.name);
  store.products.forEach(product => {
    $('#productosList').append(`
    <div onclick="openModalProduct(this);" data-idPr="${product._id}" class="product touchable animate__animated animate__bounceIn">
                    <img src="${product.img}" alt="">
                    <div class="data">
                        <strong><div class="name">${product.name}</div></strong>
                        <div class="price">$ <span class="priceVal">${product.price}</span></div>
                    </div>
                </div>
    `)
  });
}