emailjs.init("C4Y0RYKRhp5VYw5SQ");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_ewg4u7x",
      "template_c9qst4o",
      this
    )
    .then(() => {
    alert("Message sent successfully!");
    contactForm.reset();
    })  
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });
});