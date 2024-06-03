const animalYes = document.querySelector('#animalSi');
const animalNo = document.querySelector('#animalNo');
function toggleAnimalButtons()
{
    console.log(animalYes);
    if(animalYes.checked)
        {
            const vaccinedYesBtn = document.querySelector('#vacunadoSi');
            vaccinedYesBtn.disabled = false;
            const vaccinedNoBtn = document.querySelector('#vacunadoNo');
            vaccinedNoBtn.disabled = false;

            const castratedYesBtn = document.querySelector('#castradoSi');
            castratedYesBtn.disabled = false;
            const castratedNoBtn = document.querySelector('#castradoNo');
            castratedNoBtn.disabled = false;
        }
    else
    {
        const vaccinedYesBtn = document.querySelector('#vacunadoSi');
        vaccinedYesBtn.disabled = true;
        vaccinedYesBtn.checked = false;
        const vaccinedNoBtn = document.querySelector('#vacunadoNo');
        vaccinedNoBtn.disabled = true;
        vaccinedNoBtn.checked = false;

        const castratedYesBtn = document.querySelector('#castradoSi');
        castratedYesBtn.disabled = true;
        castratedYesBtn.checked = false;
        const castratedNoBtn = document.querySelector('#castradoNo');
        castratedNoBtn.disabled = true;
        castratedNoBtn.checked = false;
    }
}

animalYes.addEventListener('click', () => {toggleAnimalButtons()});
animalNo.addEventListener('click', () => {toggleAnimalButtons()});

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