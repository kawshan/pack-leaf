window.addEventListener('load',()=>{

    refreshEmployeeMasterForm();

    refreshEmployeeMasterTable();

})


const refreshEmployeeMasterForm = ()=>{

    employeeMaster = new Object();

    //color to default
    textFullName.style.border="1px solid #ced4da";
    textCallingName.style.border="1px solid #ced4da";
    selectDOB.style.border="1px solid #ced4da";
    textNic.style.border="1px solid #ced4da";
    textMobile.style.border="1px solid #ced4da";
    textLandNo.style.border="1px solid #ced4da";
    textEmail.style.border="1px solid #ced4da";
    textAddress.style.border="1px solid #ced4da";
    selectGender.style.border="1px solid #ced4da";
    selectStatus.style.border="1px solid #ced4da";
    selectDesignation.style.border="1px solid #ced4da";


    //value to empty
    textFullName.value="";
    textCallingName.value="";
    selectDOB.value="";
    textNic.value="";
    textMobile.value="";
    textLandNo.value="";
    textEmail.value="";
    textAddress.value="";

    //dynamic select object value to default
    gendersList=ajaxGetRequest("/gender/findall");
    fillDataIntoSelect(selectGender,"Select Gender",gendersList,'name');

    statusesList = ajaxGetRequest("/employeestatus/findall")
    fillDataIntoSelect(selectStatus,"Select Status",statusesList,'name');

    designationsList = ajaxGetRequest("/designation/findall")
    fillDataIntoSelect(selectDesignation,"Select Designation",designationsList,'name');


    buttonEmployeeUpdate.disabled=true
    buttonEmployeeUpdate.style.cursor="not-allowed"


    buttonEmployeeSubmit.disabled=false;
    buttonEmployeeSubmit.style.cursor="default"
}




const refreshEmployeeMasterTable = ()=>{

    employeeList = ajaxGetRequest("/employee/findall")

    displayProperty=[
        {dataType:'text',propertyName:'full_name'},
        {dataType:'text',propertyName:'calling_name'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'function',propertyName:getEmployeeStatus},
    ];

    fillDataIntoTable(employeeTable,employeeList,displayProperty,true);

}


const getEmployeeStatus = (ob)=>{
    return ob.employeestatus_id.name;
}



const checkErrorEmployeeMasterForm = ()=>{
    let errors = ''

    if (employeeMaster.full_name == null){
        errors=errors+"Full Name Cannot Be Empty \n"
    }

    if (employeeMaster.calling_name == null){
        errors=errors+"Calling Name Cannot Be Empty \n"
    }

    if (employeeMaster.gender_id == null){
        errors=errors+"Gender Cannot Be Empty \n"
    }

    if (employeeMaster.employeestatus_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }

    if (employeeMaster.designation_id == null){
        errors=errors+"Designation Cannot Be Empty \n"
    }
    return errors;
}




const submitEmployeeMaster = ()=>{
    const errors = checkErrorEmployeeMasterForm();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following Employee \n
        Full Name Is ${employeeMaster.full_name}
        Calling Name Is ${employeeMaster.calling_name}
        gender is ${employeeMaster.gender_id.name}
        status is ${employeeMaster.employeestatus_id.name}
        designation is ${employeeMaster.designation_id.name}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/employee",employeeMaster)
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshEmployeeMasterForm();
                refreshEmployeeMasterTable();
            }else {
                alert(`Save Unsuccessful \n ${postServerResponse}`);
            }
        }else {
            alert("User Cancelled The Operation")
        }


    }else {
        alert(`You Have Following Errors \n ${errors}`)
    }
}

const refillEmployeeMaster = (ob)=>{

    employeeMaster = JSON.parse(JSON.stringify(ob));
    oldEmployeeMaster = JSON.parse(JSON.stringify(ob));

    textFullName.value=employeeMaster.full_name
    textCallingName.value=employeeMaster.calling_name
    selectDOB.value=employeeMaster.dob
    textNic.value=employeeMaster.nic
    textMobile.value=employeeMaster.mobile
    textLandNo.value=employeeMaster.land_no
    textEmail.value=employeeMaster.email
    textAddress.value=employeeMaster.address

    gendersList=ajaxGetRequest("/gender/findall");
    fillDataIntoSelect(selectGender,"Select Gender",gendersList,'name',employeeMaster.gender_id.name);

    statusesList = ajaxGetRequest("/employeestatus/findall")
    fillDataIntoSelect(selectStatus,"Select Status",statusesList,'name',employeeMaster.employeestatus_id.name);

    designationsList = ajaxGetRequest("/designation/findall")
    fillDataIntoSelect(selectDesignation,"Select Designation",designationsList,'name',employeeMaster.designation_id.name);


    buttonEmployeeUpdate.disabled=false
    buttonEmployeeUpdate.style.cursor="default"


    buttonEmployeeSubmit.disabled=true;
    buttonEmployeeSubmit.style.cursor="not-allowed"

}





const checkUpdatesEmployeeMaster = ()=>{
let updates='';

if (employeeMaster.full_name != oldEmployeeMaster.full_name){
    updates=updates+"Full Name Is Updated \n"
}

if (employeeMaster.calling_name != oldEmployeeMaster.calling_name){
    updates=updates+"Calling Name Is Updated \n"
}

if (employeeMaster.dob != oldEmployeeMaster.dob){
    updates=updates+"Date Of Birth Is Updated \n"
}

if (employeeMaster.nic != oldEmployeeMaster.nic){
    updates=updates+"NIC Is Updated \n"
}

if (employeeMaster.mobile!=oldEmployeeMaster.mobile){
    updates=updates+"Mobile Is Updated \n"
}
if (employeeMaster.land_no!= oldEmployeeMaster.land_no){
    updates=updates+"Land No Is Updated \n"
}

if (employeeMaster.email != oldEmployeeMaster.email){
    updates=updates+"Email Is Updated \n"
}

if (employeeMaster.address != oldEmployeeMaster.address){
    updates=updates+"Address Is Updated \n"
}

if (employeeMaster.gender_id.name!=oldEmployeeMaster.gender_id.name){
    updates=updates+"Gender Is Updated \n"
}

if (employeeMaster.employeestatus_id.name!=oldEmployeeMaster.employeestatus_id.name){
    updates=updates+"Status Is Updated \n"
}

if (employeeMaster.designation_id.name != oldEmployeeMaster.designation_id.name){
    updates=updates+"Designation Is Updated \n"
}

return updates;
}

const updateEmployeeMaster = ()=>{
    let updates = checkUpdatesEmployeeMaster();

    const errors = checkErrorEmployeeMasterForm();
    if (errors==""){
        if (updates!=""){
         const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
         if (userConfirm){
             const putServerResponse = ajaxPutRequest("/employee",employeeMaster);
             if (putServerResponse=="ok"){
                 alert("Update Successful");
                 refreshEmployeeMasterForm();
                 refreshEmployeeMasterTable();
                 divModifyButton.classList.add('d-none');
             }else {
                 alert(`Update Unsuccessful \n ${putServerResponse}`)
             }
         }
        }else {
            alert("nothing to Update");
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`)
    }
    return updates;
}

const deleteEmployeeMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Employee \n
        Full Name Is ${ob.full_name}
        Calling Name Is ${ob.calling_name}
        gender is ${ob.gender_id.name}
        status is ${ob.employeestatus_id.name}
        designation is ${ob.designation_id.name}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/employee",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshEmployeeMasterForm();
            refreshEmployeeMasterTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("Delete Unsuccessful");
        }
    }
}




//need to do print functions (all)
const printOneEmployee = async (ob)=>{
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Detail Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row mt-2 text-center">
        <p style="font-size: 12px; font-weight: bolder">Employee Details</p>
    </div>


    <div class="row">
        <table class="table table-bordered" style="border: 1px solid black; font-size: 11px">
            <thead class="text-center">
                <th style="width: 30%">Properties</th>
                <th>Description</th>
            </thead>
            <tbody>


                <tr>
                    <td>Full Name</td>
                    <td>${ob.full_name}</td>
                </tr>

                <tr>
                    <td>Calling Name</td>
                    <td>${ob.calling_name}</td>
                </tr>

                <tr>
                    <td>Date Of Birth</td>
                    <td>${ob.dob==null?" ":ob.dob}</td>
                </tr>

                <tr>
                    <td>NIC</td>
                    <td>${ob.nic==null?" ":ob.nic}</td>
                </tr>

                <tr>
                    <td>Mobile Number</td>
                    <td>${ob.mobile==null?" ":ob.mobile}</td>
                </tr>

                <tr>
                    <td>Land Number</td>
                    <td>${ob.land_no==null?" ":ob.land_no}</td>
                </tr>
                
                
                <tr>
                    <td>Email</td>
                    <td>${ob.email==null?" ":ob.email}</td>
                </tr>
                
                <tr>
                    <td>Address</td>
                    <td>${ob.address==null?" ":ob.address}</td>
                </tr>
                
                
                <tr>
                    <td>Gender</td>
                    <td>${ob.gender_id.name}</td>
                </tr>
                
                <tr>
                    <td>Status</td>
                    <td>${ob.employeestatus_id.name}</td>
                </tr>
                
                <tr>
                    <td>Designation</td>
                    <td>${ob.designation_id.name}</td>
                </tr>
                
                
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
    `)

    newWindow.stop();
    newWindow.print();
    newWindow.close();
    divModifyButton.classList.add('d-none');

}



const printAllEmployees = async ()=>{
    await loadAllEmployeesToTablePrint();

    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold">All Employees</p>
    </div>

    <div class="row">
        ${employeeTablePrint.outerHTML}
    </div>
</div>
</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();


}






const loadAllEmployeesToTablePrint = ()=>{
    employeeList = ajaxGetRequest("/employee/findall")

    displayProperty=[
        {dataType:'text',propertyName:'full_name'},
        {dataType:'text',propertyName:'calling_name'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'function',propertyName:getEmployeeStatus},
    ];

    fillDataIntoTable(employeeTablePrint,employeeList,displayProperty,false);
}

















