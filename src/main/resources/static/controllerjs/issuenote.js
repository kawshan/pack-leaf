window.addEventListener('load',function (){


    refreshIssueNoteHeader();



    refreshIssueNoteHeaderTable();

});


const refreshIssueNoteHeader = ()=>{

    issueNoteHeader = new Object();

    selectJob.style.border="2px solid #ced4da";
    textIssueNoteNo.style.border="2px solid #ced4da";
    textIssueNoteDate.style.border="2px solid #ced4da";



    displayIssueNoteKey.value="";
    textIssueNoteNo.value="";
    textIssueNoteDate.value="";

    jobList = ajaxGetRequest("/jobmaster/findall");
    fillDataIntoSelect(selectJob,'Select Job Number',jobList,'jobnumber');


}

const changeColoursInIssueNoteHeader = ()=>{
    selectJob.style.border="2px solid #ced4da";
    textIssueNoteNo.style.border="2px solid #ced4da";
    textIssueNoteDate.style.border="2px solid #ced4da";
}



const refreshIssueNoteHeaderTable = ()=>{

    issueNoteList = ajaxGetRequest("/issuenoteheader/findall");

    displayProperty=[
        {dataType:'function', propertyName:getJobNumber},
        {dataType:'text', propertyName:'issuenotenumber'},
        {dataType:'text', propertyName:'issuenotedate'},
    ];

    fillDataIntoTable(issueNoteHeaderTable,issueNoteList,displayProperty,true);
    $("#issueNoteHeaderTable").dataTable();
}


const getJobNumber = (ob)=>{
    return ob.jobmaster_id.jobnumber;
}


const checkErrorIssueNoteHeader = ()=>{
    let errors = "";


    if (issueNoteHeader.jobmaster_id == null){
        errors=errors+"Job Cannot Be Empty \n"
    }
    if (issueNoteHeader.issuenotenumber == null){
        errors=errors+"Issue Note Number Cannot Be Empty \n"
    }
    if (issueNoteHeader.issuenotedate == null){
        errors=errors+"Date Cannot Be Empty \n"
    }
    return errors;
}



const submitIssueNoteHeader = async ()=>{
    if (displayIssueNoteKey.value==""){
        console.log(`save part`);

        let errors = checkErrorIssueNoteHeader();
        if (errors==""){
            const userConfirm = confirm(`Are You Sure To Add Following Details \n
            Job Number Is ${issueNoteHeader.jobmaster_id.jobnumber}
            Issue Note Number Is ${issueNoteHeader.issuenotenumber}
            Date Is ${issueNoteHeader.issuenotedate}
            `);
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/issuenoteheader",issueNoteHeader);
                if (postServerResponse&&postServerResponse.headerkey){
                    alert("Save Successful");
                    displayIssueNoteKey.value=postServerResponse.headerkey;
                    refreshIssueNoteHeaderTable();
                    changeColoursInIssueNoteHeader();
                }else {
                    alert(`Save Unsuccessful \n ${postServerResponse}`);
                }
            }else {
                alert(`User Cancelled the Operation`);
            }



        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }




    }else {
        console.log(`update part`);
        const errors = checkErrorIssueNoteHeader();
        if (errors==""){


            //get id from server using header key
            const getIdFromServer = await ajaxGetRequest("/issuenoteheader/getidfromheaderkey/"+displayIssueNoteKey.value);
            console.log(getIdFromServer);
            //id binding to the object
            issueNoteHeader.id=getIdFromServer;

            //header key binding to the object
            issueNoteHeader.headerkey = displayIssueNoteKey.value



            const userConfirm = confirm(`Are You Sure To Update Following 
            Job Number Is ${issueNoteHeader.jobmaster_id.jobnumber}
            Issue Note Number Is ${issueNoteHeader.issuenotenumber}
            Date Is ${issueNoteHeader.issuenotedate}
            Header Key is ${issueNoteHeader.headerkey}
            Id Is ${issueNoteHeader.id}
            `);
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/issuenoteheader",issueNoteHeader);
                if (putServerResponse=="ok"){
                    alert("Update Successful");
                    refreshIssueNoteHeaderTable();
                    changeColoursInIssueNoteHeader();
                    divModifyButton.classList.add('d-none');
                }else {
                    alert(`Error Happened \n ${putServerResponse}`);
                }
            }else {
                alert("User Cancelled The Operation")
            }
        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }
    }
}


const refillIssueNoteHeader = (ob,rowIndex)=>{
    displayIssueNoteKey.value = ob.headerkey;
    textIssueNoteNo.value = ob.issuenotenumber;
    textIssueNoteDate.value = ob.issuenotedate;

    fillDataIntoSelect(selectJob,'Select Job Number',jobList,'jobnumber',ob.jobmaster_id.jobnumber);


    //value ekatath bind karanna one
    issueNoteHeader.headerkey = displayIssueNoteKey.value;
    issueNoteHeader.issuenotenumber = textIssueNoteNo.value;
    issueNoteHeader.issuenotedate = textIssueNoteDate.value;

    let selectedJob = JSON.parse(selectJob.value);
    issueNoteHeader.jobmaster_id = selectedJob;
}



const deleteIssueNoteHeader = (ob,rowIndex)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Issue Note \n
        Job Number Is ${ob.jobmaster_id.jobnumber}
        Issue Note Number ${ob.issuenotenumber}
        Issue Note Date ${ob.issuenotedate}
    `);

    if (userConfirm){
        const deleteServerResponse =ajaxDeleteRequest("/issuenoteheader",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshIssueNoteHeaderTable();
            divModifyButton.classList.add('d-none');
        }
    }else {
        alert(`User Cancelled The Operation`)
    }



}


const issueNoteHeaderPrint = (ob,rowIndex)=>{

}







































