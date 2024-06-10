document.addEventListener('DOMContentLoaded', function() {
const animal = document.querySelector('#animal');
function toggleAnimalButtons()
{
    console.log(animal);
    if(animal.checked)
        {
            const vaccinedBtn = document.querySelector('#vacunado');
            vaccinedBtn.disabled = false;            

            const castratedBtn = document.querySelector('#castrado');
            castratedBtn.disabled = false;            
        }
    else
    {
        const vaccinedBtn = document.querySelector('#vacunado');
        vaccinedBtn.disabled = true;
        vaccinedBtn.checked = false;       

        const castratedBtn = document.querySelector('#castrado');
        castratedBtn.disabled = true;
        castratedBtn.checked = false;        
    }
}

animal.addEventListener('click', () => {toggleAnimalButtons()});

function toggleChildAge()
{
    console.log(ninos.value);
    if(ninos.value == 'Si')
        {
            const childrenAge = document.querySelector('#NinosEdad');
            childrenAge.disabled = false;
        }
    else
    {
        const childrenAge = document.querySelector('#NinosEdad');
        childrenAge.disabled = true;
        childrenAge.value = "1";
    }
}
const ninos = document.querySelector('#Ninos');
ninos.addEventListener('click', () => {toggleChildAge()});
});