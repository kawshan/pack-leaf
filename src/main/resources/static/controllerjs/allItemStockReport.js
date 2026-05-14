window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    AllItemStock = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshProductionReportTable = ()=>{

    const allItemStockReportList = ajaxGetRequest(`/AllItemStockReport/${AllItemStock.fromdate}/${AllItemStock.todate}`);

    const displayColumns = [
        {dataType: 'function', propertyName: getItemCategoryName},
        {dataType: 'function', propertyName: getItemShortName},
        {dataType: 'function', propertyName: stockQuantity},
    ];
    fillDataIntoTable2(tableReportPrint,allItemStockReportList,displayColumns,false);
}


let runningItemCategoryName = "";

const getItemCategoryName = (ob) => {
    if (runningItemCategoryName === ob.rmctname) {
        return " "
    } else {
        runningItemCategoryName = ob.rmctname;
        return ob.rmctname;
    }
}


const getItemShortName = (ob) => {
    return ob.rmname;
}



const stockQuantity = (ob) => {
    return `<div class="text-end">${ob.available_stock}</div>`
}


const printProductionReport = async ()=>{

    await refreshProductionReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>All Item Stock Report</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
    #tableStockReportPrint{
    line-height: 5px !important;
    height: 5px !important;
    }
</style>
    
</head>
<body style="font-family: Verdana">


<div style=" top: 1cm">

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
            <p class="text-center" style="font-size: 14px; font-weight: bold;">All Item Stock Report</p>
            <p class="text-center" style="font-size: 11px">${AllItemStock.fromdate} To ${AllItemStock.todate}</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableReportPrint.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },3000)



}

































