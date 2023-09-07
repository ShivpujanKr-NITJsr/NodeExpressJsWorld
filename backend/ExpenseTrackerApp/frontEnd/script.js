
const url='http://localhost:3000/user/login'
function checking(event){
    event.preventDefault();
    if(!check(event)){
        
        // return false;
        console.log('not filled correctly')
    }else{
        
       
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const obj={
            email:email.value,password:password.value
        }
       
      
        

        axios.post(url,obj)
        .then(res=>{
            console.log(res)
            document.getElementById('error-msg').textContent=``        
            console.log(res)
            alert(res.data.msg)
            if(res.data.success==true){
                document.getElementById('form').action='./index.html';
                document.getElementById('form').method='get'
                document.getElementById('form').submit();
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('ispremiumuser',res.data.ispremiumuser);
                console.log(res.data.ispremiumuser)
                return true;
            }else{
                return false

            }
            
        })
        .catch(err=>{
            console.log('i got error while logging')
            
            document.getElementById('error-msg').textContent=`${err}`

            alert(`${err}`)
            return false
            
        }
        )
        
       
    }
}


function check(event) {
    const name = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

   
    email.addEventListener('input',()=>{
        if(validEmail(email)){
            document.querySelector('.email-err').style.display='none'
        }
        
    })

    password.addEventListener('input',()=>{
        if(password.value.length>=6)
        document.querySelector('.password-err').style.display='none'
    })

   
    if (!validEmail(email)) {
        document.querySelector('.email-err').innerHTML="please enter email";
        document.querySelector('.email-err').style.display='block'
        event.preventDefault();
        return false;
    }
    if (!validPassword(password)) {
        document.querySelector('.password-err').innerHTML="please enter password of min length-6";
        document.querySelector('.password-err').style.display='block'
        event.preventDefault();
        return false;
    }

    return true;
}

function validEmail(email) {

    if(email.value.trim().length>3){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email.value);
    }
    return false;
   
}

function validPassword(password) {
    return password.value.length >= 1;
}