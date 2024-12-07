window.addEventListener('load',function () {


    refreshRawMaterialForm();

    refreshRawMaterialTable();

    loadDataToPrintFullRawMaterialsTable();

})


//define function for refresh raw material form
const refreshRawMaterialForm = ()=>{

    //button disable part


    //create new JS object
    rawmaterial = new Object();


    textRmName.value="";
    textRmForm.value="";
    txtRmPacking.value="";
    txtRmQty.value="";
    txtRmRate.value="";
    txtRmReOrderLevel.value="";
    SelectRmStatus.value="";


    textRmName.style.border="2px solid #ced4da";
    textRmForm.style.border="2px solid #ced4da";
    txtRmPacking.style.border="2px solid #ced4da";
    txtRmQty.style.border="2px solid #ced4da";
    txtRmRate.style.border="2px solid #ced4da";
    txtRmReOrderLevel.style.border="2px solid #ced4da";
    SelectRmStatus.style.border="2px solid #ced4da";


    rawMaterialCategories = ajaxGetRequest("/rawmaterialcategory/findall");
    fillDataIntoSelect(selectRmCt,'select Raw Material Category',rawMaterialCategories,'rmctname');

}


//define function for raw material table
const refreshRawMaterialTable = ()=>{

    rawMaterials = ajaxGetRequest("/rawmaterial/findall");

    const displayProperty = [
        {dataType: 'function', propertyName: getRawMaterialCategory},
        {dataType: 'text', propertyName: 'rmname'},
        {dataType: 'text', propertyName: 'rmform'},
        {dataType: 'text', propertyName: 'rmpacking'},
        {dataType: 'text', propertyName: 'rmqty'},
        {dataType: 'text', propertyName: 'rmrate'},
        {dataType: 'text', propertyName: 'rmreorderlevel'},
        {dataType: 'function', propertyName: getRawMaterialStatus},
    ];

    fillDataIntoTable(tableRawMaterial,rawMaterials,displayProperty,true);

}


const getRawMaterialCategory = (ob)=>{
    return `<p>${ob.rawmaterialcategory_id.rmctname}</p>`
}


const getRawMaterialStatus = (ob)=>{

    if (ob.rmstatus == true){
        return 'available'
    }else {
        return 'not-available'
    }

}



const checkError = ()=>{

    let errors = ''

    if (rawmaterial.rawmaterialcategory_id == null){
        errors=errors+"Raw Material Category Cannot Be Empty \n "
    }

    if (rawmaterial.rmname == null){
        errors=errors+"Raw Material Name Cannot Be Empty \n"
    }

    if (rawmaterial.rmform == null){
        errors=errors+"Raw Material Form Cannot Be Empty \n"
    }

    if (rawmaterial.rmpacking == null){
        errors=errors+"Raw Material Packing Cannot Be Empty \n"
    }

    if (rawmaterial.rmqty == null){
        errors=errors+"Raw Material QTY Cannot Be Empty \n"
    }

    if (rawmaterial.rmrate == null){
        errors=errors+"Raw Material Rate Cannot Be Empty \n"
    }

    if (rawmaterial.rmreorderlevel == null){
        errors=errors+"Raw Material Reorder Level Cannot Be Empty \n"
    }

    if (rawmaterial.rmstatus == null){
        errors=errors+"Raw Material Status Cannot Be Empty \n"
    }

    return errors;
}



const submitRawMaterial = ()=>{

    let errors = checkError();

    if (errors==""){
        const userConfirm = confirm(`are you sure to add following raw materials
        Raw Material Category Is ${rawmaterial.rawmaterialcategory_id}
        Raw Material Name Is ${rawmaterial.rmname}
        Raw Material Form Is ${rawmaterial.rmform}
        Raw Material Packing is ${rawmaterial.rmpacking}
        Raw Material Quantity is ${rawmaterial.rmqty}
        Raw Material Rate is ${rawmaterial.rmrate}
        Raw Material Re Order Level Is ${rawmaterial.rmreorderlevel}
        Raw Material Status Is ${rawmaterial.rmstatus}
        `);

        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/rawmaterial",rawmaterial);
            if (postServerResponse=="ok"){
                alert("Save success");
                refreshRawMaterialForm();
                refreshRawMaterialTable();
            }else {
                alert(`Save Not Success \n ${postServerResponse}`)
            }
        }
    }else {
        alert(`you have following errors \n ${errors}`);
    }
}


const refillRawMaterial = (ob,rowIndex)=>{

    rawmaterial = JSON.parse(JSON.stringify(ob));
    oldrawmaterial = JSON.parse(JSON.stringify(ob));

    textRmName.value=ob.rmname
    textRmForm.value=ob.rmform
    txtRmPacking.value=ob.rmpacking
    txtRmQty.value=ob.rmqty
    txtRmRate.value=ob.rmrate
    txtRmReOrderLevel.value=ob.rmreorderlevel
    SelectRmStatus.value=ob.rmstatus


    fillDataIntoSelect(selectRmCt,'select Raw Material Category',rawMaterialCategories,'rmctname',ob.rawmaterialcategory_id.rmctname);

}

const checkUpdates = ()=>{

    let updates="";

    if (rawmaterial.rawmaterialcategory_id.rmctname != oldrawmaterial.rawmaterialcategory_id.rmctname){
        updates=updates+"Raw Material Category Is Changed \n";
    }
    if (rawmaterial.rmname != oldrawmaterial.rmname){
        updates=updates+"Raw Material Name Is Changed \n"
    }
    if (rawmaterial.rmform != oldrawmaterial.rmform){
        updates=updates+"Raw Material Form Is Changed \n"
    }
    if (rawmaterial.rmpacking !=  oldrawmaterial.rmpacking){
        updates=updates+"Raw Material Packing Is Changed \n"
    }
    if (rawmaterial.rmqty !=  oldrawmaterial.rmqty){
        updates=updates+"Raw Material Quantity Is Changed \n"
    }
    if (rawmaterial.rmrate != oldrawmaterial.rmrate){
        updates=updates+"Raw Material Rate Is Changed \n"
    }
    if (rawmaterial.rmreorderlevel != oldrawmaterial.rmreorderlevel){
        updates=updates+"Raw Material Re Order Level Is Changed \n "
    }
    if (rawmaterial.rmstatus != oldrawmaterial.rmstatus){
        updates=updates+"Raw Material Status Is Changed \n"
    }
    return updates;
}


const updateRawMaterial = ()=>{
    let updates = checkUpdates();

    if (updates!=""){
        const userConfirm = confirm("Are You Sure To Update Following Raw Material \n"+updates)
        if (userConfirm){
            let putServerResponse = ajaxPutRequest("/rawmaterial",rawmaterial);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshRawMaterialTable();
                refreshRawMaterialForm();
            }else {
                alert("Update unsuccessful");
                refreshRawMaterialTable();
                refreshRawMaterialForm();
            }
        }
    }else {
        alert("Nothing to Update");
    }
}


const deleteRawMaterial = (ob,rowIndex)=>{

    tableRawMaterial.children[1].children[rowIndex].style.backgroundColor="pink";

    setTimeout(()=>{
        const userConfirm =confirm(`Are You Sure To Delete Following Raw Material
    Raw Material Category Is ${ob.rawmaterialcategory_id.rmctname}
    Raw Material Name Is ${ob.rmname}
    Raw Material Form Is ${ob.rmform}
    Raw Material Packing IS ${ob.rmpacking}
    Raw Material Quantity Is ${ob.rmqty}
    Raw Material Rate Is ${ob.rmrate}
    Raw Material Reorder Level ${ob.rmreorderlevel}
    Raw Material Status is ${ob.rmstatus}
    `);

        if (userConfirm){
            const deleteServerResponse = ajaxDeleteRequest("/rawmaterial",ob);
            if (deleteServerResponse=="ok"){
                alert("Delete Successful");
                refreshRawMaterialTable();
            }else {
                alert("error happened \n"+deleteServerResponse);
                refreshRawMaterialTable();
            }
        }
    },500)


}




const printRawMaterialOneItem = (ob,rowIndex)=>{

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
            <th>Raw Material Property</th>
            <th>Raw Material Value</th>
        </thead>

        <tbody>

            <tr>
                <td>Raw Material Category Name</td>
                <td id="tdRmCtName">${ob.rawmaterialcategory_id.rmctname}</td>
            </tr>

            <tr>
                <td>Raw Material Name</td>
                <td id="tdRmName">${ob.rmname}</td>
            </tr>

            <tr>
                <td>Raw Material Form</td>
                <td id="tdRmForm">${ob.rmform}</td>
            </tr>

            <tr>
                <td>Raw Material Packing</td>
                <td id="tdRmPacking">${ob.rmpacking}</td>
            </tr>

            <tr>
                <td>Raw Material QTY</td>
                <td id="tdRmQty">${ob.rmqty}</td>
            </tr>

            <tr>
                <td>Raw Material Rate</td>
                <td id="tdRmRate">${ob.rmrate}</td>
            </tr>

            <tr>
                <td>Raw Material Re Order Level</td>
                <td id="tdRmReOrderLevel">${ob.rmreorderlevel}</td>
            </tr>

            <tr>
                <td>Raw Material Status</td>
                <td id="tdRmStatus">${ob.rmstatus}</td>
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



const loadDataToPrintFullRawMaterialsTable = ()=>{

    rawMaterials = ajaxGetRequest("/rawmaterial/findall");

    const displayProperty = [
        {dataType: 'function', propertyName: getRawMaterialCategory},
        {dataType: 'text', propertyName: 'rmname'},
        {dataType: 'text', propertyName: 'rmform'},
        {dataType: 'text', propertyName: 'rmpacking'},
        {dataType: 'text', propertyName: 'rmqty'},
        {dataType: 'text', propertyName: 'rmrate'},
        {dataType: 'text', propertyName: 'rmreorderlevel'},
        {dataType: 'function', propertyName: getRawMaterialStatus},
    ];

    fillDataIntoTable(printRawMaterialTable,rawMaterials,displayProperty,false);

}



const printRawMaterialModelButtonMC =()=>{
    const newWindow = window.open();
    newWindow.document.write(
        `
        <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    ${printRawMaterialTable.outerHTML}
</div>
    
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







