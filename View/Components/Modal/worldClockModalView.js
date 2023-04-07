"use strict";
import ModalView from "../../Common/ModalView.js";
import { replaceClass } from "../../../utils/_domFunction.js";
import DropdownView from "../../Common/DropdownView.js";

class WorldclockModalView extends ModalView {
  _generateMarkUp(index, action) {
    return `<div class="modal-content" data-type="worldclock" data-index=${index} data-action=${action}>
              <h5 class="h-5 mg-sm">Add new location</h5>

              <div
                class="mg-bg modal-search-bar dropdown-parent"
                data-active="false"
                data-d-scale="top"
              >
                <i class="fas fa-search icon--sm"></i>
                <input
                  type="text"
                  class="modal-name__input dropdown-parent-input"
                  
                  name="location"
                  placeholder="Enter a location"
                />

                <div
                  class="dropdown dropdown-h-0"
                  data-dropdown="location"
                  data-click-event="false"
                >
                  <div class="list">
                    <div class="list-item" data-active="false" data-value="10">
                      10 minutes
                    </div>
                    <div class="list-item" data-active="false" data-value="20">
                      20 minutes
                    </div>
                    <div class="list-item" data-active="false" data-value="30">
                      30 minutes
                    </div>
                    <div class="list-item" data-active="false" data-value="50">
                      50 minutes
                    </div>
                    <div class="list-item" data-active="false" data-value="60">
                      1 hour
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-crud__btns">
                <button class="modal-crud__btn btn--primary" data-action="save">
                  <i class="fas fa-plus"></i>
                  <span>Add</span>
                </button>
                <button class="modal-crud__btn btn--outline" data-action="cancel">
                  <i class="fas fa-times"></i>
                  <span>Cancel</span>
                </button>
              </div>
            </div>`;
  }

  show(index, action) {
    this.render(index, action);
    replaceClass(this._topParentEl, "hidden", "display");
  }

  showAddModal(CardListView) {
    const index = CardListView.generateNewCardNumber();
    this.show(index, "add-clock");
  }

  _convertUTCDateToLocalDate(timeInSeconds) {
    timeInSeconds = `${timeInSeconds}`;

    // signpresent - or not sign mean plus
    const signPresent = timeInSeconds.slice(0, 1) === "-" ? true : false;

    console.log(signPresent);
    const seconds = signPresent
      ? Number(timeInSeconds.slice(1)) * 1000
      : Number(timeInSeconds) * 1000;

    let date;

    console.log(seconds);
    date = signPresent
      ? new Date(+new Date() + seconds)
      : new Date(+new Date() - seconds);

    // newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }

  async saveCardUpdatedValues(action, index, handle) {
    let location = this._topParentEl.querySelector(
      'input[name="location"]'
    ).value;

    if (location === "" || !location) return;

    let res;
    try {
      res = await fetch(`http://worldtimeapi.org/api/timezone/${location}`);

      res = await res.json();
    } catch (err) {
      console.log(err);
      return;
    }
    console.log(res);

    if (res.status === 404 || res.error) return;
    let date, utc_date_convert, date_local_str, time;

    let { raw_offset } = res;

    let day_state, time_comparision_str;

    utc_date_convert = this._convertUTCDateToLocalDate(raw_offset);

    date_local_str = utc_date_convert.toLocaleString().split(",");

    date = date_local_str[0];
    day_state = utc_date_convert.getHours() > 18 ? "night" : "day";

    time_comparision_str = `${Math.floor(
      (new Date() - utc_date_convert) / (3600 * 1000)
    )}hrs ${Math.floor(
      ((new Date() - utc_date_convert) % (3600 * 1000)) / (60 * 1000)
    )}mins`;

    time_comparision_str =
      new Date() > utc_date_convert
        ? `+${time_comparision_str}`
        : time_comparision_str;

    console.log(utc_date_convert, time_comparision_str, date, day_state);
    time = date_local_str[1];
    time = time.trim().split(":");
    time = time[0] + ":" + time[1];

    handle(action, {
      index,
      location,
      date,
      time,
      day_state,
      time_comparision_str,
    });

    this.hide();
  }

  _handleSearchInputLocation() {
    const allTimezone = [
      "Africa/Abidjan",
      "Africa/Accra",
      "Africa/Algiers",
      "Africa/Bissau",
      "Africa/Cairo",
      "Africa/Casablanca",
      "Africa/Ceuta",
      "Africa/El_Aaiun",
      "Africa/Johannesburg",
      "Africa/Juba",
      "Africa/Khartoum",
      "Africa/Lagos",
      "Africa/Maputo",
      "Africa/Monrovia",
      "Africa/Nairobi",
      "Africa/Ndjamena",
      "Africa/Sao_Tome",
      "Africa/Tripoli",
      "Africa/Tunis",
      "Africa/Windhoek",
      "America/Adak",
      "America/Anchorage",
      "America/Araguaina",
      "America/Argentina/Buenos_Aires",
      "America/Argentina/Catamarca",
      "America/Argentina/Cordoba",
      "America/Argentina/Jujuy",
      "America/Argentina/La_Rioja",
      "America/Argentina/Mendoza",
      "America/Argentina/Rio_Gallegos",
      "America/Argentina/Salta",
      "America/Argentina/San_Juan",
      "America/Argentina/San_Luis",
      "America/Argentina/Tucuman",
      "America/Argentina/Ushuaia",
      "America/Asuncion",
      "America/Atikokan",
      "America/Bahia",
      "America/Bahia_Banderas",
      "America/Barbados",
      "America/Belem",
      "America/Belize",
      "America/Blanc-Sablon",
      "America/Boa_Vista",
      "America/Bogota",
      "America/Boise",
      "America/Cambridge_Bay",
      "America/Campo_Grande",
      "America/Cancun",
      "America/Caracas",
      "America/Cayenne",
      "America/Chicago",
      "America/Chihuahua",
      "America/Costa_Rica",
      "America/Creston",
      "America/Cuiaba",
      "America/Curacao",
      "America/Danmarkshavn",
      "America/Dawson",
      "America/Dawson_Creek",
      "America/Denver",
      "America/Detroit",
      "America/Edmonton",
      "America/Eirunepe",
      "America/El_Salvador",
      "America/Fort_Nelson",
      "America/Fortaleza",
      "America/Glace_Bay",
      "America/Goose_Bay",
      "America/Grand_Turk",
      "America/Guatemala",
      "America/Guayaquil",
      "America/Guyana",
      "America/Halifax",
      "America/Havana",
      "America/Hermosillo",
      "America/Indiana/Indianapolis",
      "America/Indiana/Knox",
      "America/Indiana/Marengo",
      "America/Indiana/Petersburg",
      "America/Indiana/Tell_City",
      "America/Indiana/Vevay",
      "America/Indiana/Vincennes",
      "America/Indiana/Winamac",
      "America/Inuvik",
      "America/Iqaluit",
      "America/Jamaica",
      "America/Juneau",
      "America/Kentucky/Louisville",
      "America/Kentucky/Monticello",
      "America/La_Paz",
      "America/Lima",
      "America/Los_Angeles",
      "America/Maceio",
      "America/Managua",
      "America/Manaus",
      "America/Martinique",
      "America/Matamoros",
      "America/Mazatlan",
      "America/Menominee",
      "America/Merida",
      "America/Metlakatla",
      "America/Mexico_City",
      "America/Miquelon",
      "America/Moncton",
      "America/Monterrey",
      "America/Montevideo",
      "America/Nassau",
      "America/New_York",
      "America/Nipigon",
      "America/Nome",
      "America/Noronha",
      "America/North_Dakota/Beulah",
      "America/North_Dakota/Center",
      "America/North_Dakota/New_Salem",
      "America/Nuuk",
      "America/Ojinaga",
      "America/Panama",
      "America/Pangnirtung",
      "America/Paramaribo",
      "America/Phoenix",
      "America/Port-au-Prince",
      "America/Port_of_Spain",
      "America/Porto_Velho",
      "America/Puerto_Rico",
      "America/Punta_Arenas",
      "America/Rainy_River",
      "America/Rankin_Inlet",
      "America/Recife",
      "America/Regina",
      "America/Resolute",
      "America/Rio_Branco",
      "America/Santarem",
      "America/Santiago",
      "America/Santo_Domingo",
      "America/Sao_Paulo",
      "America/Scoresbysund",
      "America/Sitka",
      "America/St_Johns",
      "America/Swift_Current",
      "America/Tegucigalpa",
      "America/Thule",
      "America/Thunder_Bay",
      "America/Tijuana",
      "America/Toronto",
      "America/Vancouver",
      "America/Whitehorse",
      "America/Winnipeg",
      "America/Yakutat",
      "America/Yellowknife",
      "Antarctica/Casey",
      "Antarctica/Davis",
      "Antarctica/DumontDUrville",
      "Antarctica/Macquarie",
      "Antarctica/Mawson",
      "Antarctica/Palmer",
      "Antarctica/Rothera",
      "Antarctica/Syowa",
      "Antarctica/Troll",
      "Antarctica/Vostok",
      "Asia/Almaty",
      "Asia/Amman",
      "Asia/Anadyr",
      "Asia/Aqtau",
      "Asia/Aqtobe",
      "Asia/Ashgabat",
      "Asia/Atyrau",
      "Asia/Baghdad",
      "Asia/Baku",
      "Asia/Bangkok",
      "Asia/Barnaul",
      "Asia/Beirut",
      "Asia/Bishkek",
      "Asia/Brunei",
      "Asia/Chita",
      "Asia/Choibalsan",
      "Asia/Colombo",
      "Asia/Damascus",
      "Asia/Dhaka",
      "Asia/Dili",
      "Asia/Dubai",
      "Asia/Dushanbe",
      "Asia/Famagusta",
      "Asia/Gaza",
      "Asia/Hebron",
      "Asia/Ho_Chi_Minh",
      "Asia/Hong_Kong",
      "Asia/Hovd",
      "Asia/Irkutsk",
      "Asia/Jakarta",
      "Asia/Jayapura",
      "Asia/Jerusalem",
      "Asia/Kabul",
      "Asia/Kamchatka",
      "Asia/Karachi",
      "Asia/Kathmandu",
      "Asia/Khandyga",
      "Asia/Kolkata",
      "Asia/Krasnoyarsk",
      "Asia/Kuala_Lumpur",
      "Asia/Kuching",
      "Asia/Macau",
      "Asia/Magadan",
      "Asia/Makassar",
      "Asia/Manila",
      "Asia/Nicosia",
      "Asia/Novokuznetsk",
      "Asia/Novosibirsk",
      "Asia/Omsk",
      "Asia/Oral",
      "Asia/Pontianak",
      "Asia/Pyongyang",
      "Asia/Qatar",
      "Asia/Qostanay",
      "Asia/Qyzylorda",
      "Asia/Riyadh",
      "Asia/Sakhalin",
      "Asia/Samarkand",
      "Asia/Seoul",
      "Asia/Shanghai",
      "Asia/Singapore",
      "Asia/Srednekolymsk",
      "Asia/Taipei",
      "Asia/Tashkent",
      "Asia/Tbilisi",
      "Asia/Tehran",
      "Asia/Thimphu",
      "Asia/Tokyo",
      "Asia/Tomsk",
      "Asia/Ulaanbaatar",
      "Asia/Urumqi",
      "Asia/Ust-Nera",
      "Asia/Vladivostok",
      "Asia/Yakutsk",
      "Asia/Yangon",
      "Asia/Yekaterinburg",
      "Asia/Yerevan",
      "Atlantic/Azores",
      "Atlantic/Bermuda",
      "Atlantic/Canary",
      "Atlantic/Cape_Verde",
      "Atlantic/Faroe",
      "Atlantic/Madeira",
      "Atlantic/Reykjavik",
      "Atlantic/South_Georgia",
      "Atlantic/Stanley",
      "Australia/Adelaide",
      "Australia/Brisbane",
      "Australia/Broken_Hill",
      "Australia/Darwin",
      "Australia/Eucla",
      "Australia/Hobart",
      "Australia/Lindeman",
      "Australia/Lord_Howe",
      "Australia/Melbourne",
      "Australia/Perth",
      "Australia/Sydney",
      "CET",
      "CST6CDT",
      "EET",
      "EST",
      "EST5EDT",
      "Etc/GMT",
      "Etc/GMT+1",
      "Etc/GMT+10",
      "Etc/GMT+11",
      "Etc/GMT+12",
      "Etc/GMT+2",
      "Etc/GMT+3",
      "Etc/GMT+4",
      "Etc/GMT+5",
      "Etc/GMT+6",
      "Etc/GMT+7",
      "Etc/GMT+8",
      "Etc/GMT+9",
      "Etc/GMT-1",
      "Etc/GMT-10",
      "Etc/GMT-11",
      "Etc/GMT-12",
      "Etc/GMT-13",
      "Etc/GMT-14",
      "Etc/GMT-2",
      "Etc/GMT-3",
      "Etc/GMT-4",
      "Etc/GMT-5",
      "Etc/GMT-6",
      "Etc/GMT-7",
      "Etc/GMT-8",
      "Etc/GMT-9",
      "Etc/UTC",
      "Europe/Amsterdam",
      "Europe/Andorra",
      "Europe/Astrakhan",
      "Europe/Athens",
      "Europe/Belgrade",
      "Europe/Berlin",
      "Europe/Brussels",
      "Europe/Bucharest",
      "Europe/Budapest",
      "Europe/Chisinau",
      "Europe/Copenhagen",
      "Europe/Dublin",
      "Europe/Gibraltar",
      "Europe/Helsinki",
      "Europe/Istanbul",
      "Europe/Kaliningrad",
      "Europe/Kiev",
      "Europe/Kirov",
      "Europe/Lisbon",
      "Europe/London",
      "Europe/Luxembourg",
      "Europe/Madrid",
      "Europe/Malta",
      "Europe/Minsk",
      "Europe/Monaco",
      "Europe/Moscow",
      "Europe/Oslo",
      "Europe/Paris",
      "Europe/Prague",
      "Europe/Riga",
      "Europe/Rome",
      "Europe/Samara",
      "Europe/Saratov",
      "Europe/Simferopol",
      "Europe/Sofia",
      "Europe/Stockholm",
      "Europe/Tallinn",
      "Europe/Tirane",
      "Europe/Ulyanovsk",
      "Europe/Uzhgorod",
      "Europe/Vienna",
      "Europe/Vilnius",
      "Europe/Volgograd",
      "Europe/Warsaw",
      "Europe/Zaporozhye",
      "Europe/Zurich",
      "HST",
      "Indian/Chagos",
      "Indian/Christmas",
      "Indian/Cocos",
      "Indian/Kerguelen",
      "Indian/Mahe",
      "Indian/Maldives",
      "Indian/Mauritius",
      "Indian/Reunion",
      "MET",
      "MST",
      "MST7MDT",
      "PST8PDT",
      "Pacific/Apia",
      "Pacific/Auckland",
      "Pacific/Bougainville",
      "Pacific/Chatham",
      "Pacific/Chuuk",
      "Pacific/Easter",
      "Pacific/Efate",
      "Pacific/Enderbury",
      "Pacific/Fakaofo",
      "Pacific/Fiji",
      "Pacific/Funafuti",
      "Pacific/Galapagos",
      "Pacific/Gambier",
      "Pacific/Guadalcanal",
      "Pacific/Guam",
      "Pacific/Honolulu",
      "Pacific/Kiritimati",
      "Pacific/Kosrae",
      "Pacific/Kwajalein",
      "Pacific/Majuro",
      "Pacific/Marquesas",
      "Pacific/Nauru",
      "Pacific/Niue",
      "Pacific/Norfolk",
      "Pacific/Noumea",
      "Pacific/Pago_Pago",
      "Pacific/Palau",
      "Pacific/Pitcairn",
      "Pacific/Pohnpei",
      "Pacific/Port_Moresby",
      "Pacific/Rarotonga",
      "Pacific/Tahiti",
      "Pacific/Tarawa",
      "Pacific/Tongatapu",
      "Pacific/Wake",
      "Pacific/Wallis",
      "WET",
    ];

    const locationInputEl = this._topParentEl.querySelector(
      'input[name="location"]'
    );
    const dropdownParentEl = locationInputEl.closest(".dropdown-parent");
    const dropdownEl = locationInputEl
      .closest(".dropdown-parent")
      .querySelector(".dropdown");

    const View = new DropdownView();
    View.handleDropdown(dropdownEl);

    locationInputEl.addEventListener("input", (e) => {
      dropdownParentEl.dataset.active = true;
      let value = e.target.value;
      value =
        value.length > 0
          ? value.slice(0, 1).toUpperCase() + value.slice(1)
          : value;

      if (value.includes("/")) {
        const split_value = value.split("/");
        console.log(split_value);
        value =
          split_value[0] +
          "/" +
          split_value[1].slice(0, 1).toUpperCase() +
          split_value[1].slice(1);
      }

      let validTimezone = allTimezone.filter((el) => el.includes(value));

      validTimezone =
        validTimezone.length === 0 ? ["No matches found!"] : validTimezone;

      View.render(validTimezone);
    });

    // dropdown functionality active
  }

  _hideDropdown(target) {
    if (!target.closest('input[name="location"]')) {
      this._topParentEl.querySelector(
        ".dropdown-parent"
      ).dataset.active = false;
    }
  }

  handleAdditionBtns(target) {
    this._handleSearchInputLocation();
    this._hideDropdown(target);
  }

  addHandlerModal(handle) {
    this.handleModal(handle); //
  }
}

export default WorldclockModalView;
