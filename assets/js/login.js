if(window.location.hostname == '127.0.0.1'){window.location.href = 'http://localhost:5500/login.html'}

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

let users = [
    {
        name: 'admin',
        email: 'admin',
        password: 'admin'
    }
];

if (window.localStorage.getItem('users') != undefined) {
    users = JSON.parse(window.localStorage.getItem('users'))
}else{
    window.localStorage.setItem('users', JSON.stringify(users))
}

console.clear();
console.table(users);

function autentificationFromAPI(email, password) {
    let ban = false;

    users.forEach(user => {
        if (user.email == email) {
            if (user.password == password) {
                ban = true;
                document.cookie = 'username='+user.name+'; expire=31536000;';
                return ban;
            }
            $('#infoLog').html('password incorrect');
        }
    })

    if (!ban) {
        $('#infoLog').css('display', 'inline');
        $('#modalLoading').css('display', 'none');
    }
    
    return ban;
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

        if (autentificationFromAPI(email, pass)) {
            window.location.href = 'home.html';
            return
        }
        const timer = setInterval(() => {
            $('#modalLoading').css('display', 'none');
            clearInterval(timer);
        }, 2000);
    }
}


function signClick() {

    const email = $('#emailSign').val();
    const name = $('#nameSign').val();
    const pass = $('#passSign').val();

    if (email.length > 0 && pass.length > 0 && name.length > 0) {
        $('#modalLoading').css('display', 'flex');
        if (signFromAPI(name, email, pass)) {
            document.cookie = 'username='+name+'; expire=31536000;';
            window.location.href = 'home.html';
            const timer = setInterval(() => {
                $('#modalLoading').css('display', 'none');
                clearInterval(timer);
            }, 2000);
            console.clear();
            console.table(users);
        }
        
    }

    
    //window.location.href = 'home.html';
}