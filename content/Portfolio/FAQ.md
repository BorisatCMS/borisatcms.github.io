---
title: FAQ
lang: nl
translationKey: faq
---

<div class="faq-list">

<details>
<summary>Welke diensten biedt u?</summary>
<p>Ik bied animaties, geluidsontwerp, creatieve ideeën en positieve samenwerking. Combinatie mogelijk</p>
</details>

<details>
<summary>In welke programma's bewerkt u video's?</summary>
<p>Voor animaties - After Effects, voor gefilmd content - Premiere Pro/Davinci Resolve, voor het nabewerken van foto's - Photoshop.</p>
</details>

<details>
<summary>Coming soon</summary>
<p>Afhankelijk hoe vaak de vraag wordt gesteld.</p>
</details>

</div>

<p class="section-label">Contact</p>

<form id="contact-form" class="contact-form" action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="a7b1eb55-f110-4546-a107-ec609c905633" />
  <input type="hidden" name="redirect" value="https://beaverstudio2007.github.io/portfolio/bedankt" />
  <input type="hidden" name="subject" value="Nieuwe contactaanvraag" />
  <input type="text" name="name" placeholder="Naam" />
  <input type="email" name="email" placeholder="E-mail*" required />
  <input type="tel" name="phone" placeholder="Telefoonnummer" />
  <textarea name="message" placeholder="Waar kunnen we je mee helpen?*" rows="5" required></textarea>
  <label class="contact-form-checkbox">
    <input type="checkbox" name="privacy" required />
    <span>Ik ga akkoord met de <a href="/portfolio/privacyverklaring">privacyverklaring</a></span>
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
