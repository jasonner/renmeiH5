const isNullOrEmpty = function(val) {
    if (val == null || val == "" || typeof(val) == undefined) {
        return true;
    } else {
        return false;
    }
}

const timeFormat = (value, format) => {
    let date = new Date(value);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let result = "";
    if (format == undefined) {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
        h < 10 ? "0" + h : h
      }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format == "yyyy-mm-dd") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    if (format == "yyyy.mm.dd") {
        result = `${y}.${m < 10 ? "0" + m : m}.${d < 10 ? "0" + d : d}`;
    }
    if (format == "yyyy-mm") {
        result = `${y}-${m < 10 ? "0" + m : m}`;
    }
    if (format == "mm-dd") {
        result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
    }
    if (format == "hh:mm") {
        result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
    }
    if (format == "mm:ss") {
        result = ` ${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format == "yyyy") {
        result = `${y}`;
    }
    return result;
};

const sec_to_time = (sec) => {
	var time = '';
	var hour =  Math.floor(sec / (60*60));
	var min = Math.floor(sec / 60);
	var s = sec % 60;
	if(hour > 0) {
		time = ` ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
	} else {
		time = ` ${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
	}
	return time;
}

const num_to_string = (num) => {
	return 'num'
}
export {
    isNullOrEmpty,
    timeFormat,
    sec_to_time,
    num_to_string
}