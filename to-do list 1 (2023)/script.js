const itemInput = document.querySelector("#addItemInput");
const list = document.querySelector("#list");
const addBtn = document.querySelector("#addBtn");
const selBtn = document.querySelector("#selectBtn");
const delBtn = document.querySelector("#deleteBtn");
const showSel = document.querySelector("#showAll");

addBtn.addEventListener('click', ()=>{
    if(itemInput.value.length > 0){
        let itemText = itemInput.value;
        let listItem = document.createElement('li');
        listItem.textContent = itemText;
        list.insertAdjacentElement("beforeend", listItem);
    
        itemInput.value = "";

        listItem.addEventListener('click', ()=>{
            if(listItem.classList.contains("cur-sel-item")){
                listItem.classList.remove("cur-sel-item");
            }else{
                const selItem = document.querySelectorAll(".cur-sel-item");
                selItem.forEach((el)=>{
                    el.classList.remove("cur-sel-item");
                })
                listItem.classList.add("cur-sel-item");
            }
        })

        listItem.addEventListener('dblclick', ()=>{
            if(listItem.classList.contains("sel-item")){
                return;
            }
            listItem.classList.add("cur-sel-item");
            const editInput = document.createElement('input');
            editInput.type = "text";
            editInput.value = listItem.textContent;
            editInput.classList.add("temp-input");
            listItem.textContent = "";
            listItem.appendChild(editInput);
            editInput.addEventListener('keyup', (event)=>{
                if(event.key == "Enter"){
                    listItem.textContent = editInput.value;
                    editInput.remove();
                }
            })
            editInput.addEventListener('blur', ()=>{
                listItem.textContent = editInput.value;
                editInput.remove();
            })
        })
    }
})

selBtn.addEventListener('click', ()=>{
    const selItem = document.querySelector(".cur-sel-item");
    selItem.classList.toggle("sel-item");
})

delBtn.addEventListener('click', ()=>{
    const selItem = document.querySelector(".cur-sel-item");
    selItem.remove();
})

showSel.addEventListener('click', ()=>{
    const filterBtnsTab = document.querySelectorAll(".filter-list-btn");
    filterBtnsTab.forEach((el)=>{
        el.classList.remove("hidden-btns");
    })
})

const filterBtnsTab = document.querySelectorAll(".filter-list-btn");
let clicks = 0;
filterBtnsTab.forEach((el)=>{
    el.addEventListener('click', ()=>{
        filterBtnsTab.forEach((btn)=>{
            btn.classList.remove("cur-selected");
            btn.classList.remove("hidden-btns");
        })
        el.classList.add("cur-selected");
        if(clicks%2==0){
            filterBtnsTab.forEach((btn)=>{
                if(btn.classList.contains("cur-selected")==false){
                    btn.classList.add("hidden-btns");
                }
            })
        }
        clicks++;

        const listItemsTab = document.querySelectorAll("li");
        switch(el.id){
            case "showAll": 
                listItemsTab.forEach((li)=>{
                    li.classList.remove("hidden-btns");
                })
                break;

            case "showSel":
                listItemsTab.forEach((li)=>{
                    if(li.classList.contains("sel-item")){
                        li.classList.remove("hidden-btns");
                    }else{
                        li.classList.add("hidden-btns");
                    }
                })
                break;

            case "showUnsel":
                listItemsTab.forEach((li)=>{
                    if(li.classList.contains("sel-item")){
                        li.classList.add("hidden-btns");
                    }else{
                        li.classList.remove("hidden-btns");
                    }
                })
                break;
        }

    })
})
