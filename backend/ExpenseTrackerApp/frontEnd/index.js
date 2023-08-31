
function saveToDataBaseStorage(event){
    event.preventDefault();
    const price=event.target.price.value;

    const description=event.target.description.value;
    const category=event.target.category.value;
    const token=localStorage.getItem('token')
    const obj={
        price,
        description,
        category,
        token
    }
    axios.post("http://127.0.0.1:3000/expenses/add-expense",obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
      
}

document.addEventListener("DOMContentLoaded",()=>{

    const headers = {
        'Authorization': localStorage.getItem('token'),
        // 'Content-Type': 'application/json'
      };
    axios.get("http://127.0.0.1:3000/expenses/getexpense",{ headers })
        .then((res)=>{

            console.log(res)

            for(var i=0; i<res.data.length;i++){
                showUserOnScreen(res.data[i])
            }
        })
        .catch(err=>console.log(err))
   
})

function showUserOnScreen(obj){
    const parentElemen=document.getElementById('listofitems');
    const children=document.createElement('li');

    children.textContent=obj.price+'- '+obj.description+'- '+obj.category;

    children.id=obj.id;
    const deletebtn=document.createElement('input');
    deletebtn.type='button'
    deletebtn.value='Deleteexpense'


    deletebtn.onclick=()=>{
        
        const tim=obj.time;

        axios.delete(`http://127.0.0.1:3000/expenses/deleteexpense/${obj.id}`)
            .then(res=>(console.log('done')))
            .catch(err=>console.log(err));
      
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)

    parentElemen.appendChild(children)
}

