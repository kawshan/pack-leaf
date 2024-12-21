//create tables
//mekata line height ekek damma. passe welawak hambunoth me function eka mehemea thiyennna arala wena function ekek hadla example name fillDataIntoTableWithAdjustedStyles kiyala meke code tika copy krala ee function eketa daala. me dan thiyena fucntion eke vena fillDataIntoTable kiyana eke ee styling tika makanna.. iita passse ewa call wenna one than wala print eke di vitharane call venna one ee print funtion eka  balala eeka athule call karanna
const fillDataIntoTable = (tableId,dataList,columnList,buttonVisibility=true)=>{
    const tableBody = tableId.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.style.lineHeight=0.1;
        tdIndex.style.paddingTop = '2%';

        tdIndex.innerText = parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnList.forEach(column =>{
            const  td = document.createElement('td');
            td.style.lineHeight = 0.1; // Set reasonable line height
            td.style.paddingTop = '2%'; // Add padding for better vertical alignment


            if (column.dataType == 'text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType == 'function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');
        tdButton.className = 'text-center'

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyButton.className ='d-block'
        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}

//just created for only div modify button id duplication problem to solve // same as the above table
const fillDataIntoTable2 = (tableId,dataList,columnList,buttonVisibility=true,divModifyElementName)=>{
    const tableBody = tableId.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnList.forEach(column =>{
            const  td = document.createElement('td');
            if (column.dataType == 'text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType == 'function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');
        tdButton.className = 'text-center'

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyElementName.classList.remove('d-none')
        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}


//sir ge new requirement eka -> table eka athule space ekak thiyenna one. eka done ✔
const fillDataIntoTableForItemPrint = (tableId, dataList, columnList, buttonVisibility = true) => {
    const tableBody = tableId.children[1]; // Get table body
    tableBody.innerHTML = ''; // Clear existing rows

    let lastCategory = null; // Track the last category

    dataList.forEach((element, index) => {
        const currentCategory = element.category_id.ctcode; // Get current item category

        // If the current category is different from the last one, insert a blank row before displaying the new category
        if (lastCategory !== null && currentCategory !== lastCategory) {
            // Create and append a blank row
            const blankRow = document.createElement('tr');
            const blankCell = document.createElement('td');
            blankCell.colSpan = columnList.length; // Span across all columns
            blankCell.innerHTML = '&nbsp;'; // Add a non-breaking space for the blank row
            blankRow.appendChild(blankCell);
            tableBody.appendChild(blankRow);
        }

        // Now create a regular row for the current item
        const tr = document.createElement('tr');

        // Loop through each column definition
        columnList.forEach(column => {
            const td = document.createElement('td');
            td.style.lineHeight = 0.1; // Set line height
            td.style.paddingTop = '2%'; // Padding for vertical alignment

            if (column.dataType === 'text') {
                td.innerText = element[column.propertyName]; // Direct text
            }

            if (column.dataType === 'function') {
                td.innerHTML = column.propertyName(element); // Function-based data
            }

            tr.appendChild(td);
        });

        // Action button (optional radio button)
        const tdButton = document.createElement('td');
        tdButton.className = 'text-center';

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name = 'modify';
        inputRadio.type = 'radio';

        inputRadio.onchange = function () {
            window['editOb'] = element; // Store the current element for editing
            window['editRow'] = index;  // Store the row index

            divModifyButton.className = 'd-block'; // Show modify button
        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility) {
            tr.appendChild(tdButton); // Add button column if visibility is true
        }

        // Append the row to the table body
        tableBody.appendChild(tr);

        // Update the last category to the current one
        lastCategory = currentCategory;
    });
}


const fillDataIntoTableWithEditButton = (tableID, dataList, columnsList, editFunction, buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=> {

        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column => {
            const td = document.createElement('td');

            if (column.dataType == 'text') {
                td.innerText = element[column.propertyName];
            }
            if (column.dataType == 'function') {
                td.innerHTML = column.propertyName(element);
            }
            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');


        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'btn btn-warning fw-bold';
        buttonEdit.style.height='50%';
        buttonEdit.style.width='40px';
        buttonEdit.innerHTML = '<span class="material-symbols-outlined">edit</span>'
        tdButton.appendChild(buttonEdit);
        buttonEdit.onclick = function () {
            editFunction(element, index);

        }


        if (buttonVisibility) {
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });

}


const fillDataIntoTableForPendingPurchaseOrderPrint = (tableId, dataList, columnList, buttonVisibility = true) => {
    const tableBody = tableId.children[1]; // Get table body
    tableBody.innerHTML = ''; // Clear existing rows

    let lastPurchaseOrderKey = null; // Track the last purchase order key

    dataList.forEach((element, index) => {
        const currentPurchaseOrderKey = element.purchaseorderkey; // Get current purchase order key

        // If the current purchase order key is different from the last one, insert a blank row
        if (lastPurchaseOrderKey !== null && currentPurchaseOrderKey !== lastPurchaseOrderKey) {
            const blankRow = document.createElement('tr');
            const blankCell = document.createElement('td');
            blankCell.colSpan = columnList.length; // Span across all columns
            blankCell.innerHTML = '&nbsp;'; // Add a non-breaking space for the blank row
            blankRow.appendChild(blankCell);
            tableBody.appendChild(blankRow);
        }

        // Create a regular row for the current item
        const tr = document.createElement('tr');

        // Loop through each column definition
        columnList.forEach(column => {
            const td = document.createElement('td');
            td.style.lineHeight = 0.1; // Set line height
            td.style.paddingTop = '2%'; // Padding for vertical alignment

            if (column.dataType === 'text') {
                td.innerText = element[column.propertyName]; // Direct text
            } else if (column.dataType === 'function') {
                td.innerHTML = column.propertyName(element); // Function-based data
            }

            tr.appendChild(td);
        });

        // Optional Action Button (Radio Button)
        const tdButton = document.createElement('td');
        tdButton.className = 'text-center';

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name = 'modify';
        inputRadio.type = 'radio';

        inputRadio.onchange = function () {
            window['editOb'] = element; // Store the current element for editing
            window['editRow'] = index;  // Store the row index

            divModifyButton.className = 'd-block'; // Show modify button
        };
        tdButton.appendChild(inputRadio);

        if (buttonVisibility) {
            tr.appendChild(tdButton); // Add button column if visibility is true
        }

        // Append the row to the table body
        tableBody.appendChild(tr);

        // Update last purchase order key to the current one
        lastPurchaseOrderKey = currentPurchaseOrderKey;
    });
};



const fillDataIntoTableForStockReportPrint = (tableId, dataList, columnList, buttonVisibility = true) => {
    const tableBody = tableId.children[1];
    tableBody.innerHTML = '';

    // **Add an empty row with specific content in the last two cells**
    const emptyRow = document.createElement('tr');

    // Add empty cells for all columns except the last two
    for (let i = 0; i < columnList.length - 1; i++) {
        const emptyCell = document.createElement('td');
        emptyCell.innerText = ''; // Leave these cells empty
        emptyRow.appendChild(emptyCell);
    }

    // Add the second-to-last cell with "Previous Value" and class 'text-end'
    const previousValueCell = document.createElement('td');
    previousValueCell.innerText = 'Previous Value'; // Add the text
    previousValueCell.className = 'text-end'; // Add the class 'text-end'
    previousValueCell.style.fontWeight = 'bold'; // Optional: Add styling
    emptyRow.appendChild(previousValueCell);

    // Add the last cell with "0"
    const zeroCell = document.createElement('td');
    zeroCell.innerText = '0'; // Add the value
    zeroCell.style.fontWeight = 'bold'; // Optional: Add styling
    zeroCell.className = 'text-end'; // Add the class 'text-end'
    zeroCell.id = 'zeroColumn'; // Add the id for easier access later
    zeroCell.innerHTML=getRemainingGrnAndIssueNote();
    emptyRow.appendChild(zeroCell);

    tableBody.appendChild(emptyRow); // Append the empty row to the table

    // Loop through the data list to populate rows
    dataList.forEach((element, index) => {
        const tr = document.createElement('tr');
        const tdIndex = document.createElement('td');
        tdIndex.style.lineHeight = 0.1;
        tdIndex.style.paddingTop = '2%';

        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        columnList.forEach(column => {
            const td = document.createElement('td');
            td.style.lineHeight = 0.1; // Set reasonable line height
            td.style.paddingTop = '2%'; // Add padding for better vertical alignment

            if (column.dataType === 'text') {
                td.innerText = element[column.propertyName];
            }
            if (column.dataType === 'function') {
                td.innerHTML = column.propertyName(element);
            }
            tr.appendChild(td);
        });

        const tdButton = document.createElement('td');
        tdButton.className = 'text-center';

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name = 'modify';
        inputRadio.type = 'radio';

        inputRadio.onchange = function () {
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyButton.className = 'd-block';
        };
        tdButton.appendChild(inputRadio);

        if (buttonVisibility) {
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);
    });
};














