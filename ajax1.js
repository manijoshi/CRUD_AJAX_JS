//retrieving 
const tbody = document.getElementById('tbody');
function showdata(){
    tbody.innerHTML="";
    const xhr= new XMLHttpRequest();
    xhr.open('GET','retrieve1.php',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.responseType='json';
    xhr.onload=()=>{
        if(xhr.status===200){
            if(xhr.response){
                x=xhr.response;
            }
            else{
                x="";
            }
            for(i=0 ;i<x.length;i++){
                tbody.innerHTML+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+x[i].password+"</td><td> <button class='btn btn-warning btn-edit btn-sm' data-sid="+x[i].id+">Edit</button> <button class='btn btn-danger btn-del btn-sm' data-sid="+x[i].id+">Delete</button></td></tr>";
            }
        }
        else{
            console.log("Problem occured");
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
    console.log("button-clicked");
    let stid = document.getElementById('stuid').value;
    let name = document.getElementById('nameid').value;
    let email = document.getElementById('emailid').value;
    let password = document.getElementById('passwordid').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST','insert1.php',true);
    xhr.setRequestHeader("Content-Type",'application/json');
    xhr.onload=()=>{
        if(xhr.status===200){
            document.getElementById("msg").innerHTML="<div class='alert alert-dark mt-3' role='alert'>"+xhr.responseText+"</div>";
            document.getElementById("myform").reset();
            
            showdata();
        }
        else{
            console.log("error occurred");
        }

    };
    const mydata = {id:stid,name:name,email:email,password:password};
    const data= JSON.stringify(mydata);
    xhr.send(data);
}
//delete
function student_delete(){
    var x=document.getElementsByClassName("btn-del");
    for(let i=0;i<x.length;i++){
        x[i].addEventListener("click",function(){
            id=x[i].getAttribute("data-sid");
            const xhr= new XMLHttpRequest();
            xhr.open("POST",'delete1.php',true);
            xhr.setRequestHeader("Content-Type",'application/json');
            xhr.onload=()=>{
                if(xhr.status===200){
                    document.getElementById("msg").innerHTML="<div class='alert alert-dark mt-3' role='alert'>"+xhr.responseText+"</div>";
                    showdata();
                }
                else{
                    console.log("problem occurred");
                }
            };
            const mydata={sid:id};
            const data=JSON.stringify(mydata);
            xhr.send(data);
        });
    }
    
}
//edit
function student_edit(){
    var x = document.getElementsByClassName("btn-edit");
    let stid = document.getElementById("stuid");
    let nm = document.getElementById("nameid");
    let em = document.getElementById("emailid");
    let pw = document.getElementById("passwordid");
    for(let i=0;i<x.length;i++){
        x[i].addEventListener("click",function(){
            id=x[i].getAttribute("data-sid");
            const xhr= new XMLHttpRequest();
            xhr.open('POST','edit1.php',true);
            xhr.responseType="json";
            xhr.setRequestHeader("Content-Type",'application/json');
            xhr.onload=()=>{
                if(xhr.status===200){
                    a=xhr.response;
                    stid.value=a.id;
                    nm.value=a.name;
                    em.value=a.email;
                    pw.value=a.password;
                }
                else{
                    console.log("problem occured!");
                }
            };
            const mydata = {sid:id};
            const data=JSON.stringify(mydata);
            xhr.send(data);
        });
    }
}
