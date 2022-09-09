export function makeMarkupList({ flags, name }) {
  return `
    <li class = country-list__item>
    <img class = country-list__flags src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>
    `;
}

export function makeMarkupCard({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `
    <div class="country-info__container">
      <img class = "country-info__flag" src="${flags.svg}" alt="${
    name.official
  }" width = 100/>
      <h2 class = "country-info__title">Country: ${name.official}</h2>
      <p class = "country-info__text"><b>Capital: </b> ${capital}</p>
      <p class="country-info__text"><b>Population: </b> ${population}</p>
      <p class="country-info__text"><b>Languages: </b> ${Object.values(
        languages
      )}</p>
    </div>
    `;
}
