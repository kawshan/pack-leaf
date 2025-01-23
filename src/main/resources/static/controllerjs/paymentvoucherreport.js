window.addEventListener('load',function (){


    refreshPaymentVoucherReportForm();

});


const refreshPaymentVoucherReportForm = ()=>{

    paymentVoucherReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";

    buttonPrint.disabled=true;
    buttonPrint.style.cursor="not-allowed";
}

const refreshPaymentVoucherReportTable = ()=>{

    //me if condition eka danna one na .. damme user ta ena errors adu karanna.. empty deela view karoth 500 internal server error eka enawa userta penne na eth inteli j eke error eka penawa
    if (selectFromDate.value!="" && selectToDate.value!=""){
        cardStockReport.classList.remove('d-none');
        const reportDataList = ajaxGetRequest(`/paymentvoucherreport/getpaymentvoucherslist/${paymentVoucherReport.fromdate}/${paymentVoucherReport.todate}`);

        const displayProperty = [
            {dataType:'function',propertyName:getDate},
            {dataType:'function',propertyName:getVoucherNumber},
            {dataType:'function',propertyName:getSupplier},
            {dataType:'function',propertyName:getAmount},
        ];

        fillDataIntoTable(paymentVoucherReportTable,reportDataList,displayProperty,false);
    }else {
        alert("Please Select From Date And To date");
    }

    buttonPrint.disabled=false;
    buttonPrint.style.cursor="default";


    getTotalAmount();
}

const getDate = (ob)=>{
    return ob[0];
}

const getVoucherNumber = (ob)=>{
    return `<p class="text-end">${ob[1]}</p>`;
}

const getSupplier = (ob)=>{
    return ob[2];
}

const getAmount = (ob)=>{

    totalAmount=totalAmount+Number(ob[3]);

    console.log(`total amount is ${totalAmount}`)

    return `<p class="text-end">${Number(ob[3]).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;


}

// payment voucher report print function
const printPaymentVoucherReport = async ()=>{
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Voucher Summary </title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container-fluid">

    <div class="row mt-5 text-center">
        <p style="font-size: 14px; font-weight: bolder; font-family: Verdana">Payment Voucher Summary</p>
    </div>

    <div class="row" style="margin: 3px">
        ${paymentVoucherReportTable.outerHTML}
    </div>



</div>
</body>
</html>
    `)

    newWindow.stop();
    newWindow.print();
    newWindow.close();

}

var totalAmount = 0;


const getTotalAmount =()=>{
    console.log(totalAmount);
    tdTotalAmount.innerText=`${Number(totalAmount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`
}


















































