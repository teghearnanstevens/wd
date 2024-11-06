
import { participantTemplate, totalFees, successTemplate } from './templates.js';

document.addEventListener("DOMContentLoaded", function() {
    // Step 1: Initialize the participant count
    let participantCount = 1;

    // Get the 'Add Participant' button and the container where participants will be added
    const addButton = document.getElementById("add");
    const participantsFieldset = document.querySelector(".participants");

    // Step 2: Add an event listener to the "Add Participant" button
    addButton.addEventListener("click", function() {
        // Increment the participant count
        participantCount++;

        // Use the participantTemplate function to create new participant HTML
        const newParticipantHTML = participantTemplate(participantCount);

        // Insert the new HTML before the Add button
        addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
    });

    // Step 3: Add an event listener to the form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', submitForm);
    
    function submitForm(event) {
        event.preventDefault();  // Prevent form from reloading the page

        // Get the total fees
        const totalFee = totalFees();

        // Get the adult name
        const adultName = document.getElementById('adult_name').value;

      
        const summaryHTML = successTemplate({
            name: adultName,
            participants: participantCount,
            fees: totalFee,
        });

        
        form.style.display = 'none';
        document.getElementById('summary').innerHTML = summaryHTML;
    }
});


