function logTabs(element) {
    let elementClick = $(element).attr('data-name') == "Login" ? true : false;
    if (elementClick) {
        $('.contLog').css("display", "flex");
        $('.contSign').css("display", "none");
    }else {
        $('.contLog').css("display", "none")
        $('.contSign').css("display", "flex")
    }
    $('.active').removeClass('active');
    $(element).addClass('active');

}