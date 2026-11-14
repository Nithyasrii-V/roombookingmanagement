const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const bookingForm = document.querySelector("#booking-form");
const checkinInput = document.querySelector("#checkin");
const checkoutInput = document.querySelector("#checkout");
const bookingMessage = document.querySelector("#booking-message");

if (bookingForm && checkinInput && checkoutInput && bookingMessage) {
    function toDateInputValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function formatDate(value) {
        return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric"
        });
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkinInput.min = toDateInputValue(today);
    checkoutInput.min = toDateInputValue(tomorrow);

    checkinInput.addEventListener("change", () => {
        if (!checkinInput.value) return;

        const nextDay = new Date(`${checkinInput.value}T00:00:00`);
        nextDay.setDate(nextDay.getDate() + 1);
        const minimumCheckout = toDateInputValue(nextDay);
        checkoutInput.min = minimumCheckout;

        if (!checkoutInput.value || checkoutInput.value < minimumCheckout) {
            checkoutInput.value = minimumCheckout;
        }
    });

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (checkoutInput.value <= checkinInput.value) {
            bookingMessage.textContent = "Check-out must be after check-in.";
            checkoutInput.focus();
            return;
        }

        const guestCount = Number(bookingForm.elements.guests.value);
        const guestLabel = guestCount === 1 ? "guest" : "guests";
        bookingMessage.textContent = `Searching stays for ${formatDate(checkinInput.value)} – ${formatDate(checkoutInput.value)} · ${guestCount} ${guestLabel}`;
    });
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            menuToggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("is-open");
        }
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contact-form");
const contactFormStatus = document.querySelector("#contact-form-status");
if (contactForm && contactFormStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactFormStatus.textContent = "This demo form isn't connected yet. Please email demo@gmail.com.";
    });
}
