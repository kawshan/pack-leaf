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
        {dataType:'text',propertyName:'qty'},
        {dataType:'text',propertyName:'rate'},
    ];

    fillDataIntoTable2(ourPurchaseOrderDetailsTable,ourpurchaseOrderDetails,displayProperty,true,divModifyButton2);
}

const getRawMaterial = (ob)=>{
   return ob.rawmaterial_id.rmname;
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










