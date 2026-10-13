(function () {
  "use strict";

  var overlay = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var closeBtns = document.querySelectorAll("[data-nav-close]");
  var year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  var carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    var slides = carousel.querySelectorAll("figure");
    var caption = carousel.querySelector("[data-carousel-caption]");
    var dots = carousel.querySelectorAll("[data-carousel-dot]");
    var pause = carousel.querySelector("[data-carousel-pause]");
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var timer;
    var paused = motion.matches;
    var index = 0;

    function showSlide(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
        slide.hidden = i !== index;
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
        if (i === index) slide.querySelector("img").loading = "eager";
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
      if (caption) {
        var next = slides[index].getAttribute("data-caption");
        if (next) caption.textContent = next;
      }
    }

    function updateRotation() {
      window.clearInterval(timer);
      if (pause) {
        pause.hidden = false;
        pause.textContent = paused ? "Play slideshow" : "Pause slideshow";
        pause.setAttribute("aria-pressed", paused ? "true" : "false");
      }
      if (!paused && !document.hidden && slides.length > 1) {
        timer = window.setInterval(function () { showSlide(index + 1); }, 6500);
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        paused = true;
        updateRotation();
        showSlide(i);
      });
    });

    if (pause) pause.addEventListener("click", function () {
      paused = !paused;
      updateRotation();
    });
    carousel.addEventListener("mouseenter", function () { window.clearInterval(timer); });
    carousel.addEventListener("mouseleave", updateRotation);
    carousel.addEventListener("focusin", function (event) {
      if (event.target !== pause) { paused = true; updateRotation(); }
    });
    document.addEventListener("visibilitychange", updateRotation);
    motion.addEventListener("change", function () {
      if (motion.matches) { paused = true; updateRotation(); }
    });
    showSlide(0);
    updateRotation();
  }

  var inertElements = [];

  function openNav() {
    if (!overlay || !toggle) return;
    overlay.classList.add("is-open");
    overlay.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    Array.from(document.body.children).forEach(function (element) {
      if (element !== overlay && !element.inert) {
        element.inert = true;
        inertElements.push(element);
      }
    });
    var close = overlay.querySelector(".nav-close");
    if (close) close.focus();
  }

  function closeNav() {
    if (!overlay || !toggle) return;
    if (!overlay.classList.contains("is-open")) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    inertElements.forEach(function (element) { element.inert = false; });
    inertElements = [];
    toggle.focus();
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", function () {
      if (overlay.classList.contains("is-open")) closeNav();
      else openNav();
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", closeNav);
    });

    overlay.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (!overlay.classList.contains("is-open")) return;
      if (event.key === "Escape") closeNav();
      if (event.key === "Tab") {
        var focusable = Array.from(overlay.querySelectorAll('a[href], button:not([disabled])'))
          .filter(function (element) { return element.tabIndex >= 0 && element.getClientRects().length; });
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    });
    var backdrop = overlay.querySelector(".nav-overlay__backdrop");
    if (backdrop) backdrop.tabIndex = -1;
  }

  var form = document.getElementById("lead-form");
  if (!form) return;
  form.noValidate = true;

  var thanks = document.getElementById("form-thanks");
  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[+()\d\s.-]+$/;

  form.querySelectorAll(".field").forEach(function (wrap) {
    var field = wrap.querySelector("input, select, textarea");
    var error = wrap.querySelector(".field__error");
    if (field && error) {
      error.id = field.id + "-error";
      field.setAttribute("aria-describedby", error.id);
    }
  });

  function fieldWrap(id) {
    var field = document.getElementById(id);
    return field ? field.closest(".field") : null;
  }

  function setError(id, message) {
    var wrap = fieldWrap(id);
    var field = document.getElementById(id);
    var err = wrap ? wrap.querySelector(".field__error") : null;
    if (!wrap || !field || !err) return;
    wrap.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    err.textContent = message;
  }

  function clearError(id) {
    var wrap = fieldWrap(id);
    var field = document.getElementById(id);
    var err = wrap ? wrap.querySelector(".field__error") : null;
    if (!wrap || !field || !err) return;
    wrap.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    err.textContent = "";
  }

  function valueOf(id) {
    var field = document.getElementById(id);
    return field ? field.value.trim() : "";
  }

  var required = [
    { id: "name", message: "Please enter your name." },
    { id: "email", message: "Please enter an email address." },
    { id: "phone", message: "Please enter a phone number." },
    { id: "city", message: "Please choose a city." },
    { id: "project_type", message: "Please choose a project type." },
    { id: "message", message: "Please add a short note about the work." }
  ];

  required.forEach(function (item) {
    var field = document.getElementById(item.id);
    if (!field) return;
    field.addEventListener("input", function () {
      clearError(item.id);
    });
    field.addEventListener("change", function () {
      clearError(item.id);
    });
  });

  function validate() {
    var ok = true;
    required.forEach(function (item) {
      clearError(item.id);
      if (!valueOf(item.id)) {
        setError(item.id, item.message);
        ok = false;
      }
    });

    var email = valueOf("email");
    if (email && !emailPattern.test(email)) {
      setError("email", "Please enter a valid email address.");
      ok = false;
    }

    var phone = valueOf("phone");
    var digits = phone.replace(/\D/g, "");
    if (phone && (!phonePattern.test(phone) || digits.length < 8 || digits.length > 15)) {
      setError("phone", "Please enter a phone number we can return.");
      ok = false;
    }

    return ok;
  }

  function showStatus(kind, text) {
    if (!status) return;
    status.className = "form-status is-visible is-" + kind;
    status.textContent = text;
    status.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate()) {
      showStatus("error", "Please complete the highlighted fields, then send again.");
      var first = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      if (first) first.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 20000);
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
      signal: controller.signal
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          form.hidden = true;
          if (status) status.hidden = true;
          if (thanks) {
            thanks.classList.add("is-visible");
            thanks.hidden = false;
            thanks.focus();
          }
          if (window.gtag) {
            window.gtag("event", "generate_lead", {
              form_id: "mkolyele",
              form_destination: "formspree",
              page_path: window.location.pathname,
              page_location: window.location.href
            });
          }
          return;
        }
        return response.json().catch(function () { return null; }).then(function (data) {
          var detail = "Something went wrong while sending. Please call 1300 207 915.";
          if (data && data.errors && data.errors.length) {
            detail = data.errors
              .map(function (err) {
                return err.message;
              })
              .join(" ");
          }
          throw new Error(detail);
        });
      })
      .catch(function (error) {
        showStatus(
          "error",
          error && error.name === "AbortError"
            ? "Sending took too long. Please try again or call 1300 207 915."
            : error && error.message
            ? error.message
            : "Something went wrong while sending. Please call 1300 207 915."
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send enquiry";
        }
      })
      .finally(function () { window.clearTimeout(timeout); });
  });
})();
