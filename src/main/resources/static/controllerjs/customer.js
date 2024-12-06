window.addEventListener('load',function () {

    refreshCustomerForm();

    refreshCustomerTable();


})

const refreshCustomerForm = ()=>{

    customer = new Object();


    txtCustomerName.style.border="2px solid #ced4da";
    txtCustomerAddress.style.border="2px solid #ced4da";
    txtCustomerVatNo.style.border="2px solid #ced4da";
    txtCustomerTelephone.style.border="2px solid #ced4da";
    txtCustomerContactPerson.style.border="2px solid #ced4da";
    txtCustomerDeliveryAddress.style.border="2px solid #ced4da";
    txtCustomerBank.style.border="2px solid #ced4da";
    selectCustomerStatus.style.border="2px solid #ced4da";


    txtCustomerName.value="";
    txtCustomerAddress.value="";
    txtCustomerVatNo.value="";
    txtCustomerTelephone.value="";
    txtCustomerContactPerson.value="";
    txtCustomerDeliveryAddress.value="";
    txtCustomerBank.value="";
    selectCustomerStatus.value="";

    btnUpdate.disabled=true;
    btnUpdate.style.cursor="not-allowed";

}


const refreshCustomerTable = ()=>{

    customers=ajaxGetRequest("/customer/findall");

    displayProperty = [
        {dataType: 'text', propertyName: 'customername'},
        {dataType: 'text', propertyName: 'customerkey'},
        {dataType: 'text', propertyName: 'customeraddress'},
        {dataType: 'text', propertyName: 'customervatno'},
        {dataType: 'text', propertyName: 'customertelephone'},
        {dataType: 'text', propertyName: 'customercontactperson'},
        {dataType: 'text', propertyName: 'customerdeliveryaddress'},
        {dataType: 'text', propertyName: 'customerbank'},
        {dataType: 'function', propertyName: getCustomerStatus},
    ];

    fillDataIntoTable(customerTable,customers,displayProperty,true);

}

const getCustomerStatus = (ob)=>{
   if (ob.customerstatus){
       return "<p class='text-success'>active</p>"
   }else {
       return "<p class='text-danger'>not-active</p>"
   }
}



const checkError = ()=>{
    let errors='';

    if (customer.customername == null){
        errors=errors+"Customer Name Cannot Be Empty \n";
    }

    if (customer.customeraddress == null){
        errors=errors+"Customer Address Cannot Be Empty \n";
    }

    // if (customer.customervatno == null){
    //     errors=errors+"Customer Vat No Cannot Be Empty \n";
    // }

    if (customer.customertelephone == null){
        errors=errors+"Customer Telephone Cannot Be Empty \n";
    }

    // if (customer.customercontactperson == null){
    //     errors=errors+"Customer Contact Person Cannot Be Empty \n";
    // }
    //
    // if (customer.customerdeliveryaddress == null){
    //     errors=errors+"Customer Delivery Address Cannot Be Empty \n";
    // }
    //
    // if (customer.customerbank == null){
    //     errors=errors+"Customer Bank Cannot Be Empty \n";
    // }
    //
    // if (customer.customerstatus == null){
    //     errors=errors+"Customer Status Cannot Be Empty \n";
    // }


    return errors;
}


const submitCustomer = ()=>{
    let errors = checkError();
    if (errors ==""){
        const userConfirm = confirm("are you sure to add following customer \n"
        +"\n Customer Name Is "+customer.customername
        +"\n Customer Address Is "+customer.customeraddress
        +"\n Customer Telephone Is "+customer.customertelephone
        // +"\n Customer Vat No Is "+customer.customervatno
        // +"\n Customer Contact Person Is "+customer.customercontactperson
        // +"\n Customer Delivery Address Is "+customer.customerdeliveryaddress
        // +"\n Customer Bank Is "+customer.customerbank
        +"\n Customer Status Is "+customer.customerstatus
        );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/customer",customer);
            if (postServerResponse=="ok"){
                alert("save successfully");
                refreshCustomerTable();
                refreshCustomerForm();
            }else {
                alert("save unsuccessful"+postServerResponse);
            }
        }
    }else {
        alert(errors);
    }
}

const refillCustomer = (ob,rowIndex)=>{

    btnUpdate.disabled=false;
    btnUpdate.style.cursor="default"

    customer=JSON.parse(JSON.stringify(ob));
    oldcustomer=JSON.parse(JSON.stringify(ob));

    txtCustomerName.value=ob.customername
    txtCustomerAddress.value=ob.customeraddress
    txtCustomerVatNo.value=ob.customervatno
    txtCustomerTelephone.value=ob.customertelephone
    txtCustomerContactPerson.value=ob.customercontactperson
    txtCustomerDeliveryAddress.value=ob.customerdeliveryaddress
    txtCustomerBank.value=ob.customerbank
    selectCustomerStatus.value=ob.customerstatus


}

const checkUpdates = ()=>{
    let updates = '';

    if (customer.customername != oldcustomer.customername){
        updates=updates+"Customer Name Is Updated \n";
    }

    if (customer.customeraddress != oldcustomer.customeraddress){
        updates=updates+"Customer Address Is Updated \n";
    }

    if (customer.customervatno != oldcustomer.customervatno){
        updates=updates+"Customer Vat NO Is Updated \n";
    }

    if (customer.customertelephone != oldcustomer.customertelephone){
        updates=updates+"Customer Telephone Is Updated \n";
    }

    if (customer.customercontactperson != oldcustomer.customercontactperson){
        updates=updates+"Customer Contact Person Is Updated \n";
    }

    if (customer.customerdeliveryaddress != oldcustomer.customerdeliveryaddress){
        updates=updates+"Customer Delivery Address Is Updated \n";
    }

    if (customer.customerbank != oldcustomer.customerbank){
        updates=updates+"Customer Bank Is Updated \n";
    }

    if (customer.customerstatus != oldcustomer.customerstatus){
        updates=updates+"Customer Status Is Updated \n";
    }

    return updates;
}





const updateCustomer = ()=>{
    let updates = checkUpdates();
    if (updates != ""){
        const userConfirm = confirm("are you sure to update customer \n"+updates);
        if (userConfirm){
            let putServerResponse = ajaxPutRequest("/customer",customer);
            if (putServerResponse=="ok"){
                alert("update successful");
                divModifyButton.className="d-none";
                refreshCustomerForm();
                refreshCustomerTable();
            }else {
                alert("update unsuccessful \n"+putServerResponse)
            }
        }
    }else {
        alert("nothing to update");
    }
}


const deleteCustomer = (ob,rowIndex)=>{

    console.log("delete "+ob+" "+rowIndex);

    const userConfirm = confirm("are you sure to delete following customer"
        +"\n Customer Name Is "+ob.customername
        +"\n Customer Address Is "+ob.customeraddress
        +"\n Customer Telephone Is "+ob.customertelephone
        +"\n Customer Status Is "+ob.customerstatus
    );

    if (userConfirm){
        let deleteServerResponse = ajaxDeleteRequest("/customer",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            divModifyButton.className="d-none";
            refreshCustomerTable();
        }else {
            alert("error happened \n"+deleteServerResponse);
            refreshCustomerTable();
        }
    }





}























