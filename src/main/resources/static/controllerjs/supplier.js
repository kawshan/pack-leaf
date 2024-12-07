window.addEventListener('load',function () {

    //call refresh supplier Form
    refreshSupplierForm();

    //call refresh supplier table
    refreshSupplierTable();

    loadDataIntoPrintTable();
})


const refreshSupplierForm = ()=>{

    //need to disable update button and enable add button
    ButtonSupplierUpdate.disabled=true
    ButtonSupplierUpdate.style.cursor="not-allowed"


    ButtonSupplierAdd.disabled=false
    ButtonSupplierAdd.style.cursor="default";


    supplier = new Object();

    txtSupplierName.value=""
    txtSupplierAddress.value=""
    txtSupplierVatNo.value=""
    txtSupplierTelephone.value=""
    txtSupplierContactPerson.value=""
    txtSupplierCollectingAddress.value=""
    txtSupplierBank.value=""
    selectSupplierStatus.value=""


    txtSupplierName.style.border="2px solid #ced4da";
    txtSupplierAddress.style.border="2px solid #ced4da";
    txtSupplierVatNo.style.border="2px solid #ced4da";
    txtSupplierTelephone.style.border="2px solid #ced4da";
    txtSupplierContactPerson.style.border="2px solid #ced4da";
    txtSupplierCollectingAddress.style.border="2px solid #ced4da";
    txtSupplierBank.style.border="2px solid #ced4da";
    selectSupplierStatus.style.border="2px solid #ced4da";


}


const refreshSupplierTable = ()=>{

    suppliers =ajaxGetRequest("/supplier/findall");

    displayProperty = [
        {dataType:'text',propertyName:'suppliername'},
        {dataType:'text',propertyName:'supplieraddress'},
        {dataType:'text',propertyName:'suppliervatno'},
        {dataType:'text',propertyName:'suppliertelephone'},
        {dataType:'text',propertyName:'suppliercontactperson'},
        {dataType:'text',propertyName:'suppliercollectingaddress'},
        {dataType:'text',propertyName:'supplierbank'},
        {dataType:'function',propertyName:getSupplierStatus},
    ];

    fillDataIntoTable(supplierTable,suppliers,displayProperty,true);
    $("#supplierTable").dataTable();


}

const getSupplierStatus = (ob)=>{
    if (ob.supplierstatus == true){
        return `<p style="color: lawngreen">Active</p>`
    }else {
        return `<p style="color: orangered">Inactive</p>`
    }
}


const checkErrors = ()=>{

    let errors="";

    if (supplier.suppliername == null){
        errors=errors+"Supplier Name Cannot Be Empty \n"
    }
    if (supplier.supplieraddress == null){
        errors=errors+"Supplier Address Cannot Be Empty \n"
    }
    if (supplier.suppliertelephone == null){
        errors=errors+"Supplier Telephone Cannot Be Empty \n"
    }
    if (supplier.supplierstatus == null){
        errors=errors+"Supplier Status Cannot Be Empty \n"
    }
    return errors;
}


const saveSupplier = ()=>{
    const errors = checkErrors();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following Supplier
        Supplier Name Is ${supplier.suppliername}
        Supplier Address Is ${supplier.supplieraddress}
        Supplier Telephone Is ${supplier.suppliertelephone}
        Supplier Status Is ${supplier.supplierstatus}`
        );
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/supplier",supplier);
            if (postServerResponse=="ok"){
                alert("save successful");
                refreshSupplierForm();
                refreshSupplierTable();
            }else {
                alert("save unsuccessful"+postServerResponse);
                refreshSupplierForm();
                refreshSupplierTable();
            }
        }
    }else {
        alert("You Have Following Errors \n"+errors);
    }
}


const refillSupplier = (ob,rowIndex)=>{

    //need to enable update button and disable submit button
    ButtonSupplierUpdate.disabled=false
    ButtonSupplierUpdate.style.cursor="default"


    ButtonSupplierAdd.disabled=true
    ButtonSupplierAdd.style.cursor="not-allowed";

    supplier=JSON.parse(JSON.stringify(ob));
    oldSupplier = JSON.parse(JSON.stringify(ob));

    txtSupplierName.value=ob.suppliername
    txtSupplierAddress.value=ob.supplieraddress
    txtSupplierVatNo.value=ob.suppliervatno
    txtSupplierTelephone.value=ob.suppliertelephone
    txtSupplierContactPerson.value=ob.suppliercontactperson
    txtSupplierCollectingAddress.value=ob.suppliercollectingaddress
    txtSupplierBank.value=ob.supplierbank
    selectSupplierStatus.value=ob.supplierstatus


}

const checkUpdates = ()=>{
    let updates = '';

    if (supplier.suppliername != oldSupplier.suppliername){
        updates = updates+"Supplier Name Is Updated \n"
    }
    if (supplier.supplieraddress != oldSupplier.supplieraddress){
        updates=updates+"Supplier Address Is Updated \n"
    }
    if (supplier.suppliervatno != oldSupplier.suppliervatno){
        updates=updates+"Supplier Vat No Is Updated \n"
    }
    if (supplier.suppliertelephone != oldSupplier.suppliertelephone){
        updates=updates+"Supplier Telephone Is Updated \n"
    }
    if (supplier.suppliercontactperson !=  oldSupplier.suppliercontactperson){
        updates=updates+"Supplier Contact Person Is Updated \n"
    }
    if (supplier.suppliercollectingaddress != oldSupplier.suppliercollectingaddress){
        updates=updates+"Supplier Collecting Address Is Updated \n"
    }
    if (supplier.supplierbank != oldSupplier.supplierbank){
        updates=updates+"Supplier Bank Is Updated \n"
    }
    if (supplier.supplierstatus !=  oldSupplier.supplierstatus){
        updates=updates+"Supplier Status Is Updated \n"
    }
    return updates;
}



const updateSupplier = ()=>{

    let updates = checkUpdates();
    if (updates!=""){
        const userConfirm = confirm("Are You Sure To Update Following \n"+updates);
        if (userConfirm){

            const putServerResponse=ajaxPutRequest("/supplier",supplier)
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshSupplierForm();
                refreshSupplierTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert("Update Unsuccessful");
                refreshSupplierForm();
                refreshSupplierTable();
            }
        }
    }else {
        alert("Nothing Updated")
    }
}


const deleteSupplier = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Supplier
        Supplier Name Is ${ob.suppliername}
        Supplier Address Is ${ob.supplieraddress}
        Supplier Vat No Is ${ob.suppliervatno}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/supplier",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            divModifyButton.classList.add('d-none');
            refreshSupplierTable();
            refreshSupplierForm();
        }else {
            alert("Error Happened"+deleteServerResponse);
            refreshSupplierTable();
        }
    }
}



//print functions are starting from here


//define function to fill data into table that is inside of modal area
const loadDataIntoPrintTable = ()=>{
    suppliers =ajaxGetRequest("/supplier/findall");

    displayProperty = [
        {dataType:'text',propertyName:'suppliername'},
        {dataType:'text',propertyName:'supplieraddress'},
        {dataType:'text',propertyName:'suppliervatno'},
        {dataType:'text',propertyName:'suppliertelephone'},
        {dataType:'text',propertyName:'suppliercontactperson'},
        {dataType:'text',propertyName:'suppliercollectingaddress'},
        {dataType:'text',propertyName:'supplierbank'},
        {dataType:'text',propertyName:'supplierstatus'},
    ];

    fillDataIntoTable(printSupplierTable,suppliers,displayProperty,false);
}

//define function to execute print function when user clicks print button below the print model area
const printSupplierModelButtonMC = ()=>{
    const newWindow = window.open();
    newWindow.document.write(
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Print Supplier</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    ${printSupplierTable.outerHTML}
</body>
</html>
        `
    );

    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },500)


}

//define function to print one supplier
const printSupplierOneItem = (ob,rowIndex)=>{

    let newWindow = window.open();
    newWindow.document.write(
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>raw material print for one item</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>


<div class="row m-5">
    <table class="table table-bordered">


        <thead>
            <th>Supplier Property</th>
            <th>Supplier Value</th>
        </thead>

        <tbody>

            <tr>
                <td>Supplier Name</td>
                <td id="tdRmCtName">${ob.suppliername}</td>
            </tr>

            <tr>
                <td>Supplier Address</td>
                <td id="tdRmName">${ob.supplieraddress}</td>
            </tr>

            <tr>
                <td>Supplier Vat No</td>
                <td id="tdRmForm">${ob.suppliervatno}</td>
            </tr>

            <tr>
                <td>Supplier Telephone</td>
                <td id="tdRmPacking">${ob.suppliertelephone}</td>
            </tr>

            <tr>
                <td>Supplier Contact Person</td>
                <td id="tdRmQty">${ob.suppliercontactperson}</td>
            </tr>

            <tr>
                <td>Suplier Collecting Address</td>
                <td id="tdRmRate">${ob.suppliercollectingaddress}</td>
            </tr>

            <tr>
                <td>Supplier Bank</td>
                <td id="tdRmReOrderLevel">${ob.supplierbank}</td>
            </tr>

            <tr>
                <td>Supplier Status</td>
                <td id="tdRmStatus">${ob.supplierstatus  ? 'available':'not-available'   }</td>
            </tr>




        </tbody>

    </table>
</div>

</body>
</html>
        `
    );

    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();

    },500);
}













