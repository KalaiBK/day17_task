async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    if (countries.length > 0) {
        createUI(countries);
    }
}
getCountries();

function createUI(countries) {
    let container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container);

    let tittle = document.createElement("h1");
    tittle.className = "text-center";
    tittle.id = "title";
    tittle.innerHTML = "WEATHER UPDATE";
    container.appendChild(tittle);

    let cardContainer = document.createElement("div");
    cardContainer.className = "row";
    container.appendChild(cardContainer);

    for (i = 0; i < countries.length; i++) {
        let cardContainer1 = document.createElement("div");
        cardContainer1.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
        cardContainer.appendChild(cardContainer1);

        let card = document.createElement("div");
        card.className = "card text-center h-100";
        cardContainer1.appendChild(card);

        let head = document.createElement("div");
        head.className = "card-header";
        head.innerHTML = countries[i].name.official;
        card.appendChild(head);

        let body = document.createElement("div");
        body.className = "card-body";
        card.appendChild(body);

        let flag = document.createElement("img");
        flag.className = "card-img-top";
        flag.src = countries[i].flags.png;
        body.appendChild(flag);

        let capital = document.createElement("div");
        capital.className = "card-text";
        // console.log(countries[i].capital);
        if (countries[i].capital != null) {
            capital.innerHTML = "Capital " + countries[i].capital.toString();
        } else {
            capital.innerHTML = "Capital " + "No Capital";
        }
        body.appendChild(capital);

        let latLng = document.createElement("div");
        latLng.className = "card-text";
        if (countries[i].latlng != null) {
            latLng.innerHTML = "Latlng " + countries[i].latlng.toString();
        } else {
            latLng.innerHTML = "Latlng " + "";
        }
        body.appendChild(latLng);

        let region = document.createElement("div");
        region.className = "card-text";
        if (countries[i].region != null) {
            region.innerHTML = "Region " + countries[i].region;
        } else {
            region.innerHTML = "Region " + "";
        }
        body.appendChild(region);

        let nativeName = document.createElement("div");
        nativeName.className = "card-text";
        for (var key in countries[i].name.nativeName) {
            if (key == "eng") {
                nativeName.innerHTML = "Native Name " + countries[i].name.nativeName.eng.official;
            } else if(key == "mkd") {
                nativeName.innerHTML = "Native Name " + countries[i].name.nativeName.mkd.official;
            } else if(key == "fra") {
                nativeName.innerHTML = "Native Name " + countries[i].name.nativeName.fra.official;
            }
          }
        body.appendChild(nativeName);

        let population = document.createElement("div");
        population.className = "card-text";
        if (countries[i].population != null) {
            population.innerHTML = "Population " + countries[i].population;
        } else {
            population.innerHTML = "Population " + "";
        }
        body.appendChild(population);

        let countryCode = document.createElement("div");
        countryCode.className = "card-text";
        let result = countries[i].idd.suffixes;
        if(result != null) {
            for (j = 0; j < result.length; j++) {
                result[j] = countries[i].idd.root + result[j];
            }
            countryCode.innerHTML = "Country Code: " + result.toString();
        } else {
            countryCode.innerHTML = "Country Code: ";
        }
        body.appendChild(countryCode);

        let weather = document.createElement("button");
        weather.onclick = async function () {
            let [lat, long] = this.id.split(",");
            let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=e88877e86611d5e2fe093f50ab84ab69");
            let weatherReport = await response.json();
            console.log(weatherReport);
        }
        weather.id = countries[i].latlng.toString();
        weather.className = "btn btn-primary";
        weather.innerHTML = "Click for Weather";
        body.appendChild(weather);



    }
}

