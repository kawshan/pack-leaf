window.addEventListener('load',function (){

    refreshIssueChequeForm();

    refreshIssueChequeTable();

});



const refreshIssueChequeForm = ()=>{

    issueCheque = new Object();

    textDate.style.border="2px solid #ced4da";
    textChequeDate.style.border="2px solid #ced4da";
    selectFromAcc.style.border="2px solid #ced4da";
    textChequeNo.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";
    selectIssueChequeStatus.style.border="2px solid #ced4da";
    textAmount.style.border="2px solid #ced4da";


    textDate.value = "";
    textChequeDate.value = "";
    textChequeNo.value = "";
    textDescription.value = "";
    textAmount.value = "";

    fromAccountList = ajaxGetRequest("/ownbankaccount/findall");
    fillDataIntoSelect(selectFromAcc,"Select Account",fromAccountList,'bank_short_name');

    issueChequeStatusList = ajaxGetRequest("/issuechequestatus/findall");
    fillDataIntoSelect(selectIssueChequeStatus,'Select Status',issueChequeStatusList,'name');

    divModifyButton.classList.add('d-none');    //refill ekak karala reset karanna  one kiyala user ta hithla karoth iita passe div modify section eka hide venna one nisa

    buttonIssueChequeAdd.disabled=false;
    buttonIssueChequeAdd.style.cursor="default";

    buttonIssueChequeUpdate.disabled=true;
    buttonIssueChequeUpdate.style.cursor="not-allowed";

}


const refreshIssueChequeTable = ()=>{


    issueChequesList = ajaxGetRequest("/issuecheque/findall");


    displayProperty=[
        {dataType:'text',propertyName:"issue_cheque_date"},
        {dataType:'text',propertyName:"cheque_date"},
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
    return ob.ownbankaccount_id.bank_short_name;
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
        errors=errors+"Issue Date Cannot Be Empty \n"
    }
    if (issueCheque.cheque_date == null){
        errors=errors+"Cheque Date Cannot Be Empty \n"
    }
    if (issueCheque.ownbankaccount_id == null){
        errors=errors+"Bank Short Name Cannot Be Empty \n"
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
        Issue Date Is ${issueCheque.issue_cheque_date}
        Cheque Date Is ${issueCheque.cheque_date}
        Short Name Is ${issueCheque.ownbankaccount_id.bank_short_name}
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
    textChequeDate.value = ob.cheque_date;
    textChequeNo.value = ob.cheque_number;
    textDescription.value = ob.description;
    textAmount.value = ob.cheque_amount;

    fillDataIntoSelect(selectFromAcc,"Select Account",fromAccountList,'bank_short_name',ob.ownbankaccount_id.bank_short_name);
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
    if (issueCheque.cheque_date != oldIssueCheque.cheque_date){
        updates=updates+"Cheque Date Is Updated \n";
    }
    if (issueCheque.ownbankaccount_id.bank_short_name != oldIssueCheque.ownbankaccount_id.bank_short_name){
        updates=updates+"Short Name Is Updated \n"
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
        Issue Date Is ${ob.issue_cheque_date}
        Cheque Date Is ${ob.cheque_date}
        Short Name Is ${ob.ownbankaccount_id.bank_short_name}
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
        {dataType:'text',propertyName:"cheque_date"},
        {dataType:'function',propertyName:getFromAccountShortName},
        {dataType:'text',propertyName:'cheque_number'},
        {dataType:'function',propertyName:getChequeAmount},
        {dataType:'text',propertyName:'description'},
        {dataType:'function',propertyName:getChequeIssueStatus},
    ];

    fillDataIntoTable(issueChequeTablePrint,issueChequesList,displayProperty,false);
}




const printOneIssueCheque = async (ob)=>{

    const date = new Date(ob.cheque_date);
    const formattedDate = date.getDate().toString().padStart(2,'0')+
        (date.getMonth()+1).toString().padStart(2,'0')+
        '  '+
        date.getFullYear().toString().slice(-2);
    console.log(formattedDate);


    let dollars = Math.floor(ob.cheque_amount);
    let cents = Math.round((ob.cheque_amount-dollars)*100);

    let words = numberToWords.toWords(dollars)+" rupees"
    if (cents>0){
        words+=" and "+numberToWords.toWords(cents)+" cents";
    }

    words+=" only"

    const wordsArray = words.split('rupees');
    console.log(wordsArray[0])
    console.log(wordsArray[1])

    console.log(words);

    const newWindow = window.open();
    await newWindow.document.write(`

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheque Printing</title>
    <style>
        @media print {
            @page {
                size: 17.8cm 8.9cm; /* Set cheque size */
                margin: 0;
            }
            body {
                width: 17.8cm;
                height: 3in;
            }
            .cheque-container {
                padding: 10px;
                font-family: Arial, sans-serif;
                position: relative;
                width: 7.5in;
                height: 3in;
            }
            .field {
                position: absolute;
                font-size: 14px;
            }
            .date { top: 1cm; right: 1px; }
            .payee { top: 2.5cm; left: 110px; }
            .amount { top: 4cm; right: 40px;}
            .amount-text { top: 4cm; left: 110px;}
        }
    </style>
</head>
<body>

    <div class="cheque-container">
        <div class="field date" style="font-family: Verdana; font-size: 12px; letter-spacing: 20px">${formattedDate}</div>
        <div class="field payee" style="font-family: Verdana; font-size: 12px">${ob.description==null?" ":ob.description}</div>
        <div class="field amount" style="font-family: Verdana; font-size: 12px">**${ob.cheque_amount.toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})}**</div>
        <div class="field amount-text" style="font-size: 12px; font-family: Verdana"><p>${wordsArray[0]}</p><p>${wordsArray[1]}</p></div>
        
    </div>

</body>
</html>


    `)

    newWindow.stop();
    newWindow.print();
    newWindow.close();

    divModifyButton.classList.add('d-none');

}












