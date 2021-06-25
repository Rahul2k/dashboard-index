/*
 *  FlagStrap - v1.0
 *  A lightwieght jQuery plugin for creating Bootstrap 3 compatible country select boxes with flags.
 *  http://www.blazeworx.com/flagstrap
 *
 *  Made by Alex Carter
 *  Under MIT License
 */
(function ($) {

    var defaults = {
        buttonSize: "btn-md",
        buttonType: "btn-default",
        labelMargin: "5px",
        scrollable: true,
        scrollableHeight: "250px",
        placeholder: {
            value: "",
            text: "Select Language"
        },
        reload_change: true
    };

    var countries = {
        "sq-AL": "Albania",
        "ar-DZ": "Algeria",
        "es-AR": "Argentina",
        "hy-AM": "Armenia",
        "en-AU": "Australia",
        "de-AT": "Austria",
        "ar-BH": "Bahrain",
        "be-BY": "Belarus",
        "nl-BE": "Belgium",
        "en-BZ": "Belize",
        "es-BO": "Bolivia, Plurinational State of",
        "pt-BR": "Brazil",
        "ms-BN": "Brunei Darussalam",
        "bg-BG": "Bulgaria",
        "en-CA": "Canada",
        "fr-CA": "Canadian French",
        "es-CL": "Chile",
        "zh-CN": "China",
        "es-CO": "Colombia",
        "es-CR": "Costa Rica",
        "hr-HR": "Croatia",
        "cs-CZ": "Czech Republic",
        "da-DK": "Denmark",
        "es-DO": "Dominican Republic",
        "es-EC": "Ecuador",
        "ar-EG": "Egypt",
        "es-SV": "El Salvador",
        "et-EE": "Estonia",
        "fo-FO": "Faroe Islands",
        "fi-FI": "Finland",
        "fr-FR": "France",
        "ka-GE": "Georgia",
        "de-DE": "Germany",
        "el-GR": "Greece",
        "es-GT": "Guatemala",
        "es-HN": "Honduras",
        "zh-HK": "Hong Kong",
        "hu-HU": "Hungary",
        "is-IS": "Iceland",
        "hi-IN": "India",
        "id-ID": "Indonesia",
        "fa-IR": "Iran, Islamic Republic of",
        "ar-IQ": "Iraq",
        "en-IE": "Ireland",
        "he-IL": "Israel",
        "it-IT": "Italy",
        "en-JM": "Jamaica",
        "ja-JP": "Japan",
        "ar-JO": "Jordan",
        "kk-KZ": "Kazakhstan",
        "sw-KE": "Kenya",
        "ko-KP": "Korea, Democratic People's Republic of",
        "ko-KR": "Korea, Republic of",
        "ar-KW": "Kuwait",
        "lv-LV": "Latvia",
        "ar-LB": "Lebanon",
        "ar-LY": "Libya",
        "de-LI": "Liechtenstein",
        "lt-LT": "Lithuania",
        "mk-MK": "Macedonia, the former Yugoslav Republic of",
        "ms-MY": "Malaysia",
        "div-MV": "Maldives",
        "es-MX": "Mexico",
        "fr-MC": "Monaco",
        "mn-MN": "Mongolia",
        "ar-MA": "Morocco",
        "nl-NL": "Netherlands",
        "en-NZ": "New Zealand",
        "es-NI": "Nicaragua",
        "nb-NO": "Norwegian (Bokmål) - Norway",
        "nn-NO": "Norwegian (Nynorsk) - Norway",
        "ar-OM": "Oman",
        "ur-PK": "Pakistan",
        "es-PA": "Panama",
        "es-PY": "Paraguay",
        "es-PE": "Peru",
        "en-PH": "Philippines",
        "pl-PL": "Poland",
        "pt-PT": "Portugal",
        "es-PR": "Puerto Rico",
        "ar-QA": "Qatar",
        "ro-RO": "Romania",
        "ru-RU": "Russian Federation",
        "ar-SA": "Saudi Arabia",
        "zh-SG": "Singapore",
        "sk-SK": "Slovakia",
        "sl-SI": "Slovenia",
        "af-ZA": "South Africa",
        "es-ES": "Spain",
        "sv-SE": "Sweden",
        "fr-CH": "French - Switzerland",
        "de-CH": "German - Switzerland",
        "zh-TW": "Taiwan, Province of China",
        "th-TH": "Thailand",
        "en-TT": "Trinidad and Tobago",
        "ar-TN": "Tunisia",
        "tr-TR": "Turkey",
        "uk-UA": "Ukraine",
        "ar-AE": "United Arab Emirates",
        "en-GB": "United Kingdom",
        "en-US": "United States",
        "es-UY": "Uruguay",
        "es-VE": "Venezuela, Bolivarian Republic of",
        "ar-YE": "Yemen",
        "en-ZW": "Zimbabwe"

        //"AF": "Afghanistan",
        //"AS": "American Samoa",
        //"AD": "Andorra",
        //"AO": "Angola",
        //"AI": "Anguilla",
        //"AG": "Antigua and Barbuda",
        //"AW": "Aruba",
        //"AZ": "Azerbaijan",
        //"BS": "Bahamas",
        //"BD": "Bangladesh",
        //"BB": "Barbados",
        //"BJ": "Benin",
        //"BM": "Bermuda",
        //"BT": "Bhutan",
        //"BA": "Bosnia and Herzegovina",
        //"BW": "Botswana",
        //"BV": "Bouvet Island",
        //"IO": "British Indian Ocean Territory",
        //"BF": "Burkina Faso",
        //"BI": "Burundi",
        //"KH": "Cambodia",
        //"CM": "Cameroon",
        //"CV": "Cape Verde",
        //"KY": "Cayman Islands",
        //"CF": "Central African Republic",
        //"TD": "Chad",
        //"KM": "Comoros",
        //"CG": "Congo",
        //"CD": "Congo, the Democratic Republic of the",
        //"CK": "Cook Islands",
        //"CI": "C" + "&ocirc;" + "te d'Ivoire",
        //"CU": "Cuba",
        //"CW": "Cura" + "&ccedil;" + "ao",
        //"CY": "Cyprus",
        //"DJ": "Djibouti",
        //"DM": "Dominica",        
        //"GQ": "Equatorial Guinea",
        //"ER": "Eritrea",
        //"ET": "Ethiopia",
        //"FK": "Falkland Islands (Malvinas)",
        //"FJ": "Fiji",
        //"GF": "French Guiana",
        //"PF": "French Polynesia",
        //"TF": "French Southern Territories",
        //"GA": "Gabon",
        //"GM": "Gambia",
        //"GH": "Ghana",
        //"GI": "Gibraltar",       
        //"GL": "Greenland",
        //"GD": "Grenada",
        //"GP": "Guadeloupe",
        //"GU": "Guam",         
        //"GG": "Guernsey",
        //"GN": "Guinea",
        //"GW": "Guinea-Bissau",
        //"GY": "Guyana",
        //"HT": "Haiti",
        //"HM": "Heard Island and McDonald Islands",
        //"VA": "Holy See (Vatican City State)",       
        //"IM": "Isle of Man",      
        //"JE": "Jersey",      
        //"KI": "Kiribati",        
        //"KG": "Kyrgyzstan",
        //"LA": "Lao People's Democratic Republic",      
        //"LS": "Lesotho",
        //"LR": "Liberia",       
        //"LU": "Luxembourg",
        //"MO": "Macao",        
        //"MG": "Madagascar",
        //"MW": "Malawi",      
        //"ML": "Mali",
        //"MT": "Malta",
        //"MH": "Marshall Islands",
        //"MQ": "Martinique",
        //"MR": "Mauritania",
        //"MU": "Mauritius",
        //"YT": "Mayotte",       
        //"FM": "Micronesia, Federated States of",
        //"MD": "Moldova, Republic of",       
        //"ME": "Montenegro",
        //"MS": "Montserrat",       
        //"MZ": "Mozambique",
        //"MM": "Myanmar",
        //"NA": "Namibia",
        //"NR": "Nauru",
        //"NP": "Nepal",       
        //"NC": "New Caledonia",       
        //"NE": "Niger",
        //"NG": "Nigeria",
        //"NU": "Niue",
        //"NF": "Norfolk Island",
        //"MP": "Northern Mariana Islands",        
        //"PW": "Palau",
        //"PS": "Palestinian Territory, Occupied",        
        //"PG": "Papua New Guinea",       
        //"PN": "Pitcairn",       
        //"RE": "R" + "&eacute;" + "union",        
        //"RW": "Rwanda",
        //"SH": "Saint Helena, Ascension and Tristan da Cunha",
        //"KN": "Saint Kitts and Nevis",
        //"LC": "Saint Lucia",
        //"MF": "Saint Martin (French part)",
        //"PM": "Saint Pierre and Miquelon",
        //"VC": "Saint Vincent and the Grenadines",
        //"WS": "Samoa",
        //"SM": "San Marino",
        //"ST": "Sao Tome and Principe",       
        //"SN": "Senegal",
        //"RS": "Serbia",
        //"SC": "Seychelles",
        //"SL": "Sierra Leone",       
        //"SX": "Sint Maarten (Dutch part)",        
        //"SB": "Solomon Islands",
        //"SO": "Somalia",        
        //"GS": "South Georgia and the South Sandwich Islands",
        //"SS": "South Sudan",        
        //"LK": "Sri Lanka",
        //"SD": "Sudan",
        //"SR": "Suriname",
        //"SZ": "Swaziland",        
        //"SY": "Syrian Arab Republic",        
        //"TJ": "Tajikistan",
        //"TZ": "Tanzania, United Republic of",        
        //"TL": "Timor-Leste",
        //"TG": "Togo",
        //"TK": "Tokelau",
        //"TO": "Tonga",       
        //"TM": "Turkmenistan",
        //"TC": "Turks and Caicos Islands",
        //"TV": "Tuvalu",
        //"UG": "Uganda",        
        //"UM": "United States Minor Outlying Islands",        
        //"UZ": "Uzbekistan",
        //"VU": "Vanuatu",
        //"VN": "Viet Nam",
        //"VG": "Virgin Islands, British",
        //"VI": "Virgin Islands, U.S.",
        //"WF": "Wallis and Futuna",
        //"EH": "Western Sahara",        
        //"ZM": "Zambia"
    };

    $.flagStrap = function (element, options, i) {

        var plugin = this;

        var uniqueId = generateId(8);

        plugin.countries = {};
        plugin.selected = { value: null, text: null };
        plugin.settings = { inputName: 'country-' + uniqueId };

        var $container = $(element);
        var htmlSelectId = 'flagstrap-' + uniqueId;
        var htmlSelect = '#' + htmlSelectId;

        plugin.init = function () {
            // Merge in global settings then merge in individual settings via data attributes
            plugin.countries = countries;

            // Initialize Settings, priority: defaults, init options, data attributes
            plugin.countries = countries;
            plugin.settings = $.extend({}, defaults, options, $container.data());
            if (undefined !== plugin.settings.countries) {
                plugin.countries = plugin.settings.countries;
            }

            if (undefined !== plugin.settings.inputId) {
                htmlSelectId = plugin.settings.inputId;
                htmlSelect = '#' + htmlSelectId;
            }

            // Build HTML Select, Construct the drop down button, Assemble the drop down list items element and insert
            $container
                .addClass('flagstrap')
                .append(buildHtmlSelect)
                .append(buildDropDownButton)
                .append(buildDropDownButtonItemList);

            // Check to see if the onSelect callback method is assigned / callable, bind the change event for broadcast
            if (plugin.settings.onSelect !== undefined && plugin.settings.onSelect instanceof Function) {
                $(htmlSelect).change(function (event) {
                    var element = this;
                    options.onSelect($(element).val(), element);
                });
            }
            // Hide the actual HTML select
            $(htmlSelect).hide();
        };

        var buildHtmlSelect = function () {
            var htmlSelectElement = $('<select/>').attr('id', htmlSelectId).attr('name', plugin.settings.inputName);
            $.each(plugin.countries, function (code, country) {
                var optionAttributes = { value: code };
                if (plugin.settings.selectedCountry !== undefined) {
                    if (plugin.settings.selectedCountry === code) {
                        optionAttributes = { value: code, selected: "selected" };
                        plugin.selected = { value: code, text: country }
                    }
                }
                htmlSelectElement.append($('<option>', optionAttributes).text(country));
            });

            if (plugin.settings.placeholder !== false) {
                htmlSelectElement.prepend($('<option>', {
                    value: plugin.settings.placeholder.value,
                    text: plugin.settings.placeholder.text
                }));
            }
            return htmlSelectElement;
        };

        var buildDropDownButton = function () {
            var selectedText = $(htmlSelect).find('option').first().text();
            var selectedValue = $(htmlSelect).find('option').first().val();

            selectedText = plugin.selected.text || selectedText;
            selectedValue = plugin.selected.value || selectedValue;

            if (selectedValue !== plugin.settings.placeholder.value) {
                var $selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-' + selectedValue.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
            } else {
                var $selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-placeholder');
            }
            var buttonLabel = $('<div/>').addClass('flagstrap-selected-' + uniqueId).html($selectedLabel).append(selectedText);

            var button = $('<button/>')
                .attr('type', 'button')
                .attr('data-toggle', 'dropdown')
                .attr('id', 'flagstrap-drop-down-' + uniqueId)
                .addClass('btn ' + plugin.settings.buttonType + ' ' + plugin.settings.buttonSize + ' dropdown-toggle')
                .html(buttonLabel);

            $('<div/>').addClass('fa fa-sort-down').insertAfter(buttonLabel);
            return button;
        };

        var buildDropDownButtonItemList = function () {
            var items = $('<ul/>')
                .attr('id', 'flagstrap-drop-down-' + uniqueId + '-list')
                .attr('aria-labelled-by', 'flagstrap-drop-down-' + uniqueId)
                .addClass('dropdown-menu');

            if (plugin.settings.scrollable) {
                items.css('height', 'auto')
                    .css('max-height', plugin.settings.scrollableHeight)
                    .css('overflow-x', 'hidden');
            }

            // Populate the bootstrap dropdown item list
            $(htmlSelect).find('option').each(function () {
                // Get original select option values and labels
                var text = $(this).text();
                var value = $(this).val();

                // Build the flag icon
                if (value !== plugin.settings.placeholder.value) {
                    var flagIcon = $('<i/>').addClass('flagstrap-icon flagstrap-' + value.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
                } else {
                    var flagIcon = null;
                }

                // Build a clickable drop down option item, insert the flag and label, attach click event
                var flagStrapItem = $('<a/>')
                    .attr('data-val', $(this).val())
                    .html(flagIcon)
                    .append(text)
                    .on('click', function (e) {
                        $(htmlSelect).find('option').removeAttr('selected');
                        $(htmlSelect).find('option[value="' + $(this).data('val') + '"]').attr("selected", "selected");
                        $('#Dialog_Localize_ctl00_hiddenSelLangValue').val($(this).data('val'));
                        if ($(this).data('val') == "") {
                            e.preventDefault();
                            return;
                        }
                        $(htmlSelect).trigger('change');
                        $('.flagstrap-selected-' + uniqueId).html($(this).html());
                        e.preventDefault();
                    });

                // Make it a list item
                var listItem = $('<li/>').prepend(flagStrapItem);

                // Append it to the drop down item list
                items.append(listItem);
            });
            return items;
        };

        function generateId(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }
        plugin.init();
    };

    $.fn.flagStrap = function (options) {
        return this.each(function (i) {
            if ($(this).data('flagStrap') === undefined) {
                $(this).data('flagStrap', new $.flagStrap(this, options, i));
            }
        });
    }
})(jQuery);
