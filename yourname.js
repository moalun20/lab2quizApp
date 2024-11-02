//Validering real-tid
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('firstName').addEventListener('input', validateFirstName);
    document.getElementById('lastName').addEventListener('input', validateLastName);
    document.getElementById('email').addEventListener('input', validateEmail);
});
function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim(); // Hämtar värdet från fältet och tar bort mellanslag
    if (!firstName || !/^[A-Za-zåäöÅÄÖ]+$/.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'Förnamn krävs och får endast innehålla bokstäver.';
    } else {
        document.getElementById('firstNameError').textContent = ''; // Tar bort felmeddelandet om det är giltigt
    }
}
function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName || !/^[A-Za-zåäöÅÄÖ]+$/.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Efternamn krävs och får endast innehålla bokstäver.';
    } else {
        document.getElementById('lastNameError').textContent = '';
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'En giltig e-postadress krävs.';
    } else {
        document.getElementById('emailError').textContent = '';
    }
}
function validateAndShowQuiz() {
    // Rensa felmeddelanden
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Hämta värden
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

    // Visa quiz-sektionen om allt är giltigt
    if (isValid) {
        document.getElementById('infoForm').style.display = 'none';
        document.getElementById('quizSection').style.display = 'block';
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
        document.getElementById('question4Error').textContent = 'Denna fråga är obligatorisk.';
        isValid = false;
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
