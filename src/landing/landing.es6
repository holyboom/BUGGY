$('#sliderContent').bxSlider({ 
  auto: true,
  mode: 'horizontal',
  captions: true
});

class Resize {

  head() {

    var $top = $('#head');
    var width = $top.find('.wrapper').width();
    var $top = $top.find('.logo');
    var winH = $(window).height() - 100;
    var winW = $(window).width();
    const logoWidth = Math.min( winH, winW );
    const logoHeight = logoWidth + 60;
    var fixWidth = logoWidth / 900;

    $("#head").css('height',winH+100);
    if( winH > logoHeight ) {
      $('#head .logo').css('margin',(winH - logoHeight)+"px 0");
    } else {
      $('#head .logo').css('margin',0);
    }

    var ratio = 1;
    if(width > logoWidth) {
      $('#head .wrapper').css({
        'left' : (width - logoWidth)/2,
        'height' : logoHeight
      });
    } else {
      var ratio = width/logoWidth;
      $('#head .wrapper').css({
        'left':0,
        'height': logoHeight * ratio
      });
    }

    var conf = [
      900,
      600,
      600,
      600,
      480,
      420
    ];

    var conf2 = [
      [210,77,-360,1.5],
      [515,190,0,1.5],
      //[900,200,280,1],
      [200,100,330,1.5],
      [30,14,460,4]
    ]

    var $div = $top;
    for(let i=0; i<conf.length; i++) {
      $div = $div.children('div');
      let shift = 0;
      if(i > 0) shift = (conf[i-1] - conf[i])/2;
      $div.css({
        'left': shift * ratio * fixWidth,
        'top' : shift * ratio * fixWidth,
        'width' : conf[i] * fixWidth * ratio,
        'height' : conf[i] * fixWidth * ratio
      })
    }

    for(let i=0; i<conf2.length; i++) {
      let w = conf[conf.length-1];
      let ratio2 = conf2[i][3];
      let shiftW = (w - conf2[i][0] * ratio2)/2;
      let shiftH = (w - conf2[i][1] * ratio2)/2;
      $div.children('div:eq('+(i)+')').css({
        'left' : shiftW * ratio * fixWidth,
        'top' : shiftH * ratio * fixWidth + conf2[i][2] * fixWidth * ratio,
        'width' : conf2[i][0] * fixWidth * ratio * ratio2,
        'height' : conf2[i][1] * fixWidth * ratio * ratio2
      });
    }
  }

  sponsor() {
    $.each( $('#sponsor').find('.big,.medium,.small'), function(id, $elm) {
      $elm = $($elm);
      let w = $elm.parent().width();
      $elm.css({
        'width':w,
        'height':w,
        'padding' : w/200 * 16
      });
    });
  }

  guru() {

    var w = $('#guru .ground').parent().width();

    if( $('#guru').width() < 768 ) return ;

    var wr = 716;
    var hr = 498;
    var p = Math.min(1,w/wr)*20;
    var img = 60;
    w -= p*2;

    var ratio = w/wr;
    var $top = $('#guru');
    $top.find('.ground-wrapper').css({
      'padding-top' : 10+p,
      'padding-bottom' : 50+p
    });
    $top.find('.ground').css({
      'width' : wr * ratio,
      'height' : hr * ratio,
      'display' : 'block'
    });

    var fullPosW = 900;
    var fullPosH = 625.978;
    var pos = [
      [295,-8],
      [445,28],
      [585,-2],
      [635,108],
      [770,228],
      [765,338],
      [615,378],
      [595,518],
      [475,528],
      [230,458],
      [55,328],
      [85,118]
    ];

    for(let i=0; i<pos.length; i++) {
      $top.find('.img[data-img="'+(i+1)+'"]').css({
        'width' : img * ratio,
        'height' : img * ratio,
        'left' : (pos[i][0] - img/2 + 50) / fullPosW * wr * ratio,
        'top' : (pos[i][1] - img/2 + 50) / fullPosH * hr * ratio
      });
    }

    $top.find('.img[data-img="line"]').hide();

    $top.find('.description').css({
      'font-size' : (1 * ratio)+'rem',
      'padding' : 12 * ratio,
      'border-radius' : 20 * ratio,
      'width' : 300 * ratio,
      'height' : 100 * ratio,
      'left' : ((fullPosW - 300)/2 - 80) * ratio,
      'top' : ((fullPosH - 200)/2 - 30) * ratio,
    });
  }

  timeline() {
    var $top = $('#timeline .timeline-pic');
    var w = $top.parent().width();
    $top.css({
      'left' : Math.max(0,(w-940)/2)
    });
  }

  place() {
    var $top = $('#place .map');
    var w = $top.parent().width();
    var h = w / 1036 * 357;
    if( w < 768 ) {
      h = w / 500 * 357;
    }
    $top.css({
      'width' : w,
      'height' : h
    });
    var $img = $top.find('img');
    var imgW = w / 3;
    if( w < 768 ) {
      imgW = w / 1.5;
    }
    var imgH = imgW / 2470 * 1783;
    $top.find('img').css({
      'position' : 'absolute',
      'width' : imgW,
      'height' : imgH,
      'left' : (w - imgW)/2,
      'top' : (h - imgH)/2
    })
  }

  nav() {
    $('nav').css({
      'width' : $('body').width()
    });
  }

  all() {
    this.head();
    this.sponsor();
    this.guru();
    this.timeline();
    this.place();
    this.nav();
  }
}

class Scroll {

  constructor() {
    this.parallaxItv = 0;
    this.navbarDir = 0;
    this.prevScroll = 0;
  }

  parallax() {
    if( $( window ).width() <= 991 ) return ;

    clearInterval(this.parallaxItv);

    this.parallaxItv = setTimeout(() => {
      var ratio = [0.05,0.1,0.2];
      var relative = 0;
      var $top = $('body');
      for(let i=0; i<3; i++) {
        relative += ratio[i];
        $top = $top.children('.bg-parallax');
        $top.css({
          'background-position' : '0px '+($(window).scrollTop()*-relative)+'px'
        });
      }
    }, 0)

  }

  navbar() {
    var cur = $(window).scrollTop();
    var prev = this.prevScroll;
    this.prevScroll = cur;
    const threshold = 5;

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

    if( cur < threshold ) {
      $('nav').stop().fadeOut();
    } else {
      $('nav').stop().fadeIn();
    }

  }

  scrollTo($elm) {
    $('html, body').stop().animate({
        scrollTop: $($elm).offset().top - 70
    }, 1000);
  }
}

class Interact {
  qaSetup() {
    var $btn = $('#qa .btn img');
    var $content = $('#qa .begin');
    $btn.click(() => {
      console.log($btn.hasClass('on'));
      if( $btn.hasClass('on') ) {
        $btn.removeClass('on');
        $content.stop().slideDown(500);
        $btn.fadeOut(() => {
          $btn.attr('src','../images/landing/qa/btn-off.png').fadeIn();
        });
      } else {
        $btn.addClass('on');
        $content.stop().slideUp(500);
        $btn.fadeOut(() => {
          $btn.attr('src','../images/landing/qa/btn-on.png').fadeIn();
        });
      }
    });
  }

  guruSetup() {
    for(let i=0; i<12; i++) {
      $('#guru .img[data-img="'+(i+1)+'"]').css({
        'cursor' : 'pointer'
      }).click(() => {

        var isLargeScreen = ( $('#guru').width() > 991 );

        if( isLargeScreen ) {
          var ratio = $('#guru .ground').parent().width() / 716;
          resize.guru();
          let $elm = $('#guru .img[data-img="'+(i+1)+'"]');
          let w = $elm.width();
          var left = parseInt($elm.css('left'));
          var top = parseInt($elm.css('top'));
          var fixW = 80 * ratio;

          $elm.stop().animate({
            'width' : fixW,
            'height' : fixW,
            'left' : left + (w - fixW)/2,
            'top' : top + (w - fixW)/2,
          },() => {
            const linePadding = 16 * ratio;
            $('#guru .img[data-img="line"]').css({
              'width' : fixW + linePadding,
              'height' : fixW + linePadding,
              'left' : left + (w - linePadding + 1*ratio - fixW)/2,
              'top' : top + (w - linePadding + 1*ratio - fixW)/2,
            }).show();
          });
        }

        var des = [
          "<div class='font-bold'>คุณขจร เจียรนัยพานิชย์</div><br>บล็อกเกอร์ชื่อดัง ผู้ก่อตั้งเว็บไซด์ MacThai และ แฟนพันธุ์แท้สตีฟ จ็อบส์ 2012",
          "<div class='font-bold'>คุณปกรณ์ สันติสุนทรกุล</div><br>เจ้าของ Dek-D เว็บไซต์วัยรุ่นอันดับ 1 ของเมืองไทยยาวนานตลอดกาล",
          "<div class='font-bold'>คุณศิวัตร เชาวรียวงษ์</div><br>CEO mInteraction สุดยอดผู้นำโฆษณาออนไลน์ และการตลาดสมัยใหม่",
          "<div class='font-bold'>คุณจักรพงษ์ คงมาลัย</div>Vice President - Content & Business Development at Sanook Online Limited และบรรณาธิการเว็บไซต์ข่าวและบทความธุรกิจดิจิตอล thumbsup.in.th",
          "<div class='font-bold'>คุณศิระ สัจจินานนท์</div><br>Developer ระดับเทพของไทย CTO ของบริษัท jitta.com",
          "<div class='font-bold'>พ.ต.อ.ญาณพล ยั่งยืน</div><br>รองอธิบดีกรมสอบสวนคดีพิเศษ อดีตนายกสมาคมผู้ดูแลเว็บไทย",
          "<div class='font-bold'>คุณวโรรส โรจนะ</div><br>เว็บมาสเตอร์และผู้ร่วมก่อตั้ง Dek-D เว็บไซต์วัยรุ่นอันดับ 1 ของเมืองไทยยาวนานตลอดกาล",
          "<div class='font-bold'>คุณอัครวุฒิ ตำราเรียง</div><br>ตำนาน Open Source เมืองไทย และผู้เชี่ยวชาญ Content Management System",
          "<div class='font-bold'>คุณภาวุธ พงษ์วิทยภานุ</div><br>กูรู ด้าน E-Commerce ระดับเมืองไทย ผู้ก่อตั้ง เว็บไซต์ Tarad.com",
          "<div class='font-bold'>คุณศุภเดช สุทธิพงศ์คณาสัย</div><br>พิธีกรรายการไอทีชั้นนำแบไต๋ ไฮเทคและผู้เชี่ยวชาญด้าน Network และ Security",
          "<div class='font-bold'>คุณเจริญ ลักษณ์เลิศกุล</div><br>สุดยอดผู้บริหารเว็บไซต์ และนักการตลาดออนไลน์ ผู้คร่ำหวอดในวงการไอทีเมืองไทย",
          "<div class='font-bold'>คุณอภิศิลป์ ตรุงกานนท์</div><br>นายกสมาคมผู้ดูแลเว็บไทย และ Product Development Manager เว็บไซต์ Pantip.com",
        ]

        if( !isLargeScreen ) {
          des[i] = des[i].replace('<br>','');
        }
        $('#guru .description').show().html(des[i]);
      });

    }
  }

  map() {
    $("#place .map .btn").hide();
    $('#place .map .show').html('<iframe frameborder="0" style="border:0; width:100%; height:100%;"'+
    'src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3875.5586324742408!2d100.5652988!3d13.7451508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lio4Lij4Li14LiZ4LiE4Lij4Li04LiZ4LiX4Lij4Lin4Li04LmC4Lij4LiS!5e0!3m2!1sth!2sth!4v1441902157158" allowfullscreen></iframe>');
  }
}

$(function() {
  var resize = new Resize();
  var scroll = new Scroll();
  var interact = new Interact();

  resize.all();
  //$('nav').hide();

  window.onresize = function() {
    resize.all();
  }

  $(window).on('scroll', function() {
    scroll.parallax();
    scroll.navbar();
  });

  interact.guruSetup();
  interact.qaSetup();

  $('#head .next').click(() => { scroll.scrollTo('#categories .title-head-large'); });
  $('nav .register').click(() => { scroll.scrollTo('#categories .title-head-large'); });
  $('nav .detail').click(() => { scroll.scrollTo('#whatis'); });
  $('nav .contact').click(() => { scroll.scrollTo('footer'); });
  $('#place .map').click(() => { interact.map(); });
})
