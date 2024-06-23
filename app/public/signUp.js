document.addEventListener('DOMContentLoaded', function ()
    {
        setUpListeners();        
    })  

function setUpListeners()
{
    document.getElementById('signUp-form').addEventListener('submit', async function(e)
    {
        e.preventDefault();
        let formData = new FormData(this);
        let body = createSignUpRequest(formData);
        let response = await sendSignUpRequest(body);
        alert("Registro realizado con exito!");
      //  window.location.href = './';                     
    })
    document.getElementById('password').addEventListener('blur', function(e)
            {
                checkIfPasswordIsValid(this);
            })
}

function createSignUpRequest(formData)
{
    let data = 
    {
        firstName : formData.get('firstName'),
        lastName : formData.get('lastName'),
        email : formData.get('email'),
        password : formData.get('password'),
        address : formData.get('address'),
        city : formData.get('city'),
        role : formData.get('role')
    }
    return data;
}
async function sendSignUpRequest(data)
{
    try
    {
        const response = await fetch(`https://localhost:44350/api/Auth/signup`,        
            {
                method : 'POST',
                headers : 
                {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)
            });
        if(!response)
            {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        return response.json();
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
    
}
function redirectToHome(response)
{
    if(response.userId != null)
        {

        }
}

function checkIfPasswordIsValid(passwordInput)
{        
    const password = passwordInput.value;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;

    let errorMessageContainer = document.getElementById('password-error-message');
    let errorMessage = "";

    if(password.length < 8)
        {
            errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
        }
    else if (!specialCharacterRegex.test(password)) 
        {
            errorMessage = 'La contraseña debe tener al menos un caracter especial.';
        } 
    else if (!uppercaseRegex.test(password)) 
        {
            errorMessage = 'La contraseña debe tener al menos una letra mayuscula.';
        } 
    else if (!digitRegex.test(password)) 
        {
            errorMessage = 'La contraseña debe tener al menos un numero.';
        } 
    else 
        {
            errorMessage = "";     
        }
    errorMessageContainer.innerHTML = errorMessage;
    passwordInput.setCustomValidity(errorMessage);    
}