// Validering i realtid
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('firstName').addEventListener('input', validateFirstName);
    document.getElementById('lastName').addEventListener('input', validateLastName);
    document.getElementById('email').addEventListener('input', validateEmail);
});
//Validera förnamn
function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim();
    const errorElement = document.getElementById('firstNameError');
    const successElement = document.getElementById('firstNameSuccess');
    
    if (!firstName || !/^[A-Za-zåäöÅÄÖ]+$/.test(firstName)) {
        errorElement.textContent = 'Förnamn krävs och får endast innehålla bokstäver.';
        successElement.textContent = '';
    } else {
        errorElement.textContent = '';
        successElement.textContent = 'Förnamnet är giltigt!';
    }
}
// Validera efternamn
function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();
    const errorElement = document.getElementById('lastNameError');
    const successElement = document.getElementById('lastNameSuccess');
    
    if (!lastName || !/^[A-Za-zåäöÅÄÖ]+$/.test(lastName)) {
        errorElement.textContent = 'Efternamn krävs och får endast innehålla bokstäver.';
        successElement.textContent = '';
    } else {
        errorElement.textContent = '';
        successElement.textContent = 'Efternamnet är giltigt!';
    }
}
// Validera email
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const errorElement = document.getElementById('emailError');
    const successElement = document.getElementById('emailSuccess');
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errorElement.textContent = 'En giltig e-postadress krävs.';
        successElement.textContent = '';
    } else {
        errorElement.textContent = '';
        successElement.textContent = 'E-postadressen är giltig!';
    }
}
// Validera information och visa quiz
function showQuiz() {
    // Rensa tidigare felmeddelanden
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('.success').forEach(el => el.textContent = ''); // Tömmer också successmeddelanden

    // Hämta värden från formuläret
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;

    // Validering av förnamn
    if (!firstName || !/^[A-Za-zåäöÅÄÖ]+$/.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'Förnamn krävs och får endast innehålla bokstäver.';
        isValid = false;
    }

    // Validering av efternamn
    if (!lastName || !/^[A-Za-zåäöÅÄÖ]+$/.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Efternamn krävs och får endast innehålla bokstäver.';
        isValid = false;
    }

    // Validering av e-post
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'En giltig e-postadress krävs.';
        isValid = false;
    }

    // Om alla fält är giltiga, visa quiz-sektionen
    if (isValid) {
        document.getElementById('infoForm').style.display = 'none'; // Göm infoformuläret
        document.getElementById('quizSection').style.display = 'block'; // Visa quizet
    }
}

function submitQuiz() {
    // Rensa tidigare felmeddelanden
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Hämta värden från varje fråga
    const question1 = document.querySelector('input[name="question1"]:checked');
    const question2 = document.querySelectorAll('input[name="question2"]:checked');
    const question3 = document.querySelector('input[name="question3"]:checked');
    const question4 = document.querySelector('input[name="question4"]').value.trim();
    const question5 = document.querySelector('input[name="question5"]').value.trim();

    let isValid = true;
    let score = 0;

    // Validering av fråga 1 (radio-knappar)
    if (!question1) {
        document.getElementById('question1Error').textContent = 'Denna fråga är obligatorisk.';
        isValid = false;
    } else if (question1.value === 'Användarvänlighet') {
        score++;
    }

    // Validering av fråga 2 (checkboxar)
    if (question2.length === 0) {
        document.getElementById('question2Error').textContent = 'Denna fråga är obligatorisk.';
        isValid = false;
    } else if ([...question2].some(cb => cb.value === 'Användartester')) {
        score++;
    }

    // Validering av fråga 3 (radio-knappar)
    if (!question3) {
        document.getElementById('question3Error').textContent = 'Denna fråga är obligatorisk.';
        isValid = false;
    } else if (question3.value === '5') {
        score++;
    }

    // Validering av fråga 4 (öppet textfält)
    if (!question4) {
    } else if (question4.toLowerCase() === 'Personas') {  // Exempel-svar
        score++;
    }else if (question4.toLowerCase() === 'personas') {  // Gör jämförelsen mer tolerant
        score++;
    }

    // Validering av fråga 5 (öppet textfält)
    if (!question5) {
        document.getElementById('question5Error').textContent = 'Denna fråga är obligatorisk.';
        isValid = false;
    } else if (question5 === 'Hierarki') {  // Exempel-svar
        score++; 
    }else if (question5.toLowerCase() === 'hierarki') {  // Gör jämförelsen mer tolerant
        score++;
    }

    // Visa resultat om allt är giltigt
    if (isValid) {
        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('resultMessage').textContent = `Du fick ${score} av 5 rätt!`;
        document.getElementById('correctAnswers').innerHTML = `
            1. Rätt svar: Användarvänlighet <br>
            2. Rätt svar: Användartester<br>
            3. Rätt svar: 5 <br>
            4. Rätt svar: Personas <br>
            5. Rätt svar: Hierarki
        `;
    }
}
