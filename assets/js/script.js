// Get the form and submit button elements
const form = document.getElementById('singup_auth');
const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Add event listener to the submit button
submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Call the validation function
  validateForm();
});

const setErrorMessage = (message) => {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = message;
    errorMessage.removeAttribute('hidden');
  };
  
  function validateForm() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('adders').value;
    const phoneNumber = document.getElementById('PhoneNumber').value;
  
    const successMessage = document.getElementById('successMessage');
  
    // Clear any previous error or success messages
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = '';
    errorMessage.setAttribute('hidden', 'hidden');
    successMessage.innerHTML = '';
  
    // Arabic text regular expression
    const arabicRegex = /[\u0600-\u06FF\s]/;
  
    // Email regular expression
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  
    // Phone number regular expression
    const phoneNumberRegex = /^\d{10}$/;
  
    // Perform validation checks
    if (fullName === '') {
      setErrorMessage('الرجاء إدخال الاسم الكامل.');
      return;
    }
  
    if (!arabicRegex.test(fullName)) {
      setErrorMessage('الرجاء إدخال اسم صالح باللغة العربية.');
      return;
    }
  
    if (email === '') {
      setErrorMessage('الرجاء إدخال عنوان البريد الإلكتروني.');
      return;
    }
  
  
    if (phoneNumber === '') {
      setErrorMessage('الرجاء إدخال رقم الهاتف.');
      return;
    }
  
    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrorMessage('الرجاء إدخال رقم هاتف صحيح مكون من 10 أرقام.');
      return;
    }
    sendData()
  }

  // firbase 

 
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDpiGtg_mnIE_id_-Bv43FO-VsUCZMrPRs",
    authDomain: "chatauth-151ca.firebaseapp.com",
    projectId: "chatauth-151ca",
    storageBucket: "chatauth-151ca.appspot.com",
    messagingSenderId: "484046494549",
    appId: "1:484046494549:web:4ae4f3e3711795b5166ddc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sendData = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('adders').value,
    phoneNumber: document.getElementById('PhoneNumber').value
    });

    if (docRef) {
      console.log('Form data saved with ID:', docRef.id);
      successMessage.removeAttribute('hidden');
      successMessage.innerHTML = 'تم التسجيل بنجاح! شكرًا لك على التسجيل.';
      form.reset();
      window.location.reload()
    }
  } catch (error) {
    console.error('Error saving form data:', error);
    alert('حدث خطأ أثناء حفظ بيانات النموذج.');
  }
};