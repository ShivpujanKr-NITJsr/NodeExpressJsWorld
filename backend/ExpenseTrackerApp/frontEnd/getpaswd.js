let ur=''


function check(event){
    event.preventDefault();
    const obj={
        email:event.target.email.value
    }
    if(isValid(event.target.email)){
        axios.get(`http://localhost:3000/password/forgotpassword/${obj.email}`)
            .then(res=>{
                console.log(res)
                if(res.data.msg==='ok'){

                    const h=document.createElement('h5');
                    h.textContent='Reset link is sent to your email';
                    document.getElementById('emailpass').appendChild(h);
                    alert('Reset password link sent to your email')
                }
            }).catch(err=>{
                console.log(err)
                alert('error occured, invalid link')
            }
                
            )
    }
}

function isValid(email){
    if(email.value.trim().length>3){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email.value);
    }
    return false;
}