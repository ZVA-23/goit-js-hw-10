import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { makeMarkupList } from './js/markup';
import { makeMarkupCard } from './js/markup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const { searchBox, countryList, countryInfo } = refs;

searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox() {
  const countryName = searchBox.value;
  if (countryName === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
      }

      if (countries.length <= 10) {
        const listMarkup = countries.map(country => makeMarkupList(country));
        countryList.innerHTML = listMarkup.join('');
        countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markup = countries.map(country => makeMarkupCard(country));
        countryInfo.innerHTML = markup.join('');
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return error;
    });
}
