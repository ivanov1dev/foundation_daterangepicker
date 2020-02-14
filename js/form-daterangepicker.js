(function ($) {

    Drupal.daterangepicker = {
        singleSettings: {
            autoApply: true,
            singleDatePicker: true,
            opens: "right",
            autoUpdateInput: false,
            locale: this.locale
        },
        rangeSettings: {
            autoApply: true,
            linkedCalendars: false,
            opens: "right",
            autoUpdateInput: false,
            locale: this.locale
        },
        singleValue: function(p) {
            return p.startDate.format('DD.MM.YYYY');
        },
        rangeValue: function(p) {
            return p.startDate.format('DD.MM.YYYY') + ' - ' + p.endDate.format('DD.MM.YYYY');
        },
        locale: {
            format: "DD.MM.YYYY",
            separator: " - ",
            daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            firstDay: 1
        }
    };

    Drupal.behaviors.bootstrapDaterangepicker = {
        attach: function (context, settings) {
            $(".date-range-picker").once(function() {
                var pickers = $(this);

                pickers.each(function() {
                    var picker = $(this);
                    var single = picker.hasClass("single");

                    if (!picker.is("input")) {
                        picker = picker.find("input");
                    }

                    if (picker && picker.length > 0) {
                        picker
                            .daterangepicker(single ? Drupal.daterangepicker.singleSettings : Drupal.daterangepicker.rangeSettings)
                            .on('apply.daterangepicker', function(e, p) {
                                picker.val(single ? Drupal.daterangepicker.singleValue(p) : Drupal.daterangepicker.rangeValue(p));
                            })
                            .on('cancel.daterangepicker', function() {
                                picker.val('');
                            });
                    }
                });
            });
        }
    };

}(jQuery));
