window.addEventListener('load',()=>{

    refreshUserMasterForm();


    refreshUserMasterTable();


})

const refreshUserMasterForm = ()=>{
    userMaster = new Object();
    userMaster.roles = new Array();

    selectEmployee.style.border="2px solid #ced4da";
    textUserName.style.border="2px solid #ced4da";
    textPassword.style.border="2px solid #ced4da";
    textRePassword.style.border="2px solid #ced4da";
    textEmail.style.border="2px solid #ced4da";
    selectStatus.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";


    textUserName.value="";
    textPassword.value="";
    textRePassword.value="";
    textEmail.value="";
    selectStatus.value="";
    textDescription.value="";



    employeeListWithoutUserAccount = ajaxGetRequest("/employee/withoutuseraccount");
    fillDataIntoSelect(selectEmployee,"Select An Employee",employeeListWithoutUserAccount,'calling_name');

    roleListWithoutAdmin = ajaxGetRequest("/role/withoutadmin");
    divRoles.innerHTML="";


    roleListWithoutAdmin.forEach(role=>{
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label')

        div.className='form-check form-check-inline';
        input.type = 'checkbox';

        input.onchange = function (){
            if (this.checked){
                userMaster.roles.push(role);
            }else {
                userMaster.roles.pop(role)
            }
        }
        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);


    })

    buttonUserMasterUpdate.disabled=true;
    buttonUserMasterUpdate.style.cursor="not-allowed";

    buttonUserMasterSave.disabled=false
    buttonUserMasterSave.style.cursor="default";

}





const refreshUserMasterTable = ()=>{

    usersList = ajaxGetRequest("/user/findall");

    displayProperty=[
        {dataType:'function',propertyName:getEmployee},
        {dataType:'text',propertyName:'username'},
        {dataType:'text',propertyName:'email'},
        {dataType:'function',propertyName:getRoles},
        {dataType:'function',propertyName:getStatus},
    ];

    fillDataIntoTable(userTable,usersList,displayProperty,true)


}


const getEmployee = (ob)=>{
    return ob.employee_id.calling_name;
}

const getRoles = (ob)=>{
    let userRoles = '';
    ob.roles.forEach(element=>{
        userRoles=userRoles+element.name+" "
    })
    return userRoles;
}

const getStatus = (ob)=>{
    return ob.status;
}


const checkErrorsUserMaster = ()=>{
    let errors = ''

    if (userMaster.employee_id==null){
        errors=errors+"Employee Cannot Be Empty"
    }
    if (userMaster.username==null){
        errors=errors+"Username Cannot Be Empty"
    }

    if (userMaster.password==null){
        errors=errors+"password Cannot Be Empty"
    }

    if (userMaster.roles==null){
        errors=errors+"roles Cannot Be Empty"
    }

    return errors
}


const saveUserMaster = ()=>{

    const errors = checkErrorsUserMaster();
    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following User
        Employee Is ${userMaster.employee_id.calling_name}
        Username Is ${userMaster.username}
        Status Is ${userMaster.status}
        Role IS ${userMaster.roles}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/user",userMaster);
            if (postServerResponse=="ok"){
                alert("save success");
                refreshUserMasterForm();
                refreshUserMasterTable();
            }else {
                alert(`user save not success \n ${postServerResponse}`)
            }
        }

    }else {
        alert(`You Have Following Errors ${errors}`)
    }
}


const refillUserMasterForm = (ob)=>{

    userMaster = JSON.parse(JSON.stringify(ob))
    oldUserMaster = JSON.parse(JSON.stringify(ob))

    employeeListWithoutUserAccount.push(userMaster.employee_id)
    fillDataIntoSelect(selectEmployee,"Select An Employee",employeeListWithoutUserAccount,'calling_name',userMaster.employee_id.calling_name);

    textUserName.value=userMaster.username
    textPassword.value=userMaster.password
    textRePassword.value=""
    textEmail.value=userMaster.email
    selectStatus.value=userMaster.status
    textDescription.value=userMaster.user_description


    divRoles.innerHTML = "";
    roleListWithoutAdmin.forEach(role=>{
        let div = document.createElement('div');
        let input =document.createElement('input');
        let label = document.createElement('label');


        div.className="form-check form-check-inline";
        input.type="checkbox";

        input.onchange = function (){
            if (this.checked){
                userMaster.roles.push(role);
            }else {
                let extIndex = userMaster.roles.map(item=>item.name).indexOf(role.name);
                if (extIndex != -1){
                    userMaster.roles.splice(extIndex,1)
                }
            }
        }
        let extIndex = userMaster.roles.map(item=>item.name).indexOf(role.name);
        if (extIndex != -1){
            input.checked=true;
        }

        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);


    })

    buttonUserMasterUpdate.disabled=false;
    buttonUserMasterUpdate.style.cursor="default";

    buttonUserMasterSave.disabled=true
    buttonUserMasterSave.style.cursor="not-allowed";




}

const checkUpdates =()=>{
    let updates = ''

    if (userMaster.employee_id.id != oldUserMaster.employee_id.id){
        updates=updates+"Employee Is Updated \n"
    }

    if (userMaster.username != oldUserMaster.username){
        updates=updates+"Username Is Updated \n"
    }

    if (userMaster.password != oldUserMaster.password){
        updates=updates+"Password Is Updated \n"
    }
    if (userMaster.email != oldUserMaster.email){
        updates=updates+"Email Is Updated \n"
    }
    if (userMaster.status != oldUserMaster.status){
        updates=updates+"Status Is Updated \n"
    }
    if (userMaster.user_description != oldUserMaster.user_description){
        updates=updates+"Description Is Updated \n"
    }

    if (userMaster.roles.length != oldUserMaster.roles.length){
        updates=updates+"Roles Are Updated \n"
    }else {
        let equalCont = 0;
        for (let i = 0; i<userMaster.roles.length; i++){
            for (let j=0; j<oldUserMaster.roles.length; j++){
                if (userMaster.roles[i].name == oldUserMaster.roles[j].name){
                    equalCont= equalCont+1;
                    break
                }
            }
        }
        if (equalCont != userMaster.roles.length){
            updates=updates+"user role is changed \n";
        }
    }


    return updates;
}



const updateUserMaster = ()=>{
    let errors = checkErrorsUserMaster();

    if (errors==""){
        //no errors
        let updates =checkUpdates();
        if (updates!=""){
            //there are updates
            const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
            if (userConfirm){
                let putServerResponse = ajaxPutRequest("/user",userMaster)
                if (putServerResponse=="ok"){
                    alert("update successful");
                    refreshUserMasterForm();
                    refreshUserMasterTable();
                    divModifyButton.classList.add('d-none');
                }else {
                    alert(`error Happened \n ${putServerResponse}`)
                }
            }else {
                alert("user cancelled the operation");
            }
        }else {
            //no update
            alert("nothing to update")
        }
    }else {
        alert(`You Have Some Errors ${errors}`)
    }

}


const deleteUserMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following User
    Employee Is ${ob.employee_id.calling_name}
    user name is ${ob.username}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/user",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Success");
            refreshUserMasterForm();
            refreshUserMasterTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("Delete Unsuccessful");
        }
    }else {
        alert("User Cancelled The Operation");
    }
}











































//need to do
const passwordRetypeValidator = ()=>{
        if (textPassword.value==textRePassword.value){
            textRePassword.style.border="2px solid green";
            userMaster.password = textPassword.value;
        }else {
            textRePassword.style.border="2px solid red";
            userMaster.password=null;
        }
}



