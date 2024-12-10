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

    //our po details table eka load vena eka hide kara -> meka load venne user po numbber eka type karahama.
    cardOurPoDetailsInGrnHeader.classList.add('d-none');


    //proceed without po kiyana section ekath clear karanawa
    checkBoxWithOutPoNumber.checked=false;
    textOurPoNumber.disabled = false;

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

    if (checkBoxWithOutPoNumber.checked){
        //check nam ee kiyanne proceed without po kiyana option eka tik karala thiyenne
    }else {
        //else ekedi venne
        if (grnHeader.ourponumber == null) {
            errors = errors + "Our Po Number Cannot Be Empty \n"
        }
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


    //po number eke logic eka -> po number ekak thiyenawanam ekata adala table eka load venna one po number ekak naththam proceed without po click venna one
    if (ob.ourponumber==null){
        checkBoxWithOutPoNumber.checked=true;
        textOurPoNumber.disabled = true;
    }else {
        textOurPoNumber.value=ob.ourponumber
        loadPoDetails(textOurPoNumber);
    }


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
    <title>Grn Details print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid" style="position: relative">


<div class="row">
<h2 class="text-center">GRN</h2>
</div>

<!--grn area start-->
<div class="row">
<div class="col-4">
        <div class="card" style="border: 1px solid black">
            <p style="font-size: 11px; font-weight: bold; margin-top: 5px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.suppliername}</p>
            <p style="font-size: 11px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.supplieraddress}</p>
            <p style="font-size: 11px; margin-bottom: 2px; margin-left: 10px">${ob.supplier_id.suppliertelephone}</p>
        </div>
</div>
<div class="col-2"></div>
<div class="col-3"></div>
    <div class="col-3">
        <table class="table table-bordered" style="border: 1px solid black">
            <tbody>
                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">GRN No</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.grnno}</td>
                </tr>
                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">GRN Date</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.grndate}</td>
                </tr>
                <tr>
                    <td style="line-height: 0.5; font-size: 12px;">Our Po No</td>
                    <td class="text-end" style="line-height: 0.5; font-size: 12px;">${ob.ourponumber}</td>
                </tr>
            </tbody>
        </table>
    
    </div>
</div>
<!--grn area end-->



<!--table area start-->
    ${grnDetailsTableForGrnHeaderPrint.outerHTML}
<!--table area end-->

</div>


<div style="position: absolute; bottom: 3%; width: 100%" >
<!--  prepared by, checked by, recieved by area start   -->
    <div class="row">
    <div class="col-4 text-start">
    _____________
    <p style="font-size: 11px">Prepared By</p>
    </div>
    <div class="col-4 text-center">
    _____________
    <p style="font-size: 11px">Recived By</p>
    </div>
    <div class="col-4 text-end">
    _____________
    <p style="font-size: 11px; margin-right: 3px">Checked By</p>
    </div>
</div>
<!--  prepared by, checked by, recieved by area end   -->
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

    // fillDataIntoTable2(ourPoDetailsTableForGrnHeaderSection,poDetails,displayProperty,true);
    fillDataIntoTableWithEditButton(ourPoDetailsTableForGrnHeaderSection,poDetails,displayProperty,refillOurPoDetailsIntoGrnDetails,true)

    cardOurPoDetailsInGrnHeader.classList.remove('d-none');

}


//our po details table eken data aran grn details ekata add karana function eka
const refillOurPoDetailsIntoGrnDetails = (ob,rowIndex) =>{
    txtQty.value=ob.qty;
    txtRate.value = ob.rate


    //raw material eka set karanawa
    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawMaterials,'rmname',ob.rawmaterial_id.rmname);
    const selectedRawMaterial = JSON.parse(selectRawMaterial.value);
    grnDetail.rawmaterial_id = selectedRawMaterial;
    console.log(grnDetail.rawmaterial_id);


    grnDetail.quantity = ob.qty;
    grnDetail.rate = ob.rate;


    //our po detail eke id eka set karanawa  // relationship save karana kota mulu object ekama bind karanna one id eka vitharak ba.
    grnDetail.ourpodetail_id = ob
    console.log("Our po detail id is"+grnDetail.ourpodetail_id.id);

    getRemainingGrnDetailsQuantityFromOurPoDetail(ob.id);


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
    txtItemCode.style.border="2px solid #ced4da";
    txtItemDescription.style.border="2px solid #ced4da";
    txtItemReferenceNumber.style.border="2px solid #ced4da";


    //emptying values
    txtQty.value="";
    txtRate.value="";
    txtItemCode.value="";
    txtItemDescription.value="";
    txtItemReferenceNumber.value="";

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
        {dataType:'text',propertyName:'itemcode'},
        {dataType:'text',propertyName:'gd_description'},
        {dataType:'text',propertyName:'gd_referencenumber'},
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

    // if (grnDetail.itemcode == null){
    //     errors=errors+"Item Code Cannot Be Empty \n"
    // }
    //
    // if (grnDetail.gd_description == null){
    //     errors=errors+"Description Cannot Be Empty \n"
    // }
    //
    // if (grnDetail.gd_referencenumber == null){
    //     errors=errors+"Reference Number Cannot Be Empty \n"
    // }

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
                displayRemainingQuantity.innerText="";
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
    txtItemCode.value= ob.itemcode
    txtItemDescription.value = ob.gd_description
    txtItemReferenceNumber.value = ob.gd_referencenumber

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

    if (grnDetail.itemcode != oldGrnDetail.itemcode){
        updates=updates+"Item Code Is Changed \n"
    }

    if (grnDetail.gd_description != oldGrnDetail.gd_description){
        updates=updates+"Description Is Changed \n"
    }

    if (grnDetail.gd_referencenumber != oldGrnDetail.gd_referencenumber){
        updates=updates+"Reference Number Is Changed \n"
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


const getRemainingGrnDetailsQuantityFromOurPoDetail = (ourpoid)=>{

    const validateExistingGrnDetailsByOurPoId = ajaxGetRequest("/grn-details/validateexisting-grndetails-fromourpoid/"+ourpoid)

    if (validateExistingGrnDetailsByOurPoId=="1"){  //1 ka kiyanne thiyenawa 0 kiyanne na kiyana eka
        //ee kiyanne grndetails table eke kalin thiyenawa kiyana eka

        console.log(`id is  ${ourpoid} from getRemainingGrnDetailsQuantityFromOurPoDetail function`);

        const getServerResponse = ajaxGetRequest("/grn-details/getremaininggrnquantity/"+ourpoid)
        console.log(` ${Number(getServerResponse)}  remaining quantity from sever`);

        const remainingQuantity = Number(getServerResponse);

        displayRemainingQuantity.innerText=`${remainingQuantity} Is Your Remaining Quantity `

        return remainingQuantity;

    }else {
        displayRemainingQuantity.innerText="";
    }




}


const validateGrnDetailsQuantity = (fieldId)=>{



    if (checkBoxWithOutPoNumber.checked){
        //checked kiyanne proceed without po kiyana option eka
    }else {
        //else kiyanne po ekak thiyenawa kiyana eka
        //need to get remaining quantity
        const getRemainingValueFromDisplayText = displayRemainingQuantity.innerText;
        const integerPart = getRemainingValueFromDisplayText.split(' ');
        const finalRemainingValue = Number(integerPart[0]);

        console.log(finalRemainingValue);

        if (fieldId.value > finalRemainingValue){
            fieldId.style.border="2px solid red";
            grnDetail.quantity = null;
        }else {
            fieldId.style.border="2px solid green";
            grnDetail.quantity = fieldId.value;
        }
    }












}







//print area function are starting from here

const loadDataIntoGrnDetailsTableForGrnHeaderPrint = (headerKey)=>{

    const grnDetailsList  = ajaxGetRequest("/grn-details/getgrndetailsbygrnheader/"+headerKey);

    const displayProperty=[
        {dataType:'text',propertyName:'itemcode'},
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'gd_description'},
        {dataType:'text',propertyName:'gd_referencenumber'},
        {dataType:'function',propertyName:getQuantityGrnDetails},
    ];


    fillDataIntoTable(grnDetailsTableForGrnHeaderPrint,grnDetailsList,displayProperty,false);

}

const getQuantityGrnDetails = (ob)=>{
    return `<p class="text-end">${ob.quantity}</p>`
}















































