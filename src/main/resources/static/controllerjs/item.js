window.addEventListener('load',function () {

    refreshItemForm();

    refreshItemTable();

    refreshTableInsidePrint();

});

const refreshItemForm = () =>{

    //disable update button because user can update instead of delete
    buttonUpdate.disabled=true;
    buttonUpdate.style.cursor="not-allowed";       //to show mouse cursor like this 🚫

    //enable add button and set cursor pointer
    buttonItemAdd.disabled=false;
    buttonItemAdd.style.cursor="default";


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
    textCustomerItemName.style.border="2px solid #ced4da";



    txtItemPrice.value="";
    txtItemCode.value="";
    txtItemName.value="";
    txtItemDescription.value="";
    selectItemFoil.value="";
    txtItemColours.value="";
    txtPlateNumber.value="";
    selectItemSpotUV.value="";
    selectItemStatus.value="";
    textCustomerItemName.value="";


    // selectItemCategory
    // fill data into item category
    itemCategories=ajaxGetRequest("/item-category/findall")
    fillDataIntoSelect(selectItemCategory,'Select Item Category',itemCategories,'ctcode');

    // selectLaminate
    // fill data into item laminate
    laminates=ajaxGetRequest("/laminate/findall")
    fillDataIntoSelect(selectLaminate,'Select Item Category',laminates,'name')


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
        {dataType: 'text', propertyName: 'customer_item_name'},
        {dataType: 'function', propertyName: getItemLaminate},
        {dataType: 'function', propertyName: getItemFoil},
        {dataType: 'function', propertyName: getItemSpotUV},
        {dataType: 'function', propertyName: getItemStatus},
    ];

    fillDataIntoTable(itemTable,items,displayProperty,true);
    $("#itemTable").dataTable();

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
    if (ob.spotuv=="true"){
        return "<p class='text-success'>yes</p>"
    }else {
        return "<p class='text-danger'>no</p>"
    }
}


const checkErrors= ()=>{
    let errors = '';

    //item category
    if (item.category_id == null){
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
    if (item.laminate_id == null){
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

    if (item.spotuv == null){
        errors=errors+"Spot UV Cannot Be Empty \n"
    }

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

    buttonItemAdd.disabled=true;
    buttonItemAdd.style.cursor="not-allowed";




    item=JSON.parse(JSON.stringify(ob));
    oldItem=JSON.parse(JSON.stringify(ob));

    txtItemPrice.value=ob.price;
    txtItemCode.value=ob.code;
    txtItemName.value=ob.itmname;
    txtItemDescription.value=ob.description;

    selectItemFoil.value=ob.foil;
    txtItemColours.value=ob.nocolours;
    txtPlateNumber.value=ob.plate;
    selectItemSpotUV.value=ob.spotuv;
    selectItemStatus.value=ob.status;
    textCustomerItemName.value=ob.customer_item_name;

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

    if (item.customer_item_name != oldItem.customer_item_name){
        updates=updates+"Customer Item Name is updated \n"
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


let lastCategory = null; // Variable to track the last displayed category

// Function to get the category and display it only when it changes
const getItemCategoryForNewRequirement = (ob) => {
    const currentCategory = ob.category_id.ctcode;

    // If the current category is the same as the last one, return an empty string
    if (currentCategory === lastCategory) {
        return ''; // Do not display the category again
    }

    // Otherwise, update the lastCategory and return the current one
    lastCategory = currentCategory;
    return currentCategory;
}



//fill data into table which inside the print model
const refreshTableInsidePrint = ()=>{
    let getAllItems = ajaxGetRequest("/item/findall");

    let displayColumns = [
        {dataType: 'function', propertyName: getItemCategoryForNewRequirement},  // Display category
        {dataType: 'text', propertyName: 'code'},
        {dataType: 'text', propertyName: 'itmname'},
        {dataType: 'text', propertyName: 'customer_item_name'},
    ];

    fillDataIntoTableForItemPrint(tablePrintItem,getAllItems,displayColumns,false);

}


//mouse click ekedi meka execute venna thama me function eka liwwe
const printModelButtonMC = ()=>{

    console.log("print works");

    let newWindow = window.open();
    newWindow.document.write(
`    <html>
    <head>
        <title style="color: white">&nbsp;</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="row mt-2">
            <div class="col-sm-4"></div>
            <div class="col-sm-4 text-center">
                <h3>Item List</h3>
            </div>
            <div class="col-sm-4"></div>
        </div>
        ${tablePrintItem.outerHTML}
    </body>
    </html>`
    );

    newWindow.history.replaceState({}, '', ' '); // Using a non-breaking space
    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },1000)

}


