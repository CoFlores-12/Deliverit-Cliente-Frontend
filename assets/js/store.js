let cartCount = 0;

const store = new URLSearchParams(document.URL).get('store');

(async ()=>{

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

function openModalProduct(product) {

  productSelect = product;

    const imgSelect = $(product)[0].children[0];
    $('#modalPr').css('display', 'block');
    $('#imgPr').attr('src',$(imgSelect).attr('src'));

    $('#modalPr').css('top', $(imgSelect).offset().top);
    $('#modalPr').css('left', $(imgSelect).offset().left);
    $('#modalPr').css('height', $(imgSelect)[0].offsetHeight+9);
    $('#modalPr').css('width', $(imgSelect)[0].offsetWidth+9);
    
    $('#modalPr').css('border-radius', '50%');

    $('#namePr').html($('.data>strong>.name',product).html());
    $('#pricePr').html($('.data>.price',product).html());

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
      borderRadius: '50%',
      height: '100%',
      width: "100%"
  }, 'slow', function(){
    $('#modalPr').css('display', 'none');
    $('#navPr').css('display', 'none');
    $('.containeImgPr').css('height', '100%');
    $('.footerPr').css('bottom', '-57px');
  });
   
}

function favorites() {
  $('.fav').html('<i class="fa-solid fa-heart"></i>')
}

async function addToCart() {
  let cartTmp = [];
  if (window.localStorage.getItem('cart') != undefined) {
    cartTmp = await JSON.parse( window.localStorage.getItem('cart') );
  }
  console.log($('.data>.price',productSelect).html());
  cartTmp.push({
    img: $('img',productSelect).attr('src'),
    name: $('.data>strong>.name',productSelect).html(),
    store: $('.nameStore').html(),
    price: $('.data>.price>.priceVal',productSelect).html(),
    cant: countPr,
})
  window.localStorage.setItem('cart', JSON.stringify(cartTmp))
}

let countPr = 1;

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