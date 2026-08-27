---
title: FAQ
lang: en
translationKey: faq
---

<div class="faq-list">

<details>
<summary>What services do you offer?</summary>
<p>I offer animations, sound design, creative ideas and positive collaboration. Combinations possible</p>
</details>

<details>
<summary>Which programs do you use to edit videos?</summary>
<p>For animations - After Effects, for filmed content - Premiere Pro/Davinci Resolve, for photo retouching - Photoshop.</p>
</details>

<details>
<summary>Coming soon</summary>
<p>Depending on how often the question gets asked.</p>
</details>

</div>

<p class="section-label">Contact</p>

<form id="contact-form" class="contact-form" action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="a7b1eb55-f110-4546-a107-ec609c905633" />
  <input type="hidden" name="redirect" value="https://beaverstudio2007.github.io/portfolio-en/bedankt" />
  <input type="hidden" name="subject" value="New contact request" />
  <input type="text" name="name" placeholder="Name" />
  <input type="email" name="email" placeholder="Email*" required />
  <input type="tel" name="phone" placeholder="Phone number" />
  <textarea name="message" placeholder="How can we help you?*" rows="5" required></textarea>
  <label class="contact-form-checkbox">
    <input type="checkbox" name="privacy" required />
    <span>I agree to the <a href="/portfolio-en/privacyverklaring">privacy policy</a></span>
  </label>
  <button type="submit">Send</button>
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
@media (max-width: 800px) {
  .contact-form-checkbox {
    margin-left: 12px;
  }
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
