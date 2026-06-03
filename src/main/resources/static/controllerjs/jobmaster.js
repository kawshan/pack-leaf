window.addEventListener('load',function (){

    refreshJobMasterForm();


    refreshJobMasterTable();



});


const refreshJobMasterForm = ()=>{
    jobmaster = new Object();

    //many to many relationship ekata adalawa empty array ekek create kara..
    jobmaster.jmhft = [];
    jobmaster.jmhpd = [];



    //many to many attribute eka
    jobmaster.jobMasterHasItems = new Array();

    buttonUpdateJobMaster.disabled=true;
    buttonUpdateJobMaster.style.cursor="not-allowed";

    buttonSubmitJobMaster.disabled=false;
    buttonSubmitJobMaster.style.cursor="default";


    //change default color
    txtJobDate.style.border="2px solid #ced4da";
    txtJobNumber.style.border="2px solid #ced4da";
    selectJobCustomer.style.border="2px solid #ced4da";
    selectJobFinishing.style.border="2px solid #ced4da";
    selectedJobFinishing.style.border="2px solid #ced4da";
    txtQuantity.style.border="2px solid #ced4da";
    txtDescription.style.border="2px solid #ced4da";
    selectJobStatus.style.border="2px solid #ced4da";

    //making value empty
    txtJobDate.value="";
    txtJobNumber.value="";
    txtQuantity.value="";
    txtDescription.value="";

    customersList = ajaxGetRequest("/customer/findall");
    fillDataIntoSelect(selectJobCustomer,"Select Customer",customersList,'customername');

    // finishing types filling
    finishingsList = ajaxGetRequest("/finishing_types/findall")
    fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');
    fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');

    // plate details type filling
    plateDetailsList = ajaxGetRequest("/plate_details/find_all");
    fillDataIntoSelect(selectJobPlateDetails,"",plateDetailsList,'name');
    fillDataIntoSelect(selectedJobPlateDetails,"",jobmaster.jmhpd,'name');



    jobStautues = ajaxGetRequest("/jobmasterstatus/findall");
    fillDataIntoSelect(selectJobStatus,"Select Status",jobStautues,'name');


    //max number eka ganna function eka call karanawa
    getMaxJobNumber();
    refreshInnerFormAndTable();
}

// inner table functions are end

const refreshInnerFormAndTable = ()=>{
    jmhsitm = new Object();
    OLDjmhsitm = null;

    itemList = ajaxGetRequest("/item/findall");
    fillDataIntoSelect(selectItem,'Select Item',itemList,'itmname');

    txtQty.value = "";
    txtQty.style.border = "2px solid #ced4da";


    selectItem.style.border = "2px solid #ced4da";

    let displayProperty = [
        {dataType: 'function', propertyName: getItemNameForInnerTable},
        {dataType: 'function', propertyName: getItemQtyForInnerTable},
    ];


    fillDataIntoTableInnerTable(tableJobMasterItemDetails, jobmaster.jobMasterHasItems, displayProperty, refillInnerForm, deleteInnerRow);


    buttonInnerUpdate.disabled = true;
    buttonInnerAdd.disabled = false;

}

const getItemNameForInnerTable = (ob)=>{
   return  ob.item_id.itmname;



}

const getItemQtyForInnerTable = (ob)=>{
    return ob.jobmaster_has_item_qty



}



const refillInnerForm = (ob, rowIndex) => {

    jmhsitm = JSON.parse(JSON.stringify(ob));
    OLDjmhsitm = JSON.parse(JSON.stringify(ob));

    itemList = ajaxGetRequest("/item/findall");
    fillDataIntoSelect(
        selectItem,
        'Select Item',
        itemList,
        'itmname',
        ob.item_id.itmname
    );

    txtQty.value = ob.jobmaster_has_item_qty;

    buttonInnerUpdate.disabled = false;
    buttonInnerAdd.disabled = true;
}



const innerUpdate = ()=>{

    let errors = checkInnerFormErrors();

    if(errors==""){

        let userConfirm = confirm(`
            Are You Sure To Update Following

            Item : ${jmhsitm.item_id.itmname}
            Qty  : ${jmhsitm.jobmaster_has_item_qty}
        `);

        if(userConfirm){

            let extIndex = jobmaster.jobMasterHasItems
                .map(item => item.item_id.id)
                .indexOf(OLDjmhsitm.item_id.id);

            if(extIndex != -1){

                jobmaster.jobMasterHasItems[extIndex] =
                    JSON.parse(JSON.stringify(jmhsitm));

                alert("Item Updated Successfully");

                refreshInnerFormAndTable();
            }
        }

    }else{
        alert(`You Have Following Errors\n${errors}`);
    }
}


const deleteInnerRow = (ob,index) => {//need to do this
    let userConfirm=confirm('are you sure to remove');
    if (userConfirm){
        let extIndex=jobmaster.jobMasterHasItems.map(item=>item.item_id).indexOf(ob.item_id);
        if (extIndex!=-1){
            jobmaster.jobMasterHasItems.splice(extIndex,1);
            alert("item removed successfully");
            refreshInnerFormAndTable()
        }
    }
}



const checkInnerFormErrors = ()=>{
    let errors = "";

    if (jmhsitm.item_id==null){
        errors=errors+"Item Cannot Be Empty\n"
    }


    if (jmhsitm.jobmaster_has_item_qty == null){
        errors=errors+"Quantity cannot be empty \n"
    }

    return errors;
}


const innerAdd = ()=>{
    let errors = checkInnerFormErrors();
    if (errors==""){
        let userConfirm = confirm(`Are You Sure To add Following
        Item name is ${jmhsitm.item_id.itmname}
        Qty is is ${jmhsitm.jobmaster_has_item_qty}
        `);
        if (userConfirm){
            jobmaster.jobMasterHasItems.push(jmhsitm);
            alert(`Item Added Successfully`);
            refreshInnerFormAndTable();
        }
    }else {
        alert(`you have following errors \n ${errors}`);
    }


}



// inner table functions are end




const refreshJobMasterTable = ()=>{

    jobMastersList = ajaxGetRequest("/jobmaster/findall");

    displayProperty = [
        {dataType:'function',propertyName:getCustomerName},
        {dataType:'function',propertyName:getItemName},
        {dataType:'text',propertyName:'jobdate'},
        {dataType:'text',propertyName:'jobnumber'},
        {dataType:'function',propertyName:getJobQuantity},
        {dataType:'text',propertyName:'jobdescription'},
        {dataType:'function',propertyName:getStatus},
    ];

    fillDataIntoTable(tableJobMaster,jobMastersList,displayProperty,true);
    $("#tableJobMaster").dataTable();
}

const getJobQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.jobquantity).toLocaleString('en-US')}</p>`
}


const getCustomerName = (ob)=>{
    return ob.customer_id.customername
}


const getItemName = (ob)=>{
    let items = '';
    ob.jmhft.forEach(element=>{
        items=items+'<p>'+element.name+'</p>'
    })
    return items;
}

const getStatus = (ob)=>{
    // return ob.jobmasterstatus_id.name;
    if (ob.jobmasterstatus_id.name == "active"){
        return `<p style="color: green" class="text-center">Active</p>`;
    }else if (ob.jobmasterstatus_id.name == "inactive"){
        return `<p style="color: orange" class="text-center">inactive</p>`
    }else {
        return `<p style="color: red" class="text-center">Delete</p>`
    }

}



const checkErrors = ()=>{

    let errors = ""

    if (jobmaster.customer_id == null){
        errors=errors+"Customer Cannot Be Empty \n"
    }

    if (jobmaster.jobdate == null){
        errors=errors+"Job Date Cannot Be Empty \n"
    }

    if (jobmaster.jobnumber == null){
        errors=errors+"Job Number Cannot Be Empty \n"
    }

    if (jobmaster.jobquantity == null){
        errors=errors+"Job Quantity Cannot Be Empty \n"
    }

    if (jobmaster.jobmasterstatus_id == null){
        errors=errors+"Job Master Status Cannot Be Empty \n";
    }
    if (jobmaster.jmhft.length==0){
        errors=errors+"Finishing Cannot be empty \n"
    }


    return errors;

}

const submitJobMaster = ()=>{
    let errors = checkErrors();

    if (errors==""){
        const userConfirm =confirm(`Are You Sure To Add Following Job
        Customer Is ${jobmaster.customer_id.customername}
        Job Date Is ${jobmaster.jobdate}
        Job Number Is ${jobmaster.jobnumber}
        Job Quantity Is ${jobmaster.jobquantity}
        Job Status Is ${jobmaster.jobmasterstatus_id.name}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/jobmaster",jobmaster);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshJobMasterForm();
                refreshJobMasterTable();
            }else {
                alert(`Save Not Success \n ${postServerResponse}`);
            }
        }else {
            alert("User Cancelled The Operation");
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`)
    }

}

const refillJobMaster = (ob,rowIndex)=>{

    //update button enable
    buttonUpdateJobMaster.disabled=false;
    buttonUpdateJobMaster.style.cursor="default";


    // submit button disable
    buttonSubmitJobMaster.disabled=true;
    buttonSubmitJobMaster.style.cursor="not-allowed";




    jobmaster = JSON.parse(JSON.stringify(ob));
    oldJobMaster = JSON.parse(JSON.stringify(ob));


    txtJobDate.value=ob.jobdate
    txtJobNumber.value=ob.jobnumber
    txtQuantity.value=ob.jobquantity
    txtDescription.value=ob.jobdescription

    fillDataIntoSelect(selectJobCustomer,"Select Customer",customersList,'customername',ob.customer_id.customername);
    fillDataIntoSelect(selectJobStatus,"Select Status",jobStautues,'name',ob.jobmasterstatus_id.name);

    finishingsList=ajaxGetRequest("/finishing_types/jobwithoutfinishingtypes/"+ob.id)
    fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');


    fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');


    // jobmaster.jobMasterHasItems = ob.jobMasterHasItems;
    refreshInnerFormAndTable();

}



const checkUpdates = ()=>{
    let updates ='';

    if (jobmaster.customer_id.customername != oldJobMaster.customer_id.customername){
        updates=updates+"Customer Name is Updated \n"
    }

    if (jobmaster.jobmasterstatus_id.name != oldJobMaster.jobmasterstatus_id.name){
        updates=updates+"Status Is Updated \n";
    }
    if (jobmaster.jobdate != oldJobMaster.jobdate){
        updates=updates+"Job Date Is Updated \n"
    }
    if (jobmaster.jobnumber != oldJobMaster.jobnumber){
        updates=updates+"Job Number Is Updated \n"
    }
    if (jobmaster.jobquantity != oldJobMaster.jobquantity){
        updates=updates+"Job Quantity Is Updated \n"
    }
    if (jobmaster.jobdescription != oldJobMaster.jobdescription){
        updates=updates+"Description Is Updated \n"
    }
    if (jobmaster.jmhft.length != oldJobMaster.jmhft.length){
        updates=updates+"Items are updated \n"
    }else {
        for (let element of jobmaster.jmhft){
            let extJHI = oldJobMaster.jmhft.map(item => item.id).indexOf(element.id);

            if (extJHI != 1){
                updates=updates+"Items Are Changed \n"
            }

        }
    }
    return updates;
}



const updateJobMaster = ()=>{
    let updates = checkUpdates();
    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/jobmaster",jobmaster);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshJobMasterForm();
                refreshJobMasterTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert(`Error Happened \n ${putServerResponse}`);
                refreshJobMasterForm();
                refreshJobMasterTable();
            }
        }else {
            alert("User Cancelled The Operation \n")
        }
    }else {
        alert("Nothing To Update")
    }
}



const deleteJobMaster = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Job Master \n
        Customer Is ${ob.customer_id.customername}
        Job Date Is ${ob.jobdate}
        Job Number Is ${ob.jobnumber}
        Job Quantity Is ${ob.jobquantity}
        Job Status Is ${ob.jobmasterstatus_id.name}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/jobmaster",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshJobMasterTable();
            refreshJobMasterForm();
            divModifyButton.classList.add('d-none');
        }else {
            alert("Error Happened \n"+deleteServerResponse);
            refreshJobMasterTable();
            refreshJobMasterForm();
        }
    }else {
        alert(`User Cancelled The Operation`)
    }


}


//print functions

//to see all jobs
const printAllJobs = async ()=>{
    const newWindow = window.open();

    await loadDataIntoJobMasterPrintTable();

    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Job Master Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold; font-family: 'Times New Roman';">All jobs</p>
    </div>

    <div class="row" style="margin: 3px">
        ${tableJobMasterPrint.outerHTML}
    </div>



</div>

</body>
</html>
    
    `)

    newWindow.stop();
    newWindow.print();
    newWindow.close();


}


const loadDataIntoJobMasterPrintTable = ()=>{
    jobMastersList = ajaxGetRequest("/jobmaster/findall");

    displayProperty = [
        {dataType:'function',propertyName:getCustomerName},
        {dataType:'function',propertyName:getItemName},
        {dataType:'text',propertyName:'jobdate'},
        {dataType:'text',propertyName:'jobnumber'},
        {dataType:'function',propertyName:getJobQuantity},
        {dataType:'text',propertyName:'jobdescription'},
        {dataType:'function',propertyName:getStatus},
    ];

    fillDataIntoTable(tableJobMasterPrint,jobMastersList,displayProperty,false);
}


const printOneJob = async (ob)=>{
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Card Form</title>
    <style>
        /* --- A4 Page Setup --- */
        @page {
            size: A4;
            margin: 15mm 15mm 15mm 15mm; /* Balanced margins for printing */
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #fff;
            -webkit-print-color-adjust: exact;
        }

        .job-card-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            box-sizing: border-box;
        }

        /* --- Typography & Global Layout --- */
        h1 {
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 20px 0;
            display: inline-block;
        }

        .date-container {
            float: right;
            margin-bottom: 20px;
        }

        .date-box {
            display: inline-block;
            width: 100px;
            height: 20px;
            border: 1px solid #777;
            vertical-align: middle;
            margin-left: 5px;
        }

        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }

        /* --- Form Fields Base --- */
        .row {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            width: 100%;
        }

        .field-group {
            display: flex;
            align-items: center;
            margin-right: 15px;
        }

        .field-group:last-child {
            margin-right: 0;
        }

        label {
            font-weight: normal;
            white-space: nowrap;
            margin-right: 8px;
        }

        .input-box {
            border: 1px solid #777;
            height: 24px;
            flex-grow: 1;
        }

        /* --- Specific Row Customizations --- */
        .w-full { width: 100%; }
        .flex-1 { flex: 1; }

        .job-no-box { width: 110px; flex-grow: 0; }
        .po-no-box { width: 110px; flex-grow: 0; }
        .order-no-box { width: 110px; flex-grow: 0; }

        .gsm-box { width: 90px; flex-grow: 0; }
        .qty-box { width: 90px; flex-grow: 0; }

        .checkbox-box {
            width: 35px;
            height: 20px;
            border: 1px solid #777;
            display: inline-block;
            margin-left: 5px;
            margin-right: 15px;
        }

        /* --- Text Blocks & Details Sections --- */
        .details-section {
            border: 1px solid #777;
            width: 100%;
            margin-bottom: 12px;
            box-sizing: border-box;
        }

        .plate-details {
            height: 55px;
            padding: 5px;
            box-sizing: border-box;
        }

        .printing-details {
            height: 65px;
            padding: 5px;
            box-sizing: border-box;
        }

        .printing-details label {
            display: block;
            margin-bottom: 5px;
        }

        /* --- Finishes Row (Lamination, Foiling etc.) --- */
        .finishes-row {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 12px;
            gap: 20px;
        }

        .finish-item {
            display: flex;
            align-items: center;
        }

        .finish-box {
            width: 90px;
            height: 22px;
            border: 1px solid #777;
            margin-left: 8px;
        }

        /* --- Table Grid (Description Section) --- */
        .description-title {
            margin-bottom: 5px;
        }

        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .grid-table th, .grid-table td {
            border: 1px solid #555;
            height: 22px; /* Replicates exact thin row design */
            padding: 0;
        }

        /* Grid Column Width Allocations */
        .col-left { width: 13%; }
        .col-center { width: 74%; }
        .col-right { width: 13%; }

        /* --- Remarks Block --- */
        .remarks-section {
            border: 1px solid #777;
            height: 90px;
            padding: 5px;
            box-sizing: border-box;
        }

        /* --- Print Optimization styles --- */
        @media print {
            body {
                background-color: transparent;
            }
            .job-card-container {
                max-width: 100%;
                width: 100%;
            }
        }
    </style>
</head>
<body>

<div class="job-card-container">

    <div class="clearfix">
        <h1>Job Card</h1>
        <div class="date-container">
            <label>Date :</label><div class="date-box">${ob.jobdate}</div>
        </div>
    </div>

    <div class="row">
        <div class="field-group">
            <label>Job No</label>
            <div class="input-box job-no-box">${ob.jobnumber}</div>
        </div>
        <div class="field-group">
            <label>PO NO</label>
            <div class="input-box po-no-box">${ob.job_master_po_no == null ? '' : ob.job_master_po_no}</div>
        </div>
        <div class="field-group flex-1">
            <label>Order NO</label>
            <div class="input-box order-no-box">${ob.job_master_order_no == null ? '' : ob.job_master_order_no}</div>
        </div>
    </div>

    <div class="row">
        <div class="field-group w-full">
            <label>Job Name</label>
            <div class="input-box">${ob.job_master_job_name == null ? '' : ob.job_master_job_name}</div>
        </div>
    </div>

    <div class="row">
        <div class="field-group w-full">
            <label>Material</label>
            <div class="input-box">${ob.job_master_material == null ? '' : ob.job_master_material}</div>
        </div>
    </div>

    <div class="row">
        <div class="field-group flex-1">
            <label>Print Size</label>
            <div class="input-box">${ob.job_master_print_size == null ? '' : ob.job_master_print_size}</div>
        </div>
        <div class="field-group">
            <label>gsm</label>
            <div class="input-box gsm-box">${ob.job_master_gsm == null ? '' : ob.job_master_gsm}</div>
        </div>
        <div class="field-group">
            <label>QTY</label>
            <div class="input-box qty-box">${ob.jobquantity == null ? '' : ob.jobquantity}</div>
        </div>
    </div>

    <div class="row">
        <div class="field-group flex-1" style="max-width: 55%;">
            <label>By: Name</label>
            <div class="input-box">${ob.job_master_by_name == null ? '' : ob.job_master_by_name}</div>
        </div>
    </div>

<div class="details-section plate-details">
    <span style="vertical-align: middle; line-height: 20px;">Plate Details</span>
    
    <span style="margin-left: 40px; vertical-align: middle; line-height: 20px;">KROS</span>
    <div class="checkbox-box" style="vertical-align: middle; text-align: center; line-height: 20px;">
        ${ob.jmhpd.some(plate => plate.name === "KROS") ? "✔" : ""}
    </div>
    
    <span style="vertical-align: middle; line-height: 20px;">GTO</span>
    <div class="checkbox-box" style="vertical-align: middle; text-align: center; line-height: 20px;">
        ${ob.jmhpd.some(plate => plate.name === "GTO") ? "✔" : ""}
    </div>
</div>

    <div class="details-section printing-details">
        <label>Printing Details :</label>
        <div style="font-size: 13px; color: #111; white-space: pre-wrap;">${ob.jobmaster_printing_details==null ? "" : ob.jobmaster_printing_details}</div>
    </div>

<div class="finishes-row">
    <div class="finish-item">
        <label>Lamination</label>
        <div class="finish-box" style="text-align: center; line-height: 22px; font-weight: bold;">
            ${ob.jmhft.some(f => f.name === "Laminating") ? "✔" : ""}
        </div>
    </div>
    
    <div class="finish-item">
        <label>Foiling</label>
        <div class="finish-box" style="text-align: center; line-height: 22px; font-weight: bold;">
            ${ob.jmhft.some(f => f.name === "Foiling") ? "✔" : ""}
        </div>
    </div>
    
    <div class="finish-item">
        <label>Spot UV</label>
        <div class="finish-box" style="text-align: center; line-height: 22px; font-weight: bold;">
            ${ob.jmhft.some(f => f.name === "Spot UV") || (ob.jobMasterHasItems[0]?.item_id?.spotuv === "true") ? "✔" : ""}
        </div>
    </div>
    
    <div class="finish-item">
        <label>Cutting</label>
        <div class="finish-box" style="text-align: center; line-height: 22px; font-weight: bold;">
            ${ob.jmhft.some(f => f.name === "Cutting") ? "✔" : ""}
        </div>
    </div>
</div>

<div class="description-title">Description</div>
    <table class="grid-table">
        <tbody>
            ${(ob.jobMasterHasItems || []).map((item, index) => `
                <tr>
                    <td class="col-left" style="text-align: center;">${index + 1}</td>
                    <td class="col-center">${item.item_id?.itmname || ''}</td>
                    <td class="col-right" style="text-align: right;">${item.jobmaster_has_item_qty}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    </table>

<div class="remarks-section" style="height: 90px; padding: 8px; box-sizing: border-box; font-size: 13px; line-height: 1.5;">
        <strong style="display: block; margin-bottom: 4px;">Remarks:</strong>
        <div style="color: #111; white-space: pre-wrap;">
            ${ob.jobdescription || ''}
        </div>
    </div>

</div>

</body>
</html>
    
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();

}


//getMaxJob
const getMaxJobNumber = ()=>{
    const getMaxJobNumberFromServer = ajaxGetRequest("/jobmaster/getmaxjobnumber");
    console.log(Number(getMaxJobNumberFromServer));

    const maxJobNumber = Number(getMaxJobNumberFromServer);

    txtJobNumber.value = maxJobNumber;
    jobmaster.jobnumber = maxJobNumber;


}


// finishing type many-to-many relation starts from here

const addOneItem = ()=>{
    console.log(selectJobFinishing.value);
    if (selectJobFinishing.value===""){
        alert("please select item");
    }else {
        let selectedItem = JSON.parse(selectJobFinishing .value);
        jobmaster.jmhft.push(selectedItem);

        let extIndex = finishingsList.map(item => item.name).indexOf(selectedItem.name);
        if (extIndex !== -1) {
            finishingsList.splice(extIndex, 1)
        }

        fillDataIntoSelect(selectJobFinishing, "", finishingsList, 'name');
        fillDataIntoSelect(selectedJobFinishing, "", jobmaster.jmhft, 'name');
    }
}


const addAllItem = ()=>{

    finishingsList.forEach((item)=>{
        jobmaster.jmhft.push(item);
    })
    fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');

    finishingsList = [];
    fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');



}


const removeOneItem = ()=>{
    console.log(selectedJobFinishing.value)
    if (selectedJobFinishing.value==""){
        alert("please select item for remove");
    }else {
        let selectedRemoveItem = JSON.parse(selectedJobFinishing.value);
        finishingsList.push(selectedRemoveItem);

        let extIndex = jobmaster.jmhft.map(item=>item.name).indexOf(selectedRemoveItem.name)
        if (extIndex !== -1){
            jobmaster.jmhft.splice(extIndex,1)
        }

        fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');
        fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');
    }
}


const removeAllItem = ()=>{
    jobmaster.jmhft.forEach((item)=>{
        finishingsList.push(item);
    })
    fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');

    jobmaster.jmhft = [];
    fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');


}


// finishing type many-to-many relation end


// plate details many-to-many relation start

const addOneItemForPlateDetails = ()=>{
    console.log(selectJobPlateDetails.value);
    if (selectJobPlateDetails.value===""){
        alert("please select item");
    }else {
        let selectedItem = JSON.parse(selectJobPlateDetails .value);
        jobmaster.jmhpd.push(selectedItem);

        let extIndex = plateDetailsList.map(item => item.name).indexOf(selectedItem.name);
        if (extIndex !== -1) {
            plateDetailsList.splice(extIndex, 1)
        }

        fillDataIntoSelect(selectJobPlateDetails, "", plateDetailsList, 'name');
        fillDataIntoSelect(selectedJobPlateDetails, "", jobmaster.jmhpd, 'name');
    }
}


const addAllItemForPlateDetails = ()=>{

    plateDetailsList.forEach((item)=>{
        jobmaster.jmhpd.push(item);
    })
    fillDataIntoSelect(selectedJobPlateDetails,"",jobmaster.jmhpd,'name');

    plateDetailsList = [];
    fillDataIntoSelect(selectJobPlateDetails,"",plateDetailsList,'name');



}


const removeOneItemForPlateDetails = ()=>{
    console.log(selectedJobPlateDetails.value)
    if (selectedJobPlateDetails.value==""){
        alert("please select item for remove");
    }else {
        let selectedRemoveItem = JSON.parse(selectedJobPlateDetails.value);
        plateDetailsList.push(selectedRemoveItem);

        let extIndex = jobmaster.jmhpd.map(item=>item.name).indexOf(selectedRemoveItem.name)
        if (extIndex !== -1){
            jobmaster.jmhpd.splice(extIndex,1)
        }

        fillDataIntoSelect(selectJobPlateDetails,"",plateDetailsList,'name');
        fillDataIntoSelect(selectedJobPlateDetails,"",jobmaster.jmhpd,'name');
    }
}


const removeAllItemForPlateDetails = ()=>{
    jobmaster.jmhpd.forEach((item)=>{
        plateDetailsList.push(item);
    })
    fillDataIntoSelect(selectJobPlateDetails,"",plateDetailsList,'name');

    jobmaster.jmhpd = [];
    fillDataIntoSelect(selectedJobPlateDetails,"",jobmaster.jmhpd,'name');


}

// plate details many-to-many relation end


























