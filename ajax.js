//ajax request for retrieving data
const tbody=document.getElementById("tbody");
function showdata(){
    tbody.innerHTML="";
    const xhr = new XMLHttpRequest();
    xhr.open('GET','retrieve.php',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.responseType="json";
    xhr.onload=()=>{
        if(xhr.status===200){
            //console.log(xhr.response);
            if(xhr.response){
                x=xhr.response;
            }
            else{
                x="";
            }
            for(i=0;i<x.length;i++){
                tbody.innerHTML+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+x[i].password+"</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid="+x[i].id +">Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid="+x[i].id+">Delete</button></td></tr>";
            }
        }
        else{
            console.log("Problem occured!!");
        }
        student_delete();
        student_edit();
    };
    xhr.send();
}
showdata();

//insert or update
document.getElementById("btnadd").addEventListener("click",add_student);
function add_student(e){
    e.preventDefault();
    console.log("add button clicked");
    let stid = document.getElementById("stuid").value;
    let nm=document.getElementById("nameid").value;
    let em=document.getElementById("emailid").value;
    let pw=document.getElementById("passwordid").value;
    
    //xhr object
    const xhr=new XMLHttpRequest();
    xhr.open("POST","insert.php",true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload=()=>{
        
        if(xhr.status === 200){
            
            document.getElementById("msg").innerHTML='<div class="alert alert-dark mt-3 role="alert">' + xhr.responseText + '</div>';
            document.getElementById("myform").reset();
            showdata();
        }
        else{
            console.log("Problem Occured!!")
        }
    };
    const mydata={id:stid,name:nm,email:em,password:pw};
    const data=JSON.stringify(mydata);
    console.log(data);
    xhr.send(data);
}

//delete student
function student_delete(){
    var x = document.getElementsByClassName("btn-del");
    for(let i=0;i<x.length;i++){
        console.log(x[i].getAttribute("data-sid"));
        x[i].addEventListener("click",function(){

            id = x[i].getAttribute("data-sid");
            console.log("Delete button clicked",id);
            const xhr= new XMLHttpRequest();
            xhr.open('POST','delete.php',true);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.onload=()=>{
                if(xhr.status===200){
                document.getElementById("msg").innerHTML='<div class="alert alert-dark mt-3 role="alert">' + xhr.responseText + '</div>';
                showdata();
                }
                
                else{
                    console.log("Problem occured!");
                }
            };
            const mydata = {sid:id};
            const data = JSON.stringify(mydata);
            xhr.send(data);
        });
    }
}

//ajax call for edit record
function student_edit(){
    var x = document.getElementsByClassName("btn-edit");
    let stid=document.getElementById("stuid");
    let nm=document.getElementById("nameid");
    let em=document.getElementById("emailid");
    let pw=document.getElementById("passwordid");
    for(let i=0;i<x.length;i++){
        x[i].addEventListener("click",function(){
            id = x[i].getAttribute("data-sid");
            const xhr = new XMLHttpRequest();
            xhr.open('POST','edit.php',true);
            xhr.responseType="json";
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.onload=()=>{
                if(xhr.status===200){
                    a=xhr.response;
                    stid.value=a.id;
                    nm.value=a.name;
                    em.value=a.email;
                    pw.value=a.password;
                }
                else{
                    console.log("Problem occured!!");
                }
            };
            const mydata={sid:id};
            const data=JSON.stringify(mydata);
            xhr.send(data);
        });

    }
}
