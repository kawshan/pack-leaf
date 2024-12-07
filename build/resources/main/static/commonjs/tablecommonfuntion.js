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
const fillDataIntoTable2 = (tableId,dataList,columnList,buttonVisibility=true)=>{
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

            divModifyButton2.className ='d-block'
        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}
