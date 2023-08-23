
let ob=null;

function myApiWorking(event){
    event.preventDefault();
    const username=event.target.username.value;
    const phone=event.target.phone.value;
    const email=event.target.email.value;

    event.target.username.value='';
    event.target.phone.value='';
    event.target.email.value='';
    const obj={
        username,
        phone,
        email
    }

    if(!ob){
        axios.post('http://127.0.0.1:3000/',obj);
        showUserOnScreen(obj)
    }else{
        const id=ob.id;

        const obj2={
            "username":obj.username,
            "phone":obj.phone,
            "email":obj.email
        }
        axios.put(`http://127.0.0.1:3000/${id}`,obj2);
        ob=null;
        obj.id=id;
        // showUserOnScreen(obj);
        // document.getElementById(obj.id).textContent=obj.username+'  '+obj.email+'  '+obj.phone;

        showUpdatedOnScreen(obj);

    }
}

function showUpdatedOnScreen(obj){
    const child=document.getElementById(obj.id);

    child.textContent=obj.username+'  '+obj.email+'  '+obj.phone;

    const editbtn=document.createElement('button');
    editbtn.textContent='Edit';
    // editbtn.style.border='solid'

    const un=document.getElementById('username');
    const em=document.getElementById('email');
    const ph=document.getElementById('phone');
    
    console.log(obj);
    editbtn.onclick=()=>{
        console.log(obj);
        ob=obj;
        un.value=obj.username;
        em.value=obj.email;
        ph.value=obj.phone;

    }
    const dltbtn=document.createElement('button');
    dltbtn.textContent='Delete';

    dltbtn.onclick=()=>{
        parent.removeChild(child);
        axios.delete(`http://127.0.0.1:3000/${obj.id}`);
    }

    child.appendChild(editbtn);
    child.appendChild(dltbtn);

    parent.appendChild(child);
}



function showUserOnScreen(obj){
    const parent=document.getElementById('list');

    const child=document.createElement('li');

    child.id=obj.id;
    child.textContent=obj.username+'  '+obj.email+'  '+obj.phone;

    const editbtn=document.createElement('button');
    editbtn.textContent='Edit';
    // editbtn.style.border='solid'

    const un=document.getElementById('username');
    const em=document.getElementById('email');
    const ph=document.getElementById('phone');
    
    console.log(obj);
    editbtn.onclick=()=>{
        console.log(obj);
        ob=obj;
        un.value=obj.username;
        em.value=obj.email;
        ph.value=obj.phone;

    }
    const dltbtn=document.createElement('button');
    dltbtn.textContent='Delete';

    dltbtn.onclick=()=>{
        parent.removeChild(child);
        axios.delete(`http://127.0.0.1:3000/${obj.id}`);
    }

    child.appendChild(editbtn);
    child.appendChild(dltbtn);

    parent.appendChild(child);
}

document.addEventListener('DOMContentLoaded', () => {
   
    axios.get('http://127.0.0.1:3000/')
        .then(result=>{
            result.data.forEach(element => {
                showUserOnScreen(element)
            });
        }).catch(err=>{
            console.log(err)
        })
});
    