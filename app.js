// ==========================================
// OTP VERIFICATION V3
// ==========================================

// Demo OTP
const correctOTP = "4719";


// Get all OTP input boxes
const inputs = document.querySelectorAll(".otp-input");


// Get buttons and elements
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const timerElement = document.getElementById("timer");
const message = document.getElementById("message");


// ==========================================
// OTP INPUT
// ==========================================

inputs.forEach((input, index) => {

    // Allow only numbers
    input.addEventListener("input", function () {

        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value.length === 1) {

            // Move to next input
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }

        checkComplete();
    });


    // Backspace handling
    input.addEventListener("keydown", function (event) {

        if (event.key === "Backspace" && this.value === "") {

            if (index > 0) {
                inputs[index - 1].focus();
            }
        }

        // Move left with ArrowLeft
        if (event.key === "ArrowLeft" && index > 0) {
            inputs[index - 1].focus();
        }

        // Move right with ArrowRight
        if (event.key === "ArrowRight" &&
            index < inputs.length - 1) {

            inputs[index + 1].focus();
        }
    });

});


// ==========================================
// PASTE OTP
// ==========================================

inputs[0].addEventListener("paste", function (event) {

    event.preventDefault();

    const pastedData =
        event.clipboardData
            .getData("text")
            .replace(/[^0-9]/g, "")
            .slice(0, 4);

    pastedData.split("").forEach((number, index) => {

        if (inputs[index]) {
            inputs[index].value = number;
        }

    });

    if (pastedData.length > 0) {
        inputs[Math.min(pastedData.length - 1, 3)].focus();
    }

    checkComplete();
});


// ==========================================
// GET OTP
// ==========================================

function getOTP() {

    let otp = "";

    inputs.forEach(input => {
        otp += input.value;
    });

    return otp;
}


// ==========================================
// CHECK OTP COMPLETE
// ==========================================

function checkComplete() {

    const otp = getOTP();

    if (otp.length === 4) {

        verifyBtn.disabled = false;

    } else {

        verifyBtn.disabled = false;
    }
}


// ==========================================
// VERIFY OTP
// ==========================================

verifyBtn.addEventListener("click", function () {

    const otp = getOTP();

    message.classList.remove("success", "error");

    if (otp.length !== 4) {

        message.textContent =
            "Please enter all 4 digits.";

        message.classList.add("error");

        return;
    }


    if (otp === correctOTP) {

        message.textContent =
            "✓ OTP verified successfully!";

        message.classList.add("success");

        // Disable inputs
        inputs.forEach(input => {
            input.disabled = true;
        });

        verifyBtn.disabled = true;

    } else {

        message.textContent =
            "Incorrect OTP. Please try again.";

        message.classList.add("error");

        // Clear inputs
        inputs.forEach(input => {
            input.value = "";
        });

        inputs[0].focus();
    }
});


// ==========================================
// COUNTDOWN
// ==========================================

let timeLeft = 23;

let countdown = setInterval(() => {

    timeLeft--;

    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {

        clearInterval(countdown);

        resendBtn.disabled = false;

        resendBtn.classList.add("active");

        resendBtn.innerHTML = "Resend OTP";
    }

}, 1000);


// ==========================================
// RESEND OTP
// ==========================================

resendBtn.addEventListener("click", function () {

    if (resendBtn.disabled) {
        return;
    }

    // Clear previous OTP
    inputs.forEach(input => {
        input.value = "";
        input.disabled = false;
    });

    inputs[0].focus();

    message.textContent =
        "A new OTP has been sent.";

    message.classList.remove("error");
    message.classList.add("success");


    // Restart timer
    timeLeft = 23;

    resendBtn.disabled = true;
    resendBtn.classList.remove("active");

    resendBtn.innerHTML =
        `Resend in <span id="timer">${timeLeft}</span>s`;

    // Get new timer element
    const newTimer =
        document.getElementById("timer");


    countdown = setInterval(() => {

        timeLeft--;

        newTimer.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(countdown);

            resendBtn.disabled = false;

            resendBtn.classList.add("active");

            resendBtn.innerHTML = "Resend OTP";
        }

    }, 1000);

});