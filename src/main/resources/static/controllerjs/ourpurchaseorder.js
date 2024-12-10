window.addEventListener('load',function () {

    ourPurchaseOrderHeaderFormRefresh();

    refreshOurPurchaseOrderHeaderTable();


    //call our purchase order details form function
    refreshOurPurchaseOrderDetailsForm();

    //details section eke add button eka disable kara
    buttonOurPurchaseOrderDetailsAdd.style.cursor="not-allowed";
    buttonOurPurchaseOrderDetailsAdd.disabled=true;


});


const ourPurchaseOrderHeaderFormRefresh = ()=>{

    ourpoheader = new Object();

    textRefQuotation.value="";
    textPoDate.value="";
    textOurPoNumber.value="";

    textRefQuotation.style.border="2px solid #cd4da";
    textPoDate.style.border="2px solid #cd4da";
    textOurPoNumber.style.border="2px solid #cd4da";


    suppliers = ajaxGetRequest("/supplier/findall")
    fillDataIntoSelect(selectSupplier,'Select Supplier',suppliers,'suppliername');

}


const refreshColorsInOurPurchaseOrderHeader = ()=>{
    textRefQuotation.style.border='2px solid #ced4da';
    textPoDate.style.border='2px solid #ced4da';
    selectSupplier.style.border='2px solid #ced4da';
    textOurPoNumber.style.border='2px solid #ced4da';
}


const refreshOurPurchaseOrderHeaderTable = ()=>{

    ourpoheaders = ajaxGetRequest("/ourpoheader/findall");

    displayProperty = [
        {dataType:'function',propertyName:getSupplierName},
        {dataType: 'text',propertyName:'refquotation'},
        {dataType: 'text',propertyName:'ourponumber'},
        {dataType: 'text',propertyName:'ourpodate'}
    ];


    fillDataIntoTable(ourPurchaseOrderHeaderTable,ourpoheaders,displayProperty,true);
    $("#ourPurchaseOrderHeaderTable").dataTable();

}

const getSupplierName = (ob)=>{
    return ob.supplier_id.suppliername;
}



const checkErrorsOurPoHeader = ()=>{

    let errors = ''

    if (ourpoheader.supplier_id == null){
        errors= errors+"Supplier Cannot Be Empty \n "
    }

    // if (ourpoheader.refquotation == null){
    //     errors= errors+"Reference quotation Cannot Be Empty \n "
    // }


    if (ourpoheader.ourponumber == null){
        errors= errors+"Po Number Cannot Be Empty \n "
    }

    if (ourpoheader.ourpodate == null){
        errors= errors+"Po Date Cannot Be Empty \n "
    }

    return errors;
}



const submitOurPoHeader = async ()=>{

    if (textDisplayOurPurchaseOrderKey.value==""){
        console.log("save part");
        let errors = checkErrorsOurPoHeader();
        if (errors==""){

            const userConfirm = confirm(`Are You Sure To Add Following Our Po Header \n
            Supplier Name Is ${ourpoheader.supplier_id.suppliername}
            Po Number Is ${ourpoheader.ourponumber}
            Date Is ${ourpoheader.ourpodate}
            `);

            if (userConfirm){
                const postServerResponse =ajaxPostRequest("/ourpoheader",ourpoheader)
                if (postServerResponse&&postServerResponse.ourpokey){
                    alert("Save Successful");
                    console.log(postServerResponse);
                    textDisplayOurPurchaseOrderKey.value=postServerResponse.ourpokey;
                    refreshOurPurchaseOrderHeaderTable();
                    refreshColorsInOurPurchaseOrderHeader()


                    paragraphWarningMSJ.classList.add('d-none');   //that warning text in our purchase order details section disable part (please complete header section first).
                    //enable details area add button
                    buttonOurPurchaseOrderDetailsAdd.style.cursor="default";
                    buttonOurPurchaseOrderDetailsAdd.disabled=false;


                }else {
                    alert("Save Unsuccessful");
                }
            }else {
                alert("User Cancelled the Operation")
            }
        }else {
            alert("You Have Errors "+errors)
        }
    }else {
        console.log("update part");

        //need to get id from using our po key (OPO)
        const getIDFromOPOKeyServerResponse = await ajaxGetRequest("/ourpoheader/getidfrom-opo-key/"+textDisplayOurPurchaseOrderKey.value)
        console.log(getIDFromOPOKeyServerResponse); //success retrieving id from OPO key
        ourpoheader.id=getIDFromOPOKeyServerResponse    //binding id to object

        //setting key to our po header object
        ourpoheader.ourpokey=textDisplayOurPurchaseOrderKey.value;

        //now update part
        const userConfirm = confirm(`Are you Sure to Update following Our Po Header \n
            Supplier Name Is ${ourpoheader.supplier_id.suppliername}
            Po Number Is ${ourpoheader.ourponumber}
            Date Is ${ourpoheader.ourpodate}
            key is ${ourpoheader.ourpokey}
            ID Is ${ourpoheader.id}
        `);

        if (userConfirm){
            const putServerResponse = await ajaxPutRequest("/ourpoheader",ourpoheader);
            if (putServerResponse=="ok"){
                alert("Update Successful")
                refreshColorsInOurPurchaseOrderHeader();
                divModifyButton.classList.add('d-none');
            }else {
                alert("Error Happened During Update \n"+putServerResponse);
            }
        }else {
            alert("User Cancelled The Update Operation")
        }
    }
}

const refillOurPurchaseOrderHeader = (ob,rawIndex)=>{

    //set values to the fields
    fillDataIntoSelect(selectSupplier,'Select Supplier',suppliers,'suppliername',ob.supplier_id.suppliername);



    textDisplayOurPurchaseOrderKey.value=ob.ourpokey
    textRefQuotation.value=ob.refquotation
    textOurPoNumber.value=ob.ourponumber
    textPoDate.value=ob.ourpodate

    //also needed to bind to the object. this problem occurs because of the save and update is in the
    ourpoheader.refquotation = textRefQuotation.value
    ourpoheader.ourponumber = textOurPoNumber.value
    ourpoheader.ourpodate = textPoDate.value;
    ourpoheader.supplier_id = ob.supplier_id;





    //refresh details table section
    refreshOurPurchaseOrderDetailsTable();
    cardOurPurchaseOrderDetailsTableArea.classList.remove('d-none');

    buttonOurPurchaseOrderDetailsAdd.disabled=false;
    buttonOurPurchaseOrderDetailsAdd.style.cursor="default";

    //please complete header Section first warning message disable part
    paragraphWarningMSJ.classList.add('d-none')


}

const deleteOurPurchaseOrderHeader = (ob, rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Our Purchase Order header \n
    Supplier Name Is ${ob.supplier_id.suppliername}
    Po Number Is ${ob.ourponumber}
    Date Is ${ob.ourpodate}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/ourpoheader",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful")
            refreshOurPurchaseOrderHeaderTable();
        }else {
            alert("Delete Not Successful"+deleteServerResponse)
        }
    }else {
        alert("User Canceled The Operation")
    }


}


const showSupplierInformation = (fieldID)=>{
    let selectedSupplier = JSON.parse(fieldID.value);
    displaySupplierName.innerHTML=selectedSupplier.suppliername
    displaySupplierAddress.innerHTML=selectedSupplier.supplieraddress
    displaySupplierMobileNumber.innerHTML=selectedSupplier.suppliertelephone
}



//our purchase order details area start

// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
const refreshOurPurchaseOrderDetailsForm = ()=>{

    //update button eka disable karanawa add button eka enable karanwa
    buttonOurPurchaseOrderDetailsUpdate.disabled=true
    buttonOurPurchaseOrderDetailsUpdate.style.cursor='not-allowed';


    buttonOurPurchaseOrderDetailsAdd.disabled=false;
    buttonOurPurchaseOrderDetailsAdd.style.cursor="default";


    ourPurchaseOrderDetail = new Object();

    txtQty.value="";
    txtRate.value="";

    rawMaterials=ajaxGetRequest("/rawmaterial/findall");
    fillDataIntoSelect(selectRawMaterial,'Select Raw Material Name',rawMaterials,'rmname');


    //change colours to default
    txtQty.style.border="2px solid #ced4da";
    txtRate.style.border="2px solid #ced4da";
    selectRawMaterial.style.border="2px solid #ced4da";


}


const refreshOurPurchaseOrderDetailsTable = ()=>{

    //get request eka change karanna one header eken key eka aran eekata adala our purchase order details tika ganna one
    //need to get our purchase order details from header key
    ourpurchaseOrderDetails = ajaxGetRequest("/ourpodetail/getourpodetailsfrom-ourpoheaderkey/"+textDisplayOurPurchaseOrderKey.value);
    const displayProperty= [
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'function',propertyName:getQuantity},
        {dataType:'function',propertyName:getRate},
    ];

    fillDataIntoTable2(ourPurchaseOrderDetailsTable,ourpurchaseOrderDetails,displayProperty,true,divModifyButton2);
}

const getRawMaterial = (ob)=>{
   return ob.rawmaterial_id.rmname;
}

const getQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.qty).toLocaleString('en-US')}</p>`
}

const getRate = (ob)=>{
    return `<p class="text-end">${Number(ob.rate).toLocaleString('en-US',{minimumFractionDigits:4,maximumFractionDigits:4})}</p>`
}



const checkErrorsOurPurchaseOrderDetails = ()=>{

    let errors = '';

    if (ourPurchaseOrderDetail.rawmaterial_id == null){
        errors=errors+"Raw Material Cannot Be Empty \n"
    }

    if (ourPurchaseOrderDetail.qty == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }
    if (ourPurchaseOrderDetail.rate == null){
        errors=errors+"Rate Cannot Be Empty \n"
    }
    return errors;
}

const submitOurPurchaseOrderDetails = ()=>{
    let errors = checkErrorsOurPurchaseOrderDetails();

    //header eke thiyena key eka gennalla eka bind karanwa.
    ourPurchaseOrderDetail.ourpoheaderkey=textDisplayOurPurchaseOrderKey.value;

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following Our Purchase Order Details \n
            Raw Material Name Is ${ourPurchaseOrderDetail.rawmaterial_id.rmname}
            Quantity Is ${ourPurchaseOrderDetail.qty}
            Rate Is ${ourPurchaseOrderDetail.rate}
            Header Is ${ourPurchaseOrderDetail.ourpoheaderkey}
        `);
        if (userConfirm){
            const postServerResponse =ajaxPostRequest("/ourpodetail",ourPurchaseOrderDetail)
            if (postServerResponse=="ok"){
                alert("Save Successful");
                //enable table area->
                cardOurPurchaseOrderDetailsTableArea.classList.remove('d-none');
                refreshOurPurchaseOrderDetailsForm();
                refreshOurPurchaseOrderDetailsTable();
            }else {
                alert("Save Unsuccessful \n"+postServerResponse);
            }
        }else {
            alert(`User Cancelled the Operation`);
        }
    }else {
        alert(`You have Errors \n ${errors}`);
    }
}

const refillOurPurchaseOrderDetails = (ob,rowIndex)=>{

    //enable update button
    buttonOurPurchaseOrderDetailsUpdate.disabled=false
    buttonOurPurchaseOrderDetailsUpdate.style.cursor='default';

    buttonOurPurchaseOrderDetailsAdd.disabled=true;
    buttonOurPurchaseOrderDetailsAdd.style.cursor="not-allowed";


    ourPurchaseOrderDetail=JSON.parse(JSON.stringify(ob));
    oldOurPurchaseOrderDetail = JSON.parse(JSON.stringify(ob));

    txtQty.value=ob.qty;
    txtRate.value=ob.rate;

    fillDataIntoSelect(selectRawMaterial,'Select Raw Material Name',rawMaterials,'rmname',ob.rawmaterial_id.rmname);


}

const checkUpdatesOurPurchaseOrderDetails = ()=>{
    let updates = "";


    if (ourPurchaseOrderDetail.rawmaterial_id.rmname != oldOurPurchaseOrderDetail.rawmaterial_id.rmname){
        updates=updates+`Raw Material Name Is Updated From ${oldOurPurchaseOrderDetail.rawmaterial_id.rmname} To ${ourPurchaseOrderDetail.rawmaterial_id.rmname} \n`
    }

    if (ourPurchaseOrderDetail.qty != oldOurPurchaseOrderDetail.qty){
        updates=updates+`Quantity Is Updated \n`
    }
    if (ourPurchaseOrderDetail.rate != oldOurPurchaseOrderDetail.rate){
        updates=updates+"Rate Is Updated \n"
    }

    return updates;
}



const updateOurPurchaseOrderDetail = ()=>{
    let updates = checkUpdatesOurPurchaseOrderDetails();


    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Our Purchase Order Details
        ${updates}`);

        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/ourpodetail",ourPurchaseOrderDetail);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshOurPurchaseOrderDetailsForm();
                refreshOurPurchaseOrderDetailsTable();
                divModifyButton2.classList.add('d-none');
            }else {
                alert("Error Happened "+putServerResponse);
            }
        }else {
            alert(`User Cancelled The Operation`);
        }

    }else {
        alert(`Noting To Update`);
    }
}



const deleteOurPurchaseOrderDetail = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Purchase Order Detail
            Raw Material Name Is ${ob.rawmaterial_id.rmname}
            Quantity Is ${ob.qty}
            Rate Is ${ob.rate}
            Header Is ${ob.ourpoheaderkey}
    `);
    if (userConfirm){
        const deleteServerResponse =ajaxDeleteRequest("/ourpodetail",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshOurPurchaseOrderDetailsTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert("Error Happened \n"+deleteServerResponse);
        }
    }else {
        alert(`User Cancelled The Operation`);
    }
}




//printing functions starts from here.
const printOurPurchase = async (ob,rowIndex)=>{

    await loadDataIntoOurPurchaseOrderDetailsTableInsidePrint(ob.ourpokey);

    const newWindow = window.open();
    await newWindow.document.write(`
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>our purchase order print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid position-relative">
    <div class="row text-center">
        <h3 style="font-size: 14px; font-weight: bold">Purchase Order</h3>
    </div>
</div>

<div class="row" style="margin-left: 5px">
    <div class="col-6"><p style="font-size: 14px">SUPPLIER</p></div>
</div>

<!--     supplier section and po section start   -->
<div class="row" style="margin-left: 2px; margin-right: 3px">
    <div class="col-4">

        <div class="card" style="border: 1px solid black">
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.suppliername}</p>
            <p style="font-size: 12px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.supplieraddress?ob.supplier_id.supplieraddress:" "}</p>
            <p style="font-size: 12px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.suppliertelephone?ob.supplier_id.suppliertelephone:" "}</p>
        </div>

    </div>

    <div class="col-3"></div>

    <div class="col-5">
        <table class="table table-bordered" style="border: 1px solid black">
            <tbody>


            <tr>
                <td style="line-height: 0.5; font-size: 12px;">PO No</td>
                <td style="font-weight: bold; font-size: 12px; line-height: 0.5;" >${ob.ourponumber}</td>
            </tr>


            <tr>
                <td style="line-height: 0.5; font-size: 12px;">PO Date</td>
                <td style="font-weight: bold; font-size: 12px; line-height: 0.5;" >${new Date(ob.ourpodate).toLocaleString('en-GB', { day: "2-digit", month: "short", year: "2-digit" })}</td>
            </tr>


            <tr>
                <td style="line-height: 0.5; font-size: 12px;">Ref No</td>
                <td style="font-weight: bold; font-size: 12px; line-height: 0.5;" >${ob.ourponumber}</td>
            </tr>


            </tbody>
        </table>
    </div>
</div>
<!--     customer section and po section end   -->


<!-- our purchase order details table start-->
<div class="row" style="margin-left: 12px; margin-right: 12px">
    ${printOurPurchaseOrderDetailsTable.outerHTML}
</div>
<!-- our purchase order details table end-->



<div class="row" style="position: absolute;bottom: 1%; width: 100%">
    <div class="col-4 text-center">
        <p>..........................</p>
        <p style="font-size: 12px">Prepared by</p>
    </div>
    <div class="col-4 text-center">
        <p>..........................</p>
        <p style="font-size: 12px">Checked by</p>
    </div>
    <div class="col-4 text-center">
        <p>..........................</p>
        <p style="font-size: 12px">Approved by</p>
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

const loadDataIntoOurPurchaseOrderDetailsTableInsidePrint = (ourPoHeaderKey)=>{

    const getPoDetailsFromOurPoHeaderKey = ajaxGetRequest(`/ourpodetail/getourpodetailsfrom-ourpoheaderkey/${ourPoHeaderKey}`);

    const displayProperty= [
        {dataType:'function',propertyName:getRawMaterialForPrint},
        {dataType:'function',propertyName:getPoDetailQuantity},
        {dataType:'function',propertyName:getPoDetailRate},
        {dataType:'function',propertyName:getValue},
    ];

    fillDataIntoTable(printOurPurchaseOrderDetailsTable,getPoDetailsFromOurPoHeaderKey,displayProperty,false);


}



const getRawMaterialForPrint = (ob)=>{
    return `<p class="text-start" style="font-size: 12px">${ob.rawmaterial_id.rmname}</p>`;
}


const getPoDetailQuantity = (ob)=>{
    return `<p class="text-end" style="font-size: 12px">${Number(ob.qty).toLocaleString('en-US')}</p>`
}

const getPoDetailRate = (ob)=>{
    return `<p class="text-end" style="font-size: 12px">${Number(ob.rate).toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}</p>`
}

const getValue = (ob)=>{

    let result = Number(ob.qty) * Number(ob.rate)
    return `<p class="text-end" style="font-size: 12px">${result.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}
















