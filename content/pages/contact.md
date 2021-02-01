---
template: ContactPage
slug: contact
title: Contact
featuredImage: https://ucarecdn.com/48cda8e4-ee6c-4b2f-a80e-1898f0ecc3de/
subtitle: You can use the form below to contact us with any queries or to leave
  feedback. We will try to get back to you soon.
address: 404 James St, Burleigh Heads QLD 4220
phone: 0987 123 456
email: example@example.com
locations:
  - lat: "-27.9654732"
    lng: "153.2432449"
    mapLink: ""
meta:
  description: This is a meta description.
  title: Contact Page
---

# Example contact form

This form is setup to use Netlify's form handling:

- the form action is set to the current absolute url: `action: '/contact/'`
- a name attribute is sent with the form's data `'form-name': 'Contact'`
- netlify data attributes are added to the form `data-netlify data-netlify-honeypot`

Find out more in the [Netlify Docs](https://www.netlify.com/docs/form-handling/).
