window.addEventListener('load',function () {

    refreshInvoiceDetailsForm();


    refreshInvoiceDetailsTable();


    refreshInvoiceForm();


});



const refreshInvoiceDetailsForm = ()=>{

    invoiceDetail = new Object();

    //disable update button
    buttonUpdateInvoiceDetail.disabled=true;
    buttonUpdateInvoiceDetail.style.cursor="not-allowed"

    //enable add button
    buttonAddInvoiceDetail.disabled=false;
    buttonAddInvoiceDetail.style.cursor="default"


    txtQty.value=""
    txtRate.value=""
    txtValue.value=""


    selectItemName.style.border="2px solid #ced4da"
    txtQty.style.border="2px solid #ced4da"
    txtRate.style.border="2px solid #ced4da"
    txtValue.style.border="2px solid #ced4da"

    itemNames = ajaxGetRequest("/item/findall");
    fillDataIntoSelect(selectItemName,'select item name',itemNames,'itmname');

}


const refreshInvoiceDetailsTable = ()=>{

    invoiceDetails = ajaxGetRequest("/invoice-detail/findall");

    displayProperty=[
        {dataType: 'function', propertyName: getItemName},
        {dataType: 'text', propertyName: 'invqty'},
        {dataType: 'text', propertyName: 'invrate'},
        {dataType: 'text', propertyName: 'invvalue'},
    ];

    fillDataIntoTable(tableInvoiceDetails,invoiceDetails,displayProperty,true);
    $("#tableInvoiceDetails").dataTable();

}


const getItemName = (ob)=>{
    return ob.item_id.itmname;
}



const generateItemValue = (fieldId)=>{
    let value = parseFloat(fieldId.value);

    let qty = txtQty.value;

    let answer = qty*value;

    txtValue.value=answer;
    invoiceDetail.invvalue = txtValue.value;
    txtValue.style.border="2px solid green";


}


const checkErrors = ()=>{
    let errors = '';

    if (invoiceDetail.item_id.itmname == null){
        errors=errors+"Item Name Cannot Be Empty \n"
    }

    if (invoiceDetail.invqty ==null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }

    if (invoiceDetail.invrate==null){
        errors=errors+"Rate Cannot Be Empty \n"
    }

    if (invoiceDetail.invvalue==null){
        errors=errors+"Value Cannot Be Empty \n"
    }
    return errors;
}



const buttonInvoiceDetailsAdd = ()=>{
    let errors = checkErrors();
    if (errors==""){
        const userConfirm = confirm("are you sure to add"
        +"\n item name is"+invoiceDetail.item_id.itmname
        +"\n invoice qty are"+invoiceDetail.invqty
        +"\n invoice rate is"+invoiceDetail.invrate
        +"\n invoice value is"+invoiceDetail.invvalue

    );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/invoice-detail",invoiceDetail);
            if (postServerResponse=="ok"){
                alert("save successful");
                refreshInvoiceDetailsTable();
                refreshInvoiceDetailsForm()
            }else {
                alert("error happened \n"+postServerResponse)
            }
        }
    }else {
        alert("you have errors"+errors);
    }
}



const refillInvoiceDetails = (ob,rowindex)=>{

    //enable update button
    buttonUpdateInvoiceDetail.disabled=false;
    buttonUpdateInvoiceDetail.style.cursor="default";

    //disable add button
    buttonAddInvoiceDetail.disabled=true;
    buttonAddInvoiceDetail.style.cursor="not-allowed"


    invoiceDetail = JSON.parse(JSON.stringify(ob));
    oldInvoiceDetail = JSON.parse(JSON.stringify(ob));

    txtQty.value=ob.invqty
    txtRate.value=ob.invrate
    txtValue.value=ob.invvalue

    fillDataIntoSelect(selectItemName,'select an option',itemNames,'itmname',ob.item_id.itmname)

}


const checkUpdates = ()=>{

    let updates = '';


    if (invoiceDetail.item_id.itmname != oldInvoiceDetail.item_id.itmname){
        updates=updates+"item name is updated \n"
    }
    if (invoiceDetail.invqty != oldInvoiceDetail.invqty){
        updates=updates+"Quantity Is Updated \n"
    }
    if (invoiceDetail.invrate != oldInvoiceDetail.invrate){
        updates=updates+"Rate is updated \n"
    }

    if (invoiceDetail.invvalue != oldInvoiceDetail.invvalue){
        updates=updates+"Value is updated \n"
    }
    return updates;
}


const updateInvoiceDetail = ()=>{
    let updates = checkUpdates();
    if (updates!=""){
        const userConfirm = confirm("are you sure to update following invoice detail \n"+updates);
        if (userConfirm){
            let putServerResponse = ajaxPutRequest("/invoice-detail",invoiceDetail);
            if (putServerResponse=="ok"){
                alert("update successfully \n");
                refreshInvoiceDetailsTable();
                refreshInvoiceDetailsForm();
                divModifyButton.className="d-none";
            }else {
                alert("error happened "+putServerResponse)
            }
        }
    }else {
        alert("nothing to update")
    }
}

const deleteInvoiceDetail = (ob,rowIndex)=>{
    const userConfirm=confirm("are you sure to delete Invoice detail \n"
        +"\n item name is"+ob.item_id.itmname
        +"\n invoice qty are"+ob.invqty
        +"\n invoice rate is"+ob.invrate
        +"\n invoice value is"+ob.invvalue
    );
    if (userConfirm){
        let deleteServerResponse = ajaxDeleteRequest("/invoice-detail",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successfully");
            refreshInvoiceDetailsTable();
            divModifyButton.className="d-none";
        }else {
            alert("delete unsuccessful \n"+deleteServerResponse);
            refreshInvoiceDetailsTable();
        }
    }
}





// ------------------------------------------------------------------------------------------------------
// invoice area start


const refreshInvoiceForm = ()=>{


    customers=ajaxGetRequest("/customer/findall")
    fillDataIntoSelect(selectCustomer,'select customer',customers,'customername')



}



const getCustomerValues = (fieldId)=>{

    txtSelectedCustomerAddress.innerHTML="";
    txtSelectedCustomerPhoneNO.innerHTML="";

    selectedCustomer= new Object();

    selectedCustomer=JSON.parse(fieldId.value);
    console.log(selectedCustomer.customername);
    console.log(selectedCustomer.customeraddress);
    console.log(selectedCustomer.customertelephone);

    txtSelectedCustomerAddress.innerHTML=selectedCustomer.customeraddress;
    txtSelectedCustomerPhoneNO.innerHTML=selectedCustomer.customertelephone;

}







