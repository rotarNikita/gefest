+function () {
    var customSelectWrappers = document.querySelectorAll('.section_select_wrapper');

    if (customSelectWrappers.length) {
        Array.prototype.forEach.call(customSelectWrappers, function (customSelectWrapper) {
            var selectInput = customSelectWrapper.querySelector('.section_select_input input'),
                selectValue = customSelectWrapper.querySelector('.section_select_input .value'),
                dropdown = customSelectWrapper.querySelector('.section_select_dropdown'),
                options = dropdown.querySelectorAll('li'),
                optionsHeight = 0;

            if (dropdown.dataset.value) {
                var currentLi = dropdown.querySelector('li[data-value="' + dropdown.dataset.value + '"]');

                currentLi.classList.add('active');
                selectValue.innerHTML = currentLi.innerHTML;
                selectInput.value = currentLi.innerHTML;
            }

            Array.prototype.forEach.call(options, function (option) {
                optionsHeight += option.offsetHeight;

                option.addEventListener('click', function () {
                    var value = this.innerHTML;

                    selectValue.innerHTML = value;
                    selectInput.value = value;
                    dropdown.dataset.value = this.dataset.value;

                    var selectedOption = customSelectWrapper.querySelector('.section_select_dropdown li.active');

                    if (selectedOption) selectedOption.classList.remove('active');
                    this.classList.add('active');
                })
            });

            // max-height = 148px in style
            if (optionsHeight > 148) customSelectWrapper.querySelector('.section_select_dropdown').style.overflowY = 'auto';

            customSelectWrapper.addEventListener('click', function (event) {
                event.stopPropagation();

                var openedSelect = document.querySelector('.section_select_wrapper.active');

                if (openedSelect && openedSelect !== this) openedSelect.classList.remove('active');

                this.classList.toggle('active');
            });

            document.body.addEventListener('click', function () {
                customSelectWrapper.classList.remove('active')
            })
        })
    }
}();