emailjs.init("x0fZ8lvvV-7GoCQ-h"); // Replace with your actual public key

    // Add event listener to the contact form
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form values
        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        // Validate form fields
        if (!params.name || !params.email || !params.message) {
            alert("Please fill in all required fields (Name, Email, and Message)");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Show loading state
        const submitButton = document.getElementById("submit-btn");
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = "Sending...";
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.send("service_ipq853e", "template_pvubkh4", params)
            .then(function(response) {
                alert("Message sent successfully! The team will get back to you ASAP");
                console.log("SUCCESS", response.status, response.text);
                
                // Reset form
                document.getElementById("contact-form").reset();
            })
            .catch(function(error) {
                alert("Failed to send message. Please try again.");
                console.log("FAILED", error);
            })
            .finally(function() {
                // Restore button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
    });