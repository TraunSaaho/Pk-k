
document.addEventListener("DOMContentLoaded", function () {

    const cameraBtn = document.getElementById("cameraBtn");
    const galleryBtn = document.getElementById("galleryBtn");
    const fileInput = document.getElementById("fileInput");
    const continueBtn = document.getElementById("continueBtn");
    const backHome = document.getElementById("backHome");

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const previewImage = document.getElementById("previewImage");
    const tipsIcons = document.querySelectorAll("#tipsList i");

    let stream = null;

    const appData = {
        image: null,
        source: null,
        time: null
    };

    console.log("App Loaded Correctly");

    /* BACK BUTTON */
    backHome.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    /* CAMERA BUTTON */
    cameraBtn.addEventListener("click", async function () {

        try {

            if (!stream) {

                stream = await navigator.mediaDevices.getUserMedia({ video: true });

                video.srcObject = stream;
                video.style.display = "block";
                previewImage.style.display = "none";

                cameraBtn.innerHTML = '<i class="fa-solid fa-camera"></i> Capture Photo';

            } else {

                capturePhoto();
            }

        } catch (error) {
            alert("Please allow camera permission.");
            console.error(error);
        }
    });

    function capturePhoto() {

        if (!stream) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL("image/png");

        stream.getTracks().forEach(track => track.stop());
        stream = null;

        video.style.display = "none";

        previewImage.src = imageData;
        previewImage.style.display = "block";

        cameraBtn.innerHTML = '<i class="fa-solid fa-camera"></i> Take Photo';

        activateAfterImage(imageData, "camera");
    }

    /* GALLERY */
    galleryBtn.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {

        if (!this.files[0]) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;
            previewImage.style.display = "block";
            video.style.display = "none";

            activateAfterImage(e.target.result, "gallery");
        };

        reader.readAsDataURL(this.files[0]);
    });

    /* AFTER IMAGE */
    function activateAfterImage(imageData, source) {

        appData.image = imageData;
        appData.source = source;
        appData.time = new Date().toISOString();

        continueBtn.classList.remove("hidden");

        tipsIcons.forEach(icon => {
            icon.classList.remove("fa-circle");
            icon.classList.add("fa-circle-check");
            icon.style.color = "#16a34a";
        });

        console.log("===== DATA STORED =====");
        console.log(appData);
    }

});





/* ================= STEP 2 ================= */

const concernButtons = document.querySelectorAll(".concern");
const description = document.getElementById("description");
const startAnalysis = document.getElementById("startAnalysis");

let selectedConcerns = [];

concernButtons.forEach(button => {

    button.addEventListener("click", function () {

        const value = this.getAttribute("data-value");

        this.classList.toggle("active");

        if (selectedConcerns.includes(value)) {
            selectedConcerns = selectedConcerns.filter(item => item !== value);
        } else {
            selectedConcerns.push(value);
        }

        console.log("Selected Concerns:", selectedConcerns);
    });

});

/* CONTINUE BUTTON */

startAnalysis.addEventListener("click", function () {

    const userData = {
        concerns: selectedConcerns,
        description: description.value,
        time: new Date().toISOString()
    };

    console.log("===== STEP 2 DATA =====");
    console.log(userData);

});


/* ================= SCREEN NAVIGATION ================= */

const uploadScreen = document.getElementById("uploadScreen");
const concernScreen = document.getElementById("concernScreen");
const continueBtn = document.getElementById("continueBtn");
const backToUpload = document.getElementById("backToUpload");

/* GO TO STEP 2 */
continueBtn.addEventListener("click", function () {

    uploadScreen.classList.remove("active");
    concernScreen.classList.add("active");

    console.log("Moved to Step 2");
});

/* BACK TO STEP 1 */
if (backToUpload) {
    backToUpload.addEventListener("click", function () {

        concernScreen.classList.remove("active");
        uploadScreen.classList.add("active");

        console.log("Back to Step 1");
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const uploadScreen = document.getElementById("uploadScreen");
    const concernScreen = document.getElementById("concernScreen");
    const loadingScreen = document.getElementById("loadingScreen");

    const step2Btn = document.getElementById("startAnalysis");

    function showScreen(screen) {
        uploadScreen.classList.remove("active");
        concernScreen.classList.remove("active");
        loadingScreen.classList.remove("active");

        screen.classList.add("active");
    }

    if (step2Btn) {
        step2Btn.addEventListener("click", function () {
            showScreen(loadingScreen);
            startLoadingAnimation();
        });
    }

});

function startLoadingAnimation() {

    const progressFill = document.getElementById("progressFill");
    const progressPercent = document.getElementById("progressPercent");
    const loadingStatus = document.getElementById("loadingStatus");

    let progress = 0;

    const messages = [
        "Measuring skin texture...",
        "Detecting acne...",
        "Analyzing pores...",
        "Scanning pigmentation...",
        "Finalizing AI report..."
    ];

    let messageIndex = 0;

    const interval = setInterval(() => {

        progress++;

        progressFill.style.width = progress + "%";
        progressPercent.innerText = progress + "%";

        if (progress % 20 === 0 && messageIndex < messages.length) {
            loadingStatus.innerText = messages[messageIndex];
            messageIndex++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            console.log("AI Analysis Complete");
        }

    }, 40);
}