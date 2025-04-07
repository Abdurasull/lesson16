const elRow = document.querySelector(".js-row");
const elSearchBlock = document.querySelector(".js-search-block");
const elMain = document.querySelector(".js-main");
const elTemplateSear = document.querySelector(".js-temp-s").content;
const elTemplate = document.querySelector(".js-temp").content;
const elTemplateContry = document.querySelector(".js-inCountry").content;
const elRegion = document.querySelector(".js-region-list");
const elInput = document.querySelector(".js-input");
const elDark = document.querySelector(".Dark1");
const elCardBlock = elTemplate.querySelector(".card");

// API dan ma`lumotlarni chaqirib olish uchun
const collFetch = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital");
    if (!response.ok) {
        throw new Error("Muvaffaqiyatsiz javob");
    }
    const data = await response.json();
    return data.map(country => {
        return {
            name: country.name.common,
            flag: country.flags.svg,
            region: country.region,
            population: country.population,
            capital: country.capital
        };
    });
}

collFetch().then((countries) => {
    // console.log(countries);
    renderCountries(countries);
}).catch((err) => {
    console.log(err);
})

function renderCountries(countries) {
    const docFragment = document.createDocumentFragment();
    const clone1 = elTemplateSear.cloneNode(true);
    elMain.innerHTML = '';
    countries.forEach(country => {
        const clone = elTemplate.cloneNode(true);
        
        clone.querySelector(".js-flag").src = country.flag; 
        clone.querySelector(".js-flag").dataset.country = country.name;

        clone.querySelector(".js-name").textContent = country.name;
        clone.querySelector(".js-name").dataset.country = country.name;
        
        clone.querySelector(".js-Population").textContent = country.population;

        clone.querySelector(".js-region").textContent = country.region;

        clone.querySelector(".js-Capital").textContent = country.capital;
        docFragment.append(clone);

    });
    clone1.querySelector(".js-row").append(docFragment);
    elMain.append(clone1);
}

// Regionlar bo`yicha izlaydigan funksiya
function renderRegions(countries, region) {
    const filteredCountries = countries.filter(country => country.region == region);
    elRow.innerHTML = ""; // Tozalash
    renderCountries(filteredCountries);
}

// Country nomi bo`yicha izlaydigan funksiya
function renderCountryName(countries, name) {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
    elRow.innerHTML = ""; // Tozalash
    renderCountries(filteredCountries);
}   

// Country haqidagi ma`lumotni chiqaruvchi function
const infoCountry = async (val) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${val}?fields=flags,population,continents,name,region,subregion,capital,borders`);
    if(!response.ok) {
        throw new Error("xatolik");
        
    }
    const country = await response.json(); 
        return {
        flag: country[0].flags.svg,
        population: country[0].population,
        capital: country[0].capital,
        continents: country[0].continents,
        name: country[0].name.common,
        region: country[0].region,
        subregion: country[0].subregion,
        borders: country[0].borders,
        nativname: country[0].name.nativeName
        };

};

const infoCountry1 = (country) => {
    const clone = elTemplateContry.cloneNode(true);
    clone.querySelector(".js-flagInfo").src = country.flag;
    clone.querySelector(".js-nameInfo").textContent = country.name;
    // clone.querySelector(".js-nativeInfo").textContent = country.nativeName.cca3.toLowerCase();
    clone.querySelector(".js-PopulationInfo").textContent = country.population;
    clone.querySelector(".js-RegionInfo").textContent = country.region;
    clone.querySelector(".js-CapitalInfo").textContent = country.capital;
    clone.querySelector(".js-bordersInfo").textContent = [...country.borders];

    elMain.append(clone);
}

elRegion.addEventListener("change", (evt) => {
    const selectRegion = evt.target.value;
    if(selectRegion) {
        collFetch().then((countries) => {
            renderRegions(countries, selectRegion);
        })

    }
})

elInput.addEventListener("change", (evt) => {
    const selectCountry = evt.target.value;
    if(selectCountry) {
        collFetch().then((countries) => {
            renderCountryName(countries, selectCountry);
        })

    }
})


elDark.addEventListener("click", (evt) => {
    document.body.classList.toggle('dark');

     // Tugma matnini o'zgartirish
    if (document.body.classList.contains('dark')) {
        elDark.textContent = '☀️ Light Mode';
    } else {
        elDark.textContent = '🌙 Dark Mode';
    }
})

window.addEventListener("click", (evt) => {
    const val = evt.target.dataset.country;
    if (val) {
        elMain.innerHTML = '';

        infoCountry(val).then((country) => {
            infoCountry1(country);
        })
    .catch((err) => {
        console.log(err);
    })
    }
});

window.addEventListener("click", (evt) =>{
    const val = evt.target.textContent;
    if (val == "← Back") {
        elMain.innerHTML = '';
        collFetch().then((countries) => {
        // console.log(countries);
        console.log(countries);
        renderCountries(countries);
        }).catch((err) => {
            console.log(err);
        })        
    }
})





// https://restcountries.com/v3.1/name/uzbekistan?fields=flags,population,continents,name,region,subregion,capital,borders