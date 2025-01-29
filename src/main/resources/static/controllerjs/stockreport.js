window.addEventListener('load',function (){

    refreshStockReportForm()


});


const refreshStockReportForm = ()=>{

    //
    buttonPrint.disabled=true;
    buttonPrint.style.cursor="not-allowed";

    stockReport = new Object();

    selectRawMaterial.style.border="2px solid #ced4da";
    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";


    selectFromDate.value="";
    selectToDate.value="";

    rawMaterials=ajaxGetRequest("rawmaterial/findall")
    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawMaterials,'rmname');


}


const loadReportTable = ()=>{
    selectedItem = JSON.parse(selectRawMaterial.value);
    console.log(selectedItem.id);
    console.log(selectedItem.rmname);

    console.log(selectFromDate.value);
    console.log(selectToDate.value);
    //above are just for testing to check i got the all the values for this.

    cardStockReport.classList.remove('d-none');

    const getReportDataList = ajaxGetRequest(`/stockreport/getstockreportby-fromdate-todate-rawmaterialid/${selectFromDate.value}/${selectToDate.value}/${selectedItem.id}`);
    console.log(getReportDataList);

    const displayProperty = [
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'quantity'},
        {dataType:'text',propertyName:'itemcode'},
        {dataType:'text',propertyName:'gd_description'},
        {dataType:'text',propertyName:'gd_referencenumber'},
        {dataType:'text',propertyName:'rate'},
        ];

    fillDataIntoTable(stockGrnDetailsTable,getReportDataList,displayProperty,false);

    buttonPrint.disabled=false;
    buttonPrint.style.cursor="default";
}

const getRawMaterial = (ob)=>{
    return ob.rawmaterial_id.rmname
}



const printStockReportMc =  async ()=>{

    await getRemainingGrnAndIssueNote()

    await fillDataIntoPrintTable();


    let newWindow = window.open();
    await newWindow.document.write(
        `
        <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Stock Report Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>


</head>
<body>

<div class="container-fluid">

    <div class="row" style="margin-top: 1cm">
    <div class="col-4"></div>
    <div class="col-4 text-center" style="font-size: 14px; font-family: Verdana; font-weight: bold">Stock Report</div>
    <div class="col-4"></div>
    </div>

    <div class="row mt-4">
        <div class="col-2 " style="font-size: 14px; font-family: Verdana">Item Name :</div>
        <div class="col-6" style="font-size: 12px; font-family: Verdana">${selectedItem.rmname}</div>
        <div class="col-4"></div>
    </div>


    <!--    table area start-->
    <div class="row mt-3" style="margin: 2px">
    ${printStockReportTable.outerHTML}
    </div>
    <!--    table area end-->

</div>
</body>
</html>
        `
    );

    newWindow.stop();
    newWindow.print();
    newWindow.close();

}


const fillDataIntoPrintTable = ()=>{

    const getDataListForPrint = ajaxGetRequest(`/stockreport/final-join-table-result/${selectedItem.id}/${selectFromDate.value}/${selectToDate.value}`);




    const displayProperty =[
        // {dataType:'function',propertyName:getRawMaterialNameForPrint},
        {dataType:'function',propertyName:getGrnDateForPrint},
        {dataType:'function',propertyName:getSupplierNameForPrint},
        {dataType:'function',propertyName:getReference},
        {dataType:'function',propertyName:getQuantityForPrint},
        {dataType:'function',propertyName:getIssueNoteForPrint},
        {dataType:'function',propertyName:getStockAdjustmentForPrint},
        {dataType:'function',propertyName:calculateRunningTotal},

    ];

    fillDataIntoTableForStockReportPrint(printStockReportTable,getDataListForPrint,displayProperty,false);


}


const getRawMaterialNameForPrint = (ob)=>{
    return `<p class="text-center" ">${ob[0].rawmaterial_id.rmname}</p>`;
}

const getReference = (ob)=>{
    // return ob[2];
    const referenceArray = ob[2].split(" ");
    if (referenceArray.length>2){
        const firstNamePart = referenceArray.slice(0,2).join(" ")
        const secondNamePart = referenceArray.slice(2).join(" ")

        return `<p>${firstNamePart}</p>`+`<p>${secondNamePart}</p>`

    }else {
        return ob[2];
    }



}

const getGrnDateForPrint = (ob)=>{
    return new Date(ob[0]).toLocaleString('en-GB',{day:"2-digit",month:"short",year:"numeric"});
}

const getSupplierNameForPrint = (ob)=>{
    // return ob[1];

    if(ob[1]==null){
        return " ";
    }

    const supplierNameArray = ob[1].split(" ");
    if (supplierNameArray.length>3 && supplierNameArray.length<7){
        const firstNamePart = supplierNameArray.slice(0,3).join(" ");
        const secondNamePart = supplierNameArray.slice(3).join(" ");

        return `<p>${firstNamePart}</p>`+`<p>${secondNamePart}</p>`
    }else if (supplierNameArray.length>=7){
        const firstNamePart = supplierNameArray.slice(0,3).join(" ");
        const secondNamePart = supplierNameArray.slice(3,6).join(" ");
        const thirdNamePart = supplierNameArray.slice(6).join(" ");

        return `<p>${firstNamePart}</p>`+`<p>${secondNamePart}</p>`+`<p>${thirdNamePart}</p>`
    }


    else {
        return ob[1];
    }


}

const getQuantityForPrint = (ob)=>{
    const splitArray = ob[2].split(" ");
    if (splitArray[0]=="GRN"){
        return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}</p>`
    }else {
        return " ";
    }
}


const getIssueNoteForPrint = (ob) =>{
    const splitArray = ob[2].split(" ");
    if (splitArray[0]=="Issue"){
        return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}</p>`;
    }else {
        return ' ';
    }

}


const getStockAdjustmentForPrint = (ob) =>{
    const splitArray = ob[2].split(" ");
    if (splitArray[0]=="Stock"){
        return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US')}</p>`;
    }else {
        return " "
    }
}


let runningTotal = 0;

const calculateRunningTotal = (ob)=>{
    const splitArray = ob[2].split(" ");
    if (splitArray[0]=="GRN"){  //grn nam running number ekata ekathu karanawa...
        runningTotal+=parseFloat(ob[3]);
        return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
    }else if (splitArray[0]=="Issue") {    //issue note nam running number ekan adu karanwa
        runningTotal-=parseFloat(ob[3]);
        return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;


    }else if (splitArray[0]=="Stock") { //else ekedi venne stock adjustment eke
        //stock adjustment nam ee number eka + da - da kiyala check karanna one
        let numberVal = parseFloat(ob[3]);

        if (numberVal < 0) {
            // negative number
            runningTotal = runningTotal-Math.abs(ob[3]);
            return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
        }
        else if (numberVal > 0) {
            // positive number
            runningTotal+=parseFloat(ob[3]);
            return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
        } else {
            // number is zero
            runningTotal+=parseFloat(ob[3]);
            return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
        }


    }
}



const getRemainingGrnAndIssueNote =  ()=>{
    let rawMaterial = selectedItem.id;

    let selectedDate = selectFromDate.value;


    // this server response is for get remaining from grn and issue note
    let serverResponse =  ajaxGetRequest(`/stockreport/get_remaining_quantity_from_grn_and_issue_note/${rawMaterial}/${selectedDate}`);
    let responseAsANumber = Number(serverResponse);
    console.log(responseAsANumber);
    runningTotal=responseAsANumber;
    return responseAsANumber;

}























































