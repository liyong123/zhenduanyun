  // 页面加载
  let companyList;
  let evaluating_type = 0;
  let evaluatingCompany;

  $(function () {
      $('#hint').text('');
      companyList = [];

      app.DataRequest(URL + 'companyInternetRoll/checkAuthority', {}, function (err) {}, function (data) {
          let companyData = data[0].company;
          let option_text;
          if (companyData.specialist == 0) {
              $('#evaluating_type').text('企业评测');
              $("#firm_name").attr("disabled", true);
              $("#makeupCo").val(companyData.name).attr("disabled", true);
              evaluatingCompany = companyData.id
          } else if (companyData.specialist == 1) {
              evaluating_type = 1
              companyList = data[0].companyList;
              $('#evaluating_type').text('专家评测');
              for (let i = 0; i < companyList.length; i++) {
                  companyListArry.push(companyList[i])
                  if (companyList[i].name) {
                      option_text += '<option value="' + companyList[i].id + '">' +
                          companyList[i].name +
                          '</option>';
                  }
              }
              $('#firm_name').html(option_text);
          }
      })
  })


  //日期控件
  $(".form_datetime").datetimepicker({
      language: 'zh-CN',
      format: 'yyyy-mm-dd', //显示格式
      todayHighlight: 1, //今天高亮
      minView: "month", //设置只显示到月份
      startView: 2,
      forceParse: 0,
      showMeridian: 1,
      autoclose: 1 //选择后自动关闭,
  });

  // 默认时间
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
      month = "0" + month;
  }
  if (day < 10) {
      day = "0" + day;
  }
  let nowDate = year + "-" + month + "-" + day;
  $(".form_datetime").attr('value', nowDate);

  //  选择制造类型
  let selectType; // 1离散型  2流程型
  $('#disperse').click(function () {
      selectType = 1;
      $(this).find('i').addClass('active');
      $('#flow').find('i').removeClass('active');
  })
  $('#flow').click(function () {
      selectType = 2;
      $(this).find('i').addClass('active');
      $('#disperse').find('i').removeClass('active');
  })

  // 模糊查询输入时触发
  let companyListArry = [];

  $('#makeupCo').keyup(function () {
      if (evaluating_type == 1) {
          $("#firm_name").css({
              "display": ""
          });
          let valuesIN = $(this).val();
          let option_text =
              '<option value="" disabled selected style="display:none;color:#d0d0d0;">请输入企业名称</option>';
          if (valuesIN != null) {
              for (let i = 0; i < companyList.length; i++) {
                  //如果字符串中不包含目标字符会返回-1
                  if (!companyList[i].name || companyList[i].name.indexOf(valuesIN) == -1) {
                      continue;
                  } else {
                      companyListArry.push(companyList[i])
                      if (companyList[i].name) {
                          option_text += '<option value="' + companyList[i].id + '">' +
                              companyList[i].name +
                              '</option>';
                      }
                  }
              }
          } else {
              for (let i = 0; i < companyList.length; i++) {
                  companyListArry.push(companyList[i])
                  if (companyList[i].name) {
                      option_text += '<option value="' + companyList[i].id + '">' +
                          companyList[i].name +
                          '</option>';
                  }
              }
          }
          $('#firm_name').html(option_text);
      }

  });

  // 模糊查询
  function changeF(this_) {
      if (evaluating_type == 1) {
          $(this_).prev("input").val($(this_).find("option:selected").text());
          $("#firm_name").css({
              "display": "none"
          });
      }
  }

  function setfocus(this_) {
      if (evaluating_type == 1) {
          $("#firm_name").css({
              "display": ""
          });
      }
  }

  // 开始评测
  $('#began_review').click(function () {
      $('#hint').text('');
      if (evaluating_type == 1) {
          evaluatingCompany = $('#firm_name').val();
      }

      let quest = {
          job: $('#job').val(),
          manufactureType: selectType,
          evaluatingTime: $('#homeJxMonth').val(),
          evaluatingPeople: $('#people_name').val(),
          evaluatingCompany: evaluatingCompany,
          questionRollId: 'WJ009'
      }

      //   console.log(quest)

      if (quest.evaluatingTime == "") {
          $('#hint').text('评测日期不能为空');
          return;
      }
      if (!selectType) {
          $('#hint').text('请选择制造类型');
          return;
      }

      if ($('#people_name').val() == "") {
          $('#hint').text('评测人姓名不能为空');
          return;
      }
    //   if ($('#people_name').val().length > 20) {
    //       $('#hint').text('输入的字符串超过20字符');
    //       return;
    //   }
      if (quest.job == "") {
          $('#hint').text('评测职位不能为空');
          return;
      }
      if ($('#evaluating_type').text() == '专家评测' && quest.evaluatingCompany == null) {
          $('#hint').text('评测单位不能为空');
          return;
      }

      app.DataRequest(URL + 'companyInternetRoll/createInternetEvaluating', quest, function (err) {}, function (data) {
          if (data[0].status == 1) {
              localStorage.setItem('internerCompanyId', data[0].companyInternetRoll.id)
              location.href = './internetOptions.html'
          }
      })
  })

  $('#return_back').click(function(){
      location.href = './list.html'
  })