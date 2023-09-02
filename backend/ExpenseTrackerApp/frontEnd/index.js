
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
            console.log('showing leaderboard')
            if(document.getElementById('leaderboard').childElementCount!=0){
                showLeaderBoard()
            }
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
      
}

document.getElementById('rzp-button1').addEventListener('click',(event)=>{
    // event.preventDefault()
    const headers = {
        'Authorization': localStorage.getItem('token'),
        // 'Content-Type': 'application/json'
      };
    //   console.log(localStorage.getItem('token'))
    axios.get("http://127.0.0.1:3000/premiumroute/buypremium",{ headers })
        .then((res)=>{

            // console.log(res.data.order.id)

            var options={
                'key_id':res.data.key_id,
                'order_id':res.data.order.id,

                'handler':async function(response){

                    const premium=await axios.post(`http://localhost:3000/premiumroute/updatetransactionstatus`,{
                        order_id:options.order_id,
                        payment_id: response.razorpay_payment_id,
                    },{headers:{'Authorization': localStorage.getItem('token')}})

                    localStorage.setItem('ispremiumuser','1');

                    document.getElementById('rzp-button1').style.display='none';
                    document.getElementById('rzp-button1').textContent='';
                    document.getElementById('premiumuser').style.display='block';
                    document.getElementById('premiumuser').textContent='you are now premium user';
                    const leaderboard=document.createElement('button');
                    
                    leaderboard.style.marginLeft='20px'
                    leaderboard.style.border='1px black rounded'
                    leaderboard.style.borderRadius='5px'
                    leaderboard.textContent='show leaderboard'
                    leaderboard.style.width ='auto'

                    leaderboard.addEventListener('click',showLeaderBoard)
                    document.getElementById('premiumuser').appendChild(leaderboard)

                    alert('You are a premium user now')
                }
            }

            const rzp1 = new Razorpay(options);
            rzp1.open();
            event.preventDefault();

            rzp1.on('payment.failed', async function (response) {
                console.log('Payment failed');
        
            
                try {
                  const cancelRes = await axios.post(`http://localhost:3000/premiumroute/updatetransactionstatus`, {
                    order_id:options.order_id,
                    suc:true
                }, { headers });
                  console.log('Cancellation request response:', cancelRes.data);
                  alert('Something went wrong');
                } catch (error) {
                  console.error('Error occured during payment:', error);
                  alert('Error: Something went wrong while paying');
                }
              })
        })
        .catch(err=>console.log(err))
})

document.addEventListener("DOMContentLoaded",()=>{

    if(localStorage.getItem('ispremiumuser')==='1'){
        document.getElementById('rzp-button1').style.display='none';
        document.getElementById('rzp-button1').textContent='';
        document.getElementById('premiumuser').style.display='block';
        document.getElementById('premiumuser').innerHTML='<b>You are now premium user</b>';
        const leaderboard=document.createElement('button');
        
        leaderboard.style.marginLeft='20px'
        // leaderboard.style.border='1px black rounded'
        leaderboard.style.borderRadius='4px'
        leaderboard.textContent='show leaderboard'
        leaderboard.style.width ='auto'
        
        leaderboard.addEventListener('click',showLeaderBoard)
        document.getElementById('premiumuser').appendChild(leaderboard)

    }
    

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
            // showLeaderBoard()
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
            .then(res=>{
                console.log('done')
                // showLeaderBoard()

                if(document.getElementById('leaderboard').innerHTML!=''){
                    showLeaderBoard()
                }
            })
            .catch(err=>console.log(err));
      
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)

    parentElemen.appendChild(children)
}

function showLeaderBoard(){
    const leader=document.getElementById('leaderboard')

    // leader.textContent='';

    while (leader.firstChild) {
        leader.removeChild(leader.firstChild);
    }
    const h=document.createElement('h2');

    h.textContent='Leader Board'

    leader.appendChild(h)
    
    // leader.classList='012'
    // console.log('showing leaderboard');
    axios.get('http://localhost:3000/premiumroute/leaderboardshow')
        .then(res=>{

            let ans=res.data;
            ans.sort((a, b) => b.expense - a.expense);
            console.log(res)
            for(let i=0;i<res.data.length;i++){
                const p=document.createElement('li');
                p.textContent="Name - "+`${ans[i].name}`+"   "+'Total Expense - '+`${ans[i].expense}`
                leaderboard.appendChild(p)
            }
            console.log(res);
        }).catch(err=>console.log(err))

   
}
