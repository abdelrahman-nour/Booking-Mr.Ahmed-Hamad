/*Elements */
const bookingForm = document.getElementById("bookingForm");
const studentNameInput = document.getElementById("studentName");
const studentPhoneInput = document.getElementById("studentPhone");
const parentPhoneInput = document.getElementById("parentPhone");
const gradeSelect = document.getElementById("grade");
const schedulesSection = document.getElementById("schedulesSection");
const schedulesContainer = document.getElementById("schedulesContainer");
const teacherWhatsAppNumber = "201278941436"; // غيّر الرقم لرقم أستاذ أحمد حمد

/* SCHEDULES DATA */
let selectedGroup = null;
const schedules = {
  prep1: [
    {
      group: "المجموعة الأولى",
      day: "الأحد - الثلاثاء - الخميس",
      time: "2:00",
    },

    {
      group: "المجموعة الثانية",
      day: "الأحد - الثلاثاء - الخميس",
      time: "3:00",
    },

    {
      group: "المجموعة الثالثة",
      day: "الأحد - الثلاثاء - الخميس",
      time: "4:00",
    },
  ],

  prep2: [
    {
      group: "المجموعة الأولى",
      day: "الأحد - الثلاثاء - الخميس",
      time: "5:00",
    },

    {
      group: "المجموعة الثانية",
      day: "الأحد - الثلاثاء -الخميس",
      time: "6:00",
    },

    {
      group: "المجموعة الثالثة",
      day: "الأحد - الثلاثاء - الخميس",
      time: "7:00",
    },
  ],

  prep3: [
    {
      group: "المجموعة الأولى",
      day: "الأحد - الثلاثاء - الخميس",
      time: "11:00",
    },

    {
      group: "المجموعة الثانية",
      day: "الأحد - الثلاثاء - الخميس",
      time: "12:30",
    },

    {
      group: "المجموعة الثالثة",
      day: "السبت - الإثنين - الأربعاء",
      time: "11:30",
    },
  ],

  sec1: [
    {
      group: "المجموعة الأولى",
      day: "السبت - الإثنين - الأربعاء",
      time: "5:00",
    },

    {
      group: "المجموعة الثانية",
      day: "السبت - الإثنين - الأربعاء",
      time: "6:00",
    },
  ],

  sec2: [
    {
      group: "المجموعة الأولى",
      day: "السبت - الإثنين - الأربعاء",
      time: "1:00",
    },

    {
      group: "المجموعة الثانية",
      day: "السبت - الإثنين - الأربعاء",
      time: "2:30",
    },
  ],

  sec3: [
    {
      group: "المجموعة الأولى",
      day: "السبت - الإثنين - الأربعاء",
      time: "10:00 صباحًا",
    },
  ],
};

const egyptPhoneRegex = /^01[0125][0-9]{8}$/;

function normalizePhone(phone) {
  return phone.replace(/\D/g, "");
}

function showError(element, message) {
  removeError(element);

  element.classList.remove("border-amber-300/15");

  element.classList.add(
    "border-red-500",
    "shadow-[0_0_20px_rgba(239,68,68,.15)]",
  );

  const errorMessage = document.createElement("p");

  errorMessage.className = `
    validation-error
    text-red-400
    text-xs
    mt-2
    font-medium
  `;

  errorMessage.textContent = message;

  element.parentElement.appendChild(errorMessage);
}

function removeError(element) {
  element.classList.remove(
    "border-red-500",
    "shadow-[0_0_20px_rgba(239,68,68,.15)]",
  );

  element.classList.add("border-amber-300/15");

  const errorMessage = element.parentElement.querySelector(".validation-error");

  if (errorMessage) {
    errorMessage.remove();
  }
}

/*Validate Name */

function validateName() {
  const studentName = studentNameInput.value.trim();

  const nameParts = studentName.split(/\s+/).filter(Boolean);

  if (studentName === "") {
    showError(studentNameInput, "من فضلك اكتب اسمك بالكامل");

    return false;
  }

  if (nameParts.length < 2) {
    showError(studentNameInput, "من فضلك اكتب الاسم بالكامل");

    return false;
  }

  if (studentName.length < 5) {
    showError(studentNameInput, "الاسم قصير جدًا");

    return false;
  }

  removeError(studentNameInput);

  return true;
}

/*Validate Phone */

function validatePhone(input, personName) {
  const phone = normalizePhone(input.value);

  input.value = phone;

  if (phone === "") {
    showError(input, `من فضلك اكتب رقم تليفون ${personName}`);

    return false;
  }

  if (phone.length !== 11) {
    showError(input, "رقم التليفون يجب أن يكون 11 رقم");

    return false;
  }

  if (!egyptPhoneRegex.test(phone)) {
    showError(input, "اكتب رقم مصري صحيح يبدأ بـ 010 أو 011 أو 012 أو 015");

    return false;
  }

  removeError(input);

  return true;
}

function validateDifferentPhones() {
  const studentPhone = normalizePhone(studentPhoneInput.value);

  const parentPhone = normalizePhone(parentPhoneInput.value);

  if (
    !egyptPhoneRegex.test(studentPhone) ||
    !egyptPhoneRegex.test(parentPhone)
  ) {
    return false;
  }

  if (studentPhone === parentPhone) {
    showError(parentPhoneInput, "رقم ولي الأمر لا يمكن أن يكون نفس رقم الطالب");

    return false;
  }

  removeError(parentPhoneInput);

  return true;
}

function validateGrade() {
  if (gradeSelect.value === "") {
    showError(gradeSelect, "من فضلك اختر الصف الدراسي");

    return false;
  }

  removeError(gradeSelect);

  return true;
}

function renderSchedules(grade) {
  schedulesContainer.innerHTML = "";

  selectedGroup = null;

  const gradeSchedules = schedules[grade];

  if (!gradeSchedules) {
    schedulesSection.classList.add("hidden");

    return;
  }

  gradeSchedules.forEach(function (schedule) {
    const card = document.createElement("div");

    card.className = `
      schedule-card
      p-5
      rounded-2xl
      border
      border-amber-300/15
      bg-[#1a1008]/70
      cursor-pointer
      transition-all
      duration-300
      hover:border-amber-300
      hover:-translate-y-1
      relative
    `;

    card.innerHTML = `

      <div class="absolute top-4 left-4 hidden check-icon">

        <i class="fa-solid fa-circle-check text-amber-300 text-xl"></i>

      </div>

      <h3 class="text-white font-bold mb-2">

        ${schedule.group}

      </h3>

      <p class="text-gray-300 text-sm mb-3">

        ${schedule.day}

      </p>

      <p class="text-amber-300 font-bold">

        الساعة:  ${schedule.time}

      </p>

    `;

    card.addEventListener("click", function () {
      document.querySelectorAll(".schedule-card").forEach(function (c) {
        c.classList.remove("active");

        c.querySelector(".check-icon").classList.add("hidden");
      });

      card.classList.add("active");

      card.querySelector(".check-icon").classList.remove("hidden");

      selectedGroup = schedule;
    });

    schedulesContainer.appendChild(card);
  });

  schedulesSection.classList.remove("hidden");
}

/*Grade Change */

gradeSelect.addEventListener("change", function () {
  selectedGroup = null;

  validateGrade();

  renderSchedules(gradeSelect.value);
});

/*Name Events */

studentNameInput.addEventListener("blur", function () {
  validateName();
});

studentNameInput.addEventListener("input", function () {
  if (studentNameInput.value.trim() === "") {
    return;
  }

  const error =
    studentNameInput.parentElement.querySelector(".validation-error");

  if (error) {
    validateName();
  }
});

studentPhoneInput.addEventListener("input", function () {
  studentPhoneInput.value = normalizePhone(studentPhoneInput.value).slice(
    0,
    11,
  );

  const studentPhone = studentPhoneInput.value;

  /*
      لو وصل 11 رقم
      اعمل Validation
    */

  if (studentPhone.length === 11) {
    validatePhone(studentPhoneInput, "الطالب");

    /*
        لو رقم ولي الأمر مكتوب
        قارن الرقمين
      */

    if (parentPhoneInput.value.length === 11) {
      validateDifferentPhones();
    }
  }
});

studentPhoneInput.addEventListener("blur", function () {
  validatePhone(studentPhoneInput, "الطالب");

  if (parentPhoneInput.value.length === 11) {
    validateDifferentPhones();
  }
});

/*Parent Phone Events */

parentPhoneInput.addEventListener("input", function () {
  parentPhoneInput.value = normalizePhone(parentPhoneInput.value).slice(0, 11);

  const parentPhone = parentPhoneInput.value;

  if (parentPhone.length === 11) {
    const isParentPhoneValid = validatePhone(parentPhoneInput, "ولي الأمر");

    if (isParentPhoneValid) {
      validateDifferentPhones();
    }
  }
});

parentPhoneInput.addEventListener("blur", function () {
  const isParentPhoneValid = validatePhone(parentPhoneInput, "ولي الأمر");

  if (isParentPhoneValid) {
    validateDifferentPhones();
  }
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  /*Validation */

  const isNameValid = validateName();

  const isStudentPhoneValid = validatePhone(studentPhoneInput, "الطالب");

  const isParentPhoneValid = validatePhone(parentPhoneInput, "ولي الأمر");

  const arePhonesDifferent =
    isStudentPhoneValid && isParentPhoneValid
      ? validateDifferentPhones()
      : false;

  const isGradeValid = validateGrade();

  /*Check Form */
  if (!selectedGroup) {
    alert("من فضلك اختر المجموعة المناسبة.");

    return;
  }
  const isFormValid =
    isNameValid &&
    isStudentPhoneValid &&
    isParentPhoneValid &&
    arePhonesDifferent &&
    isGradeValid;

  if (!isFormValid) {
    const firstError = document.querySelector(".validation-error");

    if (firstError) {
      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return;
  }

  /*Form Data */

  const formData = {
    studentName: studentNameInput.value.trim(),

    studentPhone: normalizePhone(studentPhoneInput.value),

    parentPhone: normalizePhone(parentPhoneInput.value),

    grade: gradeSelect.options[gradeSelect.selectedIndex].text,
  };

  const formattedSchedule = `
${selectedGroup.group}
${selectedGroup.day}
${selectedGroup.time}
`.trim();

  /* =====================================
   WHATSAPP MESSAGE
===================================== */

  const whatsappMessage = `
تأكيد حجز أستاذ أحمد حمد دفعة 2027

اسم الطالب:
${formData.studentName}
رقم تليفون الطالب:
${formData.studentPhone}
رقم تليفون ولي الأمر:
${formData.parentPhone}
الصف الدراسي:
${formData.grade}
المجموعة المختارة:
${formattedSchedule}
━━━━━━━━━━━━━━
تم تسجيل البيانات بواسطة موقع أستاذ أحمد حمد
`.trim();

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const whatsappURL = `https://wa.me/${teacherWhatsAppNumber}?text=${encodedMessage}`;

  const whatsappTab = window.open(whatsappURL, "_blank", "noopener,noreferrer");

  /*Reset Form */
  bookingForm.reset();
  selectedGroup = null;
  /* Remove Validation Errors */

  document.querySelectorAll(".validation-error").forEach(function (error) {
    error.remove();
  });

  /*Reset Input Styles */

  [studentNameInput, studentPhoneInput, parentPhoneInput, gradeSelect].forEach(
    function (element) {
      element.classList.remove(
        "border-red-500",
        "shadow-[0_0_20px_rgba(239,68,68,.15)]",
      );

      element.classList.add("border-amber-300/15");
    },
  );

  /* Clear Schedules */

  schedulesContainer.innerHTML = "";
  document.querySelectorAll(".schedule-card").forEach(function (card) {
    card.classList.remove("active");
  });
  schedulesSection.classList.add("hidden");
});

schedulesSection.classList.add("hidden");
