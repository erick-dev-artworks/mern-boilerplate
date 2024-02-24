
module.exports = function generateTime(time){
    var second = time % 60;
    var minute = Math.floor(time / 60) % 60;
    var hour = Math.floor(time / 3600) % 24;
    var days = Math.floor(time / 86400);

    second = (second < 10) ? '0'+second : second;
    minute = (minute < 10) ? '0'+minute : minute;
    hour = (hour < 10) ? '0'+hour : hour;
    day = (days < 10) ? '0'+ days : days;

    return day + ':' + hour + ':' + minute + ':' + second
}