(function () {
  "use strict";

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-gtco-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $("#page").prepend('<div id="gtco-offcanvas" />');
    // $("#page").prepend(
    //   '<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>',
    // );
    var clone1 = $(".menu-1 > ul").clone();
    $("#gtco-offcanvas").append(clone1);
    var clone2 = $(".menu-2 > ul").clone();
    $("#gtco-offcanvas").append(clone2);

    $("#gtco-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
    $("#gtco-offcanvas").find("li").removeClass("has-dropdown");

    // Hover dropdown menu on mobile
    $(".offcanvas-has-dropdown")
      .mouseenter(function () {
        var $this = $(this);

        $this.addClass("active").find("ul").slideDown(500, "easeOutExpo");
      })
      .mouseleave(function () {
        var $this = $(this);
        $this.removeClass("active").find("ul").slideUp(500, "easeOutExpo");
      });

    $(window).resize(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-gtco-nav-toggle").removeClass("active");
      }
    });
  };

  var burgerMenu = function () {
    $("body").on("click", ".js-gtco-nav-toggle", function (event) {
      var $this = $(this);

      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      $this.toggleClass("active");
      event.preventDefault();
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo",
              );
            });
          }, 100);
        }
      },
      { offset: "85%" },
    );
  };

  var dropdown = function () {
    $(".has-dropdown")
      .mouseenter(function () {
        var $this = $(this);
        $this
          .find(".dropdown")
          .css("display", "block")
          .addClass("animated-fast fadeInUpMenu");
      })
      .mouseleave(function () {
        var $this = $(this);

        $this
          .find(".dropdown")
          .css("display", "none")
          .removeClass("animated-fast fadeInUpMenu");
      });
  };

  var testimonialCarousel = function () {
    var owl = $(".owl-carousel-fullwidth");
    owl.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      smartSpeed: 800,
      autoHeight: true,
    });
  };

  var tabs = function () {
    // Auto adjust height
    $(".gtco-tab-content-wrap").css("height", 0);
    var autoHeight = function () {
      setTimeout(function () {
        var tabContentWrap = $(".gtco-tab-content-wrap"),
          tabHeight = $(".gtco-tab-nav").outerHeight(),
          formActiveHeight = $(".tab-content.active").outerHeight(),
          totalHeight = parseInt(tabHeight + formActiveHeight + 90);

        tabContentWrap.css("height", totalHeight);

        $(window).resize(function () {
          var tabContentWrap = $(".gtco-tab-content-wrap"),
            tabHeight = $(".gtco-tab-nav").outerHeight(),
            formActiveHeight = $(".tab-content.active").outerHeight(),
            totalHeight = parseInt(tabHeight + formActiveHeight + 90);

          tabContentWrap.css("height", totalHeight);
        });
      }, 100);
    };

    autoHeight();

    // Click tab menu
    $(".gtco-tab-nav a").on("click", function (event) {
      var $this = $(this),
        tab = $this.data("tab");

      $(".tab-content").addClass("animated-fast fadeOutDown");

      $(".gtco-tab-nav li").removeClass("active");

      $this.closest("li").addClass("active");

      $this
        .closest(".gtco-tabs")
        .find('.tab-content[data-tab-content="' + tab + '"]')
        .removeClass("animated-fast fadeOutDown")
        .addClass("animated-fast active fadeIn");

      autoHeight();
      event.preventDefault();
    });
  };

  $(document).ready(function () {
    var scrollToForm = function () {
      $(".contact-btn").on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $("#gtco-started").offset().top,
          },
          500,
          "easeInOutExpo",
        );
        return false;
      });
    };

    scrollToForm();
  });

  var goToTop = function () {
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo",
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  // Loading page
  var loaderPage = function () {
    $(".gtco-loader").fadeOut("slow");
  };

  var counter = function () {
    $(".js-counter").countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($("#gtco-counter").length > 0) {
      $("#gtco-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" },
      );
    }
  };

  $(function () {
    mobileMenuOutsideClick();
    offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    dropdown();
    testimonialCarousel();
    tabs();
    goToTop();
    loaderPage();
    counterWayPoint();
  });
})();

$(window).scroll(function () {
  var containerHeight = $(".gtco-cover").length
    ? $(".gtco-cover").outerHeight()
    : 0;
  var scrollTop = $(window).scrollTop();

  if (scrollTop > containerHeight) {
    $(".gtco-nav").attr("id", "fixed-header");
    $(".header-btn").addClass("header-btn-show");
    $("#menu-container").addClass("dark-text");
  } else {
    $(".gtco-nav").removeAttr("id", "fixed-header");
    $(".header-btn").removeClass("header-btn-show");
    $("#menu-container").addClass("dark-text");
  }
});

function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const name = encodeURIComponent(document.getElementById("name").value);
        const email = encodeURIComponent(
          document.getElementById("email").value,
        );
        const userType = encodeURIComponent(
          document.getElementById("user-type").value,
        );
        const message = encodeURIComponent(
          document.getElementById("message").value,
        );

        const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSflhGaEiHPAAJAO6NvEL-Ikqc45h8EE4PNthMzRVuPD5tYRbw/formResponse?entry.1477049393=${name}&entry.901754972=${email}&entry.1896746968=${userType}&entry.1701988348=${message}`;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = googleFormUrl;
        form.target = "hidden_iframe";
        document.body.appendChild(form);
        form.submit();

        // Show confirmation message and reset form
        setTimeout(() => {
          // Show the success message
          document.getElementById("form-message-success").style.display =
            "block";

          // Scroll to the success message
          document
            .getElementById("form-message-success")
            .scrollIntoView({ behavior: "smooth" });

          // Reset the form
          this.reset();

          // Hide the success message after 5 seconds
          setTimeout(() => {
            document.getElementById("form-message-success").style.display =
              "none";
          }, 5000);
        }, 1000);
      } catch (error) {
        console.error("Error submitting message:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    });
});
