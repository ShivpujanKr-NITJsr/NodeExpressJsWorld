var mul=(a,b)=>{
    return a*b;
}

class Student {
    constructor(name,age,marks){
        this.name=name;
        this.age=age;
        this.marks=marks
    }

    setPlacementAge(minPlacemnetAge){
        console.log(this);
        // return function eligibleForCurrentCompany(minMarks){
        return (minMarks)=>{

            console.log('inside eligibleForCurrentCompany' , this)
            if(this.marks>minMarks && this.age>minPlacemnetAge ){
                console.log(this.name+" is ready for placement");
            }else{
                console.log(this.name+" is not ready for placement");
            }
        }

    }
}



const shiv=new Student('shiv',23,89);
const dhiran =new Student('dhiran',13,79)
shiv.setPlacementAge(18)(40)
dhiran.setPlacementAge(18)(40);
