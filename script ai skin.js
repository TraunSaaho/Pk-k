/* ===============================
   GLOBAL APP STATE
================================= */

const appState = {
    uploadedImage: null,
    selectedConcerns: [],
    description: "",
    analysisScores: {},
    paymentStatus: false
};

console.log("App Initialized", appState);


/* ===============================
   SCREEN CONTROLLER
================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
    console.log("Navigated to:", id);
}


/* ===============================
   STEP 1 : IMAGE UPLOAD
================================= */

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const continueBtn = document.getElementById("continueToConcerns");

uploadBtn.addEventListener("click", () => {
    console.log("Upload Button Clicked");
    fileInput.click();
});

fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        imagePreview.innerHTML = `<img src="${e.target.result}" />`;

        appState.uploadedImage = file.name;

        console.log("Image Uploaded:", file.name);

        continueBtn.classList.remove("hidden");

    };

    reader.readAsDataURL(file);
});

continueBtn.addEventListener("click", () => {
    console.log("Proceeding to Concern Selection");
    showScreen("concernScreen");
});


/* ===============================
   STEP 2 : CONCERN SELECTION
================================= */

const concernButtons = document.querySelectorAll(".concern");
const descriptionInput = document.getElementById("description");
const startAnalysisBtn = document.getElementById("startAnalysis");

concernButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const concern = button.innerText;

        if (appState.selectedConcerns.includes(concern)) {

            appState.selectedConcerns =
                appState.selectedConcerns.filter(item => item !== concern);

        } else {

            appState.selectedConcerns.push(concern);

        }

        console.log("Selected Concerns:", appState.selectedConcerns);
    });

});

descriptionInput.addEventListener("input", () => {
    appState.description = descriptionInput.value;
    console.log("User Description:", appState.description);
});

startAnalysisBtn.addEventListener("click", () => {

    if (!appState.uploadedImage) {
        alert("Please upload image first");
        return;
    }

    console.log("Starting Analysis...");
    showScreen("loadingScreen");
    startLoadingAnimation();
});


/* ===============================
   STEP 3 : LOADING ANIMATION
================================= */

function startLoadingAnimation() {

    const progressBar = document.getElementById("progress");
    const loadingText = document.getElementById("loadingText");

    let progress = 0;

    const loadingSteps = [
        "Analyzing pigmentation...",
        "Measuring wrinkle depth...",
        "Scanning pores...",
        "Evaluating texture...",
        "Finalizing AI model..."
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {

        progress += 2;
        progressBar.style.width = progress + "%";

        if (progress % 20 === 0 && stepIndex < loadingSteps.length) {
            loadingText.innerText = loadingSteps[stepIndex];
            console.log("AI Step:", loadingSteps[stepIndex]);
            stepIndex++;
        }

        if (progress >= 100) {

            clearInterval(interval);

            generateFakeResults();

            setTimeout(() => {
                showScreen("unlockScreen");
            }, 800);

        }

    }, 100);
}


/* ===============================
   STEP 4 : GENERATE FAKE RESULTS
================================= */

function generateFakeResults() {

    appState.analysisScores = {
        pigmentation: (Math.random() * 5).toFixed(1),
        acne: (Math.random() * 5).toFixed(1),
        wrinkles: (Math.random() * 5).toFixed(1)
    };

    console.log("Analysis Results:", appState.analysisScores);
}


/* ===============================
   STEP 5 : PAYMENT SIMULATION
================================= */

const unlockBtn = document.getElementById("unlockBtn");

unlockBtn.addEventListener("click", () => {

    console.log("Payment Button Clicked");

    unlockBtn.innerText = "Processing Payment...";
    unlockBtn.disabled = true;

    setTimeout(() => {

        appState.paymentStatus = true;

        console.log("Payment Successful");

        showScreen("reportScreen");

        displayResults();

    }, 2000);
});


/* ===============================
   STEP 6 : DISPLAY REPORT
================================= */

function displayResults() {

    document.getElementById("pigScore").innerText =
        appState.analysisScores.pigmentation + " / 5";

    document.getElementById("acneScore").innerText =
        appState.analysisScores.acne + " / 5";

    document.getElementById("wrinkleScore").innerText =
        appState.analysisScores.wrinkles + " / 5";

    console.log("Report Displayed");
}


/* ===============================
   STEP 7 : ROUTINE PAGE
================================= */

const viewRoutineBtn = document.getElementById("viewRoutine");

viewRoutineBtn.addEventListener("click", () => {

    console.log("Viewing Personalized Routine");

    showScreen("routineScreen");

});