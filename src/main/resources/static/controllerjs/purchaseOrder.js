window.addEventListener('load',function (){

    refreshPurchaseOrderHeaderForm();
    refreshPurchaseOrderHeaderTable()



    refreshPurchaseOrderDetailForm();
    // refreshPurchaseOrderDetailTable(); test kranna one nisa call kare | table eka ok

    //add button eka disable karanawa header eka mulinma daala inna one nisa
    btnAddPurchaseOrderDetail.disabled=true
    btnAddPurchaseOrderDetail.style.cursor="not-allowed";

})

// purchase order header section start


const refreshPurchaseOrderHeaderForm = ()=>{

    purchaseOrderHeader = new Object();


    selectCustomer.style.border="2px solid #ced4da";
    selectCompanyName.style.border="2px solid #ced4da";
    textPoNO.style.border="2px solid #ced4da";
    textPoDate.style.border="2px solid #ced4da";

    selectCustomer.value="";
    selectCompanyName.value="";
    textPoNO.value="";
    textPoDate.value="";



    customers =ajaxGetRequest("/customer/findall")
    fillDataIntoSelect(selectCustomer,"select customer",customers,'customername');


    companies=ajaxGetRequest("/company/findall");
    fillDataIntoSelect(selectCompanyName,"select company",companies,'companyname')

}



const refreshPurchaseOrderHeaderTable = ()=>{

    purchaseOrderHeaderes= ajaxGetRequest("/purchaseorderheader/findall");


    displayProperty=[
        {dataType:"function",propertyName:getCustomerName},
        {dataType:"function",propertyName:getCompanyName},
        {dataType:"text",propertyName:"ponumber"},
        {dataType:"text",propertyName:"podate"},
    ];

    fillDataIntoTable(purchaseOrderHeaderTable,purchaseOrderHeaderes,displayProperty,true);
}

const getCustomerName = (ob)=>{
    return ob.customer_id.customername;
}

const getCompanyName = (ob)=>{
    return ob.company_id.companyname
}


const checkErrorsPurchaseHeader = ()=>{

    let errors = "";

    if (purchaseOrderHeader.customer_id == null){
        errors=errors+"Customer Cannot Be Empty \n"
    }

    if (purchaseOrderHeader.company_id == null){
         errors=errors+"Company Name Cannot Be Empty \n"
    }

    if (purchaseOrderHeader.ponumber == null){
         errors=errors+"Purchase Order Cannot Be Empty \n"
    }

    if (purchaseOrderHeader.podate == null){
        errors=errors+"Purchase Order Date Cannot Be Empty"
    }


    return errors;
}


const submitPurchaseOrderHeader = ()=>{
    if (textDisplayPurchaseOrderKey.value != ""){
        console.log("update part");

        let getIdFromPurchaseOrderHeaderKey = ajaxGetRequest("/purchaseorderheader/getidfrompurchaseorderheadekey/"+textDisplayPurchaseOrderKey.value)
        console.log(getIdFromPurchaseOrderHeaderKey);


        purchaseOrderHeader.id=getIdFromPurchaseOrderHeaderKey;
        purchaseOrderHeader.pokey=textDisplayPurchaseOrderKey.value  //key eka set karanne mokada upate ekedi key ekek set wenne na ne eka set venne save eke nisa methanath bind karanna one

        setTimeout(()=>{
            let putResponse = ajaxPutRequest("/purchaseorderheader",purchaseOrderHeader)
            if (putResponse=="ok"){
                alert("update success");
                refreshPurchaseOrderHeaderTable();
            }
        },1500)


    }else {
        console.log("submit part");
        const errors = checkErrorsPurchaseHeader();
        if (errors==""){

            const userConfirm = confirm("Are You Sure To Add Following Purchase Order Header \n"
                +"\n Customer Name Is "+purchaseOrderHeader.customer_id.customername
                +"\n Company Name Is "+purchaseOrderHeader.company_id.companyname
                +"\n Purchase Order Number Is "+purchaseOrderHeader.ponumber
                +"\n Purchase Order Date Is "+purchaseOrderHeader.podate
            );

            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/purchaseorderheader",purchaseOrderHeader);
                if (postServerResponse && postServerResponse.pokey){
                    alert("save successful");
                    console.log(postServerResponse)
                    textDisplayPurchaseOrderKey.value=postServerResponse.pokey
                    refreshPurchaseOrderHeaderTable();

                    //purchase order details section eke button eka enable karanawa
                    btnAddPurchaseOrderDetail.disabled=false;
                    btnAddPurchaseOrderDetail.style.cursor="default"

                }else {
                    alert("save unsuccessful \n"+postServerResponse)
                }
            }
        }else {
            alert("you have errors \n"+errors);
        }
    }
}


const deletePurchaseOrderHeader = (ob,rowIndex)=>{
    const userConfirm = confirm("are you sure to delete following purchase order"
        +"\n Customer Name Is "+ob.customer_id.customername
        +"\n Company Name Is "+ob.company_id.companyname
        +"\n Purchase Order Number Is "+ob.ponumber
        +"\n Purchase Order Date Is "+ob.ponumber
    );
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/purchaseorderheader",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            refreshPurchaseOrderHeaderTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("error happened")
        }
    }


}


const refillPurchaseOrderHeader = (ob,rowIndex)=>{




    //refill eke di key eke display vena ekata data set karanna one
    textDisplayPurchaseOrderKey.value= ob.pokey


    textPoNO.value=ob.ponumber
    textPoDate.value=ob.podate



    fillDataIntoSelect(selectCustomer,"select customer",customers,'customername',ob.customer_id.customername);
    fillDataIntoSelect(selectCompanyName,"select company",companies,'companyname',ob.company_id.companyname)


    divPurchaseOrderDetailTable.classList.remove('d-none');
    refreshPurchaseOrderDetailTable();
}


const displayCustomerDetails = (fieldId)=>{
    console.log(fieldId.value)
    const selectedCustomer = JSON.parse(fieldId.value);

    textDisplayCompanyName.innerHTML=""
    textDisplayCompanyAddress.innerHTML=""
    textDisplayCompanyTP.innerHTML=""


    textDisplayCompanyName.innerHTML=selectedCustomer.customername;
    textDisplayCompanyAddress.innerHTML=selectedCustomer.customeraddress;
    textDisplayCompanyTP.innerHTML=selectedCustomer.customertelephone;

}



// purchase order header section end





// purchase order details area start




const refreshPurchaseOrderDetailForm = ()=>{

    //update button eke disable karanawa user can click update button instead of add button
    btnUpdatePurchaseOrderDetail.disabled=true;
    btnUpdatePurchaseOrderDetail.style.cursor="not-allowed";

    purchaseOrderDetail = new Object();

    txtQty.value="";
    txtRate.value="";
    txtValue.value="";


    selectItemName.style.border="2px solid #ced4da";
    txtQty.style.border="2px solid #ced4da";
    txtRate.style.border="2px solid #ced4da";
    txtValue.style.border="2px solid #ced4da";

    items = ajaxGetRequest("/item/findall")
    fillDataIntoSelect(selectItemName,'Select Item',items,'itmname');

}


const refreshPurchaseOrderDetailTable =()=>{
    //methanadi karala thiyenne purchase order header section eke thiyena purchase order key eka aran ee key ekata adala purchase order details tika load karana eka thama karanne
    purchaseOrderDetails = ajaxGetRequest("/purchaseorderdetails/getpurchaseorderdetailsbypurchaseorderkey/"+textDisplayPurchaseOrderKey.value);

    displayProperty=[
        {dataType:"function",propertyName:getItemName},
        {dataType:"function",propertyName:getPoQty},
        {dataType:"function",propertyName:getPoRate},
        {dataType:"function",propertyName:getPoValue},
    ];

    fillDataIntoTable2(purchaseOrderDetailsTable,purchaseOrderDetails,displayProperty,true);

}

// print ekata one wena getters table walata

const getItemName = (ob)=>{
    return ob.item_id.itmname
}

const getPoQty = (ob)=>{
    return '<p class="text-end">'+    Number(ob.poqty).toLocaleString('en-US')    +'</p>'
}

const getPoRate = (ob)=>{
    return '<P class="text-end">'+   Number(ob.porate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})    +'</P>'
}

const getPoValue = (ob)=>{
    return '<p class="text-end">'+  Number(ob.povalue).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})  +'</p>'
}

const generateItemValue = (fieldId)=>{
    let value = parseFloat(fieldId.value);

    let qty = txtQty.value;

    let answer = qty*value;

    txtValue.value=answer;
    purchaseOrderDetail.povalue = txtValue.value;
    txtValue.style.border="2px solid green";


}

const checkErrorsPurchaseOrderDetail = ()=>{
    let errors = '';

    if (purchaseOrderDetail.item_id == null){
        errors=errors+"Item cannot be Empty \n"
    }

    if (purchaseOrderDetail.poqty == null){
        errors=errors+"Purchase Order Quantity cannot be empty \n"
    }

    if (purchaseOrderDetail.porate == null){
        errors=errors+"Purchase Order Rate Cannot Be Empty \n"
    }
    if (purchaseOrderDetail.povalue == null){
        errors=errors+"Purchase Order Value Cannot Be Empty \n"
    }
    return errors;
}

const submitPurchaseOrderDetails = ()=>{
    let errors = checkErrorsPurchaseOrderDetail();

    //purchase order header eken po key eka aran purchase order detail eke purchase order key ekata bind karanna one.
    purchaseOrderDetail.purchaseorderkey = textDisplayPurchaseOrderKey.value

    if (errors==""){

        const userConfirm = confirm("are you to delete following purchase detail \n"
        +"\n Purchase Order Key Is "+purchaseOrderDetail.purchaseorderkey
        +"\n Item Name Is "+purchaseOrderDetail.item_id.itmname
        +"\n Purchase Order Quantity is "+purchaseOrderDetail.poqty
        +"\n Purchase Order Rate is"+purchaseOrderDetail.porate
        +"\n Purchase Order Value is"+purchaseOrderDetail.povalue
        );

        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/purchaseorderdetails",purchaseOrderDetail);
            if (postServerResponse=="ok"){
                alert("save successful");
                refreshPurchaseOrderDetailForm();
                divPurchaseOrderDetailTable.classList.remove('d-none')
                refreshPurchaseOrderDetailTable();
            }
        }

    }else {
        alert("you have following errors \n"+errors);
    }

}

const refillPurchaseOrderDetails = (ob,rowIndex) =>{

    //update button eka enable karanawa
    btnUpdatePurchaseOrderDetail.disabled=false
    btnUpdatePurchaseOrderDetail.style.cursor="default"


    purchaseOrderDetail=JSON.parse(JSON.stringify(ob))
    oldpurchaseOrderDetail=JSON.parse(JSON.stringify(ob))



    txtQty.value = ob.poqty;
    txtRate.value = ob.porate;
    txtValue.value = ob.povalue;


    fillDataIntoSelect(selectItemName,'Select Item',items,'itmname',ob.item_id.itmname);



}

const checkUpdatesPurchaseOrderDetails = ()=>{
    let updates = "";

    if (purchaseOrderDetail.item_id.itmname !=  oldpurchaseOrderDetail.item_id.itmname){
        updates=updates+"Item Name Is Updated \n"
    }

    if (purchaseOrderDetail.poqty != oldpurchaseOrderDetail.poqty){
        updates=updates+"Purchase Order Quantity Is Updated \n"
    }

    if (purchaseOrderDetail.porate != oldpurchaseOrderDetail.porate){
        updates=updates+"Purchase Order Rate Is Updated \n"
    }

    if (purchaseOrderDetail.povalue != oldpurchaseOrderDetail.povalue){
        updates=updates+"Purchase Order Value Is Updated \n"
    }

    return updates;
}

const updatePurchaseOrderDetails = ()=>{
    const updates = checkUpdatesPurchaseOrderDetails();

    if (updates!=""){
        const userConfirm = confirm("Are You Sure TO Update Following Purchase Order Details \n"+updates);

        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/purchaseorderdetails",purchaseOrderDetail);
            if (putServerResponse=="ok"){
                alert("update successful \n");
                refreshPurchaseOrderDetailTable();
                refreshPurchaseOrderDetailForm();
                divModifyButton2.classList.add('d-none')
            }else {
                alert("error happened "+putServerResponse);

            }
        }




    }else {
        alert("nothing updated");
    }







}

const deletePurchaseOderDetails= (ob,rowIndex)=>{
    const userConfirm = confirm("Are You Sure to Delete Following Purchase Order Details \n"
    +"\n Item Name is "+ob.item_id.itmname
    +"\n Purchase Order Quantity is "+ob.poqty
    +"\n Purchase Order Rate is "+ob.porate
    +"\n Purchase Order Value is "+ob.povalue
    );

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/purchaseorderdetails",ob)
        if (deleteServerResponse=="ok"){
            alert("delete successful ");
            divModifyButton2.classList.add('d-none');
            refreshPurchaseOrderDetailTable();
        }else {
            alert("error happened \n"+deleteServerResponse)
        }
    }


}


//create function to save item key
const saveImKey = (fieldID)=>{
    let selectedItem = JSON.parse(fieldID.value);
    console.log(selectedItem.imkey);
    purchaseOrderDetail.imkey=selectedItem.imkey;
}

// purchase order details area end
























































