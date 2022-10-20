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

function openModalProduct(product) {
    $('#modal-product').css('display', 'block');
    const imgSelect = $(product)[0].children[0];
    $('#img-modal').css('display', 'block');
    $('#img-modal').css('top', $(imgSelect).offset().top);
    $('#img-modal').css('height', $(imgSelect)[0].offsetHeight+10);
    $('#img-modal').css('left', $(imgSelect).offset().left);
    $('#img-modal').attr('src',$(imgSelect).attr('src'));
    
    
    $('#modal-product').css('height', $(imgSelect)[0].offsetHeight-10);
    $('#modal-product').css('width', $(imgSelect)[0].offsetWidth-10);
    $('#modal-product').css('top', $(imgSelect).offset().top);
    $('#modal-product').css('left', $(imgSelect).offset().left);
    $('#modal-product').css('border-radius', '50%');

    

    $('#img-modal').animate({
        top: 0,
        left: '50%',
        height: '30vh',
        width: "auto"
    }, 'slow');
    $('#modal-product').animate({
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        borderRadius: '0px'
    }, 'slow');
    $("#img-modal").animateTransform("translate(-50%,0%)", 750, function(){
        console.log("animation completed after 750ms");
    });
}

function closeModalProduct() {
    $('#modal-product').css('display', 'none');
    
}