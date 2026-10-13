(function () {
  "use strict";

  var overlay = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var closeBtns = document.querySelectorAll("[data-nav-close]");
  var year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  function openNav() {
    if (!overlay || !toggle) return;
    overlay.classList.add("is-open");
    overlay.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    var close = overlay.querySelector("[data-nav-close]");
    if (close) close.focus();
  }

  function closeNav() {
    if (!overlay || !toggle) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
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
      if (event.key === "Escape") closeNav();
    });
  }

  var form = document.getElementById("lead-form");
  if (!form) return;

  var thanks = document.getElementById("form-thanks");
  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /[0-9]{8,}/;

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

    var phone = valueOf("phone").replace(/\s+/g, "");
    if (phone && !phonePattern.test(phone)) {
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

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
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
        return response.json().then(function (data) {
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
          error && error.message
            ? error.message
            : "Something went wrong while sending. Please call 1300 207 915."
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send enquiry";
        }
      });
  });
})();
