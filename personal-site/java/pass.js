document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    const suggestion = document.getElementById('password-suggestion');

    const strongPasswordExample = "Str0ngP@ssword123";

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        // Update the strength bar
        strengthBar.style.width = `${strength * 20}%`;
        if (strength <= 2) {
            strengthBar.style.backgroundColor = 'red';
        } else if (strength === 3) {
            strengthBar.style.backgroundColor = 'orange';
        } else if (strength === 4) {
            strengthBar.style.backgroundColor = 'yellowgreen';
        } else if (strength === 5) {
            strengthBar.style.backgroundColor = 'green';
        }

        // Provide suggestions or positive feedback
        if (password.length === 0) {
            suggestion.textContent = ''; // No suggestion when the field is empty
        } else if (strength < 4) {
            suggestion.textContent = `Weak password. Try something like: "${strongPasswordExample}"`;
        } else {
            suggestion.textContent = "Great Job! That's a strong password.";
            suggestion.style.color = 'green'; // Positive feedback in green
        }
    });

    // Password strength checking function
    function checkPasswordStrength(password) {
        let strength = 0;

        // Criteria for strength
        if (password.length >= 8) strength++; // Length of at least 8 characters
        if (/[a-z]/.test(password)) strength++; // Contains lowercase letters
        if (/[A-Z]/.test(password)) strength++; // Contains uppercase letters
        if (/[0-9]/.test(password)) strength++; // Contains numbers
        if (/[\W_]/.test(password)) strength++; // Contains special characters

        return strength;
    }
});

// Add an event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".report-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const description = document.getElementById("description").value.trim();

        // Validate the form inputs
        if (!firstName || !lastName || !email || !description) {
            alert("All fields are required. Please fill out the form.");
            return;
        }

        // Create an object with the submitted data
        const reportData = {
            firstName,
            lastName,
            email,
            description,
        };

        // Display the data in the console (for testing purposes)
        console.log("Report Submitted:", reportData);

        // Optionally, send the data to a server using fetch
        /*
        fetch("your-server-endpoint-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Report submitted successfully!");
                } else {
                    alert("Failed to submit the report. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error submitting the report:", error);
                alert("An error occurred. Please try again.");
            });
        */

        // Show success message and reset the form
        alert("Thank you! Your report has been submitted.");
        form.reset();
    });
});
