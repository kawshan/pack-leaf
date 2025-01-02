window.addEventListener('load',()=>{

    refreshStockAdjustmentHeaderForm();
    refreshStockAdjustmentHeaderTable();

});

//stock adjustment header section start

const refreshStockAdjustmentHeaderForm = ()=>{


    stockAdjustmentHeader = new Object();

    selectCompanyName.style.border="2px solid #ced4da";
    displayAdjustmentKey.style.border="2px solid #ced4da";
    textAdjustmentNo.style.border="2px solid #ced4da";
    textAdjustmentDate.style.border="2px solid #ced4da";


    displayAdjustmentKey.value="";
    textAdjustmentNo.value="";
    textAdjustmentDate.value="";

    companiesList = ajaxGetRequest("/company/findall");
    fillDataIntoSelect(selectCompanyName,'select company',companiesList,'companyname')


}

const setColoursToDefaultInStockAdjustmentHeader = ()=>{
    selectCompanyName.style.border="2px solid #ced4da";
    displayAdjustmentKey.style.border="2px solid #ced4da";
    textAdjustmentNo.style.border="2px solid #ced4da";
    textAdjustmentDate.style.border="2px solid #ced4da";
}


const refreshStockAdjustmentHeaderTable = ()=>{

    stockAdjustmentList = ajaxGetRequest("/stockadjustmentheader/findall")

    displayProperty = [
        {dataType:'function',propertyName:getCompanyName},
        {dataType:'text',propertyName:'adjustment_no'},
        {dataType:'text',propertyName:'adjustment_key'},
        {dataType:'text',propertyName:'adjustment_date'},
    ];

    fillDataIntoTable(StockAdjustmentHeaderTable,stockAdjustmentList,displayProperty,true); //need to complete this




}

const getCompanyName = (ob) => {
    return ob.company_id.companyname
}


const checkErrorsStockAdjustmentHeader = ()=>{
    let errors = '';

    if (stockAdjustmentHeader.company_id == null){
        errors=errors+"Company Name Cannot Be Empty \n"
    }
    if(stockAdjustmentHeader.adjustment_no==null){
        errors=errors+"Adjustment Number Cannot Be Empty \n"
    }
    if (stockAdjustmentHeader.adjustment_date == null){
        errors=errors="Adjustment Date Cannot Be Empty \n"
    }
    return errors;
}


const submitStockAdjustmentHeader = async ()=>{

    if (displayAdjustmentKey.value==""){
        console.log("save part");

        let errors = checkErrorsStockAdjustmentHeader();
        if (errors==""){
            //implement save logic
            const userConfirm = confirm(`Are You Sure To Add Following Stock Adjustment Header
            Company Name Is ${stockAdjustmentHeader.company_id.companyname}
            Adjustment Number Is ${stockAdjustmentHeader.adjustment_no}
            Adjustment Date Is ${stockAdjustmentHeader.adjustment_date}
            `);

            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/stockadjustmentheader",stockAdjustmentHeader);
                if (postServerResponse && postServerResponse.adjustment_key){
                    alert("save successful");
                    displayAdjustmentKey.value = postServerResponse.adjustment_key;
                    refreshStockAdjustmentHeaderTable();
                    setColoursToDefaultInStockAdjustmentHeader();
                }else {
                    alert("save unsuccessful")
                }
            }


        }else {
            alert(`You Have following errors ${errors}`)
        }




    }else {
        console.log("update part")
        //get id from header key
        const getIdFromHeaderKey = await ajaxGetRequest(`/stockadjustmentheader/getidfromheaderkey/${displayAdjustmentKey.value}`);
        //bind into the object
        stockAdjustmentHeader.id = getIdFromHeaderKey;
        stockAdjustmentHeader.adjustment_key = displayAdjustmentKey.value;

        const userConfirm = confirm(`Are You Sure To Update Following Changes \n
            Id Is ${stockAdjustmentHeader.id}
            Code Is ${stockAdjustmentHeader.adjustment_key}
            Company Name Is ${stockAdjustmentHeader.company_id.companyname}
            Adjustment Number Is ${stockAdjustmentHeader.adjustment_no}
            Adjustment Date Is ${stockAdjustmentHeader.adjustment_date}
        `);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/stockadjustmentheader",stockAdjustmentHeader);
            if (putServerResponse){
                alert("update Successful");
                setColoursToDefaultInStockAdjustmentHeader();
                refreshStockAdjustmentHeaderTable();
            }
        }


    }



}


const refillStockAdjustmentHeader = (ob)=>{

    stockAdjustmentHeader = JSON.parse(JSON.stringify(ob));
    oldStockAdjustmentHeader = JSON.parse(JSON.stringify(ob));

    displayAdjustmentKey.value=ob.adjustment_key;
    textAdjustmentNo.value=ob.adjustment_no;
    textAdjustmentDate.value=ob.adjustment_date;


    fillDataIntoSelect(selectCompanyName,'select company',companiesList,'companyname',ob.company_id.companyname);
}


const deleteStockAdjustmentHeader = (ob)=>{

    const userConfirm = confirm(`Are You Sure To Delete Following Stock Adjustment
            Code Is ${ob.adjustment_key}
            Company Name Is ${ob.company_id.companyname}
            Adjustment Number Is ${ob.adjustment_no}
            Adjustment Date Is ${ob.adjustment_date}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stockadjustmentheader",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful");
            refreshStockAdjustmentHeaderTable();
            refreshStockAdjustmentHeaderForm();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Not Complete \n ${deleteServerResponse}`);
        }
    }


}


//stock adjustment header section finish






















