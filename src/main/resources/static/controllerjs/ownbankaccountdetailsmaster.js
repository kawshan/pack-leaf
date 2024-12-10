window.addEventListener('load',function (){


    refreshOwnBankAccountForm();

    refreshOwnBankAccountTable();
});



const refreshOwnBankAccountForm = ()=>{

    ownBankAccount = new Object();

    selectBankShortName.style.border="2px solid #ced4da";
    textBankAccountName.style.border="2px solid #ced4da";
    textBankName.style.border="2px solid #ced4da";
    textBankCode.style.border="2px solid #ced4da";
    textBranchName.style.border="2px solid #ced4da";
    textBranchCode.style.border="2px solid #ced4da";
    textBankAccountNo.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";
    selectOwnBankStatus.style.border="2px solid #ced4da";


    bankShortNames= ajaxGetRequest("/bankshortname/findall");
    fillDataIntoSelect(selectBankShortName,"Select Bank Short Name",bankShortNames,'name');

    ownBankAccountStatuses = ajaxGetRequest("/ownbankaccountstatus/findall");
    fillDataIntoSelect(selectOwnBankStatus,'Select Own Bank Account Status',ownBankAccountStatuses,'name');

    textBankAccountName.value="";
    textBankName.value="";
    textBankCode.value="";
    textBranchName.value="";
    textBranchCode.value="";
    textBankAccountNo.value="";
    textDescription.value="";



    buttonAddOwnBankAccount.style.cursor="default";
    buttonAddOwnBankAccount.disabled=false;

    buttonUpdateOwnBankAccount.style.cursor="not-allowed";
    buttonUpdateOwnBankAccount.disabled=true;

}



const refreshOwnBankAccountTable = ()=>{

    ownBankAccountList = ajaxGetRequest("ownbankaccount/findall");

    displayProperty = [
        {dataType:'function',propertyName:getBankShortName},
        {dataType: 'text',propertyName:'bank_account_name'},
        {dataType: 'text',propertyName:'bank_name'},
        {dataType: 'text',propertyName:'bank_code'},
        {dataType: 'text',propertyName:'branch_name'},
        {dataType: 'text',propertyName:'branch_code'},
        {dataType: 'function',propertyName:getOwnBankAccountStatus},
    ];

    fillDataIntoTable(tableOwnBankAccount,ownBankAccountList,displayProperty,true);


}


const getBankShortName = (ob)=>{
    return `<p>${ob.bankshortname_id.name}</p>`
}

const getOwnBankAccountStatus = (ob)=>{
    return `<p>${ob.ownbankaccountstatus_id.name}</p>`;
}


const checkErrors = ()=>{

    let errors = '';

    if (ownBankAccount.bankshortname_id == null){
        errors=errors+"Bank Short Name Cannot Be Empty \n"
    }
    if (ownBankAccount.bank_account_name == null){
        errors=errors+"Bank Account Cannot Be Empty \n"
    }
    if (ownBankAccount.bank_name == null){
        errors=errors+"Bank Name Cannot Be Empty \n"
    }
    if (ownBankAccount.branch_name == null){
        errors=errors+"Branch Name Cannot Be Empty \n"
    }
    if (ownBankAccount.account_no == null){
        errors=errors+"Account Number Cannot Be Empty \n"
    }
    if (ownBankAccount.ownbankaccountstatus_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    return errors;
}

const submitOwnBankAccountDetails = ()=>{
    const errors = checkErrors();

    if (errors==''){
        const userConfirm = confirm(`Are You Sure To Add Following Own Bank Account Details \n 
        Bank Short Name Is ${ownBankAccount.bankshortname_id.name}
        Bank Account Name Is ${ownBankAccount.bank_account_name}
        Bank Name Is ${ownBankAccount.bank_name}
        Branch Name Is ${ownBankAccount.branch_name}
        Account Number IS ${ownBankAccount.account_no}
        Account Status Is ${ownBankAccount.ownbankaccountstatus_id.name}
        `);

        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/ownbankaccount",ownBankAccount);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshOwnBankAccountForm();
                refreshOwnBankAccountTable();
            }else {
                alert("Save Unsuccessful You Have Some Errors \n"+postServerResponse);
                refreshOwnBankAccountForm();
                refreshOwnBankAccountTable();
            }
        }


    }else {
        alert(`You Have Following Errors \n ${errors}`);
    }

}



const refillOwnBankAccountDetails = (ob,rowIndex)=>{

    ownBankAccount = JSON.parse(JSON.stringify(ob));
    oldOwnbankAccount = JSON.parse(JSON.stringify(ob));


    textBankAccountName.value=ob.bank_account_name
    textBankName.value=ob.bank_name
    textBankCode.value=ob.bank_code
    textBranchName.value=ob.branch_name
    textBranchCode.value=ob.branch_code
    textBankAccountNo.value=ob.account_no
    textDescription.value=ob.bank_description


    fillDataIntoSelect(selectBankShortName,"Select Bank Short Name",bankShortNames,'name',ob.bankshortname_id.name);
    fillDataIntoSelect(selectOwnBankStatus,'Select Own Bank Account Status',ownBankAccountStatuses,'name',ob.ownbankaccountstatus_id.name);

    buttonAddOwnBankAccount.style.cursor="not-allowed";
    buttonAddOwnBankAccount.disabled=true;

    buttonUpdateOwnBankAccount.style.cursor="default";
    buttonUpdateOwnBankAccount.disabled=false;

}



const checkUpdates = ()=>{
    let updates = '';

    if (ownBankAccount.bankshortname_id.name != oldOwnbankAccount.bankshortname_id.name){
        updates=updates+"Bank Short Name Is Updated \n"
    }
    if (ownBankAccount.bank_account_name != oldOwnbankAccount.bank_account_name){
        updates=updates+"Bank Account Name Is Updated \n"
    }
    if (ownBankAccount.bank_name != oldOwnbankAccount.bank_name){
        updates=updates+"Bank Name Is Updated \n"
    }
    if (ownBankAccount.bank_code != oldOwnbankAccount.bank_code){
        updates=updates+"Bank Code Is Updated \n"
    }
    if (ownBankAccount.branch_name != oldOwnbankAccount.branch_name){
        updates=updates+"Branch Name Is Updated \n"
    }
    if (ownBankAccount.branch_code != oldOwnbankAccount.branch_code){
        updates=updates+"Branch Code Is Updated \n"
    }
    if (ownBankAccount.account_no != oldOwnbankAccount.account_no){
        updates=updates+"Account Number Is Updated \n"
    }
    if (ownBankAccount.bank_description != oldOwnbankAccount.bank_description){
        updates=updates+"Bank Description Is Updated \n"
    }
    if (ownBankAccount.ownbankaccountstatus_id.name != oldOwnbankAccount.ownbankaccountstatus_id.name){
        updates=updates+"Status Is Updated \n"
    }
    return updates;
}


const updateOwnBankAccountDetails =()=>{
    let updates = checkUpdates();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm){
            const updateServerResponse = ajaxPutRequest("/ownbankaccount",ownBankAccount);
            if (updateServerResponse=="ok"){
                alert("Update Successful");
                refreshOwnBankAccountTable();
                refreshOwnBankAccountForm();
                divModifyButton.classList.add('d-none');
            }else {
                alert("Update Unsuccessful \n"+updateServerResponse);
            }
        }


    }else {
        alert("Nothing To Update \n");
    }


}


const deleteOwnBankAccountDetails = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Own Bank Account Details \n 
        Bank Short Name Is ${ob.bankshortname_id.name}
        Bank Account Name Is ${ob.bank_account_name}
        Bank Name Is ${ob.bank_name}
        Branch Name Is ${ob.branch_name}
        Account Number IS ${ob.account_no}
        Account Status Is ${ob.ownbankaccountstatus_id.name}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/ownbankaccount",ob);
        if (deleteServerResponse=="ok"){
            alert("delete Successful")
            refreshOwnBankAccountForm();
            refreshOwnBankAccountTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Not Successful \n ${deleteServerResponse}`);
            refreshOwnBankAccountForm();
            refreshOwnBankAccountTable();
        }
    }


}




const printFullOwnBankAccountsTable = async ()=>{

    const newWindow = window.open();
    await loadDataIntoTablePrint();
    await newWindow.document.write(`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>own bank account print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 12px; font-weight: bolder">Bank Details</p>
    </div>
    
    <div class="row">
    ${tableOwnBankAccountPrint.outerHTML}
    </div>


</div>
</body>
</html>    
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();


}


const loadDataIntoTablePrint = ()=>{
    const ownBankAccountList = ajaxGetRequest("ownbankaccount/findall");

    const displayProperty = [
        {dataType:'function',propertyName:getBankShortName},
        {dataType: 'text',propertyName:'bank_account_name'},
        {dataType: 'text',propertyName:'bank_name'},
        {dataType: 'text',propertyName:'bank_code'},
        {dataType: 'text',propertyName:'branch_name'},
        {dataType: 'text',propertyName:'branch_code'},
        {dataType: 'function',propertyName:getOwnBankAccountStatus},
    ];

    fillDataIntoTable(tableOwnBankAccountPrint,ownBankAccountList,displayProperty,false);
}



const oneBankAccountDetailPrint = (ob)=>{
    const newWindow = window.open();
    newWindow.document.write(`
        <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>print one item</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 14px; font-weight: bolder">Account Details</p>
    </div>

    <table class="table table-bordered" style="font-size: 12px">
        <thead>
        <th style="width: 30%">Properties</th>
        <th>Description</th>
        </thead>

        <tbody>

        <tr>
            <td>Bank Short Name</td>
            <td>${ob.bankshortname_id.name}</td>
        </tr>

        <tr>
            <td>Code</td>
            <td>${ob.bank_key}</td>
        </tr>

        <tr>
            <td>Bank Account Name</td>
            <td>${ob.bank_account_name}</td>
        </tr>

        <tr>
            <td>Account Number</td>
            <td>${ob.account_no}</td>
        </tr>

        <tr>
            <td>Bank Name</td>
            <td>${ob.bank_name}</td>
        </tr>

        <tr>
            <td>Bank Code</td>
            <td>${ob.bank_code}</td>
        </tr>

        <tr>
            <td>Branch Name</td>
            <td>${ob.branch_name}</td>
        </tr>

        <tr>
            <td>Branch Code</td>
            <td>${ob.branch_code}</td>
        </tr>

        <tr>
            <td>Bank Description</td>
            <td>${ob.bank_description}</td>
        </tr>

        <tr>
            <td>Bank Account Status</td>
            <td>${ob.ownbankaccountstatus_id.name}</td>
        </tr>
        </tbody>

    </table>
</div>
</body>
</html>
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();

    divModifyButton.classList.add('d-none');
}



























