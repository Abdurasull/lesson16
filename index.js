const elRow = document.querySelector(".js-row");
const elTemplate = document.querySelector(".js-temp").content;
const elRegion = document.querySelector(".js-region-list");
const elInput = document.querySelector(".js-input");
const elDark = document.querySelector(".Dark1");

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
    countries.forEach(country => {
        const clone = elTemplate.cloneNode(true);
        clone.querySelector(".js-flag").src = country.flag;
        clone.querySelector(".js-name").textContent = country.name;
        clone.querySelector(".js-Population").textContent = country.population;
        clone.querySelector(".js-region").textContent = country.region;
        clone.querySelector(".js-Capital").textContent = country.capital;
        docFragment.append(clone);

    });
    elRow.append(docFragment);
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