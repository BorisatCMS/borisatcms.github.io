---
title: FAQ
---

<div class="faq-list">

<details>
<summary>Waarom ben ik 18?</summary>
<p>Wie zegt dat jij 18 bent?</p>
</details>

<details>
<summary>Gebruik je 67?</summary>
<p>Heel onslim van je.</p>
</details>

</div>

<p class="section-label">Contact</p>

<form id="contact-form" class="contact-form">
  <input type="text" name="name" placeholder="Naam" required />
  <input type="email" name="email" placeholder="E-mail" required />
  <input type="tel" name="phone" placeholder="Telefoonnummer" />
  <textarea name="message" placeholder="Waar kunnen we je mee helpen?" rows="5" required></textarea>
  <label class="contact-form-checkbox">
    <input type="checkbox" name="privacy" required />
    <span>Ik ga akkoord met de <a href="#">privacyverklaring</a></span>
  </label>
  <button type="submit">Verzend</button>
</form>

<style>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  max-width: 32rem;
  margin: 1.5rem auto 0 auto;
  text-align: left;
}
.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form input[type="tel"],
.contact-form textarea {
  font-family: var(--bodyFont);
  font-size: 1rem;
  color: var(--darkgray);
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 0.5rem;
  padding: 0.7rem 0.9rem;
  resize: vertical;
}
.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: var(--gray);
}
.contact-form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--gray);
}
.contact-form-checkbox input {
  margin-top: 0.2rem;
}
.contact-form button {
  align-self: flex-start;
  font-family: var(--bodyFont);
  font-weight: 600;
  color: #fff;
  background: var(--tertiary);
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.6rem;
  cursor: pointer;
}
</style>

<script>
(function () {
  var form = document.getElementById("contact-form");
  if (!form || form.dataset.wired) return;
  form.dataset.wired = "true";
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value;
    var email = form.email.value;
    var phone = form.phone.value;
    var message = form.message.value;
    var subject = encodeURIComponent("Contactaanvraag van " + name);
    var body = encodeURIComponent(
      "Naam: " + name + "\nE-mail: " + email + "\nTelefoon: " + phone + "\n\n" + message
    );
    window.location.href = "mailto:REPLACE-WITH-YOUR-EMAIL@example.com?subject=" + subject + "&body=" + body;
  });
})();
</script>
