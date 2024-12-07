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
    return '<p class="text-start">'+ ob.item_id.itmname  +'</p>';
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

//to get max invoice header key
const getMaxInvoiceHeaderKey = ()=>{
    let maxInKey = ajaxGetRequest("/invoice-detail/getmaxinkey")    //we have that request in voice detail controller and dao
    console.log(maxInKey);
    invoiceDetail.invoicekey=maxInKey;
}




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
// invoice header area start from here but we have refresh calls in window load function


const refreshInvoiceHeaderForm = ()=>{

    invoiceHeader = new Object();


    customers=ajaxGetRequest("/customer/findall")
    fillDataIntoSelect(selectCustomer,'select customer',customers,'customername')


    companies=ajaxGetRequest("/company/findall")
    fillDataIntoSelect(selectCompanyName,'select company',companies,'companyname')


    //set values are empty
    textInvoiceNO.value=""
    textInvoiceDate.value=""
    textPoKey.value=""
    textDispatchKey.value=""



    //set default colour
    selectCustomer.style.border="2px solid #ced4da";
    selectCompanyName.style.border="2px solid #ced4da";
    textInvoiceNO.style.border="2px solid #ced4da";
    textInvoiceDate.style.border="2px solid #ced4da";
    textPoKey.style.border="2px solid #ced4da";
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
        {dataType: 'text', propertyName: 'pokey'},
        {dataType: 'text', propertyName: 'dispatchkey'},
    ]
    fillDataIntoTable2(tableInvoiceHeader,invoiceHeaders,displayProperty,true);
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

const checkErrorsInvoiceHeader = ()=>{

    let errors = '';

    if (invoiceHeader.customer_id.customername == null){
        errors=errors+"Customer Name Cannot Be Empty \n"
    }

    if (invoiceHeader.company_id.companyname == null){
        errors=errors+"Company Name Cannot Be Empty \n"
    }

    if (invoiceHeader.invno == null){
        errors=errors+"Invoice Number Cannot Be Empty \n"
    }

    if (invoiceHeader.invdate == null){
        errors=errors+"Invoice Date Cannot Be Empty \n"
    }

    if (invoiceHeader.pokey == null){
        errors=errors+"Purchase order Number Cannot Be Empty \n"
    }

    if (invoiceHeader.dispatchkey == null){
        errors=errors+"Dispatch Number Cannot Be Empty \n"
    }


    return errors;
}


const submitInvoiceHeader = ()=>{

if (textInvoiceHeaderKey.value!=""){
    console.log("update part");

    let getInvoiceIDFromInvoiceKey = ajaxGetRequest("/invoice-header/getidfrominvoicekey/"+textInvoiceHeaderKey.value)
    console.log(getInvoiceIDFromInvoiceKey);

    invoiceHeader.inkey=textInvoiceHeaderKey.value
    invoiceHeader.id=getInvoiceIDFromInvoiceKey;

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
            +"\n Purchase Order NO is "+invoiceHeader.pokey
            +"\n Dispatch NO is "+invoiceHeader.dispatchkey
        );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/invoice-header",invoiceHeader);
            if (postServerResponse && postServerResponse.inkey){
                alert("save successful");
                // refreshInvoiceHeaderForm();
                refreshInvoiceHeaderTable();


                textInvoiceHeaderKey.value=postServerResponse.inkey;


                //need to enable invoice detail button
                buttonAddInvoiceDetail.disabled=false;
                buttonAddInvoiceDetail.style.cursor="default";
                //emptying invoice detail warning paragraph because we need to add invoice details before that
                paragraphWaringInInvoiceDetails.innerHTML="";

                // cardMaxInvoiceHeader.classList.remove('d-none');    //card eke class name eka remove karala daanawa
                //dan daapu invoice header eka balananna one nisa max invoice header table eka call karanawa
                // refreshMaxInvoiceHeaderTable();         //max invoice header eka ganna function eke call karanawa

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

    invoiceHeader=JSON.parse(JSON.stringify(ob));
    oldInvoiceHeader=JSON.parse(JSON.stringify(ob));

    textInvoiceNO.value=ob.invno
    textInvoiceDate.value=ob.invdate
    textPoKey.value=ob.pokey
    textDispatchKey.value=ob.dispatchkey


    fillDataIntoSelect(selectCustomer,'select customer',customers,'customername',ob.customer_id.customername)
    fillDataIntoSelect(selectCompanyName,'select company',companies,'companyname',ob.company_id.companyname)

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

    if (invoiceHeader.pokey != oldInvoiceHeader.pokey){
        updates=updates+"Purchase Order is updated \n"
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


                //max invoice header table ekath call karanawa
                // refreshMaxInvoiceHeaderTable()


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

            cardMaxInvoiceHeader.classList.add('d-none');
            divModifyButton2.classList.add('d-none');
        }else {
            alert("error happened \n"+deleteServerResponse);
            refreshInvoiceHeaderForm();
            refreshInvoiceHeaderTable();
        }
    }
}


const refreshMaxInvoiceHeaderTable = ()=>{
    let maxInvoiceHeader = ajaxGetRequest("/invoice-header/getmostrecentinvoiceheader");  //meke service define eke karala thienne invoice header dao and controller eke..

    let displayProperty = [
        {dataType: 'function', propertyName: getCustomerName},
        {dataType: 'function', propertyName: getCompanyName},
        {dataType: 'text', propertyName: 'invno'},
        {dataType: 'text', propertyName: 'invdate'},
        {dataType: 'text', propertyName: 'pokey'},
        {dataType: 'text', propertyName: 'dispatchkey'},
    ];

    fillDataIntoTable2(tableMaxInvoiceHeader,maxInvoiceHeader,displayProperty,true);

}



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
// print area functions are starting from here


//create a fucntion to get date from like this value 2024-10-02 -> 02-Oct-24
function formatDate(dateValue){

    const date = new Date(dateValue);

    //extract the day, month, (as short name) and year
    const day = String(date.getDate()).padStart(2,'0');
    const month = date.toLocaleString('en-GB',{month: 'short'});
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month.charAt(0).toUpperCase()  + month.slice(1).toLowerCase()}-${year}`;

}



//meka haduwe model eke print ekata one nisa mekedi table eke total value ekath karanawa
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

const printModelButtonMC = ()=>{
    console.log("print works");

    ExampleModelFooterDiv.classList.add('d-none');
    rowInputDiv.classList.add('d-none');
    exampleModelHeader.classList.add('d-none');

    let newWindow = window.open();
    newWindow.document.write(
        "<html>\n" +
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\">\n" +
        "    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <style>\n" +
        "        @media print {\n" +
        "            .invoice-section, .right-side-table {\n" +
        "                float: left;\n" +
        "                width: 48%;\n" +
        "                margin-right: 2%;\n" +
        "            }\n" +
        "            body {\n" +
        "                margin: 0;\n" +
        "                padding: 0;\n" +
        "            }\n" +
        "            .container {\n" +
        "                display: flex;\n" +
        "                flex-wrap: nowrap;\n" +
        "            }\n" +
        "        }\n" +
        "    </style>\n" +
        "</head>\n" +
        "<body>" + exampleModal.outerHTML + "</body>\n" +
        "</html>"
    );


    setTimeout(function () {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },1000)

}

