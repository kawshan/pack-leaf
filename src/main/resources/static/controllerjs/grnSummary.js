window.addEventListener('load',function (){

    refreshGrnVoucherSummaryForm();

});


const refreshGrnVoucherSummaryForm = ()=>{

    grnVoucherSummary = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";


    selectFromDate.value="";
    selectToDate.value="";

    buttonPrint.disabled=true;
    buttonPrint.style.cursor="not-allowed";

}


const refreshGrnVoucherTable= ()=>{

    const grnVoucherSummariesList = ajaxGetRequest(`/grnvouchersummary/getsummaryreport/${grnVoucherSummary.fromdate}/${grnVoucherSummary.todate}`);

    const displayProperty = [
        {dataType:'function',propertyName:getDate},
        {dataType:'function',propertyName:getGrnNumber},
        {dataType:'function',propertyName:getSupplier},
        {dataType:'function',propertyName:getTotalQuantity},
    ]

    fillDataIntoTable(GRNReportTable,grnVoucherSummariesList,displayProperty,false);

    cardGrnReport.classList.remove('d-none');

    buttonPrint.disabled=false;
    buttonPrint.style.cursor="default";

}


const getDate = (ob)=>{
    return  `<p>${new Date(ob[0]).toLocaleString('en-GB',{day:"2-digit",month:"short",year:"numeric"})}</p>`;
}
const getGrnNumber = (ob)=>{
    return  `<p class="text-end">${ob[1]}</p>`;
}
const getSupplier = (ob)=>{
    return  `<p>${ob[2]}</p>`;
}
const getTotalQuantity = (ob)=>{
    return  `<p class="text-end">${Number(ob[3]).toLocaleString('en-US')}</p>`;
}




const grnSummeryPrint = async ()=>{

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-GB');

    const newWindow = window.open()
    await newWindow.document.write(`
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Grn Summary Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row mt-5 text-center">
        <p style="font-size: 14px; font-weight: bolder; font-family: Verdana">GRN Summary</p>
    </div>
   

    <div class="row" style="margin: 3px">
        ${GRNReportTable.outerHTML}
    </div>

</div>

<footer style="position: absolute; bottom: 1%; width: 100%">
    <p class="text-end" style="font-size: 11px; font-weight: bold">${formattedDate}</p>
</footer>

</body>
</html>
    
    `)

    newWindow.stop();
    newWindow.print();
    newWindow.close();


}




































