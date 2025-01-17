window.addEventListener('load',function (){

    refreshJobMasterForm();


    refreshJobMasterTable();



});


const refreshJobMasterForm = ()=>{
    jobmaster = new Object();

    //many to many relationship ekata adalawa empty array ekek create kara..
    jobmaster.jhi = [];

    buttonUpdateJobMaster.disabled=true;
    buttonUpdateJobMaster.style.cursor="not-allowed";

    buttonSubmitJobMaster.disabled=false;
    buttonSubmitJobMaster.style.cursor="default";


    //change default color
    txtJobDate.style.border="2px solid #ced4da";
    txtJobNumber.style.border="2px solid #ced4da";
    selectJobCustomer.style.border="2px solid #ced4da";
    selectJobItem.style.border="2px solid #ced4da";
    selectedJobItem.style.border="2px solid #ced4da";
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

    itemsList = ajaxGetRequest("/item/findall")
    fillDataIntoSelect(selectJobItem,"",itemsList,'itmname');

    fillDataIntoSelect(selectedJobItem,"",jobmaster.jhi,'itmname');


    jobStautues = ajaxGetRequest("/jobmasterstatus/findall");
    fillDataIntoSelect(selectJobStatus,"Select Status",jobStautues,'name');


    //max number eka ganna function eka call karanawa
    getMaxJobNumber();
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
    // return ob.item_id.itmname;
    // return "";
    let items = '';
    ob.jhi.forEach(element=>{
        items=items+element.itmname+','
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

    itemsList=ajaxGetRequest("/item/jobwithoutitems/"+ob.id)
    fillDataIntoSelect(selectJobItem,"",itemsList,'itmname');


    fillDataIntoSelect(selectedJobItem,"",jobmaster.jhi,'itmname');


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
    if (jobmaster.jhi.length != oldJobMaster.jhi.length){
        updates=updates+"Items are updated \n"
    }else {
        for (let element of jobmaster.jhi){
            let extJHI = oldJobMaster.jhi.map(item => item.id).indexOf(element.id);

            if (extJHI != 1){
                update=update+"Items Are Changed \n"
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
        Item Is ${ob.item_id.itmname}
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
        <p style="font-size: 14px; font-weight: bold">All jobs</p>
    </div>

    <div class="row">
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
        <p style="font-size: 14px; font-weight: bold">Job Details</p>
    </div>

    <div class="row">
        <table class="table table-bordered" style="font-size: 12px">
            <thead style="font-weight: bold" class="text-center">
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
                    <td>${ob.item_id.itmname}</td>
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
    console.log(selectJobItem.value);
    if (selectJobItem.value===""){
        alert("please select item");
    }else {
        let selectedItem = JSON.parse(selectJobItem.value);
        jobmaster.jhi.push(selectedItem);

        let extIndex = itemsList.map(item => item.itmname).indexOf(selectedItem.itmname);
        if (extIndex !== -1) {
            itemsList.splice(extIndex, 1)
        }

        fillDataIntoSelect(selectJobItem, "", itemsList, 'itmname');
        fillDataIntoSelect(selectedJobItem, "", jobmaster.jhi, 'itmname');
    }
}


const addAllItem = ()=>{

    itemsList.forEach((item)=>{
        jobmaster.jhi.push(item);
    })
    fillDataIntoSelect(selectedJobItem,"",jobmaster.jhi,'itmname');

    itemsList = [];
    fillDataIntoSelect(selectJobItem,"",itemsList,'itmname');



}


const removeOneItem = ()=>{
    console.log(selectedJobItem.value)
    if (selectedJobItem.value==""){
        alert("please select item for remove");
    }else {
        let selectedRemoveItem = JSON.parse(selectedJobItem.value);
        itemsList.push(selectedRemoveItem);

        let extIndex = jobmaster.jhi.map(item=>item.itemname).indexOf(selectedRemoveItem.itemname)
        if (extIndex !== -1){
            jobmaster.jhi.splice(extIndex,1)
        }

        fillDataIntoSelect(selectJobItem,"",itemsList,'itmname');
        fillDataIntoSelect(selectedJobItem,"",jobmaster.jhi,'itmname');
    }
}


const removeAllItem = ()=>{
    jobmaster.jhi.forEach((item)=>{
        itemsList.push(item);
    })
    fillDataIntoSelect(selectJobItem,"",itemsList,'itmname');

    jobmaster.jhi = [];
    fillDataIntoSelect(selectedJobItem,"",jobmaster.jhi,'itmname');


}


































