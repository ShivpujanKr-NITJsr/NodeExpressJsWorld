var editing = null

function saveToDataBaseStorage(event){
    event.preventDefault();
    const price=event.target.price.value;

    const description=event.target.description.value;
    const category=event.target.category.value;
    const time=new Date().getMilliseconds();

    const obj={
        price,
        description,
        category,
        time
    }
      if (editing === null) {
        axios.post("http://127.0.0.1:3000/",obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
    } else {
        const ur='http://127.0.0.1:3000'+'/'+editing;
        axios.put(ur,obj)
        .then((response)=>{
            showUpdatedOnScreen(response.data);
            // console.log(response.data);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
        editing = null;
        
    }
    
    // localStorage.setItem(obj.description,JSON.stringify(obj));
    // showUserOnScreen(obj);
}

document.addEventListener("DOMContentLoaded",()=>{

    axios.get("http://127.0.0.1:3000/")
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

        axios.delete(`http://127.0.0.1:3000/${obj.id}`)
            .then(res=>(console.log('done')))
            .catch(err=>console.log(err));
      
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)
    const editbtn=document.createElement('input')
    editbtn.type='button'
    editbtn.value='Editexpense'
    editbtn.onclick=()=>{

        document.getElementById('price').value=obj.price
        document.getElementById('description').value=obj.description
        document.getElementById('category').value=obj.category
        editing = obj.id;
        
    }
    children.appendChild(deletebtn)
    children.appendChild(editbtn)
    parentElemen.appendChild(children)
}

function showUpdatedOnScreen(obj){
    const parentElemen=document.getElementById('listofitems');
    const children=document.getElementById(obj.id);

    children.textContent=obj.price+'- '+obj.description+'- '+obj.category;

  
    const deletebtn=document.createElement('input');
    deletebtn.type='button'
    deletebtn.value='Deleteexpense'


    deletebtn.onclick=()=>{
        
        const tim=obj.time;

        axios.delete(`http://127.0.0.1:3000/${obj.id}`)
            .then(res=>(console.log('done')))
            .catch(err=>console.log(err));
        localStorage.removeItem(obj.description);
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)
    const editbtn=document.createElement('input')
    editbtn.type='button'
    editbtn.value='Editexpense'
    editbtn.onclick=()=>{
        
        // parentElemen.removeChild(children)
        document.getElementById('price').value=obj.price
        document.getElementById('description').value=obj.description
        document.getElementById('category').value=obj.category
        editing = obj.id;
        
    }
    children.appendChild(deletebtn)
    children.appendChild(editbtn)
    
}