+function () {
    var customSelectWrappers = document.querySelectorAll('.section_select_wrapper');

    if (customSelectWrappers.length) {
        Array.prototype.forEach.call(customSelectWrappers, function (customSelectWrapper) {
            var selectInput = customSelectWrapper.querySelector('.section_select_input input'),
                selectValue = customSelectWrapper.querySelector('.section_select_input .value'),
                options = customSelectWrapper.querySelectorAll('.section_select_dropdown li'),
                optionsHeight = 0;

            Array.prototype.forEach.call(options, function (option) {
                optionsHeight += option.offsetHeight;

                option.addEventListener('click', function () {
                    var value = this.innerHTML;

                    selectValue.innerHTML = value;
                    selectInput.value = value;

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