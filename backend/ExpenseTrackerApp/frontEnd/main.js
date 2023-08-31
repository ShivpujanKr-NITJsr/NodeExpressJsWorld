
const url='http://localhost:3000/user/signup'
function checking(event){
    event.preventDefault();
    if(!check(event)){
        
        // return false;
        console.log('not filled correctly')
    }else{
        
        const name = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const obj={
            name:name.value,email:email.value,password:password.value
        }
        name.value=''
        email.value='';password.value='';
        // console.log('filled correctly',obj.email)
        

        axios.post(url,obj)
        .then(res=>{
            console.log('created user successfully')
            document.getElementById('error-msg').textContent=''
            document.getElementById('form').action='./login.html'
            //
            document.getElementById('form').method='get'
            document.getElementById('form').submit()
            return true;
        })
        .catch(err=>{
            console.log('i got error while posting')
            
            document.getElementById('error-msg').textContent=`${err}`
            return false;
        }
        )
        
        // return true;
    }
}


function check(event) {
    const name = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    name.addEventListener('input',()=>{
        document.querySelector('.username-err').style.display='none'
    })
    email.addEventListener('input',()=>{
        if(validEmail(email)){
            document.querySelector('.email-err').style.display='none'
        }
        
    })

    password.addEventListener('input',()=>{
        if(password.value.length>=6)
        document.querySelector('.password-err').style.display='none'
    })

    if (!validName(name)) {
        document.querySelector('.username-err').innerHTML="please enter username";
        document.querySelector('.username-err').style.display='block'
        event.preventDefault();
        return false;
    }
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

function validName(name) {
    return name.value.trim().length > 0;
}

function validEmail(email) {

    if(email.value.trim().length>3){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email.value);
    }
    return false;
   
}

function validPassword(password) {
    return password.value.length >= 6;
}