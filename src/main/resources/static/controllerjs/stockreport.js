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

    <div class="row" style="margin-top: 2cm">
    <div class="col-4"></div>
    <div class="col-4 text-center" style="font-size: 14px; font-weight: bold">Stock Report</div>
    <div class="col-4"></div>
    </div>

    <div class="row mt-4">
        <div class="col-2" style="font-size: 14px">Item Name :</div>
        <div class="col-6">${selectedItem.rmname}</div>
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
        {dataType:'function',propertyName:calculateRunningTotal},

    ];

    fillDataIntoTableForStockReportPrint(printStockReportTable,getDataListForPrint,displayProperty,false);


}


const getRawMaterialNameForPrint = (ob)=>{
    return `<p class="text-center" ">${ob[0].rawmaterial_id.rmname}</p>`;
}

const getReference = (ob)=>{
        if (ob[2]=="GRN"){
            return "GRN"
        }else {
            return "Issue Note"
        }
}

const getGrnDateForPrint = (ob)=>{
    return ob[0];
}

const getSupplierNameForPrint = (ob)=>{
    return ob[1];
}

const getQuantityForPrint = (ob)=>{
    if (ob[2]=="GRN"){
        return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US')}</p>`
    }else {
        return " ";
    }
}


const getIssueNoteForPrint = (ob) =>{
    if (ob[2]=="GRN"){
        return ' ';
    }else {
        return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US')}</p>`;
    }
}


runningTotal = null;

const calculateRunningTotal = (ob)=>{
    if (ob[2]=="GRN"){
        runningTotal+=parseFloat(ob[3]);
        return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
    }else {
        runningTotal-=parseFloat(ob[3]);
        return `<p class="text-end">${Number(runningTotal).toLocaleString('en-US')}</p>`;
    }
}



const getRemainingGrnAndIssueNote =  ()=>{
    let rawMaterial = selectedItem.id;

    let selectedDate = selectFromDate.value;


    // this server response is for get remaining from grn and issue note
    let serverResponse =  ajaxGetRequest(`/stockreport/get_remaining_quantity_from_grn_and_issue_note/${rawMaterial}/${selectedDate}`);
    let responseAsANumber = Number(serverResponse);
    console.log(responseAsANumber);
    runningTotal=responseAsANumber
    return responseAsANumber;

}























































