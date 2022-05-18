import { AuthorsService } from "../../services/authors-service";
import { DateService } from "../../services/date-service";
import { errorHandler } from "../../utils/error-handler";

class CreateAuthorsController {
  authorsService;
  dateService;
  constructor(authorsService, dateService) {
    this.authorsService = authorsService;
    this.dateService = dateService;

    const createAuthorButton = document.getElementById("create-author-button");
    createAuthorButton.addEventListener(
      "click",
      this.onClickCreateAuthorButton
    );
  }
  renderDays = (daysDataList) => {
    const authorDaySelect = document.getElementById("day");
    const dayTemplate = document.getElementById("day-template");

    for (let i = 0; i < daysDataList.length; i++) {
      const copyDayTemplate = document.importNode(dayTemplate.content, true);

      const daysOption = copyDayTemplate.querySelector("option");

      daysOption.textContent = `${daysDataList[i]}`;
      daysOption.setAttribute("value", `${daysDataList[i]}`);

      authorDaySelect.append(daysOption);
    }
  };

  renderYears = (yearsDataList) => {
    const authorYearSelect = document.getElementById("year");
    const yearTemplate = document.getElementById("year-template");

    for (let i = 0; i < yearsDataList.length; i++) {
      const copyYearTemplate = document.importNode(yearTemplate.content, true);

      const yearsOption = copyYearTemplate.querySelector("option");

      yearsOption.textContent = `${yearsDataList[i]}`;
      yearsOption.setAttribute("value", `${yearsDataList[i]}`);

      authorYearSelect.append(yearsOption);
    }
  };

  renderMonths = (monthsDataList) => {
    const authorMonthSelect = document.getElementById("month");
    const monthTemplate = document.getElementById("month-template");

    for (let i = 0; i < monthsDataList.length; i++) {
      const copyMonthTemplate = document.importNode(
        monthTemplate.content,
        true
      );

      const monthOption = copyMonthTemplate.querySelector("option");

      monthOption.textContent = `${monthsDataList[i]}`;
      monthOption.setAttribute("value", `${monthsDataList[i]}`);

      authorMonthSelect.append(monthOption);
    }
  };

  onClickCreateAuthorButton = () => {
    if (this.sendAuthorsData() === true) {
    } else {
      console.log("NO ENVIAMOS DATA");
    }
  };

  sendAuthorsData = async () => {
    const authorNameInput = document.querySelector("[name='authorname']");

    const birthdateYearSelect = document.querySelector("[name='year']");
    const birthdateMonthSelect = document.querySelector("[name='month']");
    const birthdateDaySelect = document.querySelector("[name='day']");

    const year = birthdateYearSelect.value;
    const month = birthdateMonthSelect.value;
    const day = birthdateDaySelect.value;

    const birthdate = new Date(year, month, day);

    const author = {
      name: authorNameInput.value,
      birthdate: birthdate,
    };

    try {
      await this.authorsService.createAuthor(author);
      alert("Autor creado");
      window.location.href = "/authors";
    } catch (error) {
      errorHandler("No se pudo crear el autor, intente mas tarde.", error);
    }
  };

  async init() {
    const daysData = await this.dateService.getDays();
    const yearsData = await this.dateService.getYears();
    const monthsData = await this.dateService.getMonths();

    this.renderDays(daysData);
    this.renderYears(yearsData);
    this.renderMonths(monthsData);
  }
}

const createAuthorsCtrl = new CreateAuthorsController(
  new AuthorsService(),
  new DateService()
);
createAuthorsCtrl.init();
