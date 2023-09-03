


function checks(event){
    event.preventDefault()
    const password = document.getElementById('password').value;
    const uuidd = document.getElementsByName('uuidd')[0].value;

    const obj={
        password,
        uuidd
    }
    // axios.post(`http://localhost:3000/password/resetpasswd`,obj)
    //     .then(res=>{
    //         alert('password changed successfully')
    //         document.getElementById('resetpasswd').action='./login.html'
    //         document.getElementById('resetpasswd').method='post'
    //         document.getElementById('resetpasswd').submit()
    //         return true;
    //     }).catch(err={
            
    //     })
    alert('paswd changing')
    return true;
}