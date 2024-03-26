let taskList = []

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; 
let yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
let datelog = today; 

const storeTasksInLocalStorage = function() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}
const retrieveTasksFromLocalStorage = function() {
    const storedDataString = localStorage.getItem('taskList');

    if (storedDataString) {
        taskList = JSON.parse(storedDataString);
    } else {
        console.log("No data found in local storage.");
    }
}


let taskNumber = taskList.length; 

const deleteTask = function (id) {
    taskList = taskList.filter(task => task.taskId !== id);
    storeTasksInLocalStorage(); 
}

const editTask = function (id, action, actionValue) {
    const taskIndex = getIteById(id);
    taskList[taskIndex][action] = actionValue;
    storeTasksInLocalStorage();
}

const addNewTask = function(taskDescription, taskPriority, date, notes) {
    taskList.push({ taskDescription, taskStatus: false, taskPriority, notes, date, taskId: ++taskNumber });
    storeTasksInLocalStorage();
}


const deleteAllTasks = function(){
    taskList.length = 0;
    storeTasksInLocalStorage();
}

const getIteById = function (id) {
    return taskList.findIndex(task => task.taskId === id);
}


let filterTaskList = function(filterBy,filterValue){

    return taskList.filter(function(task){
        return task[filterBy] === filterValue;
    })
    
}

let filterTaskList2 = function(filterBy1, filterValue1, filterBy2, filterValue2) {
    return taskList.filter(function(task){
        return (task[filterBy1] === filterValue1 ) && (task[filterBy2] === filterValue2);
    });
}


let noOfTasks = function(){
    return taskList.length;
}

let noOfIncompleteTasks = function(){

    const totalIncompleteTasks = taskList.reduce((total, task) => !task.taskStatus ? total + 1 : total, 0);
    return totalIncompleteTasks;
}

let noOfCompleteTasks = function(){
    const totalCompleteTasks = taskList.reduce((total, task) => task.taskStatus ? total + 1 : total, 0);
    return totalCompleteTasks;
}

let filterDayBeforeDates = function(){
    return taskList.filter(task => {
        return task.date >= today;
    })
}

retrieveTasksFromLocalStorage()
taskList = filterDayBeforeDates();
storeTasksInLocalStorage();