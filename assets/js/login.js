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

function signFromAPI(username, email, password) {
    let ban = false;

    users.forEach(user => {
        if (user.email == email) {
            ban = true
            $('#infoSIgn').css('display', 'inline');
            return ban
        }
    })

    if (!ban) {
        const user = {
            name: username,
            email: email,
            password: password
        }
        users.push(user);
        window.localStorage.setItem('users', JSON.stringify(users))
    }
    return BaseAudioContext
}

function loginClick() {
    const email = $('#emailLog').val();
    const pass = $('#passLog').val();


    if (email.length >0 && pass.length > 0) {
        $('#modalLoading').css('display', 'flex');

        //$.post(URL, DATA)
        $.post("https://deliverit-backend.vercel.app/client/login", {
            "email": email,
            "password": pass
        }).done(function (response) {
            document.cookie = 'username='+response.username+'; expire=31536000;';
            document.cookie = 'id='+response._id+'; expire=31536000;';
            $('#modalLoading').css('display', 'none');
            window.location.href = 'home.html';
        }).fail(function(xhr, status, res) {
            $('#infoLog').html(xhr.responseText);
            $('#infoLog').css('display', 'inline');
            $('#modalLoading').css('display', 'none');
        })
    }
}


function signClick() {
    const email = $('#emailSign').val();
    const name = $('#nameSign').val();
    const pass = $('#passSign').val();

    if (email.length > 0 && pass.length > 0 && name.length > 0) {
        $('#modalLoading').css('display', 'flex');

        $.post("https://deliverit-backend.vercel.app/client/signin", {
            "username": name,
            "email": email,
            "password": pass
        }).done(function (response) {
            document.cookie = 'username='+response.username+'; expire=31536000;';
            document.cookie = 'id='+response._id+'; expire=31536000;';
            $('#modalLoading').css('display', 'none');
            window.location.href = 'home.html';
        }).fail(function(xhr, status, res) {
            $('#infoLog').html(xhr.responseText);
            $('#infoLog').css('display', 'inline');
            $('#modalLoading').css('display', 'none');
        })
    }
}

$('.input').focusout(function() {
    if ($(this).val()=='') {
        $(this).attr('aria-invalid', "true" );
    }else{
        $(this).removeAttr('aria-invalid');
    }
})