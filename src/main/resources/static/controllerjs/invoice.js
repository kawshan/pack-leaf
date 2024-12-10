window.addEventListener('load',function () {

    invoiceDetails = ajaxGetRequest("/invoice-detail/findall");
    invoiceHeaders = ajaxGetRequest("/invoice-header/findall");


    refreshInvoiceDetailsForm();


    refreshInvoiceDetailsTable();


    refreshInvoiceHeaderForm();

    refreshInvoiceHeaderTable();


    //need to disable invoice detail button because we need to add invoice header first below button are invoice detail section
    buttonAddInvoiceDetail.disabled=true;
    buttonAddInvoiceDetail.style.cursor="not-allowed";


    //need to disable invoice header update button because user can click update instead of save button
    btnUpdateInvoiceHeader.classList.add('d-none');     //sir kivva vidihata dan button update eken wadak na ee nisa thama me ka d-none ekak vitharak damme button eke ekapaarama ayin karala danne nathuwa


});



//invoice details starts from here
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------


const refreshInvoiceDetailsForm = ()=>{

    invoiceDetail = new Object();

    //disable update button
    buttonUpdateInvoiceDetail.disabled=true;
    buttonUpdateInvoiceDetail.style.cursor="not-allowed"

    //enable add button
    buttonAddInvoiceDetail.disabled=false;
    buttonAddInvoiceDetail.style.cursor="default"

    //emptying values
    txtQty.value=""
    txtRate.value=""
    txtValue.value=""

    //set default color
    selectItemName.style.border="2px solid #ced4da"
    txtQty.style.border="2px solid #ced4da"
    txtRate.style.border="2px solid #ced4da"
    txtValue.style.border="2px solid #ced4da"

    itemNames = ajaxGetRequest("/item/findall");
    fillDataIntoSelect(selectItemName,'select item name',itemNames,'itmname');

}


const refreshInvoiceDetailsTable = ()=>{

   let invoiceDetailsFromMaxInvoiceKey =ajaxGetRequest("/invoice-detail/getinvoicedetailsbymaxinvoicekey") //invoice detail dao eke define karala athi

    displayProperty=[
        {dataType: 'function', propertyName: getItemName},
        {dataType: 'text', propertyName: 'invqty'},
        {dataType: 'text', propertyName: 'invrate'},
        {dataType: 'text', propertyName: 'invvalue'},
    ];

    fillDataIntoTable(tableInvoiceDetails,invoiceDetailsFromMaxInvoiceKey,displayProperty,true);
    // $("#tableInvoiceDetails").dataTable();

}


const getItemName = (ob)=>{
    // return '<p class="text-start">'+ ob.item_id.itmname  +'</p>';
    //customer item name ekak thiyenawada balanawa ---
    if (ob.customer_item_name=="null"){
        return '<p class="text-start">'+ ob.item_id.itmname  +'</p>';
    }else {
        return `<p class="text-start">${ob.item_id.itmname}</p> <p class="text-start">(${ob.item_id.customer_item_name})</p>`
    }



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
    invoiceDetail.invvalue = txtValue.value;
    txtValue.style.border="2px solid green";


}


const checkErrors = ()=>{

    let errors = '';

    if (invoiceDetail.item_id == null){
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

    //invoice key eka aran bind kara
    invoiceDetail.invoicekey=textInvoiceHeaderKey.value

    let errors = checkErrors();
    if (errors==""){
        const userConfirm = confirm("are you sure to add"
        +"\n Invoice Key is "+invoiceDetail.invoicekey
        +"\n item name is "+invoiceDetail.item_id.itmname
        +"\n invoice qty are "+invoiceDetail.invqty
        +"\n invoice rate is "+invoiceDetail.invrate
        +"\n invoice value is "+invoiceDetail.invvalue
        +"\n purchase order id is "+invoiceDetail.podetail_id.id

    );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/invoice-detail",invoiceDetail);
            if (postServerResponse=="ok"){
                alert("save successful");
                cardInvoiceDetailTable.classList.remove('d-none')
                refreshInvoiceDetailsTable();
                refreshInvoiceDetailsForm();
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



//create function for helping invoice header refill header eke refill eka ebuwama details section eketh table eka print vena vidihata
const refillInvoiceDetailTable = (invoiceNumber)=>{

    //meka invoice details eke define karala athi invoice detail dao ekeyi controller ekei
    let getAllInvoiceDetailsFromInvoiceNumber = ajaxGetRequest("/invoice-detail/getallinvoicedetailbyinvoicekey/"+invoiceNumber);

    displayProperty=[
        {dataType: 'function', propertyName: getItemName},
        {dataType: 'function', propertyName: getInvQty},
        {dataType: 'function', propertyName: getInvRate},
        {dataType: 'function', propertyName: getInvValue},
    ];


    fillDataIntoTable(tableInvoiceDetails,getAllInvoiceDetailsFromInvoiceNumber,displayProperty,true);

}

//mekath help for invoice header refill ekata invoice details wala inovice number eken total eke ganna hadala thiyenne
const displayTotalQuantity = (invoiceNumber)=>{


    let getAllTotalQuantity = ajaxGetRequest("/invoice-detail/gettotalquantityfrominvoicekey/"+invoiceNumber);

    let result= getAllTotalQuantity.split(".")
    let finalValue = result[0];

    console.log(finalValue);

    labelTotalQuantity.innerHTML=Number(finalValue).toLocaleString('en-US');

}

//mekath helping for invoice header refill ekata invoice detils wala invoice number eke total value eka ganna hadala thiyenne
const displayTotalValue = (invoiceNumber)=>{

    let getAllTotalValues = ajaxGetRequest("/invoice-detail/gettotalvaluefrominoicekey/"+invoiceNumber);

    let result = getAllTotalValues.split(".");
    let finalValue = result[0];

    console.log(finalValue);
    labelTotalValue.innerHTML=Number(finalValue).toLocaleString('en-US',{minimumFractionDigits:2 , maximumFractionDigits:2});


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


//create function to save item key
const saveImKey = (fieldID)=>{
        let selectedItem = JSON.parse(fieldID.value);
        console.log(selectedItem.imkey);
        invoiceDetail.imkey=selectedItem.imkey;
}


// invoice header area start from here but we have refresh calls in window load function
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------


const refreshInvoiceHeaderForm = ()=>{

    invoiceHeader = new Object();


    customers=ajaxGetRequest("/customer/findall")
    fillDataIntoSelect(selectCustomer,'select customer',customers,'customername')


    companies=ajaxGetRequest("/company/findall")
    fillDataIntoSelect(selectCompanyName,'select company',companies,'companyname')


    //set values are empty
    textInvoiceNO.value=""
    textInvoiceDate.value=""
    textPoNumber.value=""
    textDispatchKey.value=""



    //set default colour
    selectCustomer.style.border="2px solid #ced4da";
    selectCompanyName.style.border="2px solid #ced4da";
    textInvoiceNO.style.border="2px solid #ced4da";
    textInvoiceDate.style.border="2px solid #ced4da";
    textPoNumber.style.border="2px solid #ced4da";
    textDispatchKey.style.border="2px solid #ced4da";


    txtSelectedCustomerAddress.innerHTML="";
    txtSelectedCustomerPhoneNO.innerHTML="";

}


const refreshInvoiceHeaderTable = ()=>{



    displayProperty=[
        {dataType: 'function', propertyName: getCustomerName},
        {dataType: 'function', propertyName: getCompanyName},
        {dataType: 'text', propertyName: 'invno'},
        {dataType: 'text', propertyName: 'invdate'},
        {dataType: 'text', propertyName: 'ponumber'},
        {dataType: 'text', propertyName: 'dispatchkey'},
    ]
    fillDataIntoTable2(tableInvoiceHeader,invoiceHeaders,displayProperty,true,divModifyButton2);
    $('#tableInvoiceHeader').dataTable();
}


const getCustomerName = (ob)=>{
    return ob.customer_id.customername;
}

const getCompanyName = (ob)=>{
    return ob.company_id.companyname;
}

//created a function for get values for heading tag and paragraph tag
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


// create function to check errors header area
const checkErrorsInvoiceHeader = ()=>{

    let errors = '';

    if (invoiceHeader.customer_id == null){
        errors=errors+"Customer Name Cannot Be Empty \n"
    }

    if (invoiceHeader.company_id == null){
        errors=errors+"Company Name Cannot Be Empty \n"
    }

    if (invoiceHeader.invno == null){
        errors=errors+"Invoice Number Cannot Be Empty \n"
    }

    if (invoiceHeader.invdate == null){
        errors=errors+"Invoice Date Cannot Be Empty \n"
    }

    if (invoiceHeader.ponumber == null){
        errors=errors+"Purchase order Number Cannot Be Empty \n"
    }

    if (invoiceHeader.dispatchkey == null){
        errors=errors+"Dispatch Number Cannot Be Empty \n"
    }


    return errors;
}


const submitInvoiceHeader = async ()=>{


        const getPoKeyForHeader = await getPokeyServerResponse;
        invoiceHeader.pokey = getPoKeyForHeader;
        console.log(`invoice header po key is ${invoiceHeader.pokey}`);



if (textInvoiceHeaderKey.value!=""){
    console.log("update part");

    //meka define karaoa thiyenawa invoice header eke
    let getInvoiceIDFromInvoiceKey = ajaxGetRequest("/invoice-header/getidfrominvoicekey/"+textInvoiceHeaderKey.value)
    console.log(getInvoiceIDFromInvoiceKey);

    invoiceHeader.inkey=textInvoiceHeaderKey.value;
    invoiceHeader.id=getInvoiceIDFromInvoiceKey;        //key eka set karanne mokada upate ekedi key ekek set wenne na ne eka set venne save eke nisa methanath bind karanna one

    setTimeout(()=>{
        let putResponse = ajaxPutRequest("/invoice-header",invoiceHeader)
        if (putResponse=="ok"){
            alert("update successful")
        }
    },1000)

}

else {

    console.log("save part")
    let errors = checkErrorsInvoiceHeader();

    if (errors==""){
        const userConfirm = confirm("are you sure to add Invoice header \n"
            +"\n Customer Name is "+invoiceHeader.customer_id.customername
            +"\n Company Name is "+invoiceHeader.company_id.companyname
            +"\n Invoice NO is "+invoiceHeader.invno
            +"\n Invoice Date is "+invoiceHeader.invdate
            +"\n Purchase Order NO is "+invoiceHeader.ponumber
            +"\n Dispatch NO is "+invoiceHeader.dispatchkey
        );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/invoice-header",invoiceHeader);
            if (postServerResponse && postServerResponse.inkey){
                alert("save successful");
                // refreshInvoiceHeaderForm();
                refreshInvoiceHeaderTable();

                //invoice key eka display karanawa
                textInvoiceHeaderKey.value=postServerResponse.inkey;


                //need to enable invoice detail button
                buttonAddInvoiceDetail.disabled=false;
                buttonAddInvoiceDetail.style.cursor="default";
                //emptying invoice detail warning paragraph because we need to add invoice details before that
                paragraphWaringInInvoiceDetails.innerHTML="";

            }else {
                alert("error happened");
                refreshInvoiceHeaderForm();
                refreshInvoiceHeaderTable();
            }
        }
    }else {
        alert("you have some errors"+errors)
    }
}





}


const refillInvoiceHeaderForm = (ob,rowIndex)=>{

    btnUpdateInvoiceHeader.disabled=false;
    btnUpdateInvoiceHeader.style.cursor = "default";

    //details section eke button tika

    //disable update button
    buttonUpdateInvoiceDetail.disabled=true;
    buttonUpdateInvoiceDetail.style.cursor="not-allowed";

    //anable add button
    buttonAddInvoiceDetail.disabled=false;
    buttonAddInvoiceDetail.style.cursor="default";

    //emptying invoice detail warning paragraph because we need to add invoice details before that
    paragraphWaringInInvoiceDetails.innerHTML="";



    invoiceHeader=JSON.parse(JSON.stringify(ob));
    oldInvoiceHeader=JSON.parse(JSON.stringify(ob));

    textInvoiceNO.value=ob.invno
    textInvoiceDate.value=ob.invdate
    textPoNumber.value=ob.ponumber
    textDispatchKey.value=ob.dispatchkey
    textInvoiceHeaderKey.value=ob.inkey



    fillDataIntoSelect(selectCustomer,'select customer',customers,'customername',ob.customer_id.customername)
    fillDataIntoSelect(selectCompanyName,'select company',companies,'companyname',ob.company_id.companyname)

    //header ekath fill karanakotama invoice details tikath enna one kiyapu nisa thama me karanne
    cardInvoiceDetailTable.classList.remove('d-none')   // class eka ayin kara
    refillInvoiceDetailTable(ob.inkey);         //refill invoice detail table function eke call karala parameter eke vidihata me object eke invoice key eka denawa ethakota normal eke invoice detail ekata fill venawa


    displayTotalQuantity(ob.inkey); //total quantity ganna ekata function ekak call kara object eken ena inkey eka mekata pass karala thiyenawa

    displayTotalValue(ob.inkey);
}


const checkUpdatesInvoiceHeader = ()=>{

    let updates = "";

    if (invoiceHeader.customer_id.customername != oldInvoiceHeader.customer_id.customername){
        updates=updates+"customer name is updated \n"
    }

    if (invoiceHeader.company_id.companyname != oldInvoiceHeader.company_id.companyname){
        updates=updates+"Company Name Is Updated \n"
    }

    if (invoiceHeader.invno != oldInvoiceHeader.invno){
        updates=updates+"Invoice Number is updated \n"
    }

    if (invoiceHeader.invdate != oldInvoiceHeader.invdate){
        updates=updates+"Invoice Date is updated \n"
    }

    if (invoiceHeader.ponumber != oldInvoiceHeader.ponumber){
        updates=updates+"Purchase Order No is updated \n"
    }

    if (invoiceHeader.dispatchkey != oldInvoiceHeader.dispatchkey){
        updates=updates+"Dispatch Number is updated \n"
    }
    return updates;
}


const updateInvoiceHeader = ()=>{
    let updates = checkUpdatesInvoiceHeader();

    if (updates!=""){
        const userConfirm = confirm("are you sure to update invoice header \n"+updates);
        if (userConfirm){
            let updateServerResponse = ajaxPutRequest("/invoice-header",invoiceHeader);
            if (updateServerResponse=="ok"){
                alert("Update Successful");
                refreshInvoiceHeaderForm();
                refreshInvoiceHeaderTable();

                //div modify button eka disable karannath one
                divModifyButton2.classList.add('d-none');
            }else {
                alert("error happened"+updateServerResponse)
            }
        }
    }else {
        alert("nothing to update")
    }
}


const deleteInvoiceHeader = (ob,rowIndex)=>{
    const userConfirm = confirm("are you sure to delete following invoice header \n"
        +"\n Customer Name is "+ob.customer_id.customername
        +"\n Company Name is "+ob.company_id.companyname
        +"\n Invoice NO is "+ob.invno
    );
    if (userConfirm){
        let deleteServerResponse = ajaxDeleteRequest("/invoice-header",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            refreshInvoiceHeaderForm();
            refreshInvoiceHeaderTable();


        }else {
            alert("error happened \n"+deleteServerResponse);
            refreshInvoiceHeaderForm();
            refreshInvoiceHeaderTable();
        }
    }
}


const printInvoiceHeader = async (ob,rowIndex)=>{
    const newWindow = window.open();
    await newWindow.document.write(
        `
        
        `
    );




}




// ---------------------------po section starts from here
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------







const validatePoNumberExisting = (fieldId)=>{
    const poNumber = fieldId.value;
    if (new RegExp('^[0-9]{4,10}$').test(poNumber)){
        console.log(`${poNumber} is validated`)
        //check validation on backend
        const checkPoNumberGetServerResponse = ajaxGetRequest("/invoice-header/getinvoiceheaderbyponumber/"+poNumber);
        console.log(checkPoNumberGetServerResponse);

        if (checkPoNumberGetServerResponse==true){
            alert(`Po number ${poNumber} is already exists`)
        }else {
            console.log(`Po number ${poNumber} not exists`)
        }



    } else {
        console.log(`${poNumber} is not validated`);
    }
}



const getPokeyFromPoNumber = async (fieldId)=>{
    const poNumberValue = fieldId.value

    if (new RegExp('^[0-9]{4,10}$').test(poNumberValue)){
        console.log("validate to check pokey from po number");

        //const eka ayin kara eka global variable ekak karanna.
        getPokeyServerResponse  = await ajaxGetRequest("/purchaseorderheader/getpokeyfromponumber/"+fieldId.value)
        console.log(getPokeyServerResponse);

        //uda get po key server response eken enna time ekak yana nisa set time out ekak damma ||| ee ena key eka invoice header table eke thiyenawa da kiyala bala function eka done

            const getInvoiceHeaderFromPoKey = await ajaxGetRequest("/invoice-header/getinvoiceheaderbypokey/"+getPokeyServerResponse);

            if (getInvoiceHeaderFromPoKey==true){
                console.log(`${getPokeyServerResponse} is available on invoice table`)
                // cardPurchaseOrderDetails.classList.add('d-none');    //nathi ekek issalama type karala thiyena ekak passe type karoth table eka hide venna one nisa

                //methana thiyena tika table ekata load karanna
                cardPurchaseOrderDetails.classList.remove('d-none');
                refreshPoDetailsFromPoNumberInInvoiceHeader(fieldId.value); // done ✔


            }else {
                console.log(`${getPokeyServerResponse} is not available on invoice table`);
                cardPurchaseOrderDetails.classList.remove('d-none');
                refreshPurchaseOrderDetailsTableNotInInvoice(getPokeyServerResponse);
                //dan nathi tika load karanna one table ekakata // apita enne list ekak me ena po key server response eken table ekata data load karanna

            }
    }else {
        console.log("not validate to check pokey from po number")
    }


}


//invoice header eke nathi purchase order tika table refresh function eka
const refreshPurchaseOrderDetailsTableNotInInvoice = (PoKey)=>{

    const purchaseOrderDetailsList = ajaxGetRequest("/purchaseorderdetails/getpurchaseorderdetailsbypurchaseorderkey/"+PoKey);


    const displayProperty=[
        {dataType:"function",propertyName:getItemName},
        {dataType:"function",propertyName:getPoQty},
        {dataType:"function",propertyName:getPoRate},
        {dataType:"function",propertyName:getPoValue},
    ]

    fillDataIntoTable2(tablePurchaseOrderDetails,purchaseOrderDetailsList,displayProperty,true,divModifyButton3);

}




//invoice header eke  purchase order tika table refresh function eka
const refreshPoDetailsFromPoNumberInInvoiceHeader = (poNumber)=>{

    const purchaseOrderDetailsList = ajaxGetRequest("/purchaseorderdetails/getpurchaseorderdetailsfromponumberininvoiceheader/"+poNumber);


    const displayProperty=[
        {dataType:"function",propertyName:getItemName},
        {dataType:"function",propertyName:getPoQty},
        {dataType:"function",propertyName:getPoRate},
        {dataType:"function",propertyName:getPoValue},
    ]

    fillDataIntoTable2(tablePurchaseOrderDetails,purchaseOrderDetailsList,displayProperty,true,divModifyButton3);
    console.log(purchaseOrderDetailsList);


}





//refill button eke function eka
const refillPoDetailsIntoInvoiceDetails=(ob,rowOb)=>{

    //for testing delete those two lines after done testing........ testing is done✔ can delete
    buttonAddInvoiceDetail.disabled=false
    buttonAddInvoiceDetail.style.cursor="default"


    console.log(ob);

//purchase order eken ena nisa me properties tika venas kara.
    txtQty.value=ob.poqty
    txtRate.value=ob.porate
    txtValue.value=ob.povalue

    invoiceDetail.podetail_id= ob

    // we need to get item object from server using item name that we receive from using get request
    //that process is start form here
    console.log(ob.item_id.itmname);

    // we get this response from item table. so we defined that request in item controller and item dao files
    let getItemObFromItemNameServerResponse = ajaxGetRequest("/item/getitembyitemname/"+ob.item_id.itmname);
    console.log(`${getItemObFromItemNameServerResponse} this is from server`);


    fillDataIntoSelect(selectItemName,'select an option',itemNames,'itmname',ob.item_id.itmname)
    selectItemName.disabled=true;

    invoiceDetail.item_id = getItemObFromItemNameServerResponse;



    getRemainingQuantityFromPoId(ob.id);
}

// po details eke id eka dunnama eken remaining quantity eka ganna function eka
const getRemainingQuantityFromPoId = (poId)=>{

    //this defied on invoice details controller and dao files.
    const getRemainingQuantityServerResponse = ajaxGetRequest("/invoice-detail/getremainingquantityfrompoid/"+poId);

    if (getRemainingQuantityServerResponse!=""){
        console.log(`${getRemainingQuantityServerResponse} server response of remaining quantity`);
        let result = getRemainingQuantityServerResponse.split('.');
        console.log(`${result[0]} is your remaining value`);   //remaining value eke points ayin karala issalama numbers tika vitharak gannawa.

        remainingQuantityText.innerHTML="";
        remainingQuantityText.innerHTML=`${result[0]} is your remaining value`;
    }else {
        console.log("need to return original value from po details table");

        //methana define karanna one ee po id eken ena po qty eka

        //this also use in invoice details section. then this method is defined on invoice details controller and dao files
        const getRemainingQuantityFromPoDetailsServerResponse = ajaxGetRequest("/invoice-detail/getpoqtyfromid/"+poId);
        console.log(`${getRemainingQuantityFromPoDetailsServerResponse} is your remaining value`);
        remainingQuantityText.innerHTML=""
        remainingQuantityText.innerHTML=`${getRemainingQuantityFromPoDetailsServerResponse} is your remaining value`;

    }
}


const validateItemRemaining = (fieldID)=>{
    //let's give a message   or bind value to the object and apply green and red colours or add hint using is-invalid and some text

    let getRemainingValueFromDisplayText = remainingQuantityText.innerHTML;
    let getIntegerPart = getRemainingValueFromDisplayText.split(' ');
    console.log(`${getIntegerPart[0]} is split value from remaining paragraph text`);

    let result  =  Number(getIntegerPart[0]);

    if (fieldID.value > result){
        fieldID.style.border="2px solid red";
        invoiceDetail.invqty = null;
        displayQuantityValidation.innerHTML=`quantity cannot be greater than remaining quantity`;
        displayQuantityValidation.style.color="red";
    }else {
        displayQuantityValidation.innerHTML=`quantity is validated`;
        displayQuantityValidation.style.color="green";
        invoiceDetail.invqty = fieldID.value;
    }



}




// print area functions are starting from here
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------


//create a function to get date from like this value 2024-10-02 -> 02-Oct-24
function formatDate(dateValue){

    const date = new Date(dateValue);

    //extract the day, month, (as short name) and year
    const day = String(date.getDate()).padStart(2,'0');
    const month = date.toLocaleString('en-GB',{month: 'short'});
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month.charAt(0).toUpperCase()  + month.slice(1).toLowerCase()}-${year}`;

}


//meka haduwe model eke print ekata one nisa--- mekedi table eke total value ekath karanawa
const searchUsingInvoiceNumber = (fieldID)=>{
    console.log("search ok");

    let printInvoiceHeader = ajaxGetRequest("/invoice-header/getinvoiceheaderbyinvoicenumber/"+fieldID.value);  //meke invoice header eke define karala thiyenawa
    console.log(printInvoiceHeader.invno+" invoice number retrieved");  //got it correctly
    console.log(printInvoiceHeader.inkey+" invoice key retrieved");  //got it correctly

//displaying data into invoice customer section
    PrintInvCusName.innerHTML=printInvoiceHeader.customer_id.customername
    PrintInvCusAddress.innerHTML=printInvoiceHeader.customer_id.customeraddress
    PrintInvCusPhone.innerHTML=printInvoiceHeader.customer_id.customertelephone

//displaying data into invoice table section    //dakunu paththe thiyena table ekata data display keranawa
    printInvNumber.innerHTML=printInvoiceHeader.invno
    printInvDate.innerHTML=formatDate(printInvoiceHeader.invdate)
    printPoNumber.innerHTML=printInvoiceHeader.pokey
    printDispatchNo.innerHTML=printInvoiceHeader.dispatchkey

    labelShowCompanyName.innerHTML="";
    labelShowCompanyName.innerHTML=`Note* &nbsp; &nbsp; Cheque should be drawn in favour of "<b>${printInvoiceHeader.company_id.companyname} </b>."`

    //header eken invoice key eken invoice detail list eke gannawa
    let printInvoiceDetail = ajaxGetRequest("/invoice-detail/getallinvoicedetailbyinvoicekey/"+printInvoiceHeader.inkey);

    let displayProperty=[
        {dataType: 'function', propertyName: getItemCode},
        {dataType: 'function', propertyName: getItemName},
        {dataType: 'function', propertyName: getInvQty},
        {dataType: 'function', propertyName: getInvRate},
        {dataType: 'function', propertyName: getInvValue},
    ];


    fillDataIntoTable(printInvoiceDetailsTable,printInvoiceDetail,displayProperty,false);


    //calculate total price section start
    textTotalValueFromINV.innerHTML="";
    let totalValue = ajaxGetRequest("/invoice-detail/gettotalvaluefrominoicekey/"+printInvoiceHeader.inkey)

    let splitValue = totalValue.split('.');
    let integerPart = splitValue[0];

    let finalValue = Number(integerPart).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

    textTotalValueFromINV.innerHTML=finalValue; //final value eken thama table eke total value eketa data display karanne



}

// print ekata one wena getters table walata
const getItemCode = (ob)=>{
    return '<p class="text-start">'+ob.item_id.code+'</p>';
}

const getInvQty = (ob)=>{
    return '<p class="text-end">'+    Number(ob.invqty).toLocaleString('en-US')    +'</p>'
}

const getInvRate = (ob)=>{
    return '<P class="text-end">'+   Number(ob.invrate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})    +'</P>'
}

const getInvValue = (ob)=>{
    return '<p class="text-end">'+  Number(ob.invvalue).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})  +'</p>'
}


//print model eke yata thiyena print button eke ebuwama ekata adala print karana code eka thama methana thiyenne
const printModelButtonMC = ()=>{
    console.log("print works");

    ExampleModelFooterDiv.classList.add('d-none');
    rowInputDiv.classList.add('d-none');
    exampleModelHeader.classList.add('d-none');

    let newWindow = window.open();
    newWindow.document.write(
    `
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <title>Invoice Print</title>
</head>
<body>
<div class="container-fluid" style="min-height: 100vh; padding-bottom: 50px; position: absolute; top: 3%">
    <div class="row" style="margin-top: 10%">
        <div class="col-6"></div>
        <div class="col-6 text-end">
            <p style="font-weight: bold; font-size: 18px">INVOICE</p>
        </div>
    </div>

    <div class="row">
        <div class="col-6"><p style="font-size: 16px">CUSTOMER</p></div>
        <div class="col-6"></div>
    </div>


    <div class="row">
        <div class="col-5">
            <div class="card" style="border: 1px solid black">
                <p style="font-size: 14px; margin-left: 10px; margin-top: 5px; margin-bottom: 2px;  font-weight: bold">${PrintInvCusName.innerText}</p>
                <p style="font-size: 14px; margin-left: 10px; ">${PrintInvCusAddress.innerText}</p>
                <p style="font-size: 14px; margin-left: 10px; ">${PrintInvCusPhone.innerText}</p>
            </div>
        </div>

        <div class="col-2"></div>


<!--  invoice details table start  -->
        <div class="col-5">
            <table class="table table-bordered" style="border: 1px solid black">
                <tbody>


                    <tr>
                        <td style="line-height: 0.5; font-size: 14px;">Inv No</td>
                        <td style="font-weight: bold; font-size: 14px; line-height: 0.5;">${printInvNumber.innerText}</td>
                    </tr>

                    <tr>
                        <td style="line-height: 0.5; font-size: 14px;">Inv Date</td>
                        <td style="font-weight: bold; font-size: 14px; line-height: 0.5;" >${printInvDate.innerText}</td>
                    </tr>


                    <tr>
                        <td style="line-height: 0.5; font-size: 14px;">PO No</td>
                        <td style="font-weight: bold; font-size: 14px; line-height: 0.5;" >${printPoNumber.innerText}</td>
                    </tr>


                    <tr>
                        <td style="line-height: 0.5; font-size: 14px;">Dispatch No</td>
                        <td style="font-weight: bold; font-size: 14px; line-height: 0.5;" >${printDispatchNo.innerText}</td>
                    </tr>



                </tbody>
            </table>
        </div>
<!--  invoice details table end  -->

    </div>
    
    
    
        <div class="row mt-3" style="padding-right: 5px; padding-left: 10px">
        ${printInvoiceDetailsTable.outerHTML}
        </div>

        <div style="position: absolute; bottom: 250px ">
        <p style="font-size: 12px;">${labelShowCompanyName.outerHTML}</p>
        </div>
        
        

<!-- Position "ooo" slightly above the bottom of the container -->
<div class="position-absolute w-100" style="bottom: 160px;">
    <div class="row text-center">
        <div class="col-4">
            <p style="font-size: 12px; margin-bottom: 5px;">............................................................</p>
            <p style="margin: 0; font-size: 12px;">Prepared By</p>
        </div>
        <div class="col-4">
            <p style="font-size: 12px; margin-bottom: 5px;">............................................................</p>
            <p style="margin: 0; font-size: 12px;">Checked By</p>
        </div>
        <div class="col-4">
            <p style="font-size: 12px; margin-bottom: 5px;">............................................................</p>
            <p style="margin: 0; font-size: 12px;">Approved By</p>
        </div>
    </div>
</div>







</div>
</body>
</html>

    `
    );


    setTimeout(function () {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },1000)

}









