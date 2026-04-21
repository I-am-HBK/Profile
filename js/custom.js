;
(function($, window, document, undefined) {
    'use strict';
    var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $(document).ready(function() {
        $(window).on('load', function() {
            $('.preloader').fadeOut();
            $('.animated-row').each(function() {
                var $this = $(this);
                $this.find('.animate').each(function(i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function(event, isInView) {
                        if (isInView) {
                            setTimeout(function() {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
        });
        if ($('.facts-list').length) {
            $('.facts-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.services-list').length) {
            $('.services-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.gallery-list').length) {
            $('.gallery-list').owlCarousel({
                loop: false,
                nav: false,
                dots: true,
                items: 3,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.testimonials-slider').length) {
            $('.testimonials-slider').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    768: {
                        items: 1
                    }
                }
            });
        }
        if ($('.fullpage-default').length) {
            var myFullpage = new fullpage('.fullpage-default', {
                licenseKey: ' C7F41B00-5E824594-9A5EFB99-B556A3D5',
                anchors: ['slide01', 'slide02', 'slide03', 'slide04', 'slide05', 'slide06', 'slide07'],
                menu: '#nav',
                lazyLoad: true,
                navigation: true,
                navigationPosition: 'right',
                scrollOverflow: true,
                responsiveWidth: 768,
                responsiveHeight: 600,
                responsiveSlides: true
            });
        }
        $(document).on('click', '.navbar-toggle', function() {
            $('.navbar-collapse').slideToggle(300);
            return false;
        }).on('click', '.navigation-menu > li > a', function() {
            $('.navbar-collapse').slideUp(300);
        }).on('click', '.next-section', function() {
            fullpage_api.moveSectionDown();
        });
        $('.facts-row').on('inview', function(event, isInView) {
            $('.count-number').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
                setTimeout(function() {
                    $('.count-number').removeClass('count-number').addClass('counted');
                }, 1000);
            });
        });
        $('.skills-row').on('inview', function(event, isInView) {
            $(this).addClass('view');
        });
        $(document).on('click', '.menu-trigger', function() {
            $('body').toggleClass('sidemenu-open');
        }).on('click', '.side-menu .navbar-nav li a', function() {
            $('body').removeClass('sidemenu-open');
        });
    });
})(jQuery, window, document);






(function () {
  const canvas = document.getElementById('snakeCanvas');
  const img    = document.getElementById('aboutImg');
  const ctx    = canvas.getContext('2d');

  function sync() {
    canvas.width  = img.offsetWidth;
    canvas.height = img.offsetHeight;
  }

  const BODY = 40;
  const SPEED = 0.4;
  const R = 10;
  let pts = [], frac = 0;

  function buildPath() {
    const w = canvas.width, h = canvas.height;
    pts = [];
    const S = 8, A = 12;

    function arc(cx, cy, a0, a1) {
      for (let i = 0; i <= A; i++) {
        const a = a0 + (a1 - a0) * i / A;
        pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
      }
    }
    function seg(x0, y0, x1, y1) {
      for (let i = 0; i <= S; i++) {
        pts.push([x0 + (x1-x0)*i/S, y0 + (y1-y0)*i/S]);
      }
    }

    arc(R,   R,   Math.PI,       Math.PI*1.5);
    seg(R,   0,   w-R, 0);
    arc(w-R, R,   Math.PI*1.5,   0);
    seg(w,   R,   w,   h-R);
    arc(w-R, h-R, 0,             Math.PI*0.5);
    seg(w-R, h,   R,   h);
    arc(R,   h-R, Math.PI*0.5,   Math.PI);
    seg(0,   h-R, 0,   R);
  }

  function ptAt(f) {
    const n = pts.length;
    const i = ((Math.floor(f) % n) + n) % n;
    const j = (i + 1) % n;
    const t = f - Math.floor(f);
    return [pts[i][0]*(1-t) + pts[j][0]*t, pts[i][1]*(1-t) + pts[j][1]*t];
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    frac = (frac + SPEED) % pts.length;

    const body = [];
    for (let i = 0; i < BODY; i++) {
      let f = frac - i;
      if (f < 0) f += pts.length;
      body.push(ptAt(f));
    }

    function stroke(color, width, blur) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(body[0][0], body[0][1]);
      for (let i = 1; i < body.length; i++) ctx.lineTo(body[i][0], body[i][1]);
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.shadowColor = '#0bc73d';
      ctx.shadowBlur  = blur;
      ctx.stroke();
      ctx.restore();
    }

    stroke('rgba(0,255,70,0.12)', 16, 0);
    stroke('rgba(0,255,70,0.4)',   6, 14);
    stroke('rgba(0,255,70,0.85)',  2.5, 6);
    stroke('#d0ffd8',              1,  0);

    // head
    ctx.save();
    ctx.beginPath();
    ctx.arc(body[0][0], body[0][1], 4, 0, Math.PI*2);
    ctx.fillStyle   = '#00ff44';
    ctx.shadowColor = '#00ff44';
    ctx.shadowBlur  = 20;
    ctx.fill();
    ctx.restore();

    requestAnimationFrame(draw);
  }

  function start() {
    sync();
    buildPath();
    draw();
  }

  window.addEventListener('resize', () => { sync(); buildPath(); });

  if (img.complete && img.naturalHeight !== 0) start();
  else img.addEventListener('load', start);
})();


const form = document.querySelector('form');

form.addEventListener('submit', async function(e) {
  e.preventDefault(); // stops the page from navigating

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    // Show your own success message
    form.reset();
    alert('Message sent successfully!');
    // or show a div: document.getElementById('success-msg').style.display = 'block';
  } else {
    alert('Oops! Something went wrong.');
  }
});

