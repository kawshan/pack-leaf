window.addEventListener('load',function (){

    //form eka refresh karana function eka call kara
    refreshOurPoActivationForm();


    //table eka refersh karana function eka call kara
    refreshOurPoActivationTable();






})


const refreshOurPoActivationForm = ()=>{

    ourPoActivation = new Object();

    selectActivationStatus.value="";

    selectOurPo.style.border="2px solid #ced4da";
    selectActivationStatus.style.border="2px solid #ced4da";

    ourPoList = ajaxGetRequest("/ourpoheader/findall")
    fillDataIntoSelect(selectOurPo,"Select Our Po",ourPoList,'ourponumber');

    buttonOurPoApprovalSubmit.disabled=false;
    buttonOurPoApprovalUpdate.disabled=true;


    buttonOurPoApprovalSubmit.style.cursor="default";
    buttonOurPoApprovalUpdate.style.cursor="not-allowed";
}



const refreshOurPoActivationTable =  ()=>{

    ourPoActivationList = ajaxGetRequest("/ourpoactivation/findall");

    const displayProperty = [
        {dataType:"function", propertyName:getOurPoNumber},
        {dataType:"function", propertyName:getOurPoActivationStatus},

    ];

    fillDataIntoTable(tableOurPoActivation,ourPoActivationList,displayProperty,true);
    $("#tableOurPoActivation").dataTable();

}


const getOurPoNumber = (ob)=>{
    return `<p class="text-end">${ob.ourpoheader_id.ourponumber}</p>`
}


const getOurPoActivationStatus = (ob)=>{
    if (ob.activation_status==true){
        return `<p class="text-center">Approved</p>`;
    }else {
        return `<p class="text-center">Not-Approved</p>`;
    }
}


const checkErrorsOurPoActivationForm = ()=>{
    let errors = ''

    if (ourPoActivation.ourpoheader_id == null){
        errors=errors+"Our PO Number Cannot Be Empty \n"
    }

    if (ourPoActivation.activation_status == null){
        errors=errors+"Status Cannot Be Empty \n"
    }


    return errors;
}



const submitOurPoActivation = ()=>{
    let errors = checkErrorsOurPoActivationForm();

    if (errors==""){

        const userConfirm = confirm(`Are You Sure To Add Following Approval \n 
        Our Po Number Is ${ourPoActivation.ourpoheader_id.ourponumber}
        Status Is ${ourPoActivation.activation_status==true?"approved":"not approved"}
        `);

        if (userConfirm){
            const serverResponse = ajaxPostRequest("/ourpoactivation",ourPoActivation);
            if (serverResponse=="ok"){
                alert("Approval Success");
                refreshOurPoActivationForm()
                refreshOurPoActivationTable()

            }else {
                alert(`Approval Not Complete \n ${serverResponse}`)
                refreshOurPoActivationForm();
                refreshOurPoActivationTable();
            }
        }else {
            alert("User Cancelled The Operation");
        }




    }else {
        alert(`You Have Some Errors \n ${errors}`)
    }



}



const refillOurPoActivation = (ob)=>{

    ourPoActivation = JSON.parse(JSON.stringify(ob));
    oldOurPoActivation = JSON.parse(JSON.stringify(ob));


    fillDataIntoSelect(selectOurPo,"Select Our Po",ourPoList,'ourponumber',ob.ourpoheader_id.ourponumber);
    selectActivationStatus.value=ob.activation_status;


    buttonOurPoApprovalSubmit.disabled=true;
    buttonOurPoApprovalUpdate.disabled=false;


    buttonOurPoApprovalSubmit.style.cursor="not-allowed";
    buttonOurPoApprovalUpdate.style.cursor="default";
}


const checkUpdateOurPoActivation = ()=>{
    let updates="";

    if (ourPoActivation.ourpoheader_id.ourponumber != oldOurPoActivation.ourpoheader_id.ourponumber){
        updates=updates+"Our Po Number Is Updated \n"
    }
    if (ourPoActivation.activation_status != oldOurPoActivation.activation_status){
        updates=updates+"Status Is Updated \n"
    }


    return updates;
}




const updateOurPoActivation = ()=>{
    let updates = checkUpdateOurPoActivation();

    if (updates!=""){
        const userConfirm  = confirm(`"Are You Sure To Update Following Changes  \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/ourpoactivation",ourPoActivation);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshOurPoActivationForm();
                refreshOurPoActivationTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert(`Update Unsuccessful \n ${putServerResponse}`)
                refreshOurPoActivationForm();
                refreshOurPoActivationTable();
            }
        }
    }else {
        alert("Nothing to Update")
    }
}

const deleteOurPoAActivation = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Our Po Activation \n
        Our Po Number Is ${ob.ourpoheader_id.ourponumber}
        Status Is ${ob.activation_status==true?"approved":"not approved"}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/ourpoactivation",ob);
        if (deleteServerResponse=="ok"){
            alert("delete Successful");
            refreshOurPoActivationForm();
            refreshOurPoActivationTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("delete unsuccessful");
            refreshOurPoActivationForm();
            refreshOurPoActivationTable();
        }
    }
}

const refreshOurPoActivationTablePrint =  ()=>{

    ourPoActivationList = ajaxGetRequest("/ourpoactivation/findall");

    const displayProperty = [
        {dataType:"function", propertyName:getOurPoNumber},
        {dataType:"function", propertyName:getOurPoActivationStatus},

    ];

    fillDataIntoTable(tablePrintOurPoActivation,ourPoActivationList,displayProperty,false);

}





const printAllOurPoApprovals = async ()=>{
    await refreshOurPoActivationTablePrint()
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Our Po Approval Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold; font-family: 'Times New Roman'">Our Po Approvals</p>
    </div>

    <div class="row" style="margin: 3px">
        ${tablePrintOurPoActivation.outerHTML}
    </div>
</div>
</body>
</html>
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();
}


const printOneOurPoApproval = (ob)=>{

    const newWindow = window.open();
    newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Our Po Approval Print One Item</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold">Approval Details</p>
    </div>

    <div class="row">
        <table class="table table-bordered" style="font-size: 12px; border: 1px solid black">
            <thead style="font-weight: bold" class="text-center">
            <th style="width: 40%">Properties</th>
            <th>Details</th>
            </thead>

            <tbody>
                <tr>
                    <td>Our Po Number</td>
                    <td class="text-center">${ob.ourpoheader_id.ourponumber}</td>
                </tr>


                <tr>
                    <td>Status</td>
                    <td class="text-center">${ob.activation_status}</td>
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



































