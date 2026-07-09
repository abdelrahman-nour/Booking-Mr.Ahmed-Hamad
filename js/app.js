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

const schedules = {
  prep1: [
    {
      day: "السبت",
      time: "7 مساءً",
    },

    {
      day: "الثلاثاء",
      time: "7 مساءً",
    },
  ],

  prep2: [
    {
      day: "الأحد",
      time: "5 مساءً",
    },

    {
      day: "الأربعاء",
      time: "5 مساءً",
    },
  ],

  prep3: [
    {
      day: "السبت",
      time: "5 مساءً",
    },

    {
      day: "الإثنين",
      time: "5 مساءً",
    },

    {
      day: "الأربعاء",
      time: "5 مساءً",
    },
  ],

  sec1: [
    {
      day: "الأحد",
      time: "7 مساءً",
    },

    {
      day: "الثلاثاء",
      time: "7 مساءً",
    },
  ],

  sec2: [
    {
      day: "السبت",
      time: "12 ظهرًا",
    },

    {
      day: "الإثنين",
      time: "12 ظهرًا",
    },

    {
      day: "الأربعاء",
      time: "12 ظهرًا",
    },
  ],

  sec3: [
    {
      day: "الأحد",
      time: "12 ظهرًا",
    },

    {
      day: "الثلاثاء",
      time: "12 ظهرًا",
    },

    {
      day: "الخميس",
      time: "12 ظهرًا",
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

  const gradeSchedules = schedules[grade];

  /*مفيش ملف متحدد */

  if (!gradeSchedules) {
    schedulesSection.classList.add("hidden");

    return;
  }

  /*كرت مواعيد */

  gradeSchedules.forEach(function (schedule) {
    const scheduleCard = document.createElement("div");

    scheduleCard.className = `
        p-4
        rounded-xl
        border
        border-amber-300/15
        bg-[#1a1008]/70
        text-center
        cursor-default
      `;

    scheduleCard.innerHTML = `
        <strong
          class="
            block
            text-white
            text-sm
            mb-1
          "
        >
          ${schedule.day}
        </strong>


        <span
          class="
            text-amber-300
            text-xs
          "
        >
          ${schedule.time}
        </span>
      `;

    schedulesContainer.appendChild(scheduleCard);
  });

  schedulesSection.classList.remove("hidden");
}

/*Grade Change */

gradeSelect.addEventListener("change", function () {
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

  const gradeSchedules = schedules[gradeSelect.value];

  const formattedSchedules = gradeSchedules
    .map(function (schedule) {
      return `• ${schedule.day} - ${schedule.time}`;
    })
    .join("\n");

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
 مواعيد الصف:
${formattedSchedules}
━━━━━━━━━━━━━━
تم تسجيل البيانات بواسطة موقع أستاذ أحمد حمد
`.trim();

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const whatsappURL = `https://wa.me/${teacherWhatsAppNumber}?text=${encodedMessage}`;

  const whatsappTab = window.open(whatsappURL, "_blank", "noopener,noreferrer");

  /*Reset Form */
  bookingForm.reset();

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

  schedulesSection.classList.add("hidden");
});

schedulesSection.classList.add("hidden");
