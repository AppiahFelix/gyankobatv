document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID

        let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
            .then(function (response) {
                document.getElementById("responseMessage").textContent = "Message sent successfully!";
                document.getElementById("contactForm").reset();
            }, function (error) {
                document.getElementById("responseMessage").textContent = "Failed to send message. Try again!";
            });
    });
});
