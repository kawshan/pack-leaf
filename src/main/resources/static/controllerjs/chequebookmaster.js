window.addEventListener('load',function (){

    refreshChequeBookMasterForm();

    refreshChequeBookMasterTable();

});



const refreshChequeBookMasterForm = ()=>{

    chequeBookMaster = new Object();

    selectBankShortName.style.border="2px solid #ced4da";
    textRunningNumber.style.border="2px solid #ced4da";
    textNumberOfChecks.style.border="2px solid #ced4da";
    textStartNumber.style.border="2px solid #ced4da";
    textEndNumber.style.border="2px solid #ced4da";
    selectStatus.style.border="2px solid #ced4da";

    textRunningNumber.value="";
    textNumberOfChecks.value="";
    textStartNumber.value="";
    textEndNumber.value="";


    bankShortNamesList = ajaxGetRequest("/bankshortname/findall");
    fillDataIntoSelect(selectBankShortName,'Select Bank Short Name',bankShortNamesList,'name');

    chequeBookStatusesList = ajaxGetRequest("/checkbookstatus/findall");
    fillDataIntoSelect(selectStatus,'Select Status',chequeBookStatusesList,'name');

    getMaxRunningNumber();


    buttonChequeBookAdd.disabled=false;
    buttonChequeBookAdd.style.cursor="default";

    buttonChequeBookUpdate.disabled=true;
    buttonChequeBookUpdate.style.cursor="not-allowed";

}


const refreshChequeBookMasterTable = ()=>{

    chequeBookMasterList = ajaxGetRequest("/checkbookmaster/findall");

    displayProperty=[
        {dataType:'function',propertyName:getBankShortName},
        {dataType:'text',propertyName:'running_number'},
        {dataType:'function',propertyName:getNumberOfCheques},
        {dataType:'function',propertyName:getStartNumber},
        {dataType:'function',propertyName:getEndNumber},
        {dataType:'function',propertyName:getChequeBookMasterStatus},
    ];

    fillDataIntoTable(tableChequeBookMaster,chequeBookMasterList,displayProperty,true);
    $("#tableChequeBookMaster").dataTable();
}

const getBankShortName = (ob)=>{
    return ob.bankshortname_id.name;
}

const getNumberOfCheques = (ob)=>{
    return `<p class="text-end">${ob.number_of_checks}</p>`
}

const getStartNumber = (ob)=>{
    return `<p class="text-end">${ob.start_number}</p>`
}

const getEndNumber = (ob)=>{
    return `<p class="text-end">${ob.end_number}</p>`
}

const getChequeBookMasterStatus = (ob)=>{
    // return ob.checkbookmasterstatus_id.name;
    if (ob.checkbookmasterstatus_id.name=="active"){
        return `<p class="text-center" style="color: green; font-weight: bold">Active</p>`
    }
    if (ob.checkbookmasterstatus_id.name=="inactive"){
        return `<p class="text-center" style="color: orange; font-weight: bold">Inactive</p>`
    }
    if (ob.checkbookmasterstatus_id.name=="delete"){
        return `<p class="text-center" style="color: red; font-weight: bold">Delete</p>`
    }
}

const checkErrors = ()=>{
    let errors= '';

    if (chequeBookMaster.bankshortname_id == null){
        errors=errors+"Bank Short Name Cannot Be Empty \n"
    }
    if (chequeBookMaster.number_of_checks==null){
        errors=errors+"Number Of Cheques Cannot Be Empty \n"
    }
    if (chequeBookMaster.start_number == null){
        errors=errors+"Start Number Cannot Be Empty \n"
    }
    if (chequeBookMaster.end_number == null){
        errors=errors+"End Number Cannot Be Empty \n"
    }
    if (chequeBookMaster.checkbookmasterstatus_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    return errors;
}


const submitCheque = ()=>{
    const errors = checkErrors();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following Cheque Book Details \n
        Bank Short Name Is ${chequeBookMaster.bankshortname_id.name}
        Running Number Is ${chequeBookMaster.running_number}
        Number Of Cheques Are ${chequeBookMaster.number_of_checks}
        Start Number Is ${chequeBookMaster.start_number}
        End Number Is ${chequeBookMaster.end_number}
        Status Is ${chequeBookMaster.checkbookmasterstatus_id.name}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/checkbookmaster",chequeBookMaster);
            if (postServerResponse=="ok"){
                alert("Save Success");
                refreshChequeBookMasterForm();
                refreshChequeBookMasterTable();
            }else {
                alert(`Save Not Success \n ${postServerResponse}`)
            }
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`);
    }
}


const refillChequeBookMaster = (ob)=>{
    chequeBookMaster = JSON.parse(JSON.stringify(ob));
    oldChequeBookMaster = JSON.parse(JSON.stringify(ob));

    textRunningNumber.value=ob.running_number;
    textNumberOfChecks.value=ob.number_of_checks;
    textStartNumber.value=ob.start_number;
    textEndNumber.value=ob.end_number;


    fillDataIntoSelect(selectBankShortName,'Select Bank Short Name',bankShortNamesList,'name',ob.bankshortname_id.name);
    fillDataIntoSelect(selectStatus,'Select Status',chequeBookStatusesList,'name',ob.checkbookmasterstatus_id.name);


    buttonChequeBookAdd.disabled=true;
    buttonChequeBookAdd.style.cursor="not-allowed";

    buttonChequeBookUpdate.disabled=false;
    buttonChequeBookUpdate.style.cursor="default";


}





const checkUpdates = ()=>{
    let updates = "";

    if (chequeBookMaster.bankshortname_id.name != oldChequeBookMaster.bankshortname_id.name){
        updates=updates+"Short Name Is Updated \n"
    }
    if (chequeBookMaster.number_of_checks != oldChequeBookMaster.number_of_checks){
        updates=updates+"Number Of Cheques Are Updated \n"
    }
    if (chequeBookMaster.start_number != oldChequeBookMaster.start_number){
        updates=updates+"Start Number Is Updated \n"
    }
    if (chequeBookMaster.end_number != oldChequeBookMaster.end_number){
        updates=updates+"End Number Is Updated \n"
    }
    if (chequeBookMaster.checkbookmasterstatus_id.name != oldChequeBookMaster.checkbookmasterstatus_id.name){
        updates=updates+"Status Is Updated \n"
    }




    return updates;
}



const updateChequeBookMaster = ()=>{
    let updates = checkUpdates();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/checkbookmaster",chequeBookMaster);
            if (putServerResponse=="ok"){
                alert("Update Success");
                refreshChequeBookMasterForm();
                refreshChequeBookMasterTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert("Update unsuccessful \n"+putServerResponse);
            }
        }
    }else {
        alert("Nothing To Update");
    }
}


const deleteCheckBookMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Check Book Master \n
        Bank Short Name Is ${ob.bankshortname_id.name}
        Running Number Is ${ob.running_number}
        Number Of Cheques Are ${ob.number_of_checks}
        Start Number Is ${ob.start_number}
        End Number Is ${ob.end_number}
        Status Is ${ob.checkbookmasterstatus_id.name}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/checkbookmaster",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshChequeBookMasterForm();
            refreshChequeBookMasterTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("Delete Unsuccessful");
            refreshChequeBookMasterForm();
            refreshChequeBookMasterTable()
        }
    }
}



const printAllChequeBooks = async ()=>{

    await refreshChequeBookMasterTablePrint();
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cheque Book Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row mt-5 text-center">
        <p style="font-size: 14px; font-weight: bolder">Cheque Book Details</p>
    </div>
    
    <div class="row">
        ${tableChequeBookMasterPrint.outerHTML}
    </div>



</div>
</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();


}


const refreshChequeBookMasterTablePrint = ()=>{

    chequeBookMasterList = ajaxGetRequest("/checkbookmaster/findall");

    displayProperty=[
        {dataType:'function',propertyName:getBankShortName},
        {dataType:'text',propertyName:'running_number'},
        {dataType:'function',propertyName:getNumberOfCheques},
        {dataType:'function',propertyName:getStartNumber},
        {dataType:'function',propertyName:getEndNumber},
        {dataType:'function',propertyName:getChequeBookMasterStatus},
    ];

    fillDataIntoTable(tableChequeBookMasterPrint,chequeBookMasterList,displayProperty,false);

}



const printOneChequeBook = async (ob)=>{
    const newWindow = window.open();
    await newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>cheque book print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row mt-5 text-center">
        <p style="font-size: 12px; font-weight: bolder">Cheque Book Detail</p>
    </div>


    <div class="row">
        <table class="table table-bordered" style="border: 1px solid black; font-size: 11px">
            <thead class="text-center">
                <th style="width: 30%">Properties</th>
                <th>Description</th>
            </thead>
            <tbody>


                <tr>
                    <td>Bank Short Name</td>
                    <td>${ob.bankshortname_id.name}</td>
                </tr>

                <tr>
                    <td>Running Number</td>
                    <td>${ob.running_number}</td>
                </tr>

                <tr>
                    <td>Number Of Cheque</td>
                    <td>${ob.number_of_checks}</td>
                </tr>


                <tr>
                    <td>Start Number</td>
                    <td>${ob.start_number}</td>
                </tr>

                <tr>
                    <td>End Number</td>
                    <td>${ob.end_number}</td>
                </tr>

                <tr>
                    <td>Check Book Status</td>
                    <td>${ob.checkbookmasterstatus_id.name}</td>
                </tr>
            </tbody>
        </table>
    </div>



</div>
</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();

    divModifyButton.classList.add('d-none');
}



const getMaxRunningNumber = ()=>{
    const getServerResponse = ajaxGetRequest("/checkbookmaster/getmaxrunningnumber");
    console.log(`max running number from server ${getServerResponse}`);

    textRunningNumber.value = getServerResponse
    chequeBookMaster.running_number = getServerResponse;



}




















