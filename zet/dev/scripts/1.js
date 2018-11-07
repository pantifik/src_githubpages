var testResult = '';
$(document).ready(function () {
  $("#phoneField").attr("placeholder", "+7 ( 999 ) 999-9999").mask("+9 (999) 999-9999");
  $("#phoneField2").attr("placeholder", "+7 ( 999 ) 999-9999").mask("+9 (999) 999-9999");
  $(".test input").change(function (i) {
    var inputQuantity = 0, current = "", next = "";
    separat = ", ";
    inputQuantity = $(".test input:checked").length;
    testResult += inputQuantity + '-' + $(this).data("variant") + separat;
    current = ".test-item:nth-child(" + inputQuantity + ")";
    next = ".test-item:nth-child(" + (++inputQuantity) + ")";
    if (inputQuantity < 9) {
      $(current).animate({margintop: "-500px", opacity: 0}, 300);
      $(current).hide(300);
      $(next).show(1000);
      $(".count-answer span").html(inputQuantity);
    }
    if (inputQuantity == 9) {
      $(".btn-answer button").removeAttr("disabled").removeClass('dis-btn');
    }
  });
  $(".btn-answer button").on("click", function () {
    $('.btn-answer').hide();
    getResult();
  });
  $("#orderForm").validate({
    rules: {
      phone: {
        required: true, minlength: 11, normalizer: function (value) {
          var val = value.replace(/\D/gi, '');
          return val;
        }
      }, fio: {required: false}, webmasterID: {required: false}, additional12: {required: false}
    },
    messages: {phone: "Неверный формат телефона! Пример: +7 (999) 999-9999", name: "Пожалуйста укажите ваше имя !"},
    submitHandler: function (form) {
      var check = checkPhone(form);
      if (check) {
        form.submit();
      }
    }
  });
  $("#orderForm2").validate({
    rules: {
      phone: {
        required: true, minlength: 11, normalizer: function (value) {
          var val = value.replace(/\D/gi, '');
          return val;
        }
      }, fio: {required: false}, webmasterID: {required: false}, additional12: {required: false}
    }, messages: {phone: "Пожалуйста укажите ваш телефон !"}, submitHandler: function (form) {
      var check = checkPhone(form);
      if (check) {
        form.submit();
      }
    }
  });
});

function checkPhone(form) {
  var curForm = $(form), userPhone = curForm.find("input[name=phone]").val().replace(/\D/gi, ''),
    check = ($.cookie(userPhone)) ? true : false,
    error = '<label id="phoneField-error" class="error" for="phoneField">Вы уже оставляли заявку с этим номером телефона.</label>';
  if (check) {
    curForm.find("input[name=phone]").removeClass("valid").addClass("error").after(error);
    userPhone, curForm = null;
    return false;
  } else {
    $.cookie(userPhone, '1', {expires: 1});
    userPhone, curForm = null;
    return true;
  }
}

function getResult() {
  var testCount = 0;
  $(".test input:checked").each(function () {
    testCount = testCount + +$(this).val();
  });
  if (testCount <= 17) {
    testResult += 'O-A';
    $("#answer").html("У вас низкий риск развития варикоза - необходима только профилактика, предупреждающая венозные  нарушения. Для профилактических целей    вам будет достаточно пройти курс Вариоль в течение 14 дней.");
  }
  else if (17 < testCount && testCount <= 30) {
    testResult += 'O-Б';
    $("#answer").html("Вам необходимо регулярно проверять состояние своих вен и капилляров, проводить визуальную домашнюю диагностику и посещать врача. Вероятно, у вас уже имеется варикоз, однако на данной начальной стадии есть значительная вероятность вернуться к здоровой жизни. Для нормализации  состояния вашей сосудистой системы, вам необходимо пройти курс Вариоль в течение 42 дней.");
  }
  else if (30 <= testCount && testCount <= 38) {
    testResult += 'O-В';
    $("#answer").html("Варикоз уже дает о себе знать. Резко ограничьте, а лучше – исключите курение и употребление алкоголя, чаще отдыхайте, включите в свой режим дня регулярные умеренные физические нагрузки. Настоятельная рекомендация врачей для вашего  состояния -  стандартный курс Вариоль в течение 42 дней.");
  }
  else if (testCount > 38) {
    testResult += 'O-Г';
    $("#answer").html("У вас есть серьезные риски проявления осложнений варикоза в самое ближайшее время. Необходимо кардинально пересмотреть свой образ жизни и сконцентрировать свое внимание на корректном лечении. Основная рекомендация для вас – усиленный курс Вариоль в   течение 63 дней.");
  }
  ;$("#test-res").attr("value", testResult);
  $(".test-item:nth-child(8)").hide(300);
  $(".test").css("minHeight", 0);
  $("#answer").show(500);
  $(".hideForm").show(500);
}