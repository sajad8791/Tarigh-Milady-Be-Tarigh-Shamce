
var now =  new Date();
var hour = now.getMonth();

var convert_btn = document.getElementById("convert-output")
var input_date = document.getElementById("input-date")

convert_btn.addEventListener("click", function (){
  var input = input_date.value.split("-")
  
  var outputSpan = document.querySelectorAll("#time-output span");

  result = gregorian_to_jalali(parseInt(input[0]), parseInt(input[1]), parseInt(input[2]))

  delay = 0;
  for (let index = 0; index < outputSpan.length; index++) {
    outputSpan[index].innerText = result[index]
    outputSpan[index].style.animation = "fade-up 1s 1 forwards";
    outputSpan[index].style.animationDelay = delay+"s";
    delay+= 1;
  }
});

function gregorian_to_jalali(gy, gm, gd) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = (gm > 2) ? (gy + 1) : gy;
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * ~~(days / 12053));
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}