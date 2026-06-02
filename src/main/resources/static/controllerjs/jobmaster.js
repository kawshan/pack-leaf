window.addEventListener('load',function (){

    refreshJobMasterForm();


    refreshJobMasterTable();



});


const refreshJobMasterForm = ()=>{
    jobmaster = new Object();

    //many to many relationship ekata adalawa empty array ekek create kara..
    jobmaster.jmhft = [];



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

    finishingsList = ajaxGetRequest("/finishing_types/findall")
    fillDataIntoSelect(selectJobFinishing,"",finishingsList,'name');

    fillDataIntoSelect(selectedJobFinishing,"",jobmaster.jmhft,'name');


    jobStautues = ajaxGetRequest("/jobmasterstatus/findall");
    fillDataIntoSelect(selectJobStatus,"Select Status",jobStautues,'name');


    //max number eka ganna function eka call karanawa
    getMaxJobNumber();
    refreshInnerFormAndTable();
}

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
    <title>Job Master Print One Item</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold; font-family: 'Times New Roman'; ">Job Details</p>
    </div>

    <div class="row" style="margin: 2px">
        <table class="table table-bordered" style="font-size: 11px; font-family: 'Times New Roman'; border: 1px solid black">
            <thead style="font-weight: bold; font-family: 'Times New Roman'; " class="text-center">
            <th style="width: 40%">Properties</th>
            <th>Details</th>
            </thead>

            <tbody>
                <tr>
                    <td>Job Date</td>
                    <td>${ob.jobdate}</td>
                </tr>


                <tr>
                    <td>Job Number</td>
                    <td>${ob.jobnumber}</td>
                </tr>

                <tr>
                    <td>Customer Name</td>
                    <td>${ob.customer_id.customername}</td>
                </tr>

                <tr>
                    <td>Item Name</td>
                        <td>
                        ${
                        ob.jmhft.map(element => `<p>${element.name}</p>`).join('')
                        }
                        </td>
                </tr>


                <tr>
                    <td>Job Quantity</td>
                    <td>${Number(ob.jobquantity).toLocaleString('en-US')}</td>
                </tr>

                <tr>
                    <td>Job Status</td>
                    <td>${ob.jobmasterstatus_id.name}</td>
                </tr>

                <tr>
                    <td>Job Description</td>
                    <td>${ob.jobdescription==null ?" ":ob.jobdescription}</td>
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

}


//getMaxJob
const getMaxJobNumber = ()=>{
    const getMaxJobNumberFromServer = ajaxGetRequest("/jobmaster/getmaxjobnumber");
    console.log(Number(getMaxJobNumberFromServer));

    const maxJobNumber = Number(getMaxJobNumberFromServer);

    txtJobNumber.value = maxJobNumber;
    jobmaster.jobnumber = maxJobNumber;


}



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


































