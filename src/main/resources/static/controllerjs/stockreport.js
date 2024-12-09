window.addEventListener('load',function (){

    refreshStockReportForm()


});


const refreshStockReportForm = ()=>{

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

}

const getRawMaterial = (ob)=>{
    return ob.rawmaterial_id.rmname
}



const printStockReportMc =  async ()=>{
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
    ${stockGrnDetailsTable.outerHTML}
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























