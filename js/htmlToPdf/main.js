/**
 * liyong 2018/3/13
 * html先转化为canvas，再将canvas添加到pdf图片中
 **/

var pdfName;
$(document).ready(function () {
  $('#renderPdf').on('click', function () {
    //删除页面中隐藏的元素，如果不隐藏，打印出来的pdf文件可能包含此dom
    /*$("#qyjxpjzdContent").find("*").each(function(){
        if($(this).css("display")=="none"){
             $(this).remove();
        }
    })*/
    pdfName = $(this).attr('data-companyName') + '-' + $(this).attr('data-name')


    var targetDom = $('#qyjxpjzdContent')
    var svg = $('#qyjxpjzdContent').find('svg');
    var svgParentNode = svg.parent();

    //因为html2canvas 不能完全识别svg或者不识别svg中部分元素的属性，如:entirety.html页面中的filter、text-anchor  ,所以要将svg先转成canvas
    if (svg.length > 0) {
      svg2canvas(targetDom);
    }
    htmlToPdf(targetDom);

    setTimeout(function () {
      svgParentNode.empty().append(svg);
    }, 500)
  })
})

function svg2canvas(targetElement) {
  var svgElement = targetElement.find('svg')
  svgElement.each(function (index, node) {
    var parentNode = node.parentNode
    //因为ie浏览器不能直接取svg的内容，所以先新建一个临时div
    var temporary = document.createElement('div') //临时div
    temporary.appendChild(node)
    var svg = temporary.innerHTML
    var canvas = document.createElement('canvas');
    canvg(canvas, svg) //用引入的canvg2.js中的 canvg函数转化svg
    parentNode.insertBefore(canvas, parentNode.childNodes[0])
  })

  //TODO:多个svg
}




function htmlToPdf(dom) {
  var myDate = new Date()
  var timeStr = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
  html2canvas(dom, {
    background: '#fff',
    onrendered: function (canvas) {
      var leftHeight = canvas.height;
      var position = 0
      var a4Width = 595.28
      var a4Height = 841.89
      var a4HeightRef = Math.floor(canvas.width / a4Width * a4Height);
      var pageData = canvas.toDataURL('image/jpeg', 1.0)
      var pdf = new jsPDF('x', 'pt', 'a4')
      var index = 0,
        canvas1 = document.createElement('canvas'),
        height;

      pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen')
      $('body').append($(
        '<div class="pdfTip">' +
        '   <div>正在生成第<span class="pdfProgress">1</span>页，共<span class="pdfTotal"></span>页...' +
        '</div>'));

      function createImpl(canvas) {
        if (leftHeight > 0) {
          index++;

          var checkCount = 0;
          if (leftHeight > a4HeightRef) {
            var i = position + a4HeightRef;
            for (i = position + a4HeightRef; i >= position; i--) {
              var isWrite = true
              for (var j = 0; j < canvas.width; j++) {
                var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data

                if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                  isWrite = false
                  break
                }
              }
              if (isWrite) {
                checkCount++
                if (checkCount >= 10) {
                  break
                }
              } else {
                checkCount = 0
              }
            }
            height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
            if(height<=0){
              height = a4HeightRef;
            }
          } else {
            height = leftHeight;
          }

          canvas1.width = canvas.width;
          canvas1.height = height;

          // console.log(index, 'height:', height, 'pos', position);

          var ctx = canvas1.getContext('2d');
          ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);

          var pageHeight = Math.round(a4Width / canvas.width * height);
          pdf.setPageSize(null, pageHeight)
          pdf.addPage();
          pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, a4Width, a4Width / canvas1.width * height)
          leftHeight -= height;
          position += height

          $('.pdfProgress').text(index + 1);
          $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef))
          if (leftHeight > 0) {
            setTimeout(createImpl, 500, canvas);
          } else {
            pdf.save(pdfName + '.pdf')
            $('.pdfTip').hide();
          }
        }
      }

      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < a4HeightRef) {
        pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, a4Width / canvas.width * leftHeight);
        pdf.save(pdfName + '.pdf')
      } else {
        try {
          pdf.deletePage(0);
          $('.pdfTip').show();
          $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
          setTimeout(createImpl, 500, canvas);
        } catch (err) {
          console.log(err);
        }
      }

    }
  })
}