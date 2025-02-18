var dt = new Date();
function getDate()
{
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    //По надобности условие ниже повторить с minutes и hours
    if(seconds < 10)
    {
        seconds = '0' + seconds;
    }
    if(minutes < 10)
    {
        minutes = '0' + minutes;
    }
    if(hours < 10)
    {
        hours = '0' + hours;
    }
    if(day < 10)
    {
        day = '0' + day;
    }
    if(month < 10)
    {
        month = '0' + month;
    }
    document.getElementById('datetime').innerHTML = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
setInterval(getDate, 0);