const elRow = document.querySelector(".row");
const elTemplate = document.querySelector(".js-temp").content;


function renderCountries(countries) {
    const docFragment = document.createDocumentFragment();
    countries.forEach(country => {
        const clone = elTemplate.cloneNode(true);
        clone.querySelector(".js-flag").src = country.flag;
        clone.queryselector(".js-name").textContent = country.name;
        clone.querySelector(".js-official").textContent = country.official;
        clone.querySelector(".js-region").textContent = country.region;
        docFragment.appendChild(clone);

    });
    elRow.appendChild(docFragment);
}


fetch("https://restcountries.com/v3.1/all?fields=name,flags,region").then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}).then((data) => {
    
    const countries = data.map(country => {
        return {
            name: country.name.common,
            flag: country.flags.svg,
            region: country.region,
            official: country.name.official
        };
    });
    renderCountries(countries);
    console.log(countries); // Example: Accessing the name of the first country
});
