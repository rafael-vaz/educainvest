$(document).ready(function () {
  // Draggable Function

  $("#keyPad").draggable({
    start: function () {
      $(this).css({ height: "auto", width: "463px" });
    },
    stop: function () {
      $(this).css({ height: "auto", width: "463px" });
    },
  });

  $("#keyPad").draggable({
    cursor: "move",
    containment: ".calc_area",
  });

  // Minimize Function

  $(".calc_min").click(function () {
    $("#mainContentArea").toggle();
    $("#keyPad_Help").hide();
    $("#keyPad_Helpback").hide();
    $(".help_back").hide();
    $("#keyPad").addClass("reduceWidth");
    $("#helptopDiv span").addClass("reduceHeader");
    $(this).hide();

    $(".calc_max").show();

    $(".calc_area").addClass("minimize-area");

    // Desativa o draggable ao minimizar

    $("#keyPad").draggable("disable");

    $("#keyPad").addClass("minimize");

    localStorage.setItem("calc_min", true);
  });

  // Maximize Function

  $(".calc_max").click(function () {
    $("#mainContentArea").toggle();
    if ($("#helpContent").css("display") == "none") {
      $("#keyPad_Help").show();
    } else {
      $("#keyPad_Helpback").show();
    }

    if ($("keyPad_Helpback").css("display") == "none") {
      $("#keyPad_Help").show();
    }

    $("#keyPad").removeClass("reduceWidth");
    $("#helptopDiv span").removeClass("reduceHeader");

    $(this).hide();

    $(".calc_min").show();

    $(".calc_area").removeClass("minimize-area");

    $("#keyPad").removeClass("minimize");
    $("#keyPad").draggable("enable");

    localStorage.setItem("calc_min", false);
  });

  // Close Function

  $("#closeButton").click(function () {
    $(".calc_area").hide();

    $("#keyPad").fadeOut(400).hide();

    localStorage.setItem("calc_display", false);
  });
});

// Show Function

$(".ferramentas .calc").click(function () {
  $(".calc_area").css("display", "flex");

  $("#keyPad").fadeIn(400).show();

  localStorage.setItem("calc_display", true);
});

/** new help changes **/
$("#keyPad_Help").click(function () {
  $(this).hide();
  $("#keyPad_Helpback").show();
  $("#main-content").hide();
  $("#keyPad_UserInput1").hide();
  $("#helpContent").show();
});

$("#keyPad_Helpback").click(function () {
  $(this).hide();
  $("#keyPad_Help").show();
  $("#main-content").show();
  $("#keyPad_UserInput1").show();
  $("#helpContent").hide();
});

// Radio Deg or Rad

$(document).ready(function () {
  $("#btn-deg").click(function () {
    $("#radio-deg").prop("checked", true);
  });

  $("#btn-rad").click(function () {
    $("#radio-rad").prop("checked", true);
  });
});

// Switch Buttons (Mobile)

$(document).ready(function () {
  $("#normal-button").click(function () {
    $(".regular").show();
    $(".advanced").hide();
  });

  $("#advanced-button").click(function () {
    $(".regular").hide();
    $(".advanced").show();
    $("#degree_radian").css("display", "flex");
  });
});
