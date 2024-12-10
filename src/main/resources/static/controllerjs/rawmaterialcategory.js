window.addEventListener('load',()=>{

    //call refresh raw material category form function
    refreshRawMaterialCategoryForm();

    //call refresh raw material category table
    refreshRawMaterialCategoryTable();

});



const refreshRawMaterialCategoryForm = ()=>{

    //update button disable beucase user can clieck update button instead of add button
    btnRawMaterialCategoryUpdate.disabled=true;
    btnRawMaterialCategoryUpdate.style.cursor="not-allowed";


    btnRawMaterialCategorySubmit.disabled=false;
    btnRawMaterialCategorySubmit.style.cursor="default";


    rawmaterialcategory = new Object();


    //vlaue tika empty karanwa
    textRmCtCode.value="";
    textRmCtSize.value="";
    textRmCtName.value="";
    txtRmCtVolume.value="";
    txtRmCtShape.value="";
    txtRmCtMOQ.value="";
    txtRmCtDuration.value="";
    txtRmCtPackaging.value="";
    txtRmCtDescription.value="";
    txtRmCtStatus.value="";


    textRmCtCode.style.border="2px solid #ced4da";
    textRmCtSize.style.border="2px solid #ced4da";
    textRmCtName.style.border="2px solid #ced4da";
    txtRmCtVolume.style.border="2px solid #ced4da";
    txtRmCtShape.style.border="2px solid #ced4da";
    txtRmCtMOQ.style.border="2px solid #ced4da";
    txtRmCtDuration.style.border="2px solid #ced4da";
    txtRmCtPackaging.style.border="2px solid #ced4da";
    txtRmCtDescription.style.border="2px solid #ced4da";
    txtRmCtStatus.style.border="2px solid #ced4da";
}


const refreshRawMaterialCategoryTable = ()=>{

    rawMaterialCategories = ajaxGetRequest("/rawmaterialcategory/findall");

    displayProperty = [
        {dataType: 'text', propertyName: 'rmctcode'},
        {dataType: 'text', propertyName: 'rmctname'},
        {dataType: 'text', propertyName: 'rmctsize'},
        {dataType: 'text', propertyName: 'rmctshape'},
        {dataType: 'text', propertyName: 'rmctdescription'},
        {dataType: 'text', propertyName: 'rmctvolumme'},
        {dataType: 'text', propertyName: 'rmctmoq'},
        {dataType: 'text', propertyName: 'rmctduration'},
        {dataType: 'text', propertyName: 'rmctpacking'},
        {dataType: 'function', propertyName: getRawMaterialCategoryStatus},
    ];

    fillDataIntoTable(tableRawMaterialCategory,rawMaterialCategories,displayProperty,true);
    $("#tableRawMaterialCategory").dataTable();

}

const getRawMaterialCategoryStatus = (ob)=>{

    if (ob.rmctstatus==true){
        return `<p style="color: green">active</p>`
    }else {
        return `<p class="text-danger">inactive</p>`
    }


}


const checkErrors = ()=>{

    let errors = '';

    if (rawmaterialcategory.rmctcode == null){
        errors = errors+"category code cannot be empty \n";
    }

    if (rawmaterialcategory.rmctname == null){
        errors =errors+"category name cannot be empty\n"
    }
    // if (rawmaterialcategory.rmctsize == null){
    //     errors=errors+"category size cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctshape == null){
    //     errors=errors+"shape cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctdescription == null){
    //     errors=errors+"description cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctvolumme == null){
    //     errors=errors+"volume cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctmoq == null){
    //     errors=errors+"MOQ cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctduration == null){
    //     errors=errors+"duration cannot be empty \n"
    // }
    // if (rawmaterialcategory.rmctpacking == null){
    //     errors=errors+"packing cannot be empty \n"
    // }
    if (rawmaterialcategory.rmctstatus == null){
        errors=errors+"status cannot be empty \n"
    }

    return errors;
}


const submitRawMaterial = ()=>{
    let errors = checkErrors();

    if (errors==""){
        let userConfirm =confirm(`are you sure to add following raw material 
        Code is ${rawmaterialcategory.rmctcode}
        Name is ${rawmaterialcategory.rmctname}
        Status is ${rawmaterialcategory.rmctstatus}`
        );
        //uda message ekata me tika danata one nathi nisa comment karala message eken ayin kara
        // Size is ${rawmaterialcategory.rmctsize}
        // Shape is ${rawmaterialcategory.rmctshape}
        // Description is ${rawmaterialcategory.rmctdescription}
        // Volume is ${rawmaterialcategory.rmctvolumme}
        // MOQ is ${rawmaterialcategory.rmctmoq}
        // Duration is ${rawmaterialcategory.rmctduration}
        // Packing is ${rawmaterialcategory.rmctpacking}


        if (userConfirm){
            const postServerResponse =ajaxPostRequest("/rawmaterialcategory",rawmaterialcategory);
            if (postServerResponse=="ok"){
                alert("save successful")
                refreshRawMaterialCategoryForm();
                refreshRawMaterialCategoryTable();
            }else {
                alert("error happened \n"+postServerResponse);
                refreshRawMaterialCategoryForm();
                refreshRawMaterialCategoryTable();
            }
        }
    }else {
        alert("you have following errors \n"+errors);
    }
}



const refillRawMaterials = (ob)=>{

    //need to enable update button and disable add button
    btnRawMaterialCategoryUpdate.style.cursor="default";
    btnRawMaterialCategoryUpdate.disabled=false;

    btnRawMaterialCategorySubmit.style.cursor="not-allowed";
    btnRawMaterialCategorySubmit.disabled=true;



    rawmaterialcategory=JSON.parse(JSON.stringify(ob));
    oldrawMaterialCategory = JSON.parse(JSON.stringify(ob));

    textRmCtCode.value=rawmaterialcategory.rmctcode
    textRmCtSize.value=rawmaterialcategory.rmctsize
    textRmCtName.value=rawmaterialcategory.rmctname
    txtRmCtVolume.value=rawmaterialcategory.rmctvolumme
    txtRmCtShape.value=rawmaterialcategory.rmctshape
    txtRmCtMOQ.value=rawmaterialcategory.rmctmoq
    txtRmCtDuration.value=rawmaterialcategory.rmctduration
    txtRmCtPackaging.value=rawmaterialcategory.rmctpacking
    txtRmCtDescription.value=rawmaterialcategory.rmctdescription
    txtRmCtStatus.value=rawmaterialcategory.rmctstatus

}

const checkUpdates = ()=>{

    let updates = ''

    if (rawmaterialcategory.rmctcode != oldrawMaterialCategory.rmctcode){
        updates=updates+"category code is updated \n"
    }
    if (rawmaterialcategory.rmctsize != oldrawMaterialCategory.rmctsize){
        updates=updates+"size is updated \n"
    }
    if (rawmaterialcategory.rmctname != oldrawMaterialCategory.rmctname){
        updates=updates+"name is updated \n"
    }
    if (rawmaterialcategory.rmctvolumme != oldrawMaterialCategory.rmctvolumme){
        updates=updates+"volume is updated \n"
    }
    if (rawmaterialcategory.rmctshape != oldrawMaterialCategory.rmctshape){
        updates=updates+"shape is updated \n";
    }
    if (rawmaterialcategory.rmctmoq != oldrawMaterialCategory.rmctmoq){
        updates=updates+"MOQ is updated \n"
    }
    if (rawmaterialcategory.rmctduration != oldrawMaterialCategory.rmctduration){
        updates=updates+"duration is updated \n"
    }
    if (rawmaterialcategory.rmctpacking !=  oldrawMaterialCategory.rmctpacking){
        updates=updates+"packing is updated \n"
    }
    if (rawmaterialcategory.rmctdescription != oldrawMaterialCategory.rmctdescription){
        updates=updates+"description is updated \n"
    }
    if (rawmaterialcategory.rmctstatus != oldrawMaterialCategory.rmctstatus){
        updates=updates+"status is updated \n"
    }
    return updates;
}


const updateRawMaterial = ()=>{
    let updates = checkUpdates();

    if (updates!=""){

        const userConfirm =confirm("are you sure to update following raw Materials \n"+updates);
        if (userConfirm){
            const updateServerResponse =ajaxPutRequest("/rawmaterialcategory",rawmaterialcategory);
            if (updateServerResponse=="ok"){
                alert("update successful")
                refreshRawMaterialCategoryForm();
                refreshRawMaterialCategoryTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert("error happened \n");
                refreshRawMaterialCategoryForm()
                refreshRawMaterialCategoryTable();
                divModifyButton.classList.add('d-none');
            }
        }


    }else {
        alert("nothing updated \n")
    }
}


//need to do delete part
const deleteRawMaterialCategory = (ob,rowOb)=>{
    const userConfirm = confirm(`are you sure to delete following raw material category
    code is ${ob.rmctcode}
    name is ${ob.rmctname}
    Status is ${ob.rmctstatus}`
    );

    //me tikath uda message ekata one na ee nisa comment karala uda message eken ayin kara
    // size is ${ob.rmctsize}
    // shape is ${ob.rmctshape}
    // description is ${ob.rmctdescription}
    // volume is ${ob.rmctdescription}
    // MOQ is ${ob.rmctmoq}
    // Duration is ${ob.rmctduration}
    // Packing is ${ob.rmctpacking}


    if (userConfirm){
        let deleteServerResponse = ajaxDeleteRequest("/rawmaterialcategory",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            refreshRawMaterialCategoryForm();
            refreshRawMaterialCategoryTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert("error happened \n"+deleteServerResponse)
            refreshRawMaterialCategoryForm();
            refreshRawMaterialCategoryTable();
            divModifyButton.classList.add('d-none');
        }
    }
}





//let's try print function for one object
const printOneRawMaterialCategory = (ob) => {
    let newWindow = window.open();
    newWindow.document.write(
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div class="row">
    <div class="col-md-12 text-center">
    <h3>Raw Material</h3>
</div>
</div>
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>Code</td>
                        <td id="tdRmCtCode" class="text-center">${ob.rmctcode}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td id="tdRmCtName" class="text-center">${ob.rmctname}</td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td id="tdRmCtSize" class="text-center">${ob.rmctsize}</td>
                    </tr>
                    <tr>
                        <td>Shape</td>
                        <td id="tdRmCtShape" class="text-center">${ob.rmctshape}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td id="tdRmCtDescription" class="text-center">${ob.rmctdescription}</td>
                    </tr>
                    <tr>
                        <td>Volume</td>
                        <td id="tdRmCtVolume" class="text-center">${ob.rmctvolumme}</td>
                    </tr>
                    <tr>
                        <td>MOQ</td>
                        <td id="tdRmCtMOQ" class="text-center">${ob.rmctmoq}</td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td id="tdRmCtDuration" class="text-center">${ob.rmctduration}</td>
                    </tr>
                    <tr>
                        <td>Packing</td>
                        <td id="tdRmCtPacking" class="text-center">${ob.rmctpacking}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td id="tdRmCtStatus" class="text-center">${ob.rmctstatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-3"></div>
    </div>
</body>
</html>
    `
    );

    setTimeout(() => {
        newWindow.stop();   // Stop loading new window
        newWindow.print();  // Call print
        newWindow.close();  // Close window after print or cancel
    }, 1000);
    divModifyButton.classList.add('d-none');
}





























