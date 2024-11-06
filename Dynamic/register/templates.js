// Step 4: Define the template for a new participant section
export function participantTemplate(count) {
    return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${count}">
          <option selected value="" disabled></option>
          <!-- Add grade options here as needed -->
        </select>
      </div>
    </section>
    `;
}

// Step 5: Calculate the total fees
export function totalFees() {
    // Get all elements with IDs that start with "fee"
    const feeElements = [...document.querySelectorAll("[id^=fee]")];
    
    // Sum up all fee values and return the total
    return feeElements.reduce((total, fee) => total + Number(fee.value || 0), 0);
}

// Step 6: Define the success message template
export function successTemplate(info) {
    return `
      <p>Thank you, ${info.name}, for registering. You have registered ${info.participants} participants and owe $${info.fees} in fees.</p>
    `;
}



