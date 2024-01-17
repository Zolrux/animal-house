import { formatGeneral } from 'cleave-zen';

export function togglePasswordType() {
  const authForm = document.querySelector('.auth-form');

  if (!authForm) {
    return;
  }

  const inputPassword = authForm.querySelector('.auth-form__input[type="password"]');
  const inputPasswordBtnWrapper = authForm.querySelector('.auth-form__wrapper');
  const btnShow = inputPasswordBtnWrapper.querySelector('.auth-form__password');
  const btnHide = inputPasswordBtnWrapper.querySelector('.auth-form__password-hide');

  inputPasswordBtnWrapper.addEventListener('click', function (e) {
    const target = e.target;
    const type = inputPassword.type;

    if (target.closest('button') === btnShow) {
      inputPassword.type = 'text';
      authForm.classList.add('show');
    }
    if (target.closest('button') === btnHide) {
      inputPassword.type = 'password';
      authForm.classList.remove('show');
    }
  });
}

export function inputPhoneMask() {
  const inputPhone = document.querySelector('.form-registration__input--phone');

  if (!inputPhone) {
    return;
  }

  inputPhone.addEventListener('input', function (e) {
    const value = e.target.value;
    inputPhone.value = formatGeneral(value, {
      prefix: '+380',
      blocks: [4, 2, 2, 2, 3],
      numericOnly: true,
      delimiterLazyShow: true,
      delimiter: '-',
    });
  });
}

export function inputFullNameMask() {
  const inputName = document.querySelector('.form-registration__input--name');
  const inputSurname = document.querySelector('.form-registration__input--surname');

  if (!inputName || !inputSurname) {
    return;
  }

  const formatted = (input, value) => {
    const formattedValue = value.replaceAll(/[\dА-Яа-яЁёІіЇї]/g, '');
    input.value = formattedValue;
  };

  inputName.addEventListener('input', (e) => formatted(e.target, e.target.value));
  inputSurname.addEventListener('input', (e) => formatted(e.target, e.target.value));
}

export function removeCyrrilicInputMask() {
	const inputPassword = document.querySelector('.auth-form__input-password');
	const inputEmail = document.querySelector('.auth-form__input-email');
 
	if (!inputPassword || !inputEmail) {
	  return;
	}
 
	const formatted = (input, value) => {
	  const formattedValue = value.replaceAll(/[А-Яа-яЁёІіЇї]/g, '');
	  input.value = formattedValue;
	};
 
	inputPassword.addEventListener('input', (e) => formatted(e.target, e.target.value));
	inputEmail.addEventListener('input', (e) => formatted(e.target, e.target.value));
 }

