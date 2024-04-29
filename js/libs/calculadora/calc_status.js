$(document).ready(function () {
  $calc_display = localStorage.getItem("calc_display");
  $calc_min = localStorage.getItem("calc_min");

  // Verifica o status final da calculadora

  if ($calc_display == "true") {
    $("#keyPad").show();
    $(".calc_area").css("display", "flex");

    if ($calc_min == "true") {
      $(".calc_min").click();
    }
  } else {
    $("#keyPad").hide();
    $(".calc_area").hide();
  }
});
