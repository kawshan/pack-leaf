window.addEventListener('load',function (){

    refreshIssueChequeForm();

    refreshIssueChequeTable();

});



const refreshIssueChequeForm = ()=>{

    issueCheque = new Object();

    textDate.style.border="2px solid #ced4da";
    selectFromAcc.style.border="2px solid #ced4da";
    textChequeNo.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";
    selectIssueChequeStatus.style.border="2px solid #ced4da";
    textAmount.style.border="2px solid #ced4da";


    textDate.value = "";
    textChequeNo.value = "";
    textDescription.value = "";
    textAmount.value = "";

    fromAccountList = ajaxGetRequest("/ownbankaccount/findall");
    fillDataIntoSelect(selectFromAcc,"Select Account",fromAccountList,'account_no')

    issueChequeStatusList = ajaxGetRequest("/issuechequestatus/findall");
    fillDataIntoSelect(selectIssueChequeStatus,'Select Status',issueChequeStatusList,'name');

    divModifyButton.classList.add('d-none');    //refill ekak karala reset karanna  one kiyala user ta hithla karoth iita passe div modify section eka hide venna one nisa
    showAccountsShortName.innerText=""; //bank eke short name eka show karana paragraph tag eka empty karala damma...

    buttonIssueChequeAdd.disabled=false
    buttonIssueChequeAdd.style.cursor="default";

    buttonIssueChequeUpdate.disabled=true;
    buttonIssueChequeUpdate.style.cursor="not-allowed"

}


const refreshIssueChequeTable = ()=>{


    issueChequesList = ajaxGetRequest("/issuecheque/findall");


    displayProperty=[
        {dataType:'text',propertyName:"issue_cheque_date"},
        {dataType:'function',propertyName:getFromAccountShortName},
        {dataType:'text',propertyName:'cheque_number'},
        {dataType:'function',propertyName:getChequeAmount},
        {dataType:'text',propertyName:'description'},
        {dataType:'function',propertyName:getChequeIssueStatus},
    ]

    fillDataIntoTable(issueChequeTable,issueChequesList,displayProperty,true);
    $("#issueChequeTable").dataTable();

}

const getFromAccountShortName = (ob)=>{
    return ob.ownbankaccount_id.bankshortname_id.name;
}


const getChequeIssueStatus = (ob)=>{
    return ob.issuechequestatus_id.name;
}

const getChequeAmount = (ob)=>{
    return `<p class="text-end">${Number(ob.cheque_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}


const checkErrors = ()=>{
    let errors = '';

    if (issueCheque.issue_cheque_date == null){
        errors=errors+"Date Cannot Be Empty \n"
    }
    if (issueCheque.ownbankaccount_id == null){
        errors=errors+"Bank Account Cannot Be Empty \n"
    }
    if (issueCheque.cheque_number == null){
        errors=errors+"Cheque Number Cannot Be Empty \n"
    }
    if (issueCheque.cheque_amount == null){
        errors=errors+"Cheque Amount Cannot Be Empty \n"
    }
    if (issueCheque.issuechequestatus_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    return errors;
}


const saveIssueCheque = ()=>{

    let errors = checkErrors();

    if (errors==''){
        const userConfirm = confirm(`Are You Sure To Add Following Details \n
        Date Is ${issueCheque.issue_cheque_date}
        Short Name Is ${issueCheque.ownbankaccount_id.bankshortname_id.name}
        Cheque Number Is ${issueCheque.cheque_number}
        Cheque Amount Is ${issueCheque.cheque_amount}
        Status Is ${issueCheque.issuechequestatus_id.name}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/issuecheque",issueCheque);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshIssueChequeTable();
                refreshIssueChequeForm();
            }else {
                alert(`Save Not Complete \n ${postServerResponse}`);
            }
        }


    }else {
        alert(`You Have Some Errors \n ${errors}`)
    }

}


const refillIssueCheque = (ob)=>{


    issueCheque = JSON.parse(JSON.stringify(ob));
    oldIssueCheque = JSON.parse(JSON.stringify(ob));


    textDate.value = ob.issue_cheque_date;
    textChequeNo.value = ob.cheque_number;
    textDescription.value = ob.description;
    textAmount.value = ob.cheque_amount;

    fillDataIntoSelect(selectFromAcc,"Select Account",fromAccountList,'account_no',ob.ownbankaccount_id.account_no);
    fillDataIntoSelect(selectIssueChequeStatus,'Select Status',issueChequeStatusList,'name',ob.issuechequestatus_id.name);


    buttonIssueChequeAdd.disabled=true;
    buttonIssueChequeAdd.style.cursor="not-allowed";

    buttonIssueChequeUpdate.disabled=false;
    buttonIssueChequeUpdate.style.cursor="default";


}


const checkUpdates = ()=>{
    let updates='';

    if (issueCheque.issue_cheque_date != oldIssueCheque.issue_cheque_date){
        updates=updates+"Cheque Date Is Updated \n";
    }
    if (issueCheque.ownbankaccount_id.account_no != oldIssueCheque.ownbankaccount_id.account_no){
        updates=updates+"Account Is Updated \n"
    }
    if (issueCheque.cheque_number != oldIssueCheque.cheque_number){
        updates=updates+"Cheque Number Is Updated \n"
    }
    if (issueCheque.cheque_amount != oldIssueCheque.cheque_amount){
        updates=updates+"Cheque Amount Is Updated \n"
    }
    if (issueCheque.description != oldIssueCheque.description){
        updates=updates+"Description Is Updated \n"
    }
    if (issueCheque.issuechequestatus_id.name != oldIssueCheque.issuechequestatus_id.name){
        updates=updates+"Status Is Updated \n"
    }

    return updates;
}


const updateIssueCheque = ()=>{

    let updates = checkUpdates();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/issuecheque",issueCheque)
            if (putServerResponse=="ok"){
                alert("update Successful \n");
                refreshIssueChequeForm();
                refreshIssueChequeTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert(`update Unsuccessful \n ${putServerResponse}`)
                refreshIssueChequeForm();
                refreshIssueChequeTable();
            }
        }


    }else {
        alert("Nothing To Update \n")
    }



}


const deleteIssueCheque = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Issue Note \n
        Date Is ${ob.issue_cheque_date}
        Short Name Is ${ob.ownbankaccount_id.bankshortname_id.name}
        Cheque Number Is ${ob.cheque_number}
        Amount Is ${ob.cheque_amount}
        Status Is ${ob.issuechequestatus_id.name}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/issuecheque",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshIssueChequeForm();
            refreshIssueChequeTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
            refreshIssueChequeForm();
            refreshIssueChequeTable();

        }
    }

}


const printFullTable = async ()=>{
    await loadDateIntoTablePrint();
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cheque Issue Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row mt-5 text-center">
        <p style="font-size: 14px; font-weight: bolder">Cheque Issue Details</p>
    </div>

    <div class="row">
        ${issueChequeTablePrint.outerHTML}
    </div>



</div>
</body>
</html>
    
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();

}


const loadDateIntoTablePrint = ()=>{
    issueChequesList = ajaxGetRequest("/issuecheque/findall");


    displayProperty=[
        {dataType:'text',propertyName:"issue_cheque_date"},
        {dataType:'function',propertyName:getFromAccountShortName},
        {dataType:'text',propertyName:'cheque_number'},
        {dataType:'function',propertyName:getChequeAmount},
        {dataType:'text',propertyName:'description'},
        {dataType:'function',propertyName:getChequeIssueStatus},
    ];

    fillDataIntoTable(issueChequeTablePrint,issueChequesList,displayProperty,false);
}




const printOneIssueCheque = async (ob)=>{

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
                    <td>Issue Code</td>
                    <td>${ob.issue_cheque_code}</td>
                </tr>

                <tr>
                    <td>Date</td>
                    <td>${ob.issue_cheque_date}</td>
                </tr>

                <tr>
                    <td>From Account</td>
                    <td>${ob.ownbankaccount_id.bankshortname_id.name}</td>
                </tr>

                <tr>
                    <td>Cheque Number</td>
                    <td>${ob.cheque_number}</td>
                </tr>


                <tr>
                    <td>Amount</td>
                    <td>${Number(ob.cheque_amount).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})}</td>
                </tr>

                <tr>
                    <td>Description</td>
                    <td>${ob.description == null ? " " : ob.description}</td>
                </tr>

                <tr>
                    <td>Status</td>
                    <td>${ob.issuechequestatus_id.name}</td>
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

const showShortName = (fieldId)=>{
    const selectedValue = JSON.parse(fieldId.value);
    console.log(selectedValue.bankshortname_id.name);
    showAccountsShortName.innerText="";
    showAccountsShortName.innerText=`Bank Short Name Is ${selectedValue.bankshortname_id.name}`;


}











