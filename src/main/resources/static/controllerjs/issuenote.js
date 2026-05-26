window.addEventListener('load',function (){



    refreshIssueNoteHeaderTable();



    refreshIssueNoteDetailForm();

    refreshIssueNoteHeader();
});

//issue note header section is Started
const refreshIssueNoteHeader = ()=>{

    issueNoteHeader = new Object();

    selectJob.style.border="2px solid #ced4da";
    textIssueNoteNo.style.border="2px solid #ced4da";
    textIssueNoteDate.style.border="2px solid #ced4da";



    displayIssueNoteKey.value="";
    textIssueNoteNo.value="";
    textIssueNoteDate.value="";

    jobList = ajaxGetRequest("/jobmaster/findall");
    fillDataIntoDataList(dataListJobs,jobList,'jobnumber');

    divModifyButton.classList.add('d-none');    //reset button ekedith me function eka call karana nisa meka add kare.. reaseon eka thama reset karahama me button 3 th hide venna one nisa-> specific reason-> when user refill issue note header section is also view the table then user can do changes and then finish the task with out reloading the whole page
    cardIssueNoteDetailForTable.classList.add('d-none');
    divModifyButtonIssueNoteDetail.classList.add('d-none');

    //details section eke thiyena button 2 disable karanawa
    buttonIssueNoteDetailAdd.disabled=true;
    buttonIssueNoteDetailAdd.style.cursor="not-allowed";


    buttonIssueNoteDetailUpdate.disabled=true;
    buttonIssueNoteDetailUpdate.style.cursor="not-allowed";

    getMaxIssueNoteNumber();

}

const changeColoursInIssueNoteHeader = ()=>{
    selectJob.style.border="2px solid #ced4da";
    textIssueNoteNo.style.border="2px solid #ced4da";
    textIssueNoteDate.style.border="2px solid #ced4da";
}



const refreshIssueNoteHeaderTable = ()=>{

    issueNoteList = ajaxGetRequest("/issuenoteheader/findall");

    displayProperty=[
        {dataType:'function', propertyName:getJobNumber},
        {dataType:'text', propertyName:'issuenotenumber'},
        {dataType:'text', propertyName:'issuenotedate'},
    ];

    fillDataIntoTable(issueNoteHeaderTable,issueNoteList,displayProperty,true);
    $("#issueNoteHeaderTable").dataTable();
}


const getJobNumber = (ob)=>{
    if (ob.jobmaster_id == null){
        return "";
    }else {
        return ob.jobmaster_id.jobnumber;
    }
}


const checkErrorIssueNoteHeader = ()=>{
    let errors = "";


    // if (issueNoteHeader.jobmaster_id == null){
    //     errors=errors+"Job Cannot Be Empty \n"
    // }
    if (issueNoteHeader.issuenotenumber == null){
        errors=errors+"Issue Note Number Cannot Be Empty \n"
    }
    if (issueNoteHeader.issuenotedate == null){
        errors=errors+"Date Cannot Be Empty \n"
    }
    return errors;
}



const submitIssueNoteHeader = async ()=>{
    if (displayIssueNoteKey.value==""){
        console.log(`save part`);

        let errors = checkErrorIssueNoteHeader();
        if (errors==""){
            const userConfirm = confirm(`Are You Sure To Add Following Details \n
            Issue Note Number Is ${issueNoteHeader.issuenotenumber}
            Date Is ${issueNoteHeader.issuenotedate}
            `);
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/issuenoteheader",issueNoteHeader);
                if (postServerResponse&&postServerResponse.headerkey){
                    alert("Save Successful");
                    displayIssueNoteKey.value=postServerResponse.headerkey;
                    refreshIssueNoteHeaderTable();
                    changeColoursInIssueNoteHeader();

                    //add button ekayi warning message ekayi enable karanwa
                    buttonIssueNoteDetailAdd.disabled=false;
                    buttonIssueNoteDetailAdd.style.cursor="default";
                    warningMessageInIssueNoteDetailsSection.classList.add('d-none');
                }else {
                    alert(`Save Unsuccessful \n ${postServerResponse}`);
                }
            }else {
                alert(`User Cancelled the Operation`);
            }



        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }




    }else {
        console.log(`update part`);
        const errors = checkErrorIssueNoteHeader();
        if (errors==""){


            //get id from server using header key
            const getIdFromServer = await ajaxGetRequest("/issuenoteheader/getidfromheaderkey/"+displayIssueNoteKey.value);
            console.log(getIdFromServer);
            //id binding to the object
            issueNoteHeader.id=getIdFromServer;

            //header key binding to the object
            issueNoteHeader.headerkey = displayIssueNoteKey.value



            const userConfirm = confirm(`Are You Sure To Update Following 
            Job Number Is ${issueNoteHeader.jobmaster_id.jobnumber}
            Issue Note Number Is ${issueNoteHeader.issuenotenumber}
            Date Is ${issueNoteHeader.issuenotedate}
            Header Key is ${issueNoteHeader.headerkey}
            Id Is ${issueNoteHeader.id}
            `);
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/issuenoteheader",issueNoteHeader);
                if (putServerResponse=="ok"){
                    alert("Update Successful");
                    refreshIssueNoteHeaderTable();
                    changeColoursInIssueNoteHeader();
                    divModifyButton.classList.add('d-none');
                }else {
                    alert(`Error Happened \n ${putServerResponse}`);
                }
            }else {
                alert("User Cancelled The Operation")
            }
        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }
    }
}


const refillIssueNoteHeader = (ob,rowIndex)=>{

    issueNoteHeader = JSON.parse(JSON.stringify(ob));
    oldissueNoteHeader = JSON.parse(JSON.stringify(ob));

    displayIssueNoteKey.value = issueNoteHeader.headerkey;
    textIssueNoteNo.value = issueNoteHeader.issuenotenumber;
    textIssueNoteDate.value = issueNoteHeader.issuenotedate;

    if (issueNoteHeader.jobmaster_id == null){

    }else {
        selectJob.value = issueNoteHeader.jobmaster_id.jobnumber;
    }




    // idk why i put this shitty code in here ..... must be stupid ass customer requirement
    // fillDataIntoSelect(selectJob,'Select Job Number',jobList,'jobnumber',ob.jobmaster_id.jobnumber);
    //
    //
    // //value ekatath bind karanna one
    // issueNoteHeader.headerkey = displayIssueNoteKey.value;
    // issueNoteHeader.issuenotenumber = textIssueNoteNo.value;
    // issueNoteHeader.issuenotedate = textIssueNoteDate.value;

    // let selectedJob = JSON.parse(selectJob.value);
    // issueNoteHeader.jobmaster_id = selectedJob;

    refreshIssueNoteDetailTable() //header eke key eka aran details table ekath fill karanna one nisa meke call kare.

    warningMessageInIssueNoteDetailsSection.classList.add('d-none');

    refreshIssueNoteDetailForm();
}



const deleteIssueNoteHeader = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Issue Note \n
        Issue Note Number ${ob.issuenotenumber}
        Issue Note Date ${ob.issuenotedate}
    `);

    if (userConfirm){
        const deleteServerResponse =ajaxDeleteRequest("/issuenoteheader",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshIssueNoteHeaderTable();
            divModifyButton.classList.add('d-none');
        }
    }else {
        alert(`User Cancelled The Operation`)
    }



}


const issueNoteHeaderPrint = async (ob,rowIndex)=>{

   await fillDataIntoTablePrint(ob.headerkey);

    const newWindow = window.open();
    await newWindow.document.write(
        `
        <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Issue Note Print</title>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row">
        <div class="col-12 text-center"><h3>Issue Note</h3></div>
    </div>

    <div class="row mt-2">
        <div class="col-3"></div>
        <div class="col-5"></div>
        <div class="col-4">
            <table class="table table-bordered" style="border: 1px solid black">
                <tbody>
                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">Job Number</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.jobmaster_id == null ? "" : ob.jobmaster_id.jobnumbe}</td>
                </tr>
                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">Issue Note Number</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.issuenotenumber}</td>
                </tr>

                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">Date</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.issuenotedate}</td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>

    <div class="row" style="margin: 2px">
    ${tableIssueNoteDetailForPrint.outerHTML}
    </div>


</div>

<div style="position: absolute; bottom: 1%; width: 100%" >
    <!--  prepared by, checked by, recieved by area start   -->
    <div class="row">
        <div class="col-4 text-start">
            _____________
            <p style="font-size: 11px">Prepared By</p>
        </div>
        <div class="col-4 text-center">
            _____________
            <p style="font-size: 11px">Received By</p>
        </div>
        <div class="col-4 text-end">
            _____________
            <p style="font-size: 11px; margin-right: 3px">Checked By</p>
        </div>
    </div>
    <!--  prepared by, checked by, recieved by area end   -->
</div>



</body>
</html>
        `
    );
    newWindow.stop();
    newWindow.print();
    newWindow.close();



}

const getMaxIssueNoteNumber = ()=>{
    const getMaxIssueNoteFromServer = ajaxGetRequest("/issuenoteheader/getmaxissuenotenumber");

    textIssueNoteNo.value = Number(getMaxIssueNoteFromServer);
    issueNoteHeader.issuenotenumber = textIssueNoteNo.value;
    textIssueNoteNo.style.border="2px solid green";


}

const handelResetButton = ()=>{
    refreshIssueNoteHeader(); //header form eka refresh kara
    refreshIssueNoteHeaderTable(); //header table eka refresh kara

    getMaxIssueNoteNumber(); //max number eka ganna function eka call kara

    refreshIssueNoteDetailForm()    //detail form eka refresh kara
    cardIssueNoteDetailForTable.classList.add('d-none'); //details table eka hide kara
}



//issue note header section is finished



//issue note detail section start

const refreshIssueNoteDetailForm = ()=>{

    issueNoteDetail = new Object();

    selectRawMaterial.style.border="2px solid #ced4da";
    txtQty.style.border="2px solid #ced4da";
    txtDescription=document.getElementById("txtDescription");
    txtDescription.style.border="2px solid #ced4da";
    selectRawMaterial.style.border="2px solid #ced4da";

    txtQty.value="";
    txtDescription.value="";
    selectRawMaterial.value="";

    rawmaterialList = ajaxGetRequest("/rawmaterial/findall");
    fillDataIntoDataList(dataListItemName,rawmaterialList,'rmname');


    //add button eka enable karanwa update eka disable karanawa
    buttonIssueNoteDetailAdd.disabled=false;
    buttonIssueNoteDetailAdd.style.cursor="default";


    buttonIssueNoteDetailUpdate.disabled=true;
    buttonIssueNoteDetailUpdate.style.cursor="not-allowed";
}


const refreshIssueNoteDetailTable = ()=>{

    cardIssueNoteDetailForTable.classList.remove('d-none');

    issueNoteDetailList = ajaxGetRequest(`/issuenotedetail/getallissuenotefromheaderkey/${displayIssueNoteKey.value}`);//find all eka venuwate header eken key eka aran ekata adla dewal vitharayi pennnanna one

    const displayProperty = [
        {dataType:'function',propertyName:getRawMaterial},
        {dataType: 'function',propertyName:getItemQuantity},
        {dataType: 'text',propertyName:'description'}
    ];

    fillDataIntoTable2(tableIssueNoteDetail,issueNoteDetailList,displayProperty,true,divModifyButtonIssueNoteDetail)

}

const getRawMaterial = (ob)=>{
    return ob.rawmaterial_id.rmname;
}

const getItemQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.quantity).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}</p>`
}


const checkErrorIssueNoteDetail = ()=>{
    let errors = "";

    if (issueNoteDetail.rawmaterial_id == null){
        errors=errors+"Raw Material Cannot Be Empty \n"
    }
    if (issueNoteDetail.quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }

    return errors;
}

const submitIssueNoteDetail = ()=>{
    let errors = checkErrorIssueNoteDetail();

    issueNoteDetail.issuenoteheader = displayIssueNoteKey.value

    if (errors==""){
        const userConfirm = confirm(`Are You Sure to Add Following Issue Note Detail \n
        Raw Material Is ${issueNoteDetail.rawmaterial_id.rmname}
        Quantity is ${issueNoteDetail.quantity}
        Header Is ${issueNoteDetail.issuenoteheader}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/issuenotedetail",issueNoteDetail);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshIssueNoteDetailTable();
                refreshIssueNoteDetailForm();
            }else {
                alert("Save Unsuccessful")
            }
        }else {
            alert("User cancelled The Operation")
        }
    }



}

const issueNoteDetailRefillForm = (ob)=>{
    issueNoteDetail = JSON.parse(JSON.stringify(ob));
    oldIssueNoteDetail = JSON.parse(JSON.stringify(ob));

    txtQty.value=ob.quantity;
    txtDescription.value = ob.description;
    selectRawMaterial.value = ob.rawmaterial_id.rmname;

    //add button eka disable karanla update button eka enable karanna one
    buttonIssueNoteDetailAdd.disabled=true;
    buttonIssueNoteDetailAdd.style.cursor="not-allowed";

    buttonIssueNoteDetailUpdate.disabled=false;
    buttonIssueNoteDetailUpdate.style.cursor="default";

}



const checkUpdatesIssueNoteDetail = ()=>{
    let updates = ""

    if (issueNoteDetail.rawmaterial_id.rmname != oldIssueNoteDetail.rawmaterial_id.rmname){
        updates=updates+"Raw Material Is Updated \n"
    }
    if (issueNoteDetail.quantity != oldIssueNoteDetail.quantity){
        updates=updates+"Quantity Is Updated \n"
    }
    if (issueNoteDetail.description != oldIssueNoteDetail.description){
        updates=updates+"Description Is Updated \n"
    }
    return updates;
}

const updateIssueNoteDetail = ()=>{
    let updates = checkUpdatesIssueNoteDetail();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Add Following Updates \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/issuenotedetail",issueNoteDetail)
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshIssueNoteDetailTable();
                refreshIssueNoteDetailForm();
                divModifyButtonIssueNoteDetail.classList.add('d-none');
            }else {
                alert(`Error Happened ${putServerResponse}`);
            }
        }else {
            alert("User Cancelled the Operation")
        }
    }else {
        alert(`Nothing To Update`)
    }



}


const deleteIssueNoteDetail = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure to delete following Issue Note Detail \n
    Raw Material Is ${ob.rawmaterial_id.rmname}
    Quantity is ${ob.quantity}
    Header Is ${ob.issuenoteheader}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/issuenotedetail",ob)
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshIssueNoteDetailTable();
            divModifyButtonIssueNoteDetail.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
            refreshIssueNoteDetailTable();
        }
    }else {
        alert(`User Cancelled The Operation`)
    }
}




const fillDataIntoTablePrint = (headerKeyFromIssueNoteHeader)=>{
    const issueNoteDetailListForPrint = ajaxGetRequest(`/issuenotedetail/getallissuenotefromheaderkey/${headerKeyFromIssueNoteHeader}`);

    const displayProperty = [
        {dataType:'function',propertyName:getRawMaterial},
        {dataType: 'text',propertyName:'description'},
        {dataType: 'function',propertyName:getItemQuantity}
    ];

    fillDataIntoTable2(tableIssueNoteDetailForPrint,issueNoteDetailListForPrint,displayProperty,false)
}































