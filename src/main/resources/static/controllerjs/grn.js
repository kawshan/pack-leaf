window.addEventListener('load', function () {


    //call GRN header refresh form function
    grnHeaderFormRefresh();
    //call GRN table refresh table function
    grnHeaderTableRefresh();

    //call Grn details form
    refreshGrnDetailsForm();

    //grn details add button disable part
    buttonAddGrnDetails.disabled=true;
    buttonAddGrnDetails.style.cursor="not-allowed";

});


const grnHeaderFormRefresh = () => {

    grnHeader = new Object();

    //set value to empty
    textGrnNo.value = "";
    textGrnDate.value = "";
    textOurPoNumber.value = "";
    displayGrnKey.value = "";

    suppliers = ajaxGetRequest("/supplier/findall")
    fillDataIntoSelect(selectSupplier, 'Select Supplier', suppliers, 'suppliername')

    companies = ajaxGetRequest("/company/findall")
    fillDataIntoSelect(selectCompanyName, 'Select Company', companies, 'companyname')


    //set default colours
    selectSupplier.style.border = "2px solid #ced4da";
    selectCompanyName.style.border = "2px solid #ced4da";
    textGrnNo.style.border = "2px solid #ced4da";
    textGrnDate.style.border = "2px solid #ced4da";
    textOurPoNumber.style.border = "2px solid #ced4da";



    //emptying values when user changed supplier displaying text -> purpose of this when user click reset button we need to make form area as it is
    displaySupplierName.innerHTML="";
    displaySupplierAddress.innerHTML="";
    displaySupplierPhoneNumber.innerHTML="";


}


const grnHeaderColoursDefault = ()=>{
    //set default colours
    selectSupplier.style.border = "2px solid #ced4da";
    selectCompanyName.style.border = "2px solid #ced4da";
    textGrnNo.style.border = "2px solid #ced4da";
    textGrnDate.style.border = "2px solid #ced4da";
    textOurPoNumber.style.border = "2px solid #ced4da";
}


const grnHeaderTableRefresh = () => {

    grnheaders = ajaxGetRequest("/grn-header/findall");

    displayProperty = [
        {dataType: 'function', propertyName: getSupplierName},
        {dataType: 'function', propertyName: getCompanyName},
        {dataType: 'text', propertyName: 'grnno'},
        {dataType: 'text', propertyName: 'grndate'},
        {dataType: 'text', propertyName: 'ourponumber'},
    ];


    fillDataIntoTable(grnHeaderTable, grnheaders, displayProperty, true);
    $("#grnHeaderTable").dataTable();

}


const getCompanyName = (ob) => {
    return ob.company_id.companyname
}

const getSupplierName = (ob) => {
    return ob.supplier_id.suppliername;
}

const checkErrorsGrnHeader = () => {

    let errors = '';

    if (grnHeader.supplier_id == null) {
        errors = errors = "Supplier Cannot Be Empty \n";
    }

    if (grnHeader.company_id == null) {
        errors = errors = "Company Cannot Be Empty \n";
    }

    if (grnHeader.grnno == null) {
        errors = errors + "Grn No Cannot Be Empty \n";
    }

    if (grnHeader.grndate == null) {
        errors = errors + "Grn Date Cannot Be Empty \n"
    }

    if (grnHeader.ourponumber == null) {
        errors = errors + "Our Po Number Cannot Be Empty \n"
    }
    return errors;
}


const submitGrnHeader = async () => {

    let errors = checkErrorsGrnHeader();

    if (displayGrnKey.value == "") {
        if (errors == "") {
            console.log("save part");
            const userConfirm = confirm(`Are You Sure To Add Following Grn Header
            Supplier Name Is ${grnHeader.supplier_id.suppliername}
            Company Name Is ${grnHeader.company_id.companyname}
            GRN Number Is ${grnHeader.grnno}
            GRN Date Is ${grnHeader.grndate}
            Our Po Number Is ${grnHeader.ourponumber}
        `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/grn-header", grnHeader);
                if (postServerResponse&&postServerResponse.grnheaderkey) {
                    alert("Save Successful");
                    displayGrnKey.value=postServerResponse.grnheaderkey;
                    grnHeaderColoursDefault();
                    grnHeaderTableRefresh();


                    warningTextInGrnDetailsSection.classList.add('d-none');
                    buttonAddGrnDetails.disabled=false;
                    buttonAddGrnDetails.style.cursor="default";
                } else {
                    alert("Error Happened \n"+postServerResponse);
                }
            }
        } else {
            alert(`You Have Following Errors \n`+errors);
        }
    } else {
        console.log("update part");

        //getting id from server
        const getIdFromGrnHeaderKey =await ajaxGetRequest("/grn-header/getidfromgrmheaderkey/"+displayGrnKey.value);
        //binding to the js object
        grnHeader.id = getIdFromGrnHeaderKey;


        //setting key to Js object
        grnHeader.grnheaderkey = displayGrnKey.value

        const userConfirm = confirm(`Are You Sure To Update Following Grn Header
            Supplier Name Is ${grnHeader.supplier_id.suppliername}
            Company Name Is ${grnHeader.company_id.companyname}
            GRN Number Is ${grnHeader.grnno}
            GRN Date Is ${grnHeader.grndate}
            Our Po Number Is ${grnHeader.ourponumber}
            GRN Key Is ${grnHeader.grnheaderkey}
            ID IS ${grnHeader.id}
        `);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/grn-header",grnHeader);
            if (putServerResponse=="ok"){
                alert("Update Successful")
                grnHeaderTableRefresh();
                grnHeaderColoursDefault();
                divModifyButton.classList.add('d-none');
            }else {
                alert("Update Error Happened \n" +putServerResponse);
            }
        }


    }


}



const refillGrnHeader = (ob,rowIndex)=>{

    grnHeader = JSON.parse(JSON.stringify(ob));
    oldGrnHeader = JSON.parse(JSON.stringify(ob));


    textGrnNo.value=ob.grnno
    textGrnDate.value=ob.grndate
    textOurPoNumber.value=ob.ourponumber
    displayGrnKey.value=ob.grnheaderkey


    fillDataIntoSelect(selectSupplier, 'Select Supplier', suppliers, 'suppliername',ob.supplier_id.suppliername);
    fillDataIntoSelect(selectCompanyName, 'Select Company', companies, 'companyname',ob.company_id.companyname);

    refreshGrnDetailsTable();

    //enable add button
    buttonAddGrnDetails.disabled=false;
    buttonAddGrnDetails.style.cursor="default";

    warningTextInGrnDetailsSection.classList.add('d-none');

}

const deleteGrnHeader = (ob,rowIndex)=>{

    const userConfirm = confirm(`Are You Sure To Delete following GRN ?
            Supplier Name Is ${ob.supplier_id.suppliername}
            Company Name Is ${ob.company_id.companyname}
            GRN Number Is ${ob.grnno}
            GRN Date Is ${ob.grndate}
            Our Po Number Is ${ob.ourponumber}
    `);
    if (userConfirm){
        //server part
        const deleteServerResponse = ajaxDeleteRequest("/grn-header",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            grnHeaderTableRefresh();
            divModifyButton.classList.add('d-none');
        }else {
            alert("delete unsuccessful");
        }
    }
}

const displaySupplierInformation = (fieldId)=>{
    const selectedSupplier = JSON.parse(fieldId.value);

    displaySupplierName.innerHTML="";
    displaySupplierAddress.innerHTML="";
    displaySupplierPhoneNumber.innerHTML="";

    displaySupplierName.innerHTML=selectedSupplier.suppliername
    displaySupplierAddress.innerHTML=selectedSupplier.supplieraddress
    displaySupplierPhoneNumber.innerHTML=selectedSupplier.suppliertelephone

}

//mekedi grn header ekayi ekata adala grn details thiyena table ekayi dekama print venna hadanne .....
const printGrnHeader = async (ob,rowIndex)=>{

    //first we need to load data into grn Details table. we can achieve that by using loadDataIntoGrnDetailsTableForGrnHeaderPrint function then we need to parse header key to that function
    loadDataIntoGrnDetailsTableForGrnHeaderPrint(ob.grnheaderkey);


    const newWindow = window.open();
    await newWindow.document.write(`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>purchase order print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">


<div class="row" style="margin-top: 5%">
    <div class="col-6"><p style="font-size: 16px">SUPPLIER</p></div>
    <div class="col-6 text-end"><p style="font-size: 16px">GRN Details</p></div>
</div>

<div class="row mb-5 d-flex align-items-stretch">
<!--supplier area-->
    <div class="col-6">
        <div class="card h-100" style="margin-bottom: 5px;">
            <p style="font-size: 16px">${ob.supplier_id.suppliername}</p>
            <p>${ob.supplier_id.supplieraddress}</p>
            <p>${ob.supplier_id.suppliertelephone}</p>
        </div>
    </div>
<!-- grn area    -->
    <div class="col-6">
        <table class="table table-bordered h-100 m-0">
            <tbody>
                <tr>
                    <td>GRN No</td>
                    <td>${ob.grnno}</td>
                </tr>
                <tr>
                    <td>GRN Date</td>
                    <td>${ob.grndate}</td>
                </tr>
                <tr>
                    <td>Our Po No</td>
                    <td>${ob.ourponumber}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    
</div>
<!--table area-->
    ${grnDetailsTableForGrnHeaderPrint.outerHTML}

</div>
</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();

    divModifyButton.classList.add('d-none');

}



//po number eka type karahama ee number eken our po details tika Grn Header area ekata load function eka
const loadPoDetails =(fieldId)=>{

    //call service that get po header from po number then it get all our po details that have our po header key.
    //this is initiated in grn Header dao and controller. because we use that service in grn header section
    const poDetails = ajaxGetRequest("/grn-header/getourpodetailsfromourponumber/"+fieldId.value);


    const displayProperty=[
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'qty'},
        {dataType:'text',propertyName:'rate'},
    ];

    fillDataIntoTable(ourPoDetailsTableForGrnHeaderSection,poDetails,displayProperty,false);

    cardOurPoDetailsInGrnHeader.classList.remove('d-none');

}





// grn header area section finished.




//grn details section area starts from here

//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------


const refreshGrnDetailsForm = ()=>{

    grnDetail = new Object();

    //setting colors to default
    selectRawMaterial.style.border="2px solid #ced4da";
    txtQty.style.border="2px solid #ced4da";
    txtRate.style.border="2px solid #ced4da";


    //emptying values
    txtQty.value="";
    txtRate.value="";

    rawMaterials  = ajaxGetRequest("/rawmaterial/findall")
    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawMaterials,'rmname');


    //add button eka enable karanwa //update button eka disable karanawa
    buttonAddGrnDetails.disabled=false;
    buttonAddGrnDetails.style.cursor="default";

    buttonUpdateGrnDetails.disabled=true;
    buttonUpdateGrnDetails.style.cursor="not-allowed";


}

const refreshGrnDetailsTable = ()=>{

    //table eka diable eka ayin karanawa
    cardGrnDetailsTableArea.classList.remove('d-none');

    grnDetails = ajaxGetRequest("/grn-details/getgrndetailsbygrnheader/"+displayGrnKey.value);

    displayProperty=[
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'quantity'},
        {dataType:'text',propertyName:'rate'},
    ];


    fillDataIntoTable2(grnDetailsTable,grnDetails,displayProperty,true,divModifyButton2)

}


const getRawMaterial = (ob)=>{
    return ob.rawmaterial_id.rmname
}



const grnDetailsCheckErrors = ()=>{

    let errors = "";

    if (grnDetail.rawmaterial_id == null){
        errors=errors+"Raw Material Cannot Be Empty \n"
    }

    if (grnDetail.quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }


    if (grnDetail.rate == null){
        errors=errors+"Rate Cannot Be Empty \n"
    }
    return errors;
}



const saveGrnDetails = ()=>{

    grnDetail.grnheader = displayGrnKey.value


    let errors = grnDetailsCheckErrors();

    if (errors==""){

        const userConfirm = confirm(`Are You Sure To Add Following Grn Details \n
        Raw Material Name Is ${grnDetail.rawmaterial_id.rmname}
        Quantity Is ${grnDetail.quantity}
        Rate Is ${grnDetail.rate}
        Grn Header Is ${grnDetail.grnheader}
        `);

        if (userConfirm){
            const postServerResponse =ajaxPostRequest("/grn-details",grnDetail);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshGrnDetailsForm();
                refreshGrnDetailsTable();
            }else {
                alert("Save Unsuccessful \n"+postServerResponse);
            }
        }
    }else {
        alert("You Have Errors \n"+errors)
    }
}


const refillGrnDetails = (ob,rowIndex)=>{

    grnDetail = JSON.parse(JSON.stringify(ob));
    oldGrnDetail = JSON.parse(JSON.stringify(ob));

    txtQty.value= ob.quantity
    txtRate.value= ob.rate

    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawMaterials,'rmname',ob.rawmaterial_id.rmname);


    //add button eka enable karanwa //update button eka disable karanawa
    buttonAddGrnDetails.disabled=true;
    buttonAddGrnDetails.style.cursor="not-allowed";

    buttonUpdateGrnDetails.disabled=false;
    buttonUpdateGrnDetails.style.cursor="default";



}




const grnDetailsCheckUpdates = ()=>{
    let updates = '';

    if (grnDetail.rawmaterial_id.rmname != oldGrnDetail.rawmaterial_id.rmname){
        updates=updates+"Rawmaterial Is changed \n"
    }
    if (grnDetail.quantity != oldGrnDetail.quantity){
        updates=updates+"Quantity Is Changed \n"
    }
    if (grnDetail.rate != oldGrnDetail.rate){
        updates=updates+"Rate Is Changed \n"
    }


    return updates;
}


const updateGrnDetail = ()=>{
    const updates = grnDetailsCheckUpdates();


    if (updates!=""){

        const userConfirm = confirm(`Are You Sure To Update Following Grn Details \n`+updates);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/grn-details",grnDetail);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshGrnDetailsForm();
                refreshGrnDetailsTable();
                divModifyButton2.classList.add('d-none');
            }else {
                alert("Update Unsuccessful"+putServerResponse);
            }
        }
    }else {
        alert("Nothing to Update \n")
    }
}


const deleteGrnDetails =(ob,rowIndex)=>{

    const userConfirm = confirm(`Are You sure Delete following Grn Details
        Raw Material Name Is ${ob.rawmaterial_id.rmname}
        Quantity Is ${ob.quantity}
        Rate Is ${ob.rate}
        Grn Header Is ${ob.grnheader}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/grn-details",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshGrnDetailsTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert("Delete Unsuccessful \n"+deleteServerResponse);
        }
    }
}



//print area function are starting from here

const loadDataIntoGrnDetailsTableForGrnHeaderPrint = (headerKey)=>{

    const grnDetailsList  = ajaxGetRequest("/grn-details/getgrndetailsbygrnheader/"+headerKey);

    const displayProperty=[
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'quantity'},
        {dataType:'text',propertyName:'rate'},
    ];


    fillDataIntoTable(grnDetailsTableForGrnHeaderPrint,grnDetailsList,displayProperty,false);

}

















































