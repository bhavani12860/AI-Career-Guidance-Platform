document.addEventListener("DOMContentLoaded", () => {

    const fileInput =
        document.getElementById("resumeFile");

    const chooseFile =
        document.getElementById("chooseFile");

    const dropZone =
        document.getElementById("dropZone");

    const selectedFile =
        document.getElementById("selectedFile");

    const fileName =
        document.getElementById("fileName");

    const form =
        document.getElementById("resumeForm");

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    /* =========================
       CHOOSE FILE
    ========================= */

    chooseFile.addEventListener("click", (event) => {

        event.stopPropagation();

        fileInput.click();

    });


    dropZone.addEventListener("click", () => {

        fileInput.click();

    });


    /* =========================
       FILE SELECTED
    ========================= */

    fileInput.addEventListener("change", () => {

        if (fileInput.files.length > 0) {

            showFile(fileInput.files[0]);

        }

    });


    function showFile(file) {

        const allowed =
            [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

        if (!allowed.includes(file.type)) {

            alert(
                "Please upload a PDF, DOC or DOCX resume."
            );

            fileInput.value = "";

            return;

        }


        if (file.size > 10 * 1024 * 1024) {

            alert(
                "File size must be less than 10 MB."
            );

            fileInput.value = "";

            return;

        }


        fileName.textContent = file.name;

        selectedFile.style.display = "flex";

    }


    /* =========================
       DRAG & DROP
    ========================= */

    [
        "dragenter",
        "dragover"
    ].forEach(eventName => {

        dropZone.addEventListener(
            eventName,
            event => {

                event.preventDefault();

                dropZone.classList.add("dragging");

            }
        );

    });


    [
        "dragleave",
        "drop"
    ].forEach(eventName => {

        dropZone.addEventListener(
            eventName,
            event => {

                event.preventDefault();

                dropZone.classList.remove("dragging");

            }
        );

    });


    dropZone.addEventListener("drop", event => {

        const files =
            event.dataTransfer.files;

        if (files.length > 0) {

            fileInput.files = files;

            showFile(files[0]);

        }

    });


    /* =========================
       AI ANALYSIS ANIMATION
    ========================= */

    form.addEventListener("submit", event => {

        if (!fileInput.files.length) {

            event.preventDefault();

            alert(
                "Please choose your resume first."
            );

            return;

        }


        analyzeBtn.classList.add("loading");

        analyzeBtn.disabled = true;

    });

});