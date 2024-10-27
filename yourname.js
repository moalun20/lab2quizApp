function validateAndContinue() {
    // Rensa tidigare felmeddelanden
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Hämta värden från input-fälten
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;

    // Validering av förnamn
    if (!firstName || !/^[A-Za-zåäöÅÄÖ]+$/.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'Förnamn krävs och får bara innehålla bokstäver.';
        isValid = false;
    }

    // Validering av efternamn
    if (!lastName || !/^[A-Za-zåäöÅÄÖ]+$/.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Efternamn krävs och får bara innehålla bokstäver.';
        isValid = false;
    }

    // Validering av e-post
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'En giltig e-postadress krävs.';
        isValid = false;
    }

    // Om allt är korrekt, visa quiz-sektionen
    if (isValid) {
        document.getElementById('visitorInfo').style.display = 'none'; // Döljer besökarinformation
        document.getElementById('quizSection').style.display = 'block'; // Visar quiz-frågorna
    }
}
