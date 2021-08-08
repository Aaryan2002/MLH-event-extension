// gets the parent div containing the date and time 
let parentDiv = document.getElementsByClassName("my-1")[0];
// gets the second child of parent div which is the div containing the time
let timeDiv = parentDiv.children[1];
// gets the start time span tag
let startTimeSpan = timeDiv.children[0];
// gets the start time string
let TimeString = startTimeSpan.innerHTML;
let array = TimeString.split(":");
var hour = parseInt(array[0]);
var minute = parseInt(array[1].substring(0,2));
var period = array[1].substring(2,4); // AM or PM 
edtToIst();
// change the updated values of start time on the page
startTimeSpan.innerHTML = timeString();
// Again the whole process for endTime 
let endTimeSpan = timeDiv.children[3];
 TimeString = endTimeSpan.innerHTML;
 array = TimeString.split(":");
 hour = parseInt(array[0]);
 minute = parseInt(array[1].substring(0,2));
 period = array[1].substring(2,4); // AM or PM 
edtToIst();
endTimeSpan.innerHTML = timeString();

// change EDT span to IST 
let periodTimeSpan = timeDiv.children[5];
periodTimeSpan.innerHTML = 'IST';

// functions 
//..

//converts the EDT to IST
function edtToIst(){
    minute += 30;
    if (minute>= 60){
        minute-=60;
        hour++;
    }
    hour += 9;
    if(hour >12){
        hour -= 12;
        if(period == 'AM'){
            period = "PM";
        }
        else {
            period = "AM";
            // have to change the date too!
            changeDate();
        }
    }
}

//creates the formatted time string 
function timeString(){
    var str = hour.toString() + ":";
    if(minute<=9){
        str += "0";
    }
    str+= minute.toString();
    str += period;
    return str;
}

// change the date to the next day 
function changeDate(){
    // start day meta data tag contains the date 
    let metaData = timeDiv.children[1];
    let dateArray = (metaData.content.split(" ")[0]).split("-");
    let month = dateArray[1] - 1;
    let date = new Date(dateArray[0],month,dateArray[2]);
    date.setDate(date.getDate()+1);
    let dateDiv = parentDiv.children[0];
    dateDiv.innerHTML = date.toDateString();
}