// export {taskList , taskNumber , addNewTask , deleteTask , editTask , filterTaskList , noOfTasks , noOfCompleteTasks , noOfIncompleteTasks , deleteAllTasks}
let taskWrapper = document.querySelector(".task-wrapper");
let totel = document.querySelector("#ttasks")
let inc = document.querySelector("#intasks")
let com = document.querySelector("#ctasks")



let date = document.getElementById("dueDate")
date.setAttribute("min", today);
date.setAttribute("min", today);
date.value = today;

function changeTotalValues(){
    let Ototel = noOfTasks();
    let Oinc = noOfIncompleteTasks();
    let Ocom = noOfCompleteTasks();

    totel.textContent = Ototel > 9 ? Ototel : `0${Ototel}`;
    inc.textContent = Oinc > 9 ? Oinc : `0${Oinc}`;
    com.textContent = Ocom > 9 ? Ocom : `0${Ocom}`;
}

function updateClassForTaskWrapper(className){
    taskWrapper.classList.remove(taskWrapper.classList[1]);
    taskWrapper.classList.add(className)
}


// ------------- NAV UI start -----------------

let nav = document.querySelector(".arrow")

nav.addEventListener("click",function(){
    nav.classList.toggle("changearrow")
})

// -------------- NAV UI end ----------------

//------------------------------- info script start ----------------

let openers = document.querySelectorAll(".toopen")


document.querySelectorAll(".close").forEach(function(ele, index){
    ele.addEventListener("click",function(){
        openers[index].classList.remove("open-info")
        nav.classList.remove("changearrow")
    })
})

document.querySelectorAll(".open").forEach(function(element, index){
    element.addEventListener("click",function(){
        
        openers[index].classList.add("open-info")
        nav.classList.remove("changearrow")
        autoUp(index , document.querySelectorAll(".toopen"), "open-info")
    })
})

//------------------------------- info script end ----------------


// --------------------Week date start also script--------------------

const days = document.querySelector(".days");
const nextWeekButton = document.getElementById("nextWeekButton");
const prevWeekButton = document.getElementById("prevWeekButton");

// Initialize the start date as today
let startDate = new Date();

// Function to generate the days of the current week
function generateCurrentWeek() {
    days.innerHTML = ""; // Clear the current days

    startDate = new Date(); // Reset to the current date

    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() - startDate.getDay() + i);

        const dayElement = document.createElement("div");
        

        const h3 = document.createElement("h4");
        h3.textContent = day.toLocaleDateString("en-US", { weekday: "short" });

        const h1 = document.createElement("h2");
        h1.textContent = day.toLocaleDateString("en-us", {day: "numeric"})

        const h33 = document.createElement("h4");
        h33.textContent = day.toLocaleDateString("en-us", {month: "short"})

        
        dayElement.appendChild(h33);
        dayElement.appendChild(h1);
        dayElement.appendChild(h3);

        let dd = day.toLocaleDateString("en-US", {day : "numeric"});
        if (dd < 10) {
            dd = '0' + dd;
        }
        let mm = day.toLocaleDateString("en-US", {month : "numeric"})
        if (mm < 10) {
            mm = '0' + mm;
        } 
        
        dayElement.className = `day ${day.toLocaleDateString("en-US", {year : "numeric"})+"-"+mm+"-"+dd}`;

        
        // dayElement.textContent = day.toLocaleDateString("en-US", { month: "short",weekday: "short", day: "numeric" });

        // Check if this day is today, and add a "today" class
        if (isToday(day)) {
            dayElement.classList.add("today");
            let dot = document.createElement("div");
            dot.className = "dot";
            dayElement.appendChild(dot);
        }

        days.appendChild(dayElement);
        dateFilter(dayElement)
    }
    if (document.getElementsByClassName(`${datelog}`)[0] != undefined && !document.getElementsByClassName(`${datelog}`)[0].classList.contains("task-wrapper")) {
        document.getElementsByClassName(`${datelog}`)[0].classList.add("datechoose")
    }
}

// Function to check if a given date is today
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

// Initial generation of the current week's days
generateCurrentWeek();

// Add click event listeners to the "Next Week" and "Previous Week" buttons
nextWeekButton.addEventListener("click", () => generateWeek(1));
prevWeekButton.addEventListener("click", () => generateWeek(-1));

// Function to generate the days of the next or previous week
function generateWeek(offset) {
    days.innerHTML = ""; // Clear the current days


    startDate.setDate(startDate.getDate() + offset * 7); // Move to the next/previous week

    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() - startDate.getDay() + i);

        const dayElement = document.createElement("div");
        

        const h3 = document.createElement("h4");
        h3.textContent = day.toLocaleDateString("en-US", { weekday: "short" });

        const h1 = document.createElement("h2");
        h1.textContent = day.toLocaleDateString("en-us", {day: "numeric"})

        const h33 = document.createElement("h4");
        h33.textContent = day.toLocaleDateString("en-us", {month: "short"})

        

        dayElement.appendChild(h33);
        dayElement.appendChild(h1);
        dayElement.appendChild(h3);

        let dd = day.toLocaleDateString("en-US", {day : "numeric"});
        if (dd < 10) {
            dd = '0' + dd;
        }
        let mm = day.toLocaleDateString("en-US", {month : "numeric"})
        if (mm < 10) {
            mm = '0' + mm;
        } 
        
        dayElement.className = `day ${day.toLocaleDateString("en-US", {year : "numeric"})+"-"+mm+"-"+dd}`;
        // Check if this day is today, and add a "today" class
        if (isToday(day)) {
            dayElement.classList.add("today");
            let dot = document.createElement("div");
            dot.className = "dot";
            dayElement.appendChild(dot);
        }

        days.appendChild(dayElement);
        dateFilter(dayElement)
    }
    if (document.getElementsByClassName(`${datelog}`)[0] != undefined && !document.getElementsByClassName(`${datelog}`)[0].classList.contains("task-wrapper")) {
        document.getElementsByClassName(`${datelog}`)[0].classList.add("datechoose")
    }
}


// --------------------------------- Date UI and script end --------------------------

//--------------------------------- task notes down script start ---------------------------- 

function autoUp(index1 , AC , classN) {
    AC.forEach(function(item2, index2) {
        if (index1 !== index2){
            item2.classList.remove(classN)
        }

    });
}

function notesDown(){
    const notes = document.querySelectorAll(".task")


    notes.forEach(function(element , index) {

        element.querySelector(".task-actions > .actions-wrapper > .down").addEventListener("click", function(){
            element.querySelector(".task-actions > .actions-wrapper > .down").classList.toggle("down-rotate")
            // this.classList.toogle("down-rotate")
            let note = document.querySelectorAll(".notes")
            note[index].classList.toggle("notes-down")
            autoUp(index, note, "notes-down")

            autoUp(index, document.querySelectorAll(".down"), "down-rotate")
        })
    })
}
//--------------------------------- task notes down script end ---------------------------- 

//--------------------------------- ACTIONS script start ----------------------------



document.querySelector(".task-wrapper").addEventListener("click", function(ev){

    let actionsClassList = ev.target.classList;
    let parentOfcheck = ev.target.parentElement.parentElement.parentElement.parentElement
    let id = parentOfcheck.id;
    
    let checkTask = parseInt(id.slice(4, id.length))
    if (actionsClassList.contains("check-box-inp") ){


        if (ev.target.checked ){
            parentOfcheck.querySelector(".task-cont").classList.add("strike")
            parentOfcheck.closest(".task").style.opacity= "0.8"
            editTask(checkTask,"taskStatus", true)
            
        }
        else if (!ev.target.checked){
            parentOfcheck.querySelector(".task-cont").classList.remove("strike")
            parentOfcheck.closest(".task").style.opacity = "1"
            editTask(checkTask,"taskStatus", false)
        }
    changeTotalValues()

    }

    else if (actionsClassList.contains("fa-star")){
        
        if (taskList[getIteById(checkTask)].taskPriority === "high"){
            actionsClassList.remove("fa-solid")
            actionsClassList.add("fa-regular")
            editTask(checkTask,"taskPriority", "low")
            ev.target.closest(".task").querySelector(".star").style.opacity = "0"
            ev.target.closest(".task").querySelector(".star").style.scale = "0"
        }
        else if (taskList[getIteById(checkTask)].taskPriority === "low"){
            actionsClassList.remove("fa-regular")
            actionsClassList.add("fa-solid")
            editTask(checkTask,"taskPriority", "high")
            ev.target.closest(".task").querySelector(".star").style.opacity = "1"
            ev.target.closest(".task").querySelector(".star").style.scale = "1"

        }
    }

    else if (actionsClassList.contains("bin")){

        let right = ev.target.parentElement.offsetLeft

        let confirmDel = ev.target.closest(".actions-wrapper").querySelector(".confirm-delete")
        confirmDel.style.setProperty("--right", `${right}px`)
        confirmDel.classList.add("confirm-delete-popup")
        confirmDel.querySelector(".b2").addEventListener("click", function(){
            confirmDel.classList.remove("confirm-delete-popup")
        })

        confirmDel.querySelector(".b1").addEventListener("click", function(){
            let taskId = id.slice(4, id.length);
            deleteTask(parseInt(taskId))
            taskElement = document.getElementById(`task${taskId}`);
            taskWrapper.removeChild(taskElement);
        })

        let del = document.querySelectorAll(".bin")
        del.forEach(function(el , index) {
            el.addEventListener("click", function(){
                let delwrap = document.querySelectorAll(".confirm-delete")
                autoUp(index, delwrap, "confirm-delete-popup")
            })
        })

    }

    else if (actionsClassList.contains("edit")){
        var pt = ev.target.closest(".task > .task-actions").querySelector(".task-cont > h3")
        pt.contentEditable = true;
        pt.focus();
        window.addEventListener("keydown", function(ev){
            if (ev.key === "Enter"){
                pt.blur();
                editTask(checkTask, "taskDescription", pt.textContent);
            }
        })
    }

    else if (actionsClassList.contains("notes")){
        ev.target.contentEditable = true;
        ev.target.focus()
        let nid = ev.target.closest(".task").id
        nid = parseInt(nid.slice(4, nid.length))
        window.addEventListener("keydown", function(evt){
            if (evt.key === "Enter"){
                ev.target.blur();
                editTask(nid, "notes", ev.target.textContent);
            }
        })
    }
    changeTotalValues()
    checkForChildNodes()
})

//--------------------------------- ACTIONS script end ----------------------------

// ---------------------------------- Render Tasks script start---------------------------------



// Assuming you have the `taskWrapper` element already created

function renderTasks(taskList , flag) {

    let zindex = noOfTasks()
    nav.classList.remove("changearrow")

    if (flag === "showTask"){
        taskWrapper.innerHTML = '<span class="notask"><h3>NO TASKS!</h3></span>'
    }
    if (noOfTasks() > 0) {
        document.querySelector(".notask").style.display = "none"
    }
    else{
        document.querySelector(".notask").style.display = "block"
    }


    taskList.forEach(function (task, index) {

        const taskmain = document.createElement("div")
        taskmain.classList.add("task")
        taskmain.style.zIndex = zindex
        zindex--;
        taskmain.id = `task${task.taskId}`
      
      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");
  
      // Create the checkbox div
      const checkBox = document.createElement("div");
      checkBox.classList.add("check-box");

      
  
      // Create the label element for the checkbox
      const label = document.createElement("label");
      label.classList.add("container");
  
      // Create the input element for the checkbox
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.className = "check-box-inp"
      input.checked = task.taskStatus;

      if (task.taskStatus) {
        taskmain.style.opacity = "0.8"
      }
      
      // Set the checkbox based on taskStatus
  
      // Create the div for the checkbox mark
      const checkmark = document.createElement("div");
      checkmark.classList.add("checkmark");
  
      // Append the input and checkmark to the label
      label.appendChild(input);
      label.appendChild(checkmark);
  
      // Append the label to the checkbox div
      checkBox.appendChild(label);
  
      // Create the task content div
      const taskCont = document.createElement("div");
      taskCont.classList.add("task-cont");
  
      // Create the h3 element for the task title
      const taskTitle = document.createElement("h3");
      taskTitle.textContent = task.taskDescription;

      if (task.taskStatus){
        taskCont.classList.add("strike")
      }

  
      // Append the task title to the task content div
      taskCont.appendChild(taskTitle);
  
      // Create the actions wrapper div
      const actionsWrapper = document.createElement("div");
      actionsWrapper.classList.add("actions-wrapper");
  
      // Now, you can create the action divs with their respective SVG icons based on taskPriority
      const priorityToIcon = {
        high: 'fa-solid',
        low: 'fa-regular'
      };
  
      const actionDiv1 = document.createElement("div");
      actionDiv1.classList.add("action");
      actionDiv1.classList.add(`action1`);

      const pstar = document.createElement("i");
      pstar.className =` fa-star ${priorityToIcon[task.taskPriority]}`

      actionDiv1.appendChild(pstar);

      const actionDiv2 = document.createElement("div");
      actionDiv2.classList.add("action");
      actionDiv2.classList.add(`action2`);
      actionDiv2.innerHTML = `<i class="fa-solid fa-pen-to-square edit"></i>`
  

      const actionDiv3 = document.createElement("div");
      actionDiv3.classList.add("action");
      actionDiv3.classList.add(`action3`);
      actionDiv3.innerHTML = `<i class="fa-solid fa-trash bin"></i>`

      // Append the action div to the actions wrapper
      actionsWrapper.appendChild(actionDiv1);
      actionsWrapper.appendChild(actionDiv2);
      actionsWrapper.appendChild(actionDiv3);
  
      // Create the notes div
      const notes = document.createElement("div");
      notes.classList.add("notes");
  
      // Create the notes content div
      const notesContent = document.createElement("div");
      notesContent.classList.add("notes-content");
      notesContent.textContent = task.notes
  
      const dueDate = document.createElement("div");
      dueDate.classList.add("dueDate");

      dueDate.textContent = `Due to - ${task.date}`;


      const star = document.createElement("div");
      star.classList.add("star")

      star.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 32 30" fill="none"><path d="M17.7409 1.05457C17.4197 0.41011 16.741 0 15.9956 0C15.2503 0 14.5776 0.41011 14.2504 1.05457L10.3538 8.80566L1.65173 10.0477C0.924534 10.1532 0.318538 10.6453 0.0943199 11.319C-0.129898 11.9928 0.0519 12.7369 0.573056 13.2348L6.88753 19.2752L5.39678 27.8113C5.27558 28.5144 5.57858 29.2292 6.17852 29.6451C6.77845 30.0611 7.57231 30.1138 8.22678 29.7799L16.0017 25.7666L23.7766 29.7799C24.4311 30.1138 25.225 30.0669 25.8249 29.6451C26.4248 29.2233 26.7278 28.5144 26.6066 27.8113L25.1098 19.2752L31.4243 13.2348C31.9455 12.7369 32.1333 11.9928 31.903 11.319C31.6728 10.6453 31.0728 10.1532 30.3456 10.0477L21.6375 8.80566L17.7409 1.05457Z" fill="#652C29"/></svg>'
  
  
      // Append the notes content and edit action to the notes div
      notes.appendChild(notesContent);

  
      // Append all the created elements to the taskActions div
      taskActions.appendChild(checkBox);
      taskActions.appendChild(taskCont);
      taskActions.appendChild(actionsWrapper);
  
      // Append the taskActions and notes to the taskWrapper
      taskmain.appendChild(taskActions);
      taskmain.appendChild(star);
      if (task.taskPriority === "high"){
        star.style.opacity ="1"
        star.style.scale = "1";
      }
      else{
        star.style.opacity = "0"
        star.style.scale = "1"
      }
      taskmain.appendChild(notes);
      taskmain.appendChild(dueDate);

      const down = document.createElement("div");
      down.className = "down"
      down.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill="#652C29"/></svg>`

      const confirmDelete = document.createElement("div");
      confirmDelete.className = "confirm-delete"
      
      const delH5 = document.createElement("h5");
      delH5.textContent = "Do you want to delete this task?"

      const delbtwrapper = document.createElement("div");
      delbtwrapper.className = "del-bt-wrapper"

      const bt1 = document.createElement("button")
      bt1.className = "b1"
      bt1.textContent = "Yes"

      const bt2 = document.createElement("button")
      bt2.className = "b2"
      bt2.textContent = "No"

      const triangle = document.createElement("div")
      triangle.className = "triangle"

      delbtwrapper.appendChild(bt1)
      delbtwrapper.appendChild(bt2)

      confirmDelete.appendChild(delH5)
      confirmDelete.appendChild(delbtwrapper)
      confirmDelete.appendChild(triangle)
      

      actionsWrapper.appendChild(down)
      actionsWrapper.appendChild(confirmDelete)
      taskWrapper.appendChild(taskmain);
    });
    changeTotalValues()
  }
  
  // Call the renderTasks function with your taskList data
  
  

//-------------------------------- Reander Tasks script end --------------------------------

// ------------------------------ add-task script start ------------------------------

function askTask(){
    let taskdesc = document.getElementById("asktask").value;
    let notes = document.getElementById("asknotes").value;
    let priority = document.getElementById("prority-input").value;
    let inpDate = document.getElementById("dueDate").value;

    if (taskdesc !== "" && notes !== "" && inpDate !== undefined && priority !== ""){
        addNewTask(taskdesc, priority, inpDate, notes)
        if (taskWrapper.classList.contains(inpDate) || taskWrapper.classList.contains("showallTasks")){
            let ele = [taskList[taskList.length-1]]
            renderTasks(ele , "addTask")
            notesDown()
        }
        showInfo(`New task is added (Due to - ${inpDate})`,  ".info-tasks", "show-info-task")
        document.getElementById("asktask").value  = ""
        notes = document.getElementById("asknotes").value = ""
        priority = document.getElementById("prority-input").value = ""
        inpDate = document.getElementById("dueDate").value = today
        this.closest(".toopen").classList.remove("open-info")
        
    }
    else{
        showInfo("Please Fill the required fields below.", ".error", "Show-error")
    }

    

    // else{
    //     renderTasks(ele , "")
    // }

    changeTotalValues();
    
}

document.querySelector(".add-bt").addEventListener("click", askTask)



// ------------------------------ addtask script end ------------------------------

// ------------------------------ show tasks start --------------------------------

let divdate = today;

function showtasks(dateinp){
    document.querySelector(".notask").style.display = "block"
    let showTaskList = filterTaskList("date", dateinp);
    renderTasks(showTaskList, "showTask")
    notesDown();
}

// ------------------------------- show tasks end --------------------------------

//

// ------------------------------- show all tasks script start --------------------------------

document.querySelector(".showall").addEventListener("click", function(){
    document.querySelector(".notask").style.display = "block"
    updateClassForTaskWrapper("showallTasks")
    renderTasks(taskList,"showTask")
    notesDown();
    showInfo("All Tasks were shown.",  ".info-tasks", "show-info-task")
})

// ------------------------------- show all tasks script  end --------------------------------


// ------------------------------- delete all tasks script start --------------------------------

document.querySelector(".confirm-deletion > .del-bt-wrapper > .b2").addEventListener("click", function(){
    this.closest(".toopen").classList.remove("open-info")
})

document.querySelector(".confirm-deletion > .del-bt-wrapper > .b1").addEventListener("click", function(){
    deleteAllTasks();
    document.querySelector(".notask").style.display = "block"
    this.closest(".toopen").classList.remove("open-info")
    showInfo("All tasks you were assigned is deleted.",  ".info-tasks", "show-info-task")
    renderTasks(taskList , "showTask")
    changeTotalValues()
})

// ------------------------------- delete all tasks script start --------------------------------


// ------------------------------- filter task start --------------------------------

document.querySelector(".fil-bt").addEventListener("click", function(){
   //complete it
    let selectedOption = document.getElementById("filter").value;
    
    if (selectedOption !== ""){
        const filList = selectedOption.split(",");

        let filterby;

        if (filList.length === 2){
            let secValue = filList[1]==="true" || filList[1]==="false" ? eval(filList[1]): filList[1];
            filterby = filterTaskList(filList[0], secValue );
        }
        else if (filList.length === 4){
            filterby = filterTaskList2(filList[0], filList[1], filList[2], eval(filList[3]));
        }
        renderTasks(filterby, "showTask")
        this.closest(".toopen").classList.remove("open-info")

        selectedOption = ""
    }
    else{
        showInfo("Please Fill the required fields below.", ".error", "Show-error")
    }

})

// ------------------------------- filter task end --------------------------------


// -------------------------------days tasks start --------------------------------

function dateFilter(day){
    
    day.addEventListener("click",function(){
        let timer;
        updateClassForTaskWrapper(day.classList[1])
        if (today > day.classList[1]){
            showInfo("All tasks are in this date is deleted because of Incompletion of the task.", ".dateError" , "Show-Date-error")
        }
        else{
            showtasks(day.classList[1])
            showInfo(`Due Tasks in this ${day.classList[1]} were shown.`, ".info-tasks", "show-info-task")
            day.classList.add("datechoose")
            let dates = document.querySelectorAll(".day")
            let datesArray = Array.from(dates)
            let fdindex = () => {return datesArray.findIndex(task => task === day)}
            autoUp(fdindex(), dates , "datechoose")
            datelog = day.classList[1];
        }
    })

    checkForChildNodes()

}


// -------------------------------days tasks end  --------------------------------

showInfo("Welcome to Listify", ".info-tasks", "show-info-task")
renderTasks(taskList, "showTask")
notesDown()

function showInfo(content, class1, class2) {
    let info = document.querySelector(class1)
    info.querySelector("h3").textContent = content;
    info.classList.add(class2)
    setTimeout(()=>{
        info.classList.remove(class2)
    },3000)
}

function checkForChildNodes(){
    let nodesChild = taskWrapper.childNodes
    if (nodesChild.length === 1){
        document.querySelector(".notask").style.display = "block"
    }
}

/* <div class="task">

<div class="task-actions">
    <div class="check-box">
        <label class="container">
            <input type="checkbox">
            <div class="checkmark"></div>
        </label>
    </div>
    <div class="task-cont">
        <h3>To watch leo</h3>
    </div>
    <div class="actions-wrapper">
        <div class="action action1">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30" fill="none">
                <path d="M17.7409 1.05457C17.4197 0.41011 16.741 0 15.9956 0C15.2503 0 14.5776 0.41011 14.2504 1.05457L10.3538 8.80566L1.65173 10.0477C0.924534 10.1532 0.318538 10.6453 0.0943199 11.319C-0.129898 11.9928 0.0519 12.7369 0.573056 13.2348L6.88753 19.2752L5.39678 27.8113C5.27558 28.5144 5.57858 29.2292 6.17852 29.6451C6.77845 30.0611 7.57231 30.1138 8.22678 29.7799L16.0017 25.7666L23.7766 29.7799C24.4311 30.1138 25.225 30.0669 25.8249 29.6451C26.4248 29.2233 26.7278 28.5144 26.6066 27.8113L25.1098 19.2752L31.4243 13.2348C31.9455 12.7369 32.1333 11.9928 31.903 11.319C31.6728 10.6453 31.0728 10.1532 30.3456 10.0477L21.6375 8.80566L17.7409 1.05457Z" fill="#652C29"/>
            </svg>
        </div>

        <div class="action action2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M27.6328 0.962402C26.3496 -0.320801 24.2754 -0.320801 22.9922 0.962402L21.2285 2.72021L26.9648 8.45654L28.7285 6.69287C30.0117 5.40967 30.0117 3.33545 28.7285 2.05225L27.6328 0.962402ZM10.1016 13.853C9.74414 14.2105 9.46875 14.6499 9.31055 15.1362L7.57617 20.3394C7.40625 20.8433 7.54102 21.3999 7.91602 21.7808C8.29102 22.1616 8.84766 22.2905 9.35742 22.1206L14.5605 20.3862C15.041 20.228 15.4805 19.9526 15.8438 19.5952L25.6465 9.78662L19.9043 4.04443L10.1016 13.853ZM5.625 3.44092C2.51953 3.44092 0 5.96045 0 9.06592V24.0659C0 27.1714 2.51953 29.6909 5.625 29.6909H20.625C23.7305 29.6909 26.25 27.1714 26.25 24.0659V18.4409C26.25 17.4038 25.4121 16.5659 24.375 16.5659C23.3379 16.5659 22.5 17.4038 22.5 18.4409V24.0659C22.5 25.103 21.6621 25.9409 20.625 25.9409H5.625C4.58789 25.9409 3.75 25.103 3.75 24.0659V9.06592C3.75 8.02881 4.58789 7.19092 5.625 7.19092H11.25C12.2871 7.19092 13.125 6.35303 13.125 5.31592C13.125 4.27881 12.2871 3.44092 11.25 3.44092H5.625Z" fill="#652C29"/>
              </svg>
        </div>

        <div class="action action3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M0.980194 11.3524C0.504004 10.0476 1.47005 8.66666 2.85897 8.66666H12.2691H20.7751C22.1517 8.66666 23.1168 10.0251 22.6636 11.325L17.318 26.6584C17.0379 27.4617 16.2802 28 15.4295 28H8.45515C7.615 28 6.86441 27.4749 6.57637 26.6857L0.980194 11.3524Z" fill="#652C29"/>
                <path d="M22.876 6C22.876 7.10457 21.9805 8 20.876 8L11.2859 8L2.71533 8C1.61076 8 0.715335 7.10457 0.715335 6L0.715335 5.6508C0.715335 4.85141 1.19134 4.12881 1.92579 3.81324L7.31939 1.49578C7.56882 1.3886 7.83746 1.33333 8.10894 1.33333L14.9844 1.33334C15.2386 1.33334 15.4905 1.38181 15.7266 1.47615L21.6182 3.83067C22.3778 4.13424 22.876 4.86982 22.876 5.68785L22.876 6Z" fill="#652C29"/>
                <path d="M8.93604 1.33333C8.93604 0.596954 9.53299 0 10.2694 0H13.3216C14.058 0 14.6549 0.596954 14.6549 1.33333V1.33333H8.93604V1.33333Z" fill="#652C29"/>
            </svg>
        </div>

        <div class="down">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
</div>
    </div>
</div>

<div class="notes">
    <div class="notes-content">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, natus.</p>
    </div>
    <div class="edit-action">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M27.6328 0.962402C26.3496 -0.320801 24.2754 -0.320801 22.9922 0.962402L21.2285 2.72021L26.9648 8.45654L28.7285 6.69287C30.0117 5.40967 30.0117 3.33545 28.7285 2.05225L27.6328 0.962402ZM10.1016 13.853C9.74414 14.2105 9.46875 14.6499 9.31055 15.1362L7.57617 20.3394C7.40625 20.8433 7.54102 21.3999 7.91602 21.7808C8.29102 22.1616 8.84766 22.2905 9.35742 22.1206L14.5605 20.3862C15.041 20.228 15.4805 19.9526 15.8438 19.5952L25.6465 9.78662L19.9043 4.04443L10.1016 13.853ZM5.625 3.44092C2.51953 3.44092 0 5.96045 0 9.06592V24.0659C0 27.1714 2.51953 29.6909 5.625 29.6909H20.625C23.7305 29.6909 26.25 27.1714 26.25 24.0659V18.4409C26.25 17.4038 25.4121 16.5659 24.375 16.5659C23.3379 16.5659 22.5 17.4038 22.5 18.4409V24.0659C22.5 25.103 21.6621 25.9409 20.625 25.9409H5.625C4.58789 25.9409 3.75 25.103 3.75 24.0659V9.06592C3.75 8.02881 4.58789 7.19092 5.625 7.19092H11.25C12.2871 7.19092 13.125 6.35303 13.125 5.31592C13.125 4.27881 12.2871 3.44092 11.25 3.44092H5.625Z" fill="#652C29"/>
        </svg>
    </div>
</div>

<div class="down">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
</div>

</div> */

