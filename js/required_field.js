document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1) ON-CLICK ZA LINK ELEMENTE
    ========================== */
    document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: "Oops!",
                text: "Please try to recall what you entered earlier.",
                icon: "question",
                confirmButtonText: "OK",
                iconColor: "black",
                confirmButtonColor: "#d71920"
            });
        });
    });


    /* =========================
       2) LOGIN GUMB
    ========================== */
    const loginBtn = document.querySelector(".loginG");
if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const emailInput = document.querySelectorAll(".input2")[0];
        const passwordInput = document.querySelectorAll(".input2")[1];

        const email = emailInput?.value.trim();
        const password = passwordInput?.value.trim();

        if (email === "neki@g.c" && password === "aaaa") {
            Swal.fire({
                title: "You have successfully logged in!",
                icon: "success",
                iconColor: "black",
                confirmButtonColor: "#d71920",
                draggable: true
            }).then(() => {
                emailInput.value = "";
                passwordInput.value = "";
            });
        } else {
            Swal.fire({
                title: "Incorrect email or password!",
                icon: "error",
                iconColor: "#d71920",
                confirmButtonColor: "#d71920",
                draggable: true
            }).then(() => {
                emailInput.value = "";
                passwordInput.value = "";
            });
        }
    });
}

    /* =========================
       3) VALIDACIJA REGISTRACIJSKEGA OBRAZCA
    ========================== */
    const form = document.getElementById('regForm');

    if (form) {

        //— Polja, ki jih validiramo
        const fields = [...form.querySelectorAll('input[required], select[required]')].map(input => {
            const box = input.closest('div');
            const error = box.querySelector('.error');
            return { input, box, error };
        });

        function validateField(item) {
            const val = item.input.value.trim();
            let valid = true;

            if (!val) valid = false;

            if (item.input.type === 'email' && val !== '') {
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                if (!ok) valid = false;
            }

            if (!valid) {
                item.error.style.display = 'block';
                item.box.classList.add('error-box');
            } else {
                item.error.style.display = 'none';
                item.box.classList.remove('error-box');
            }

            return valid;
        }

        fields.forEach(item => {
            item.input.addEventListener('blur', () => validateField(item));
            const eventType = item.input.tagName.toLowerCase() === 'select' ? 'change' : 'input';

            item.input.addEventListener(eventType, () => {
                item.error.style.display = 'none';
                item.box.classList.remove('error-box');
            });
        });

        //— Ob oddaji preverimo vsa polja
        form.addEventListener('submit', function (e) {
            let allValid = true;
            fields.forEach(item => {
                if (!validateField(item)) allValid = false;
            });
            if (!allValid) e.preventDefault();
        });


        /* =========================
           4) OMEJITEV DATUMA (max = danes - 16 let)
        ========================== */
        const dateInput = form.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date();
            const sixteenYearsAgo = new Date(
                today.getFullYear() - 16,
                today.getMonth(),
                today.getDate()
            );
            dateInput.max = sixteenYearsAgo.toISOString().split('T')[0];
        }


        /* =========================
           5) EMAIL ODKLEPA OSTALA POLJA
        ========================== */
        const emailInput = document.getElementById("email");

        if (emailInput) {
            const allFields = form.querySelectorAll("input, select, button");
            const otherFields = [...allFields].filter(el => el !== emailInput);

            const belowEmailSection = document.createElement("div");
            belowEmailSection.classList.add("below-email");

            [...form.children].slice(1).forEach(el => belowEmailSection.appendChild(el));
            form.appendChild(belowEmailSection);

            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }

            function toggleFields(disabled) {
                otherFields.forEach(el => el.disabled = disabled);
                belowEmailSection.classList.toggle("blurred", disabled);
            }

            toggleFields(true); // zakleni na začetku

            emailInput.addEventListener("input", function () {
                toggleFields(!isValidEmail(emailInput.value));
            });
        }
    }


    /* =========================
       6) GUMB "USTVARI RAČUN"
    ========================== */
    const createAccBtn = document.getElementById('create-account');
    if (createAccBtn) {
        createAccBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('input[required], select[required]');
            const allFilled = [...requiredFields].every(field => field.value.trim());

            if (!allFilled) {
                Swal.fire({
                    icon: "error",
                    title: "You haven’t filled in all the fields.",
                    text: "Check and try again.",
                    iconColor: "#d71920",
                    confirmButtonColor: "#d71920"
                });
            } else {
                Swal.fire({
                    title: "You have successfully registered!",
                    icon: "success",
                    iconColor: "black",
                    confirmButtonColor: "#d71920",
                    draggable: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../html/index.html';
                    }
                });
            }
        });
    }

});
