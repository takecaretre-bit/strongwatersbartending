const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));

const codeToggle = document.getElementById('codeToggle');
const codePanel = document.getElementById('codePanel');
if (codeToggle && codePanel) codeToggle.addEventListener('click', () => { codePanel.hidden = !codePanel.hidden; });

const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = `Strong Waters Booking Request - ${data.partyFor || 'New Event'}`;
    const appliedDiscount = (data.discountCode || '').trim().toUpperCase() === 'SWMBBIGGIE' ? 'Yes - SWMBBIGGIE, 10% discount' : (data.discountCode || 'None');
    const body = `New Strong Waters Bartending Booking Request\n\nCUSTOMER CONTACT\nName: ${data.customerName}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nEVENT DETAILS\nWho's the party for?: ${data.partyFor}\nEvent Date: ${data.eventDate}\nEvent Location: ${data.location || 'Not provided'}\nType of Party: ${data.partyType}\nExpected Guest Count: ${data.guestCount}\nService Option: ${data.serviceOption}\nDiscount / CODE: ${appliedDiscount}\n\nADDITIONAL NOTES\n${data.details || 'No additional notes provided.'}\n\nSuggested Reply Template:\nHi ${data.customerName},\n\nThank you for reaching out to Strong Waters Bartending LLC. We received your booking request and appreciate the opportunity to serve your event. Michael will review your details and follow up shortly to confirm availability, pricing, and next steps.\n\n- Strong Waters Bartending LLC`;
    window.location.href = `mailto:mikeallen513@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
