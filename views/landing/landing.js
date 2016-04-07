'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$('#sliderContent').bxSlider({
  auto: true,
  mode: 'horizontal',
  captions: true
});

$(".each").click(function () {
  $(".each").removeClass("selected");
  $(this).toggleClass("selected");
});

$(".btn-tog").click(function () {
  $(this).toggleClass("selected");
  $(".ans-row").toggleClass("selected");
});

$(".reply-row").click(function () {});
//show hover like dislike
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//notification
$('.noti-icon-area').click(function () {
  $(this).toggleClass("selected");
  $('#show-noti').toggleClass("selected");
});

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New message to ' + recipient);
  modal.find('.modal-body input').val(recipient);
});

$('#login-container').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New message to ' + recipient);
  modal.find('.modal-body input').val(recipient);
});

window.randomize = function () {
  $('.radial-progress').each(function () {
    var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];
    $(this).find('span').fadeTo('slow', 1);
    var score = $(this).data('score');
    var deg = 100 / 5 * score / 100 * 180;
    var rotation = deg;
    var fill_rotation = rotation;
    var fix_rotation = rotation * 2;
    for (var i in transform_styles) {
      $(this).find('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
      $(this).find('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
    }
  });
};
setTimeout(window.randomize, 200);

var Resize = (function () {
  function Resize() {
    _classCallCheck(this, Resize);
  }

  _createClass(Resize, [{
    key: 'head',
    value: function head() {

      var $top = $('#head');
      var width = $top.find('.wrapper').width();
      var $top = $top.find('.logo');
      var winH = $(window).height() - 100;
      var winW = $(window).width();
      var logoWidth = Math.min(winH, winW);
      var logoHeight = logoWidth + 60;
      var fixWidth = logoWidth / 900;

      $("#head").css('height', winH + 100);
      if (winH > logoHeight) {
        $('#head .logo').css('margin', winH - logoHeight + "px 0");
      } else {
        $('#head .logo').css('margin', 0);
      }

      var ratio = 1;
      if (width > logoWidth) {
        $('#head .wrapper').css({
          'left': (width - logoWidth) / 2,
          'height': logoHeight
        });
      } else {
        var ratio = width / logoWidth;
        $('#head .wrapper').css({
          'left': 0,
          'height': logoHeight * ratio
        });
      }

      var conf = [900, 600, 600, 600, 480, 420];

      var conf2 = [[210, 77, -360, 1.5], [515, 190, 0, 1.5],
      //[900,200,280,1],
      [200, 100, 330, 1.5], [30, 14, 460, 4]];

      var $div = $top;
      for (var i = 0; i < conf.length; i++) {
        $div = $div.children('div');
        var shift = 0;
        if (i > 0) shift = (conf[i - 1] - conf[i]) / 2;
        $div.css({
          'left': shift * ratio * fixWidth,
          'top': shift * ratio * fixWidth,
          'width': conf[i] * fixWidth * ratio,
          'height': conf[i] * fixWidth * ratio
        });
      }

      for (var i = 0; i < conf2.length; i++) {
        var w = conf[conf.length - 1];
        var ratio2 = conf2[i][3];
        var shiftW = (w - conf2[i][0] * ratio2) / 2;
        var shiftH = (w - conf2[i][1] * ratio2) / 2;
        $div.children('div:eq(' + i + ')').css({
          'left': shiftW * ratio * fixWidth,
          'top': shiftH * ratio * fixWidth + conf2[i][2] * fixWidth * ratio,
          'width': conf2[i][0] * fixWidth * ratio * ratio2,
          'height': conf2[i][1] * fixWidth * ratio * ratio2
        });
      }
    }
  }, {
    key: 'sponsor',
    value: function sponsor() {
      $.each($('#sponsor').find('.big,.medium,.small'), function (id, $elm) {
        $elm = $($elm);
        var w = $elm.parent().width();
        $elm.css({
          'width': w,
          'height': w,
          'padding': w / 200 * 16
        });
      });
    }
  }, {
    key: 'guru',
    value: function guru() {

      var w = $('#guru .ground').parent().width();

      if ($('#guru').width() < 768) return;

      var wr = 716;
      var hr = 498;
      var p = Math.min(1, w / wr) * 20;
      var img = 60;
      w -= p * 2;

      var ratio = w / wr;
      var $top = $('#guru');
      $top.find('.ground-wrapper').css({
        'padding-top': 10 + p,
        'padding-bottom': 50 + p
      });
      $top.find('.ground').css({
        'width': wr * ratio,
        'height': hr * ratio,
        'display': 'block'
      });

      var fullPosW = 900;
      var fullPosH = 625.978;
      var pos = [[295, -8], [445, 28], [585, -2], [635, 108], [770, 228], [765, 338], [615, 378], [595, 518], [475, 528], [230, 458], [55, 328], [85, 118]];

      for (var i = 0; i < pos.length; i++) {
        $top.find('.img[data-img="' + (i + 1) + '"]').css({
          'width': img * ratio,
          'height': img * ratio,
          'left': (pos[i][0] - img / 2 + 50) / fullPosW * wr * ratio,
          'top': (pos[i][1] - img / 2 + 50) / fullPosH * hr * ratio
        });
      }

      $top.find('.img[data-img="line"]').hide();

      $top.find('.description').css({
        'font-size': 1 * ratio + 'rem',
        'padding': 12 * ratio,
        'border-radius': 20 * ratio,
        'width': 300 * ratio,
        'height': 100 * ratio,
        'left': ((fullPosW - 300) / 2 - 80) * ratio,
        'top': ((fullPosH - 200) / 2 - 30) * ratio
      });
    }
  }, {
    key: 'timeline',
    value: function timeline() {
      var $top = $('#timeline .timeline-pic');
      var w = $top.parent().width();
      $top.css({
        'left': Math.max(0, (w - 940) / 2)
      });
    }
  }, {
    key: 'place',
    value: function place() {
      var $top = $('#place .map');
      var w = $top.parent().width();
      var h = w / 1036 * 357;
      if (w < 768) {
        h = w / 500 * 357;
      }
      $top.css({
        'width': w,
        'height': h
      });
      var $img = $top.find('img');
      var imgW = w / 3;
      if (w < 768) {
        imgW = w / 1.5;
      }
      var imgH = imgW / 2470 * 1783;
      $top.find('img').css({
        'position': 'absolute',
        'width': imgW,
        'height': imgH,
        'left': (w - imgW) / 2,
        'top': (h - imgH) / 2
      });
    }
  }, {
    key: 'nav',
    value: function nav() {
      $('nav').css({
        'width': $('body').width()
      });
    }
  }, {
    key: 'all',
    value: function all() {
      this.head();
      this.sponsor();
      this.guru();
      this.timeline();
      this.place();
      this.nav();
    }
  }]);

  return Resize;
})();

var Scroll = (function () {
  function Scroll() {
    _classCallCheck(this, Scroll);

    this.parallaxItv = 0;
    this.navbarDir = 0;
    this.prevScroll = 0;
  }

  _createClass(Scroll, [{
    key: 'parallax',
    value: function parallax() {
      if ($(window).width() <= 991) return;

      clearInterval(this.parallaxItv);

      this.parallaxItv = setTimeout(function () {
        var ratio = [0.05, 0.1, 0.2];
        var relative = 0;
        var $top = $('body');
        for (var i = 0; i < 3; i++) {
          relative += ratio[i];
          $top = $top.children('.bg-parallax');
          $top.css({
            'background-position': '0px ' + $(window).scrollTop() * -relative + 'px'
          });
        }
      }, 0);
    }
  }, {
    key: 'navbar',
    value: function navbar() {
      //var cur = $(window).scrollTop();
      var cur = $(window);
      var prev = this.prevScroll;
      this.prevScroll = cur;
      var threshold = 5;

      clearTimeout(this.navbarItv);
      // if( cur < threshold ) {
      //   $('nav').stop().fadeOut();
      //   this.navbarDir = 0;
      // } else if( cur < 1000 ) {
      //   if( this.navbarDir == 2 ) return ;
      //   $('nav').stop().fadeIn();
      //   this.navbarDir = 2;
      // } else if( cur < prev - threshold ) {
      //   if( this.navbarDir == 1 ) return ;
      //   $('nav').stop().fadeIn();
      //   this.navbarDir = 1;
      // } else if( cur > prev + threshold ) {
      //   if( this.navbarDir == -1 ) return ;
      //   $('nav').stop().fadeOut();
      //   this.navbarDir = -1;
      // }

      if (cur < threshold) {
        $('nav').stop().fadeOut();
      } else {
        $('nav').stop().fadeIn();
      }
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo($elm) {
      $('html, body').stop().animate({
        scrollTop: $($elm).offset().top - 70
      }, 1000);
    }
  }]);

  return Scroll;
})();

var Interact = (function () {
  function Interact() {
    _classCallCheck(this, Interact);
  }

  _createClass(Interact, [{
    key: 'qaSetup',
    value: function qaSetup() {
      var $btn = $('#qa .btn img');
      var $content = $('#qa .begin');
      $btn.click(function () {
        console.log($btn.hasClass('on'));
        if ($btn.hasClass('on')) {
          $btn.removeClass('on');
          $content.stop().slideDown(500);
          $btn.fadeOut(function () {
            $btn.attr('src', '../images/landing/qa/btn-off.png').fadeIn();
          });
        } else {
          $btn.addClass('on');
          $content.stop().slideUp(500);
          $btn.fadeOut(function () {
            $btn.attr('src', '../images/landing/qa/btn-on.png').fadeIn();
          });
        }
      });
    }
  }, {
    key: 'guruSetup',
    value: function guruSetup() {
      var _loop = function (i) {
        $('#guru .img[data-img="' + (i + 1) + '"]').css({
          'cursor': 'pointer'
        }).click(function () {

          var isLargeScreen = $('#guru').width() > 991;

          if (isLargeScreen) {
            var ratio;
            var left;
            var top;
            var fixW;

            (function () {
              ratio = $('#guru .ground').parent().width() / 716;

              resize.guru();
              var $elm = $('#guru .img[data-img="' + (i + 1) + '"]');
              var w = $elm.width();
              left = parseInt($elm.css('left'));
              top = parseInt($elm.css('top'));
              fixW = 80 * ratio;

              $elm.stop().animate({
                'width': fixW,
                'height': fixW,
                'left': left + (w - fixW) / 2,
                'top': top + (w - fixW) / 2
              }, function () {
                var linePadding = 16 * ratio;
                $('#guru .img[data-img="line"]').css({
                  'width': fixW + linePadding,
                  'height': fixW + linePadding,
                  'left': left + (w - linePadding + 1 * ratio - fixW) / 2,
                  'top': top + (w - linePadding + 1 * ratio - fixW) / 2
                }).show();
              });
            })();
          }

          var des = ["<div class='font-bold'>คุณขจร เจียรนัยพานิชย์</div><br>บล็อกเกอร์ชื่อดัง ผู้ก่อตั้งเว็บไซด์ MacThai และ แฟนพันธุ์แท้สตีฟ จ็อบส์ 2012", "<div class='font-bold'>คุณปกรณ์ สันติสุนทรกุล</div><br>เจ้าของ Dek-D เว็บไซต์วัยรุ่นอันดับ 1 ของเมืองไทยยาวนานตลอดกาล", "<div class='font-bold'>คุณศิวัตร เชาวรียวงษ์</div><br>CEO mInteraction สุดยอดผู้นำโฆษณาออนไลน์ และการตลาดสมัยใหม่", "<div class='font-bold'>คุณจักรพงษ์ คงมาลัย</div>Vice President - Content & Business Development at Sanook Online Limited และบรรณาธิการเว็บไซต์ข่าวและบทความธุรกิจดิจิตอล thumbsup.in.th", "<div class='font-bold'>คุณศิระ สัจจินานนท์</div><br>Developer ระดับเทพของไทย CTO ของบริษัท jitta.com", "<div class='font-bold'>พ.ต.อ.ญาณพล ยั่งยืน</div><br>รองอธิบดีกรมสอบสวนคดีพิเศษ อดีตนายกสมาคมผู้ดูแลเว็บไทย", "<div class='font-bold'>คุณวโรรส โรจนะ</div><br>เว็บมาสเตอร์และผู้ร่วมก่อตั้ง Dek-D เว็บไซต์วัยรุ่นอันดับ 1 ของเมืองไทยยาวนานตลอดกาล", "<div class='font-bold'>คุณอัครวุฒิ ตำราเรียง</div><br>ตำนาน Open Source เมืองไทย และผู้เชี่ยวชาญ Content Management System", "<div class='font-bold'>คุณภาวุธ พงษ์วิทยภานุ</div><br>กูรู ด้าน E-Commerce ระดับเมืองไทย ผู้ก่อตั้ง เว็บไซต์ Tarad.com", "<div class='font-bold'>คุณศุภเดช สุทธิพงศ์คณาสัย</div><br>พิธีกรรายการไอทีชั้นนำแบไต๋ ไฮเทคและผู้เชี่ยวชาญด้าน Network และ Security", "<div class='font-bold'>คุณเจริญ ลักษณ์เลิศกุล</div><br>สุดยอดผู้บริหารเว็บไซต์ และนักการตลาดออนไลน์ ผู้คร่ำหวอดในวงการไอทีเมืองไทย", "<div class='font-bold'>คุณอภิศิลป์ ตรุงกานนท์</div><br>นายกสมาคมผู้ดูแลเว็บไทย และ Product Development Manager เว็บไซต์ Pantip.com"];

          if (!isLargeScreen) {
            des[i] = des[i].replace('<br>', '');
          }
          $('#guru .description').show().html(des[i]);
        });
      };

      for (var i = 0; i < 12; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'map',
    value: function map() {
      $("#place .map .btn").hide();
      $('#place .map .show').html('<iframe frameborder="0" style="border:0; width:100%; height:100%;"' + 'src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3875.5586324742408!2d100.5652988!3d13.7451508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lio4Lij4Li14LiZ4LiE4Lij4Li04LiZ4LiX4Lij4Lin4Li04LmC4Lij4LiS!5e0!3m2!1sth!2sth!4v1441902157158" allowfullscreen></iframe>');
    }
  }]);

  return Interact;
})();

$(function () {
  var resize = new Resize();
  var scroll = new Scroll();
  var interact = new Interact();

  resize.all();
  //$('nav').hide();

  window.onresize = function () {
    resize.all();
  };

  $(window).on('scroll', function () {
    scroll.parallax();
    scroll.navbar();
  });

  interact.guruSetup();
  interact.qaSetup();

  $('#head .next').click(function () {
    scroll.scrollTo('#categories .title-head-large');
  });
  $('nav .register').click(function () {
    scroll.scrollTo('#categories .title-head-large');
  });
  $('nav .detail').click(function () {
    scroll.scrollTo('#whatis');
  });
  $('nav .contact').click(function () {
    scroll.scrollTo('footer');
  });
  $('#place .map').click(function () {
    interact.map();
  });
});