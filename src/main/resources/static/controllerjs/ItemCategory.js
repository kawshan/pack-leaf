window.addEventListener('load',function () {

    refreshItemTable();


    refreshItemForm();



})

const refreshItemForm = ()=>{

    //on refresh, we need to disable update buttons
    buttonUpdate.disabled=true;
    buttonUpdate.style.cursor="not-allowed";


    //need to enable add button
    buttonSubmitItemCategory.disabled=false;
    buttonSubmitItemCategory.style.cursor="default";


    //create new js object
    itemCategory = new Object();

    // refresh static values in html form
    itemCategoryForm.reset();

    //emptying values
    txtCtCode.value="";
    txtCtSize.value="";
    txtCtName.value="";
    txtCtVolume.value="";
    txtCtShape.value="";
    txtCtMOQ.value="";
    txtCtDuration.value="";
    txtCtPackaging.value="";
    txtCtDescription.value="";


    txtCtCode.style.border="2px solid #ced4da";
    txtCtSize.style.border="2px solid #ced4da";
    txtCtName.style.border="2px solid #ced4da";
    txtCtVolume.style.border="2px solid #ced4da";
    txtCtShape.style.border="2px solid #ced4da";
    txtCtMOQ.style.border="2px solid #ced4da";
    txtCtDuration.style.border="2px solid #ced4da";
    txtCtPackaging.style.border="2px solid #ced4da";
    txtCtDescription.style.border="2px solid #ced4da";
    selectItemCategoryStatus.style.border="2px solid #ced4da";

    itemCategoryStatues = ajaxGetRequest("/categorystatus/findall")
    fillDataIntoSelect(selectItemCategoryStatus,'Select Item Category Status',itemCategoryStatues,'name');


}


const refreshItemTable = ()=>{

    itemCategories = ajaxGetRequest("/item-category/findall");

    console.log(itemCategories)

    const displayProperty=[
        {dataType: 'text', propertyName: 'ctcode'},
        {dataType: 'text', propertyName: 'ctname'},
        {dataType: 'text', propertyName: 'ctsize'},
        {dataType: 'text', propertyName: 'ctshape'},
        {dataType: 'text', propertyName: 'ctdescription'},
        {dataType: 'text', propertyName: 'ctvolumme'},
        {dataType: 'text', propertyName: 'ctmoq'},
        {dataType: 'text', propertyName: 'ctduration'},
        {dataType: 'text', propertyName: 'ctpacking'},
        {dataType: 'function', propertyName: getItemCategoryStatus},
    ];

    fillDataIntoTable(itemCategoryTable,itemCategories,displayProperty,true);
    $("#itemCategoryTable").dataTable();

}

const getItemCategoryStatus = (ob)=>{
    if (ob.categorystatus_id.name=="available"){
        return `<p style="color: green">available</p>`
    }else if (ob.categorystatus_id.name=="not-available"){
        return `<p style="color: orange">not-available</p>`
    }else if (ob.categorystatus_id.name=="delete"){
        return `<p style="color: red">delete</p>`
    }
}


const checkError = ()=>{
    let error='';

    if (itemCategory.ctcode == null){
        error = error+"code cannot be empty \n";
    }

    if (itemCategory.ctname == null){
        error=error+"name cannot be empty \n"
    }

    if (itemCategory.ctsize == null){
        error=error+"size cannot be empty \n"
    }

    if (itemCategory.ctshape == null){
        error=error+"shape cannot be empty \n"
    }

    if (itemCategory.categorystatus_id == null){
        error=error+"Category status cannot be empty \n"
    }


    return error;
}


const submitItemCategory = ()=>{
    let errors = checkError();

    if (errors==""){
        const userConfirm = confirm("are you sure to add following item category \n"
        +"\n category code is "+itemCategory.ctcode
        +"\n category name is "+itemCategory.ctname
        +"\n category size is "+itemCategory.ctsize
        +"\n category shape is "+itemCategory.ctshape
        +"\n category description is "+itemCategory.ctdescription
        +"\n category volume is "+itemCategory.ctvolumme
        +"\n category MOQ is "+itemCategory.ctmoq
        +"\n category duration is "+itemCategory.ctduration
        +"\n category packing is "+itemCategory.ctpacking
        +"\n category status is "+itemCategory.categorystatus_id.name

        )
        let postServerResponse = ajaxPostRequest("/item-category",itemCategory);
        if (postServerResponse=="ok"){
            alert("save successfull");
            refreshItemForm();
            refreshItemTable();
        }else {
            alert("save not complete \n you have following errors \n"+postServerResponse);
        }
    }else {
        alert("you have following errors \n"+errors)
    }

}

const deleteItemCategory = (ob,rowIndex)=>{
    console.log(delete""+ob+""+rowIndex);

    let userconfirm = confirm("are you sure to delete following item category"+
        +"\n category code is "+ob.ctcode
        +"\n category name is "+ob.ctname
        +"\n category size is "+ob.ctsize
        +"\n category shape is "+ob.ctshape
        +"\n category description is "+ob.ctdescription
        +"\n category status is "+ob.categorystatus_id.name
    );
    if (userconfirm){
        let deleteServerResponse = ajaxDeleteRequest("/item-category",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
        }else {
            alert("delete unsuccessful \n");
        }

    }
refreshItemTable();

}




const refillItemCategory = (ob,rowIndex)=>{


    //re enable update buttons on the refill
    buttonUpdate.disabled=false;
    buttonUpdate.style.cursor="default";

    //disable add button on refill.. because user can click add button instead of update button
    buttonSubmitItemCategory.disabled=true;
    buttonSubmitItemCategory.style.cursor="not-allowed";


    itemCategory=JSON.parse(JSON.stringify(ob));
    oldItemCategory=JSON.parse(JSON.stringify(ob));


    txtCtCode.value=itemCategory.ctcode
    txtCtSize.value=itemCategory.ctsize
    txtCtName.value=itemCategory.ctname
    txtCtVolume.value=itemCategory.ctvolumme
    txtCtShape.value=itemCategory.ctshape
    txtCtMOQ.value=itemCategory.ctmoq
    txtCtDuration.value=itemCategory.ctduration
    txtCtPackaging.value=itemCategory.ctpacking
    txtCtDescription.value=itemCategory.ctdescription


    fillDataIntoSelect(selectItemCategoryStatus,'Select Item Category Status',itemCategoryStatues,'name',ob.categorystatus_id.name);


}

const checkUpdates = ()=>{
    let updates = "";


    if (itemCategory.ctcode != oldItemCategory.ctcode){
        updates=updates+"code is updated \n";
    }

    if (itemCategory.ctname != oldItemCategory.ctname){
        updates=updates+"name is updated \n";
    }

    if (itemCategory.ctsize != oldItemCategory.ctsize){
        updates=updates+"size is updated \n";
    }

    if (itemCategory.ctshape != oldItemCategory.ctshape){
        updates=updates+"shape is updated \n";
    }

    if (itemCategory.ctdescription != oldItemCategory.ctdescription){
        updates=updates+"description is updated \n";
    }

    if (itemCategory.ctvolumme != oldItemCategory.ctvolumme){
        updates=updates+"volume is updated \n";
    }

    if (itemCategory.ctmoq != oldItemCategory.ctmoq){
        updates=updates+"MOQ is updated \n";
    }

    if (itemCategory.ctduration != oldItemCategory.ctduration){
        updates=updates+"duration is updated \n";
    }

    if (itemCategory.ctpacking != oldItemCategory.ctpacking){
        updates=updates+"packing is updated \n";
    }

    if (itemCategory.categorystatus_id.name != oldItemCategory.categorystatus_id.name){
        updates=updates+"status is updated \n";
    }


    return updates;
}






const updateItemCategory = ()=>{
    console.log("update");
    let updates = checkUpdates();
    if (updates!=""){
        const userConfirm = confirm("are you sure to update following category \n"+updates);
        if (userConfirm){
            let updateServerResponse=ajaxPutRequest("/item-category",itemCategory);
            if (updateServerResponse=="ok"){
                alert("update successful");
                refreshItemForm();
                divModifyButton.className="d-none";
                refreshItemTable();
            }else {
                alert("error happened"+updateServerResponse);
            }
        }
    }else {
        alert("nothing to update \n");
    }

}








