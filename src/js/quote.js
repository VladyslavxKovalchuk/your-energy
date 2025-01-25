import axios from 'axios';
import { API_ENDPOINT } from './settings.js';

async function quote() {
  const storedQuote = JSON.parse(localStorage.getItem('quoteDay'));
  const currentDate = new Date().toISOString().split('T')[0];

  if (storedQuote?.currentDate === currentDate) {
    displayQuote(storedQuote.data);
    return;
  }

  try {
    const { data } = await axios.get(`${API_ENDPOINT}/quote`);
    const newQuoteData = {
      data: data,
      currentDate: currentDate,
    };
    localStorage.setItem('quoteDay', JSON.stringify(newQuoteData));
    displayQuote(data);
  } catch (error) {
    console.error('Error fetching the quote:', error);
  }
}

function displayQuote({ quote, author }) {
  document.querySelector('.js-quote').innerHTML = `
    <p class="quote-text">"${quote}"</p>
    <p class="quote-signature">- ${author}</p>
  `;
}

document.addEventListener('DOMContentLoaded', quote);
