window.addEventListener('load',function (){

    //details section eke refresh function
    refreshPaymentVoucherDetailsForm();


    // header area eke refresh function
    refreshPaymentVoucherHeaderForm();
    refreshPaymentVoucherHeaderTable();

    //max number eka ganna function eka call karanawa
    getMaxVoucherNumber();

})


const refreshPaymentVoucherHeaderForm = ()=>{

    paymentVoucherHeader = new Object();

    selectSupplier.style.border="2px solid #ced4da";
    displayPaymentVoucherCode.style.border="2px solid #ced4da";
    textPaymentVoucherNo.style.border="2px solid #ced4da";
    textPaymentVoucherDate.style.border="2px solid #ced4da";
    textGrnNo.style.border="2px solid #ced4da";
    selectPaymentMode.style.border="2px solid #ced4da";
    selectBankShortName.style.border="2px solid #ced4da";
    textChequeNumber.style.border="2px solid #ced4da";
    textChequeAmount.style.border="2px solid #ced4da";

    suppliersList = ajaxGetRequest("/supplier/findall");
    fillDataIntoSelect(selectSupplier,"Select Supplier",suppliersList,'suppliername')


    bankShortNamesList = ajaxGetRequest("/ownbankaccount/findall");
    fillDataIntoSelect(selectBankShortName,'Select Bank Short Name',bankShortNamesList,'bank_short_name')

    displayPaymentVoucherCode.value="";
    textPaymentVoucherNo.value="";
    textPaymentVoucherDate.value="";
    textGrnNo.value="";
    selectPaymentMode.value="";
    textChequeNumber.value="";
    textChequeAmount.value="";


    //payment mode eka anuwa meka hide karann one nisa mulinma hide karla damma
    trBankShortName.classList.add('d-none');
    trChequeNumber.classList.add('d-none');
    colChequeAmount.classList.add('d-none');


    buttonPaymentDetailsAdd.disabled=true;
    buttonPaymentDetailsAdd.style.cursor="not-allowed";

    buttonPaymentDetailsUpdate.disabled=true;
    buttonPaymentDetailsUpdate.style.cursor="not-allowed";

}


const changeColoursToDefault = ()=>{
    selectSupplier.style.border="2px solid #ced4da";
    displayPaymentVoucherCode.style.border="2px solid #ced4da";
    textPaymentVoucherNo.style.border="2px solid #ced4da";
    textPaymentVoucherDate.style.border="2px solid #ced4da";
    textGrnNo.style.border="2px solid #ced4da";
    selectPaymentMode.style.border="2px solid #ced4da";
    selectBankShortName.style.border="2px solid #ced4da";
    textChequeNumber.style.border="2px solid #ced4da";
    textChequeAmount.style.border="2px solid #ced4da";
}


const refreshPaymentVoucherHeaderTable = ()=>{

    paymentVoucherHeaderList = ajaxGetRequest("/paymentvoucherheader/findall")

    const displayProperty = [
        {dataType:'function',propertyName:getSupplierName},
        {dataType: 'text',propertyName:'payment_voucher_header_key'},
        {dataType: 'text',propertyName:'payment_voucher_number'},
        {dataType: 'text',propertyName:'payment_voucher_date'},
        {dataType: 'text',propertyName:'payment_grn_numbers'},
    ];

    fillDataIntoTable(paymentVoucherHeaderTable,paymentVoucherHeaderList,displayProperty,true);
    $("#paymentVoucherHeaderTable").dataTable();


}


const getSupplierName = (ob)=>{
    return ob.supplier_id.suppliername;
}


const checkErrorsPaymentVoucherHeader = ()=>{
    let errors='';

    if (paymentVoucherHeader.supplier_id == null){
        errors=errors+"Supplier Cannot Be Empty \n"
    }
    if (paymentVoucherHeader.payment_mode == null){
        errors=errors+"Payment Mode Cannot Be Empty \n"
        selectPaymentMode.style.border="2px solid red";
    }
    if (paymentVoucherHeader.payment_voucher_number==null){
        errors=errors+"Payment Voucher Number Cannot Be Empty \n"
    }
    if (paymentVoucherHeader.payment_voucher_date == null){
        errors=errors+"Payment Voucher Date Cannot Be Empty \n"
    }

    if (paymentVoucherHeader.payment_grn_numbers == null){
        errors=errors+"Grn Numbers Cannot Be Empty \n"
    }
    if (selectPaymentMode.value=="cheque"){     //payment mode eka cheque nam bank account eke short name eka empty venna bari nisa
        if (paymentVoucherHeader.ownbankaccount_id==null){
            errors=errors+"Bank Short Name Cannot Be Empty \n"
        }
    }
    if (selectPaymentMode.value=="cheque"){ //payment mode eka cheque nam cheque number eka empty venna bari nisa
        if (paymentVoucherHeader.cheque_number==null){
            errors=errors+"Cheque Number Cannot Be Empty \n"
        }
    }

    return errors;
}


const savePaymentVoucherHeader = async ()=>{
    if (displayPaymentVoucherCode.value==""){
        console.log("save part");
        const errors = checkErrorsPaymentVoucherHeader();
        if (errors==""){
            const userConfirm=confirm(`Are You Sure To Add Following Payment Voucher Header \n
            Supplier name Is ${paymentVoucherHeader.supplier_id.suppliername}
            Payment Mode Is ${paymentVoucherHeader.payment_mode}
            Payment Voucher Number ${paymentVoucherHeader.payment_voucher_number}
            Payment Voucher Date ${paymentVoucherHeader.payment_voucher_date}
            Grn Number Is ${paymentVoucherHeader.payment_grn_numbers}
            `);
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/paymentvoucherheader",paymentVoucherHeader);
                if (postServerResponse&&postServerResponse.payment_voucher_header_key){
                    console.log(postServerResponse)
                    displayPaymentVoucherCode.value=postServerResponse.payment_voucher_header_key;
                    alert("save Successful");
                    refreshPaymentVoucherHeaderTable();
                    changeColoursToDefault();
                    refreshPaymentVoucherDetailsForm();
                }
            }
        }else {
            alert(`You Have Some Errors \n ${errors}`);
        }


    }else {
        console.log("update part");
        //get id from header key -> that because we need to give id into to update
        const getIdFromServer =await ajaxGetRequest("/paymentvoucherheader/getidfromheaderKey/"+displayPaymentVoucherCode.value);
        paymentVoucherHeader.id=getIdFromServer;
        paymentVoucherHeader.payment_voucher_header_key = displayPaymentVoucherCode.value

        const userConfirm = confirm(`Are You Sure To Update Following Changes
            Id Is ${paymentVoucherHeader.id}
            Key Is ${paymentVoucherHeader.payment_voucher_header_key}
            Supplier name Is ${paymentVoucherHeader.supplier_id.suppliername}
            Payment Mode Is ${paymentVoucherHeader.payment_mode}
            Payment Voucher Number ${paymentVoucherHeader.payment_voucher_number}
            Payment Voucher Date ${paymentVoucherHeader.payment_voucher_date}
            Grn Number Is ${paymentVoucherHeader.payment_grn_numbers}
        `);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/paymentvoucherheader",paymentVoucherHeader);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                changeColoursToDefault();
                refreshPaymentVoucherHeaderTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert("update Unsuccessful");
            }
        }
    }
}


const refillPaymentVoucherHeader = (ob)=>{

    paymentVoucherHeader=JSON.parse(JSON.stringify(ob));
    oldPaymentVoucherHeader=JSON.parse(JSON.stringify(ob));



    displayPaymentVoucherCode.value=ob.payment_voucher_header_key
    textPaymentVoucherNo.value=ob.payment_voucher_number
    textPaymentVoucherDate.value=ob.payment_voucher_date
    textGrnNo.value=ob.payment_grn_numbers
    selectPaymentMode.value=ob.payment_mode




    fillDataIntoSelect(selectSupplier,"Select Supplier",suppliersList,'suppliername',ob.supplier_id.suppliername);

    if (selectPaymentMode.value=="cheque"){
        fillDataIntoSelect(selectBankShortName,'Select Bank Short Name',bankShortNamesList,'bank_short_name',ob.ownbankaccount_id.bank_short_name);
        textChequeNumber.value=ob.cheque_number;
        textChequeAmount.value=ob.cheque_amount;
    }


    handleShortNameAndAccountNumber(selectPaymentMode);



    refreshPaymentVoucherDetailsTable();

    //details form eke button eke enable karanawa
    buttonPaymentDetailsAdd.disabled=false;
    buttonPaymentDetailsAdd.style.cursor="default";


    getChequeAmount(textChequeNumber);

    //details table eke ee payment voucher ekata adala mulu amount eka ganna function eka
    generateTotalAmountPaymentVoucherDetails();
}



const deletePaymentVoucherHeader = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Payment Voucher 
            Supplier name Is ${ob.supplier_id.suppliername}
            Payment Mode Is ${ob.payment_mode}
            Payment Voucher Number ${ob.payment_voucher_number}
            Payment Voucher Date ${ob.payment_voucher_date}
            Grn Number Is ${ob.payment_grn_numbers}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/paymentvoucherheader",ob);
        if (deleteServerResponse=="ok"){
            alert("delete Successful");
            refreshPaymentVoucherHeaderTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
            refreshPaymentVoucherHeaderTable();
        }
    }
}


const handleShortNameAndAccountNumber = (fieldId) =>{
    if (fieldId.value=="cash"){
        //make row hidden
        trBankShortName.classList.add('d-none');
        trChequeNumber.classList.add('d-none');
        colChequeAmount.classList.add('d-none');
    }else {
        //make row visible
        trBankShortName.classList.remove('d-none');
        trChequeNumber.classList.remove('d-none');
        colChequeAmount.classList.remove('d-none');
    }
}



//reset button eke click karama venna one function eka
const handleResetButtonClick = ()=>{

    //details section eka refresh karanawa
    refreshPaymentVoucherDetailsForm();


    //header eka refresh karanawa
    refreshPaymentVoucherHeaderForm();
    refreshPaymentVoucherHeaderTable(); //meka nikamata call kare


    divPaymentVoucherDetailsTableArea.classList.add('d-none');


    //div modify button dekama hide karanawa
    divModifyButton.classList.add('d-none');
    divModifyButton2.classList.add('d-none');


    //testing need to verify that we need this or not
    getMaxVoucherNumber();


    //details table eke full amount eka pennana paragraph text eka empty kara
    paragraphTotalAmount.innerText ="";

}


const getMaxVoucherNumber = ()=>{
    const getServerResponse = ajaxGetRequest("/paymentvoucherheader/getmaxvouchernumber");
    console.log(`max voucher number is ${getServerResponse}`);

    textPaymentVoucherNo.value=Number(getServerResponse);
    paymentVoucherHeader.payment_voucher_number = textPaymentVoucherNo.value


}


const getChequeAmount = async (fieldId)=>{
    const regExpression = new RegExp('^[0-9]{6}$');
    if (regExpression.test(fieldId.value)){
        console.log("good value");
        const getServerResponse = await ajaxGetRequest("/paymentvoucherheader/getamountfromchequenumber/"+fieldId.value);
        if (Number(getServerResponse)!=0){
            var result =  Number(getServerResponse).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
            textChequeAmount.value=result;
            textChequeAmount.style.border='2px solid green';
            paymentVoucherHeader.cheque_amount = Number(getServerResponse);
        }else {
            textChequeAmount.value="";
            textChequeAmount.placeholder="cheque is not exists !"
            textChequeAmount.style.border="2px solid red";
            paymentVoucherHeader.cheque_amount = null;
        }


    }else {
        console.log("bad value")
    }
}

const printPaymentVoucherHeader = async (ob)=>{
    const newWindow = window.open();
    await loadDataIntoPaymentVoucherDetailsTable(ob.payment_voucher_header_key);
    await getTotalAmountForTableRow(ob.payment_voucher_header_key);
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>payment voucher print</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>


</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row">
        <div class="col-4">
            <p style="font-weight: bold; font-size: 14px">Payment Voucher</p>
            <label style="font-size: 14px; font-weight: bold">Supplier :</label>
            <u style="font-size: 12px;">${ob.supplier_id.suppliername}</u>
        </div>

        <div class="col-4"></div>


        <div class="col-4">
            <table class="table table-bordered" style="border: 1px solid black">
                <tr>
                    <td style="font-size: 12px; width: 50%" class="text-end">P.Voucher NO :</td>
                    <td style="font-size: 12px; width: 50%" class="text-end">${ob.payment_voucher_number}</td>
                </tr>

                <tr>
                    <td style="font-size: 12px; width: 50%" class="text-end">Date :</td>
                    <td style="font-size: 12px; width: 50%" class="text-end">${new Date(ob.payment_voucher_date).toLocaleString('en-GB', { day: "2-digit", month: "short", year: "2-digit" })}</td>
                </tr>

            </table>
        </div>

    </div>

    <!--    details table area    -->
    <div class="row" style="margin-left: 3px; margin-right: 1px">
        ${tablePaymentVoucherPrint.outerHTML}
    </div>
    <!--   details table area start -->



</div>

<div style="position: absolute; bottom: 1%; width: 100%">
    <div class="row">
        <div class="col-4">
            <label style="font-size: 12px;">GRN No (S) </label>
            <u style="font-size: 12px;">${ob.payment_grn_numbers}</u>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-4">
            <label style="font-size: 12px;">Payment Mode :</label>
            <span style="font-size: 12px;">${ob.payment_mode=="cash"?"Cash":ob.ownbankaccount_id.bank_short_name}</span> &nbsp; &nbsp;
            <span style="font-size: 12px;">${ob.payment_mode=="cash"?" " : ob.cheque_number}</span>
        </div>
    </div>



    <div class="row">
        <div class="col-3">
            <p style="margin-bottom: 1px" class="text-center">____________________</p>
            <p style="font-size: 11px" class="text-center">Prepared By</p>
        </div>
        <div class="col-3">
            <p style="margin-bottom: 1px" class="text-center">____________________</p>
            <p style="font-size: 11px" class="text-center">Checked By</p>
        </div>
        <div class="col-3">
            <p style="margin-bottom: 1px" class="text-center">____________________</p>
            <p style="font-size: 11px" class="text-center">Authorized By</p>
        </div>
        <div class="col-3">
            <p style="margin-bottom: 1px" class="text-center">____________________</p>
            <p style="font-size: 11px" class="text-center">Received By</p>
        </div>
    </div>



</div>



</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();

    divModifyButton.classList.add('d-none');


}




//payment voucher details area start



const refreshPaymentVoucherDetailsForm = ()=>{

    paymentVoucherDetail = new Object();

    textCode.style.border="2px solid #ced4da";
    txtDescription.style.border="2px solid #ced4da";
    txtQty.style.border="2px solid #ced4da";
    txtRate.style.border="2px solid #ced4da";
    txtAmount.style.border="2px solid #ced4da";


    textCode.value="";
    txtDescription.value="";
    txtQty.value="";
    txtRate.value="";
    txtAmount.value="";

    buttonPaymentDetailsAdd.disabled=false;
    buttonPaymentDetailsAdd.style.cursor="default";

    buttonPaymentDetailsUpdate.disabled=true;
    buttonPaymentDetailsUpdate.style.cursor="not-allowed";



}



const refreshPaymentVoucherDetailsTable = ()=>{

    divPaymentVoucherDetailsTableArea.classList.remove('d-none');
    paymentDetailsVouchersList = ajaxGetRequest("/paymentvoucherdetails/getpaymentvoucherdetailsbyheaderkey/"+displayPaymentVoucherCode.value)

    const displayProperty = [
        {dataType:'text',propertyName:'code'},
        {dataType:'text',propertyName:'description'},
        {dataType:'function',propertyName:getQuantity},
        {dataType:'function',propertyName:getRate},
        {dataType:'function',propertyName:getAmount},
    ];

    fillDataIntoTable2(tablePaymentVoucherDetails,paymentDetailsVouchersList,displayProperty,true,divModifyButton2);
    $("#tablePaymentVoucherDetails").dataTable();
}



const getQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.quantity).toLocaleString('en-US')}</p>`;
}


const getRate = (ob)=>{
    return `<p class="text-end">${Number(ob.rate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getAmount = (ob)=>{
    return `<p class="text-end">${Number(ob.amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}




const checkErrorsPaymentVoucherDetails = ()=>{
    let errors = "";

    if (paymentVoucherDetail.quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }
    if (paymentVoucherDetail.rate == null){
        errors=errors+"Rate Cannot Be Empty \n"
    }
    if (paymentVoucherDetail.amount == null){
        errors=errors+"Amount Cannot Be Empty \n"
    }
    return errors;
}


const submitPaymentVoucherDetail = ()=>{
    const errors = checkErrorsPaymentVoucherDetails();
    paymentVoucherDetail.pv_header_key=displayPaymentVoucherCode.value;

    if (errors==''){
        const userConfirm =confirm(`Are You Sure To Add Following Payment Voucher Details
        Header Is ${paymentVoucherDetail.pv_header_key}
        Quantity Is ${paymentVoucherDetail.quantity}
        Rate Is ${paymentVoucherDetail.rate}
        Amount Is ${paymentVoucherDetail.amount}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/paymentvoucherdetails",paymentVoucherDetail);
            if (postServerResponse=="ok"){
                alert("save Successful");
                refreshPaymentVoucherDetailsForm();
                refreshPaymentVoucherDetailsTable();
                generateTotalAmountPaymentVoucherDetails();
            }else {
                alert(`Save Unsuccessful \n ${postServerResponse}`);
                refreshPaymentVoucherDetailsForm();
                refreshPaymentVoucherDetailsTable();
            }
        }
    }else {
        alert(`You Have Some Errors \n ${errors}`)
    }
}


const refillPaymentVoucherDetails  = (ob)=>{

    paymentVoucherDetail=JSON.parse(JSON.stringify(ob));
    oldPaymentVoucherDetail=JSON.parse(JSON.stringify(ob));

    textCode.value=ob.code
    txtDescription.value=ob.description
    txtQty.value=ob.quantity
    txtRate.value=ob.rate
    txtAmount.value=ob.amount


    buttonPaymentDetailsAdd.disabled=true;
    buttonPaymentDetailsAdd.style.cursor="not-allowed";

    buttonPaymentDetailsUpdate.disabled=false;
    buttonPaymentDetailsUpdate.style.cursor="default";


}


const checkUpdatePaymentVoucherDetails = ()=>{
    let updates = '';

    if (paymentVoucherDetail.code != oldPaymentVoucherDetail.code){
        updates=updates+"Code Is Updated \n"
    }
    if (paymentVoucherDetail.description !=  oldPaymentVoucherDetail.description){
        updates=updates+"description is Updated \n"
    }
    if (paymentVoucherDetail.quantity != oldPaymentVoucherDetail.quantity){
        updates=updates+"Quantity Is Updated \n"
    }
    if (paymentVoucherDetail.rate != oldPaymentVoucherDetail.rate){
        updates=updates+"Rate Is Updated \n"
    }
    if (paymentVoucherDetail.amount != oldPaymentVoucherDetail.amount){
        updates=updates+"Amount Is Updated \n"
    }
    return updates
}



const updatePaymentVoucherDetails = ()=>{
    const updates = checkUpdatePaymentVoucherDetails();
    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/paymentvoucherdetails",paymentVoucherDetail)
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshPaymentVoucherDetailsTable();
                refreshPaymentVoucherDetailsForm();
                generateTotalAmountPaymentVoucherDetails();
                divModifyButton2.classList.add('d-none');
            }else {
                alert(`Update Unsuccessful \n ${putServerResponse}`);
                refreshPaymentVoucherDetailsTable();
                refreshPaymentVoucherDetailsForm();
            }
        }
    }else {
        alert("nothing to update");
    }
}


const deletePurchaseOrderDetails = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Payment Voucher Details \n 
        Header Is ${ob.pv_header_key}
        Quantity Is ${ob.quantity}
        Rate Is ${ob.rate}
        Amount Is ${ob.amount}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/paymentvoucherdetails",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            refreshPaymentVoucherDetailsTable();
            refreshPaymentVoucherDetailsForm();
            generateTotalAmountPaymentVoucherDetails();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`delete Unsuccessful \n ${deleteServerResponse}`);
            refreshPaymentVoucherDetailsTable();
            refreshPaymentVoucherDetailsForm();
        }

    }
}


const calculateAmount = (fieldId)=>{
    const quantity = Number(txtQty.value);
    const rate = Number(fieldId.value);

    var result = quantity*rate;

    txtAmount.value=result;
    paymentVoucherDetail.amount = txtAmount.value;

}


const generateTotalAmountPaymentVoucherDetails = ()=>{
    const getServerResponse = ajaxGetRequest("/paymentvoucherdetails/gettotalvaluefromheaderkey/"+displayPaymentVoucherCode.value);

    paragraphTotalAmount.innerText = `Total Amount Is ${Number(getServerResponse).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}`


}



const loadDataIntoPaymentVoucherDetailsTable = (headerKey)=>{

    const paymentDetailsVouchersList = ajaxGetRequest("/paymentvoucherdetails/getpaymentvoucherdetailsbyheaderkey/"+headerKey);

    const displayProperty = [
        {dataType:'text',propertyName:'code'},
        {dataType:'text',propertyName:'description'},
        {dataType:'function',propertyName:getQuantity},
        {dataType:'function',propertyName:getRate},
        {dataType:'function',propertyName:getAmount},
    ];

    fillDataIntoTable(tablePaymentVoucherPrint,paymentDetailsVouchersList,displayProperty,false);


}


//meka apita one venne payment voucher eke print eka gannakota ekata details table eke total eka anthima row ekata ganna one nisa
const getTotalAmountForTableRow = (headerKey)=>{
    const getServerResponse = ajaxGetRequest("/paymentvoucherdetails/gettotalvaluefromheaderkey/"+headerKey);

    tdGetTotalAmountForPrint.innerText = `${Number(getServerResponse).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}`


}



















