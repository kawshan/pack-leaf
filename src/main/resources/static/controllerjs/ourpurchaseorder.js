window.addEventListener('load',function () {

    ourPurchaseOrderHeaderFormRefresh();

    refreshOurPurchaseOrderHeaderTable();
});


const ourPurchaseOrderHeaderFormRefresh = ()=>{

    ourpoheader = new Object();

    textRefQuotation.value="";
    textPoDate.value="";

    textRefQuotation.style.border="2px solid #cd4da";
    textPoDate.style.border="2px solid #cd4da";


    suppliers = ajaxGetRequest("/supplier/findall")
    fillDataIntoSelect(selectSupplier,'Select Supplier',suppliers,'suppliername');

}

const refreshColorsInOurPurchaseOrderHeader = ()=>{
    textRefQuotation.style.border='2px solid #ced4da';
    textPoDate.style.border='2px solid #ced4da';
    selectSupplier.style.border='2px solid #ced4da';
}


const refreshOurPurchaseOrderHeaderTable = ()=>{

    ourpoheaders = ajaxGetRequest("/ourpoheader/findall");

    displayProperty = [
        {dataType:'function',propertyName:getSupplierName},
        {dataType: 'text',propertyName:'refquotation'},
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

    if (ourpoheader.refquotation == null){
        errors= errors+"Reference quotation Cannot Be Empty \n "
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
            Reference Quotation Is ${ourpoheader.refquotation}
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
            Reference Quotation Is ${ourpoheader.refquotation}
            Date Is ${ourpoheader.ourpodate}
            key is ${ourpoheader.ourpokey}
            ID Is ${ourpoheader.id}
        `);

        if (userConfirm){
            const putServerResponse = await ajaxPutRequest("/ourpoheader",ourpoheader);
            if (putServerResponse=="ok"){
                alert("Update Successful")
                refreshColorsInOurPurchaseOrderHeader()
            }else {
                alert("Error Happened During Update \n"+putServerResponse);
            }
        }else {
            alert("User Cancelled The Update Operation")
        }
    }
}



const deleteOurPurchaseOrderHeader = (ob, rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Our Purchase Order header \n
    Supplier Name Is ${ob.supplier_id.suppliername}
    Reference Quotation Is ${ob.refquotation}
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




























