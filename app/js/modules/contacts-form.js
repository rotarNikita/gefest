+function () {
    try {
        var contactFormSelect = document.querySelector('.contacts_form_select');

        if (contactFormSelect) {
            var options = contactFormSelect.querySelectorAll('ul.dropdown li'),
                input = contactFormSelect.querySelector('input'),
                optionActive = contactFormSelect.querySelector('ul.dropdown li.active');

            contactFormSelect.addEventListener('click', function (event) {
                event.stopPropagation();

                this.classList.toggle('open');
            });

            document.body.addEventListener('click', function () {
                contactFormSelect.classList.remove('open');
            });

            Array.prototype.forEach.call(options, function (option) {
                var value = option.innerHTML;

                option.addEventListener('click', function () {
                    input.value = value;
                    optionActive.classList.remove('active');
                    this.classList.add('active');
                    optionActive = this;
                })
            })
        }
    } catch (e) {
        console.log(e)
    }
}();