import { formatGeneral, formatDate } from 'cleave-zen';

export function orderFormMasks() {
  const phoneInput = document.querySelector('.form-order__input-phone');
  const arrivalDateInput = document.querySelector('.form-order__input-arrival-date');
  const departureDateInput = document.querySelector('.form-order__input-departure-date');

  if (!phoneInput || !arrivalDateInput || !departureDateInput) {
    return;
  }

  const datesRange = {
    min: {
      day: null,
      month: null,
      year: null,
      stringFormat: null,
    },
    max: {
      day: null,
      month: null,
      year: null,
    },
    eventHandler: function () {
      const MAX_RANGE_MS = 1000 * 60 * 60 * 24 * 14;
      const futureDate = new Date(Date.now() + MAX_RANGE_MS);

      this.min.day = new Date().getDate();
      this.min.month = new Date().getMonth() + 1;
      this.min.year = new Date().getFullYear();
      this.min.stringFormat = `${this.min.year}-${this.min.month}-${this.min.day}`;

      this.max.day = futureDate.getDate();
      this.max.month = futureDate.getMonth() + 1;
      this.max.year = futureDate.getFullYear();
      this.max.stringFormat = `${this.max.year}-${this.max.month}-${this.max.day}`;
    },
  };

  departureDateInput.disabled = true;

  if (arrivalDateInput.value && /^\d{2}\/\d{2}\/\d{4}/g.test(arrivalDateInput.value)) {
    departureDateInput.disabled = false;
  }

  phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;
    phoneInput.value = formatGeneral(value, {
      prefix: '+380',
      blocks: [4, 2, 2, 2, 3],
      delimiter: '-',
      delimiterLazyShow: true,

      numericOnly: true,
    });
  });

  arrivalDateInput.addEventListener('input', (e) => {
    const value = e.target.value;

    datesRange.eventHandler();

    arrivalDateInput.value = formatDate(value, {
      datePattern: ['d', 'm', 'Y'],
      delimiterLazyShow: true,
      dateMin: datesRange.min.stringFormat,
      dateMax: datesRange.max.stringFormat,
    });

    if (/^\d{2}\/\d{2}\/\d{4}/g.test(value)) {
      departureDateInput.disabled = false;
    } else {
      departureDateInput.disabled = true;
      departureDateInput.value = '';
    }
  });

  arrivalDateInput.addEventListener('change', (e) => {
    const value = e.target.value;
    if (/^\d{2}\/\d{2}\/\d{4}/g.test(value)) {
      departureDateInput.disabled = false;
    } else {
      departureDateInput.disabled = true;
      departureDateInput.value = '';
    }
  });

  departureDateInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (!value) {
      return;
    }
    let arrivalDate = arrivalDateInput.value;
    getDatesRangeDeparture(arrivalDate, departureDateInput, value, datesRange);
  });
}

function getDatesRangeDeparture(arrivalValue, departureInput, departureInputValue, objRange) {
  let arrivalDate = arrivalValue;
  const value = !departureInputValue.length ? objRange.min.stringFormat : departureInputValue;

  let day, month, year;

  if (arrivalDate.split('/').length === 3) {
    const arrivalDateArr = arrivalDate.split('/');
    day = +arrivalDateArr[0];
    month = +arrivalDateArr[1];
    year = +arrivalDateArr[2];
  } else {
    arrivalDate = new Date();
    day = arrivalDate.getDate();
    month = arrivalDate.getMonth() + 1;
    year = arrivalDate.getFullYear();
  }

  const minDate = `${year}-${month}-${day + 1}`;
  const MAX_INTERVAL_DAYS = 14;

  const futureDate = new Date(minDate);
  futureDate.setDate(futureDate.getDate() + MAX_INTERVAL_DAYS);

  const maxDate = `${futureDate.getFullYear()}-${futureDate.getMonth() + 1}-${futureDate.getDate()}`;
  departureInput.value = formatDate(value, {
    datePattern: ['d', 'm', 'Y'],
    delimiterLazyShow: true,
    dateMin: minDate,
    dateMax: maxDate,
  });
}

export function inputsMasks() {
  const inputName = document.querySelector('.form-order__input-name');
  const inputEmail = document.querySelector('.form-order__input-email');
  const inputNickname = document.querySelector('.form-order__input-nickname');
  const inputComment = document.querySelector('.form-order__input-comment');

  if (!inputName || !inputEmail || !inputNickname || !inputComment) {
    return;
  }

  const formatted = (input, value, regex) => {
    const formattedValue = value.replaceAll(regex, '');
    input.value = formattedValue;
  };

  inputName.addEventListener('input', (e) => formatted(e.target, e.target.value, /[\dА-Яа-яЁёІіЇї]/g));
  inputEmail.addEventListener('input', (e) => formatted(e.target, e.target.value, /[А-Яа-яЁёІіЇї]/g));
  inputNickname.addEventListener('input', (e) => formatted(e.target, e.target.value, /[А-Яа-яЁёІіЇї]/g));
  inputComment.addEventListener('input', (e) => formatted(e.target, e.target.value, /[А-Яа-яЁёІіЇї]/g));
}
