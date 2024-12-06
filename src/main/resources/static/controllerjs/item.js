window.addEventListener('load',function () {

    refreshItemForm();

    refreshItemTable();



});

const refreshItemForm = () =>{

    item = new Object();

    selectItemCategory.style.border="2px solid #ced4da";
    txtItemPrice.style.border="2px solid #ced4da";
    txtItemCode.style.border="2px solid #ced4da";
    txtItemName.style.border="2px solid #ced4da";
    txtItemDescription.style.border="2px solid #ced4da";
    selectLaminate.style.border="2px solid #ced4da";
    selectItemFoil.style.border="2px solid #ced4da";
    txtItemColours.style.border="2px solid #ced4da";
    txtPlateNumber.style.border="2px solid #ced4da";
    selectItemSpotUV.style.border="2px solid #ced4da";
    selectItemStatus.style.border="2px solid #ced4da";



    txtItemPrice.value="";
    txtItemCode.value="";
    txtItemName.value="";
    txtItemDescription.value="";
    selectItemFoil.value="";
    txtItemColours.value="";
    txtPlateNumber.value="";
    selectItemSpotUV.value="";
    selectItemStatus.value="";


    // selectItemCategory
    // fill data into item category
    itemCategories=ajaxGetRequest("/item-category/findall")
    fillDataIntoSelect(selectItemCategory,'Select Item Category',itemCategories,'ctcode');

    // selectLaminate
    // fill data into item laminate
    laminates=ajaxGetRequest("/laminate/findall")
    fillDataIntoSelect(selectLaminate,'Select Item Category',laminates,'name')


    //disable update button because user can update instead of delete
    buttonUpdate.disabled=true;
    buttonUpdate.style.cursor="not-allowed";       //to show mouse cursor like this 🚫

}


const refreshItemTable = ()=>{

    items=ajaxGetRequest("/item/findall");
    console.log(items);


    const displayProperty = [
        {dataType: 'function', propertyName: getItemCategory},
        {dataType: 'text', propertyName: 'imkey'},
        {dataType: 'text', propertyName: 'price'},
        {dataType: 'text', propertyName: 'code'},
        {dataType: 'text', propertyName: 'itmname'},
        {dataType: 'text', propertyName: 'description'},
        {dataType: 'text', propertyName: 'nocolours'},
        {dataType: 'function', propertyName: getItemLaminate},
        {dataType: 'function', propertyName: getItemFoil},
        {dataType: 'function', propertyName: getItemSpotUV},
        {dataType: 'function', propertyName: getItemStatus},
    ];

    fillDataIntoTable(itemTable,items,displayProperty,true);

}

const getItemCategory = (ob)=>{
    return ob.category_id.ctcode;
}


const getItemLaminate = (ob)=>{
    return ob.laminate_id.name;
}

const getItemStatus = (ob)=>{
    if (ob.status){
        return "<p class='text-success'>active</p>"
    }else {
        return "<p class='text-danger'>in-active</p>"
    }
}


const getItemFoil = (ob)=>{
    if (ob.foil){
        return "<p class='text-success'>yes</p>"
    }else {
        return "<p class='text-danger'>no</p>"
    }
}

const getItemSpotUV = (ob)=>{
    if (ob.spotuv){
        return "<p class='text-success'>yes</p>"
    }else {
        return "<p class='text-danger'>no</p>"
    }
}


const checkErrors= ()=>{
    let errors = '';

    //item category
    if (item.category_id.ctcode == null){
        errors=errors+"category cannot Be Empty \n"
    }

    // if (item.price == null){
    //     errors=errors+"Price Cannot Be Empty \n"
    // }


    if (item.code == null){
        errors=errors+"Code Cannot Be Empty \n"
    }

    if (item.itmname == null){
        errors=errors+"Name Cannot Be Empty \n"
    }

    // if (item.description == null){
    //     errors=errors+"Description Cannot Be Empty \n"
    // }

    //laminate
    if (item.laminate_id.name == null){
        errors=errors+"Laminate Cannot Be Empty \n"
    }

    // if (item.foil == null){
    //     errors=errors+"Foil Cannot Be Empty \n"
    // }

    // if (item.nocolours == null){
    //     errors=errors+"Colours Cannot Be Empty \n"
    // }

    // if (item.plate == null){
    //     errors=errors+"Plate Cannot Be Empty \n"
    // }

    // if (item.spotuv == null){
    //     errors=errors+"Spot UV Cannot Be Empty \n"
    // }

    if (item.status == null){
        errors=errors+"Status Cannot Be Empty \n"
    }


    return errors
}

const itemSubmit = ()=>{
    let errors = checkErrors();
    if (errors==""){
        const userConfirm = confirm("are you sure to add following item"
        +"\n Item category is "+item.category_id.ctcode
        +"\n Item Code is "+item.code
        +"\n Item Name is "+item.itmname
        +"\n Item Status is "+item.status
        )
        if (userConfirm){
            let postServerResponse=ajaxPostRequest("/item",item);
            if (postServerResponse=="ok"){
                alert("save completed");
                refreshItemForm()
                refreshItemTable();
            }else{
                alert("save not complete"+postServerResponse);
            }
        }
    }else {
        alert(errors);
    }
}

const refillItem = (ob,rowIndex)=>{


    buttonUpdate.disabled=false;
    buttonUpdate.style.cursor="default";


    item=JSON.parse(JSON.stringify(ob));
    oldItem=JSON.parse(JSON.stringify(ob));

    txtItemPrice.value=ob.price
    txtItemCode.value=ob.code
    txtItemName.value=ob.itmname
    txtItemDescription.value=ob.description

    selectItemFoil.value=ob.foil;
    txtItemColours.value=ob.nocolours;
    txtPlateNumber.value=ob.plate;
    selectItemSpotUV.value=ob.spotuv;
    selectItemStatus.value=ob.status;

    // fill data into dynamic select boxes
    fillDataIntoSelect(selectItemCategory,'Select Item Category',itemCategories,'ctcode',ob.category_id.ctcode);
    fillDataIntoSelect(selectLaminate,'Select Item Category',laminates,'name',ob.laminate_id.name)

}


const checkUpdate = ()=>{
    let updates = "";

    if (item.category_id.ctcode != oldItem.category_id.ctcode){
        updates=updates+"Category is updated \n"
    }

    if (item.price != oldItem.price){
        updates=updates+"Price is updated \n"
    }

    if (item.code != oldItem.code){
        updates=updates+"Code is updated \n"
    }

    if (item.itmname != oldItem.itmname){
        updates=updates+"Name is updated \n"
    }

    if (item.description != oldItem.description){
        updates=updates+"Description is updated \n"
    }

    if (item.laminate_id.name != oldItem.laminate_id.name){
        updates=updates+"Laminate is updated \n"
    }

    if (item.foil != oldItem.foil){
        updates=updates+"Foil is updated \n"
    }

    if (item.nocolours != oldItem.nocolours){
        updates=updates+"Colours is updated \n"
    }

    if (item.plate != oldItem.plate){
        updates=updates+"Plate is updated \n"
    }

    if (item.spotuv != oldItem.spotuv){
        updates=updates+"Spot UV is updated \n"
    }

    if (item.status != oldItem.status){
        updates=updates+"Status is updated \n"
    }

    return updates;
}


const updateItem = ()=>{
    let updates = checkUpdate();
    if (updates!=""){
        const userConfirm = confirm("are you sure to update changes\n"+updates);
        if (userConfirm){
            let putServerResponse= ajaxPutRequest("/item",item);
            if (putServerResponse=="ok"){
                alert("update successful");
                divModifyButton.className="d-none";
                refreshItemForm();
                refreshItemTable();
            }else {
                alert("error happened \n"+putServerResponse)
            }
        }
    }else {
        alert("nothing to update")
    }

}


const deleteItem = (ob,rowIndex)=>{
    console.log("delete"+" "+ob+""+rowIndex);

    const userConfirm = confirm("are you sure to delete following item \n"
        +"\n Item category is"+ob.category_id.ctcode
        +"\n Item Name is"+ob.itmname
        +"\n Item Status is"+ob.status
    )
    if (userConfirm){
        let deleteServerResponse = ajaxDeleteRequest("/item",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            divModifyButton.className="d-none";
            refreshItemForm();
            refreshItemTable();
        }else {
            alert("delete unsuccessful \n"+deleteServerResponse);

        }
    }

}















