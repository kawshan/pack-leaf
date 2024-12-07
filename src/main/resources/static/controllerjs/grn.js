window.addEventListener('load', function () {


    //call GRN header refresh form function
    grnHeaderFormRefresh();


    //call GRN table refresh table function
    grnHeaderTableRefresh();

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


const printGrnHeader = (ob,rowIndex)=>{

    const newWindow = window.open();
    newWindow.document.write(

    )


}











// grn header area section finished.









































































