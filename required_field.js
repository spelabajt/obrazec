 		document.addEventListener('DOMContentLoaded', function () {
			const form = document.getElementById('regForm');

			const fields = Array.from(form.querySelectorAll('input[required], select[required]')).map(input => {
				const box = input.closest('div');
				const error = box.querySelector('.error');
				return { input, box, error };
			});

			function validateField(item) {
				const val = item.input.value.trim();
				let valid = true;

				if (val === '') valid = false;
				if (item.input.type === 'email' && val !== '') {
					const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
					if (!ok) valid = false;
				}

				if (!valid) {
					item.error.style.display = 'block';
					item.box.classList.add('error-box');
				} else {
					item.error.style.display = 'none';
					item.box.classList.remove('error-box');
				}

				return valid;
			}

			fields.forEach(item => {
				item.input.addEventListener('blur', () => validateField(item));
				item.input.addEventListener(item.input.tagName.toLowerCase() === 'select' ? 'change' : 'input', () => {
					if (item.error) {
						item.error.style.display = 'none';
						item.box.classList.remove('error-box');
					}
				});
			});

			form.addEventListener('submit', function (e) {
				let allValid = true;
				fields.forEach(item => {
					if (!validateField(item)) allValid = false;
				});
				if (!allValid) e.preventDefault();
			});
		});
