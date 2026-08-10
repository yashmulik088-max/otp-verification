// ==========================================
// OTP VERIFICATION
// ==========================================


// DEMO OTP

const correctOTP = "0236";


// OTP INPUTS

const inputs =
    document.querySelectorAll(".otp-input");


// ELEMENTS

const verifyBtn =
    document.getElementById("verifyBtn");

const resendBtn =
    document.getElementById("resendBtn");

const timerElement =
    document.getElementById("timer");

const message =
    document.getElementById("message");


// ==========================================
// OTP INPUT
// ==========================================

inputs.forEach((input, index) => {

    input.addEventListener("input", function () {

        // Numbers only

        this.value =
            this.value.replace(/[^0-9]/g, "");


        // Move to next box

        if (
            this.value.length === 1 &&
            index < inputs.length - 1
        ) {

            inputs[index + 1].focus();

        }

    });


    // BACKSPACE

    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Backspace" &&
                this.value === "" &&
                index > 0
            ) {

                inputs[index - 1].focus();

            }


            // LEFT

            if (
                event.key === "ArrowLeft" &&
                index > 0
            ) {

                inputs[index - 1].focus();

            }


            // RIGHT

            if (
                event.key === "ArrowRight" &&
                index < inputs.length - 1
            ) {

                inputs[index + 1].focus();

            }

        }
    );

});


// ==========================================
// PASTE OTP
// ==========================================

inputs[0].addEventListener(
    "paste",
    function (event) {

        event.preventDefault();


        const pasted =
            event.clipboardData
                .getData("text")
                .replace(/[^0-9]/g, "")
                .slice(0, 4);


        pasted.split("").forEach(
            (number, index) => {

                if (inputs[index]) {

                    inputs[index].value = number;

                }

            }
        );


        if (pasted.length > 0) {

            inputs[
                Math.min(pasted.length - 1, 3)
            ].focus();

        }

    }
);


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
// VERIFY OTP
// ==========================================

verifyBtn.addEventListener(
    "click",
    function () {

        const otp = getOTP();


        // CLEAR MESSAGE

        message.classList.remove(
            "success",
            "error"
        );


        // CHECK LENGTH

        if (otp.length !== 4) {

            message.textContent =
                "Please enter all 4 digits.";

            message.classList.add("error");

            return;
        }


        // ======================================
        // CORRECT OTP
        // ======================================

        if (otp === correctOTP) {

            message.textContent =
                "✓ OTP verified successfully!";

            message.classList.add("success");


            // Disable inputs

            inputs.forEach(input => {

                input.disabled = true;

            });


            // Disable verify button

            verifyBtn.disabled = true;


            // ==================================
            // OPEN BIRTHDAY PAGE
            // ==================================

            setTimeout(() => {

                window.location.href =
                    "animated_heart_tree.html";

            }, 1500);

        }


        // ======================================
        // WRONG OTP
        // ======================================

        else {

            message.textContent =
                "Incorrect OTP. Please try again.";

            message.classList.add("error");


            // Clear boxes

            inputs.forEach(input => {

                input.value = "";

            });


            inputs[0].focus();

        }

    }
);


// ==========================================
// RESEND TIMER
// ==========================================

let timeLeft = 23;


let countdown =
    setInterval(updateTimer, 1000);


function updateTimer() {

    timeLeft--;

    timerElement.textContent =
        timeLeft;


    if (timeLeft <= 0) {

        clearInterval(countdown);


        resendBtn.disabled = false;

        resendBtn.classList.add("active");

        resendBtn.innerHTML =
            "Resend OTP";

    }

}


// ==========================================
// RESEND OTP
// ==========================================

resendBtn.addEventListener(
    "click",
    function () {

        if (resendBtn.disabled) {

            return;

        }


        // Clear OTP

        inputs.forEach(input => {

            input.value = "";

            input.disabled = false;

        });


        // Focus first box

        inputs[0].focus();


        // Message

        message.textContent =
            "A new OTP has been sent.";

        message.classList.remove("error");

        message.classList.add("success");


        // Reset timer

        timeLeft = 23;


        resendBtn.disabled = true;

        resendBtn.classList.remove("active");


        resendBtn.innerHTML =
            `Resend in <span id="timer">23</span>s`;


        // Get new timer

        const newTimer =
            document.getElementById("timer");


        countdown =
            setInterval(() => {

                timeLeft--;

                newTimer.textContent =
                    timeLeft;


                if (timeLeft <= 0) {

                    clearInterval(countdown);


                    resendBtn.disabled = false;

                    resendBtn.classList.add("active");

                    resendBtn.innerHTML =
                        "Resend OTP";

                }

            }, 1000);

    }
);