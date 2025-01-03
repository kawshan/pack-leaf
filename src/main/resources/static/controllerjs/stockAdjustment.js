window.addEventListener('load',()=>{


    //details form eka call karanawa
    refreshStockAdjustmentDetailsForm();

    //header form ekayi table ekayi refresh kaeanawa
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


    buttonStockAdjustmentDetailsUpdate.disabled="true";
    buttonStockAdjustmentDetailsUpdate.style.cursor="not-allowed";

    buttonStockAdjustmentDetailsAdd.disabled="true";
    buttonStockAdjustmentDetailsAdd.style.cursor="not-allowed";

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


    if(stockAdjustmentHeader.adjustment_no==null){
        errors=errors+"Adjustment Number Cannot Be Empty \n"
    }
    if (stockAdjustmentHeader.adjustment_date == null){
        errors=errors="Adjustment Date Cannot Be Empty \n"
    }
    if (stockAdjustmentHeader.company_id == null){
        errors=errors+"Company Name Cannot Be Empty \n"
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
                    refreshStockAdjustmentDetailsForm()
                }else {
                    alert("save unsuccessful")
                }
            }


        }else {
            alert(`You Have following errors \n ${errors}`)
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

    refreshStockAdjustmentDetailsTable();
    refreshStockAdjustmentDetailsForm();
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


//need to do print function








//stock adjustment header section finish



//stock adjustment details section start

const refreshStockAdjustmentDetailsForm = ()=>{

    stockAdjustmentDetails = new Object();


    selectRawMaterial.style.border="2px solid #ced4da";
    txtQty.style.border="2px solid #ced4da";
    txtCode.style.border="2px solid #ced4da";
    txtRate.style.border="2px solid #ced4da";


    txtQty.value="";
    txtCode.value="";
    txtRate.value="";

    rawmaterialList = ajaxGetRequest("/rawmaterial/findall");
    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawmaterialList,'rmname');


    buttonStockAdjustmentDetailsUpdate.disabled=true;
    buttonStockAdjustmentDetailsUpdate.style.cursor="not-allowed";

    buttonStockAdjustmentDetailsAdd.disabled=false;
    buttonStockAdjustmentDetailsAdd.style.cursor="default";

}


const refreshStockAdjustmentDetailsTable = () =>{

    cardStockAdjustmentDetails.classList.remove('d-none');

    const stockAdjustmentDetailsList = ajaxGetRequest(`/stockadjustmentdetails/getstockadjustmentdetailsfromheaderkey/${displayAdjustmentKey.value}`);

    const displayProperty = [
        {dataType:'function',propertyName:getRawMaterial},
        {dataType:'text',propertyName:'code'},
        {dataType:'function',propertyName:getQuantity},
        {dataType:'function',propertyName:getRate},
    ]

    fillDataIntoTable2(stockAdjustmentDetailsTable,stockAdjustmentDetailsList,displayProperty,true,divModifyButton2)

}



const getRawMaterial = (ob)=>{
    return ob.rawmaterial_id.rmname;
}


const getQuantity = (ob)=>{
    return  `<p class="text-end">${Number(ob.quantity).toLocaleString('en-US',{minimumFractionDigits:4,maximumFractionDigits:4})}</p>`
}


const getRate = (ob)=>{
    return  `<p class="text-end">${Number(ob.rate).toLocaleString('en-US',{minimumFractionDigits:4,maximumFractionDigits:4})}</p>`
}


const checkErrorsStockAdjustmentDetails = ()=>{

    let errors = '';

    if (stockAdjustmentDetails.rawmaterial_id == null){
        errors=errors+"Raw Material Cannot Be Empty \n"
    }
    if (stockAdjustmentDetails.quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }
    if (stockAdjustmentDetails.rate == null){
        errors=errors+"Rate Cannot Be Empty \n"
    }
    return errors;

}

const submitStockAdjustmentDetails = ()=>{

    stockAdjustmentDetails.header_key = displayAdjustmentKey.value;

    let errors = checkErrorsStockAdjustmentDetails();

    if (errors==""){
        //implement the logic
        const userConfirm = confirm(`Are You Sure To Add Following Stock Adjustment Details \n
        Raw Material Is ${stockAdjustmentDetails.rawmaterial_id.rmname}
        Quantity Is ${stockAdjustmentDetails.quantity}
        Rate Is ${stockAdjustmentDetails.rate}
        Header Is ${stockAdjustmentDetails.header_key}
        `);

        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/stockadjustmentdetails",stockAdjustmentDetails);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshStockAdjustmentDetailsForm();
                refreshStockAdjustmentDetailsTable();
            }else {
                alert(`Save Unsuccessful ${postServerResponse}`);
            }
        }



    }else {
        alert(`You Have Some Errors ${errors}`);
    }




}

const refillStockAdjustmentDetails = (ob)=>{

    buttonStockAdjustmentDetailsUpdate.disabled=false;
    buttonStockAdjustmentDetailsUpdate.style.cursor="default";

    buttonStockAdjustmentDetailsAdd.disabled=true;
    buttonStockAdjustmentDetailsAdd.style.cursor="not-allowed";


    stockAdjustmentDetails = JSON.parse(JSON.stringify(ob));
    oldStockAdjustmentDetails = JSON.parse(JSON.stringify(ob));


    txtQty.value=ob.quantity;
    txtCode.value=ob.code;
    txtRate.value=ob.rate;


    fillDataIntoSelect(selectRawMaterial,'Select Raw Material',rawmaterialList,'rmname',ob.rawmaterial_id.rmname);

}


const checkUpdatesStockAdjustmentHeader = ()=>{
    let updates = '';

    if (oldStockAdjustmentDetails.rawmaterial_id.rmname != stockAdjustmentDetails.rawmaterial_id.rmname){
        updates=updates+"raw material is updated \n"
    }

    if (oldStockAdjustmentDetails.quantity != stockAdjustmentDetails.quantity){
        updates=updates+"Quantity is updated \n"
    }
    if (oldStockAdjustmentDetails.code != stockAdjustmentDetails.code){
        updates=updates+"Code is updated \n"
    }
    if (oldStockAdjustmentDetails.rate != stockAdjustmentDetails.rate){
        updates=updates+"Rate is updated \n"
    }
    return updates;
}


const updateStockAdjustmentDetails = ()=>{
    let updates = checkUpdatesStockAdjustmentHeader();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm){
            const updateServerResponse = ajaxPutRequest("/stockadjustmentdetails",stockAdjustmentDetails);
            if (updateServerResponse=="ok"){
                alert(`Update Successful`);
                refreshStockAdjustmentDetailsTable();
                refreshStockAdjustmentDetailsForm();
                divModifyButton2.classList.add('d-none');
            }else {
                alert(`update Unsuccessful ${updateServerResponse}`);
                refreshStockAdjustmentDetailsTable();
                refreshStockAdjustmentDetailsForm();
            }
        }
    }else {
        alert("Nothing To Update")
    }
}


const deleteStockAdjustmentDetails = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Stock Adjustment Details \n
        Raw Material Is ${ob.rawmaterial_id.rmname}
        Quantity Is ${ob.quantity}
        Rate Is ${ob.rate}
        Header Is ${ob.header_key}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stockadjustmentdetails",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshStockAdjustmentDetailsTable();
            refreshStockAdjustmentDetailsForm();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n`);
        }
    }

}













