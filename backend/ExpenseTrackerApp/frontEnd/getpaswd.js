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
            }).catch(err=>console.log(err))
    }
}

function isValid(email){
    if(email.value.trim().length>3){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email.value);
    }
    return false;
}