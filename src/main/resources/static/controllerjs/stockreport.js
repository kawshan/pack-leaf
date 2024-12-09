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
    <div class="row mt-3">
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

    const getDataListForPrint = ajaxGetRequest(`/stockreport/getjointableresultforstockreport/${selectedItem.id}/${selectFromDate.value}/${selectToDate.value}`);

    const displayProperty =[
        // {dataType:'function',propertyName:getRawMaterialNameForPrint},
        {dataType:'function',propertyName:getGrnDateForPrint},
        {dataType:'function',propertyName:getSupplierNameForPrint},
        {dataType:'function',propertyName:getGrnHeaderForPrint},
        {dataType:'function',propertyName:getQuantityForPrint},
        {dataType:'function',propertyName:getIssueNoteForPrint},
    ];

    fillDataIntoTable(printStockReportTable,getDataListForPrint,displayProperty,false);


}


const getRawMaterialNameForPrint = (ob)=>{
    return `<p class="text-center" ">${ob[0].rawmaterial_id.rmname}</p>`;
}

const getGrnHeaderForPrint = (ob)=>{
    return `<p class="text-center">${ob[0].grnheader}</p>`;
}

const getGrnDateForPrint = (ob)=>{
    return `<p class="text-center">${ob[1].grndate}</p>`;
}

const getSupplierNameForPrint = (ob)=>{
    return `<p class="text-center">${ob[1].supplier_id.suppliername}</p>`;
}

const getQuantityForPrint = (ob)=>{
    return `<p class="text-end">${ob[0].quantity}</p>`
}


const getIssueNoteForPrint = (ob) =>{
    if (ob[0].grnheader==""){
        return '1';
    }else {
        return `<p class="text-center"></p>`;
    }
}






