window.addEventListener('load',function (){

    refreshPaymentVoucherHeaderForm()

    refreshPaymentVoucherHeaderTable();


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


    //payment mode eka anuwa meka hide karann one nisa mulinma hide karla damma
    trBankShortName.classList.add('d-none');
    trChequeNumber.classList.add('d-none');

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
    textChequeNumber.value=ob.cheque_number



    fillDataIntoSelect(selectSupplier,"Select Supplier",suppliersList,'suppliername',ob.supplier_id.suppliername);
    fillDataIntoSelect(selectBankShortName,'Select Bank Short Name',bankShortNamesList,'bank_short_name',ob.ownbankaccount_id.bank_short_name);

    handleShortNameAndAccountNumber(selectPaymentMode);
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
    }else {
        //make row visible
        trBankShortName.classList.remove('d-none');
        trChequeNumber.classList.remove('d-none');
    }
}




