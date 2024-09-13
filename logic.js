let currentStep = 2; // เริ่มต้นจาก step 2
let numLegs = 6; // จำนวนขาเริ่มต้น
let selectedButtons = {};
let points = [];
let currentLegIndex = 0;

function nextStep() {
  if (currentStep === 3) {
    if (currentLegIndex < numLegs - 1) {
      currentLegIndex++;
      updateStep3Title();
      resetPointSelection();
    } else {
      currentStep++;
      document.querySelector(`#step${currentStep}`).classList.add("active");
      document
        .querySelector(`#step${currentStep - 1}`)
        .classList.remove("active");

      // แสดงสรุปหลังจากเสร็จสิ้นขั้นตอนทั้งหมด
      displaySummary();
    }
  } else {
    document.querySelector(`#step${currentStep}`).classList.remove("active");
    currentStep++;
    document.querySelector(`#step${currentStep}`).classList.add("active");

    if (currentStep === 3) {
      updateStep3Title();
      resetPointSelection();
    }
  }

  updateNextButtonVisibility();
}

function previousStep() {
  if (currentStep === 3 && currentLegIndex > 0) {
    currentLegIndex--;
    updateStep3Title();
    resetPointSelection();
  } else {
    document.querySelector(`#step${currentStep}`).classList.remove("active");
    currentStep--;
    document.querySelector(`#step${currentStep}`).classList.add("active");
  }

  updateNextButtonVisibility();
}

function updateStep3Title() {
  const step3Title = document.getElementById("step3Title");
  step3Title.innerText = `แต้มขาที่ ${currentLegIndex + 1}`;
}

function updateNextButtonVisibility() {
  const nextButton = document.getElementById(`next${currentStep}`);
  if (nextButton) {
    const isStep2 = currentStep === 2;
    const isStep3 = currentStep === 3;

    let isButtonEnabled = false;

    if (isStep2) {
      isButtonEnabled = selectedButtons["step2"] !== undefined;
    } else if (isStep3) {
      isButtonEnabled =
        selectedButtons[`step3_${currentLegIndex}`] !== undefined;
    }

    nextButton.style.display = isButtonEnabled ? "block" : "none";
  }
}

// สร้างปุ่มตัวเลขสำหรับ Step 2
const numberButtons = document.getElementById("numberButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, i);
  });
  numberButtons.appendChild(btn);
}

// สร้างปุ่ม "เด้ง" สำหรับ Step 2
const bounceButtons = document.getElementById("bounceButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = `${i} เด้ง`;
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, `${i} เด้ง`);
  });
  bounceButtons.appendChild(btn);
}

function selectStep2Button(button, value) {
  selectedButtons["step2"] = button;

  document
    .querySelectorAll("#numberButtons .number-btn, #bounceButtons .number-btn")
    .forEach((btn) => {
      btn.classList.remove("selected");
      btn.classList.remove("active");
    });

  button.classList.add("selected");
  button.classList.add("active");
  nextStep();
}

// สร้างปุ่มตัวเลขสำหรับ Step 3
const pointsNumberButtons = document.getElementById("pointsNumberButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, i);
  });
  pointsNumberButtons.appendChild(btn);
}

// สร้างปุ่ม "เด้ง" สำหรับ Step 3
const pointsBounceButtons = document.getElementById("pointsBounceButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = `${i} เด้ง`;
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, `${i} เด้ง`);
  });
  pointsBounceButtons.appendChild(btn);
}

function selectStep3Button(button, value) {
  selectedButtons[`step3_${currentLegIndex}`] = button;

  document
    .querySelectorAll(
      "#pointsNumberButtons .number-btn, #pointsBounceButtons .number-btn"
    )
    .forEach((btn) => {
      btn.classList.remove("selected");
      btn.classList.remove("active");
    });

  button.classList.add("selected");
  button.classList.add("active");
  points[currentLegIndex] = value;
  if (currentLegIndex < numLegs - 1) {
    currentLegIndex++;
    updateStep3Title();
    resetPointSelection();
  } else {
    nextStep();
  }
}

function resetPointSelection() {
  document
    .querySelectorAll(
      "#pointsNumberButtons .number-btn, #pointsBounceButtons .number-btn"
    )
    .forEach((btn) => {
      if (
        selectedButtons[`step3_${currentLegIndex}`] &&
        btn.textContent ===
          selectedButtons[`step3_${currentLegIndex}`].textContent
      ) {
        btn.classList.add("selected");
        btn.classList.add("active");
      } else {
        btn.classList.remove("selected");
        btn.classList.remove("active");
      }
    });
}
const liffId = "2006065768-no9MYKVg"
liff.init({liffId: liffId})
    .then(() => {
      if (!liff.isLoggedIn()) {
          liff.login();
      }
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
function displaySummary() {
  const summary = document.getElementById("summary");

  summary.style.display = "block";

  summary.innerHTML = `<p>เจ้า ${
    selectedButtons["step2"] ? selectedButtons["step2"].textContent : ""
  } แต้ม:</p>`;

  points.forEach((point, index) => {
    summary.innerHTML += `<p>แต้มขาที่ ${index + 1}: ${point}</p>`;
  });
  let text = "";

  if (selectedButtons && selectedButtons["step2"]) {
      const selectedButtons_owne = selectedButtons["step2"].value || selectedButtons["step2"].textContent || String(selectedButtons["step2"]);
      
      if (selectedButtons_owne.includes("เด้ง")) {
          text += "S" + selectedButtons_owne.replace("เด้ง", "");
      } else {
          text += "S" + selectedButtons_owne;
      }
  }
  
  if (Array.isArray(points)) {
      points.forEach((point) => {
          const pointStr = point.value || point.textContent || String(point);
  
          if (pointStr.includes("เด้ง")) {
              text += "," + pointStr.replace("เด้ง", "");
          } else {
              text += "," + pointStr;
          }
      });
  }
  liff
  .shareTargetPicker(
    [
      {
        type: "text",
        text: text,
      },
    ],
    {
      isMultiple: true,
    }
  )
  .then(function (res) {
    if (res) {
      Swal.fire({
        title: "ส่งข้อความสำเร็จ!",
        text: `[${res.status}] Message sent!`,
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: `TargetPicker was closed!`,
        icon: "error"
      });
    }
  })
  .catch(function (error) {
    console.log("something wrong happen");
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: `${error}`,
      icon: "error"
    });
  });
}

document.getElementById("backButton2").addEventListener("click", previousStep);
document.getElementById("backButton3").addEventListener("click", previousStep);

document.getElementById("startOver").addEventListener("click", () => {
  currentStep = 2;
  selectedButtons = {};
  points = [];
  currentLegIndex = 0;

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });
  document.querySelector("#step2").classList.add("active");

  document.querySelectorAll(".number-btn.selected").forEach((button) => {
    button.classList.remove("selected");
    button.classList.remove("active");
  });

  document.getElementById("summary").innerHTML = "";

  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.value = "";
  });

  updateNextButtonVisibility();
});

updateNextButtonVisibility();
