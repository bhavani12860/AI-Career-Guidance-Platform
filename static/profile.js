document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const form = document.getElementById("profileForm");

    const photo = document.getElementById("photo");
    const preview = document.getElementById("profilePreview");

    const phone = document.querySelector('input[name="phone"]');
    const cgpa = document.getElementById("cgpa");

    const skills = document.getElementById("skills");
    const projects = document.getElementById("projects");

    const certifications =
        document.querySelector('textarea[name="certifications"]');

    const github =
        document.querySelector('input[name="github"]');

    const linkedin =
        document.querySelector('input[name="linkedin"]');

    const college =
        document.querySelector('input[name="college"]');

    const branch =
        document.querySelector('input[name="branch"]');

    const fullname =
        document.querySelector('input[name="fullname"]');

    const skillsCount =
        document.getElementById("skillsCount");

    const projectsCount =
        document.getElementById("projectsCount");

    const completionBar =
        document.getElementById("completionBar");

    const completionPercent =
        document.getElementById("completionPercent");

    const saveBtn =
        document.getElementById("saveBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =========================
       PROFILE PHOTO PREVIEW
    ========================= */

    if (photo) {

        photo.addEventListener("change", () => {

            const file = photo.files[0];

            if (!file) {
                updateCompletion();
                return;
            }

            /* Check image type */

            if (!file.type.startsWith("image/")) {

                alert("Please select a valid image.");

                photo.value = "";

                updateCompletion();

                return;
            }


            /* Check image size */

            if (file.size > 5 * 1024 * 1024) {

                alert("Profile image must be less than 5 MB.");

                photo.value = "";

                updateCompletion();

                return;
            }


            /* Preview image */

            const reader = new FileReader();

            reader.onload = event => {

                if (preview) {
                    preview.src = event.target.result;
                }

                updateCompletion();

            };

            reader.readAsDataURL(file);

        });

    }


    /* =========================
       PHONE VALIDATION
    ========================= */

    if (phone) {

        phone.addEventListener("input", () => {

            phone.value =
                phone.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

            updateCompletion();

        });

    }


    /* =========================
       CGPA
    ========================= */

    if (cgpa) {

        cgpa.addEventListener("input", () => {

            let value = parseFloat(cgpa.value);

            if (value > 10) {
                cgpa.value = 10;
            }

            if (value < 0) {
                cgpa.value = 0;
            }

            updateCompletion();

        });

    }


    /* =========================
       GENERAL INPUT EVENTS
    ========================= */

    const profileFields = [

        fullname,
        phone,
        college,
        branch,
        cgpa,
        skills,
        projects,
        certifications,
        github,
        linkedin

    ];


    profileFields.forEach(field => {

        if (field) {

            field.addEventListener("input", () => {

                updateCompletion();

            });

        }

    });


    /* =========================
       CHARACTER COUNTERS
    ========================= */

    function updateCounters() {

        if (skills && skillsCount) {

            skillsCount.textContent =
                skills.value.length;

        }


        if (projects && projectsCount) {

            projectsCount.textContent =
                projects.value.length;

        }

    }


    if (skills) {

        skills.addEventListener("input", () => {

            updateCounters();
            updateCompletion();

        });

    }


    if (projects) {

        projects.addEventListener("input", () => {

            updateCounters();
            updateCompletion();

        });

    }


    /* =========================
       PROFILE COMPLETION
    ========================= */

    function updateCompletion() {

        /*
         * These are the actual profile details.
         *
         * Email is NOT included because
         * email is already registered.
         */

        const fields = [

            phone,

            college,

            branch,

            cgpa,

            skills,

            projects,

            certifications,

            github,

            linkedin

        ];


        let completed = 0;


        /* Count filled fields */

        fields.forEach(field => {

            if (
                field &&
                field.value &&
                field.value.trim() !== ""
            ) {

                completed++;

            }

        });


        /*
         * Profile photo
         *
         * Existing saved photo:
         * preview source will NOT contain profile.png
         *
         * New selected photo:
         * photo.files.length > 0
         */

        let hasPhoto = false;


        if (photo && photo.files.length > 0) {

            hasPhoto = true;

        }
        else if (
            preview &&
            preview.src &&
            !preview.src.includes("profile.png")
        ) {

            hasPhoto = true;

        }


        /* Total = 9 fields + profile photo */

        const totalItems =
            fields.length + 1;


        if (hasPhoto) {

            completed++;

        }


        /* Calculate percentage */

        const percentage =
            Math.round(
                (completed / totalItems) * 100
            );


        /* Update progress bar */

        if (completionBar) {

            completionBar.style.width =
                percentage + "%";

        }


        /* Update percentage text */

        if (completionPercent) {

            completionPercent.textContent =
                percentage + "%";

        }

    }


    /* =========================
       FORM VALIDATION
    ========================= */

    if (form) {

        form.addEventListener("submit", event => {


            /* Full Name */

            if (
                fullname &&
                !fullname.value.trim()
            ) {

                event.preventDefault();

                showToast(
                    "Please enter your full name.",
                    true
                );

                fullname.focus();

                return;

            }


            /* Phone */

            if (
                phone &&
                phone.value.trim() !== "" &&
                !/^[0-9]{10}$/.test(phone.value)
            ) {

                event.preventDefault();

                showToast(
                    "Phone number must contain exactly 10 digits.",
                    true
                );

                phone.focus();

                return;

            }


            /* CGPA */

            if (
                cgpa &&
                cgpa.value !== "" &&
                (
                    Number(cgpa.value) < 0 ||
                    Number(cgpa.value) > 10
                )
            ) {

                event.preventDefault();

                showToast(
                    "CGPA should be between 0 and 10.",
                    true
                );

                cgpa.focus();

                return;

            }


            /* Save button animation */

            if (saveBtn) {

                saveBtn.classList.add("loading");


                const icon =
                    saveBtn.querySelector("i");

                if (icon) {

                    icon.className =
                        "fa-solid fa-spinner fa-spin";

                }


                const text =
                    saveBtn.querySelector("span");

                if (text) {

                    text.textContent =
                        "Saving Profile...";

                }

            }

        });

    }


    /* =========================
       TOAST MESSAGE
    ========================= */

    function showToast(message, error = false) {

        if (!toast) {
            return;
        }


        if (toastMessage) {

            toastMessage.textContent =
                message;

        }


        toast.classList.add("show");


        if (error) {

            toast.style.borderColor =
                "#ff5577";

        }
        else {

            toast.style.borderColor =
                "#00ffff";

        }


        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    updateCounters();

    updateCompletion();

});