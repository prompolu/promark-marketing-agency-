import test from 'node:test';
import assert from 'node:assert/strict';
import {formEndpoint,renderContactForm} from '../scripts/contact.mjs';
import {escapeHTML} from '../scripts/seo.mjs';
const contact={email:'marketingagencypromark@gmail.com',whatsapp:'https://wa.me/212684681567',formEndpoint:''};
const services=[['01','Sites web<br>& landing pages','','','web']];
test('Direct submission accepts only the owner’s public Formspree endpoint',()=>{
 assert.equal(formEndpoint(''),'');assert.equal(formEndpoint('https://formspree.io/f/abcd1234'),'https://formspree.io/f/abcd1234');
 for(const bad of ['http://formspree.io/f/abc','https://other.example/f/abc','https://formspree.io/api/forms','https://name:key@formspree.io/f/abc','https://formspree.io/f/abc?token=x','https://formspree.io/f/abc#x'])assert.throws(()=>formEndpoint(bad));
});
test('Missing endpoint keeps an honest, functional email fallback',()=>{
 const html=renderContactForm({contact,services,escapeHTML});
 assert(!html.includes('action="mailto:'));assert(html.includes('type="submit" disabled'));
 assert(html.includes('<noscript>'));assert(html.includes('href="mailto:marketingagencypromark@gmail.com"'));
 assert(html.includes('Préparer mon email'));assert(!html.includes('Envoyer ma demande'));
 assert(html.includes('Télécharger ma demande'));assert(html.includes('https://wa.me/212684681567'));
 assert(!html.includes('novalidate'));assert(html.includes('aria-live="polite"'));
});
test('Configured endpoint uses the real native form destination without secrets',()=>{
 const html=renderContactForm({contact:{...contact,formEndpoint:'https://formspree.io/f/abcd1234'},services,escapeHTML});
 assert(html.includes('action="https://formspree.io/f/abcd1234"'));assert(html.includes('method="post"'));
 assert(html.includes('Envoyer ma demande'));assert(html.includes('name="_gotcha"'));
 assert(html.includes('maxlength="5000"'));assert(!html.includes('api_key'));
});
