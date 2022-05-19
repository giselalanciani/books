import { AuthorsService } from "../../services/authors-service";
import { DateService } from "../../services/date-service";
import { errorHandler } from "../../utils/error-handler";

class EditAuthorsController {
  authorService;
  dateService;
  constructor(authorService, dateService) {
    this.authorService = authorService;
    this.dateService = dateService;

    const saveButton = document.getElementById("save-author-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) => {
    const authorInput = document.querySelector("[name='authorname']");
    const yearSelect = document.querySelector("[name='year']");
    const monthSelect = document.querySelector("[name='month']");
    const daySelect = document.querySelector("[name='day']");

    const author = {
      name: authorInput.value,
      birthdate: new Date(yearSelect.value, monthSelect.value, daySelect.value),
    };

    const id = this.getQueryParams().id;

    try {
      const updateAuthorResponseData = await this.authorService.updateAuthor(
        id,
        author
      );
      alert("Su autor fue guardado correctamente");
      window.location.href = "/authors";
    } catch (error) {
      errorHandler("No se pudo guardar autor");
    }
  };

  async init() {
    const params = this.getQueryParams();
    const id = params.id;

    try {
      const authorData = await this.authorService.getAuthor(id);

      const yearsList = this.dateService.getYears();
      const monthsList = this.dateService.getMonths();
      const daysList = this.dateService.getDays();

      this.renderYears(yearsList);
      this.renderMonths(monthsList);
      this.renderDays(daysList);

      // const birthdate = await this.dateService

      const authorInput = document.querySelector("[name='authorname']");
      authorInput.value = authorData.name;

      const birthdate = new Date(authorData.birthdate);  

      const yearSelect = document.querySelector("[name='year']");
      yearSelect.value = birthdate.getFullYear();
      const monthSelect = document.querySelector("[name='month']");
      monthSelect.value = birthdate.getMonth();
      const daySelect = document.querySelector("[name='day']");      
      daySelect.value = birthdate.getDate();
      
    } catch (error) {
      errorHandler(
        "No se pudo traer la informacion de autor, intente mas tarde",
        error
      );
    }
  }

  renderDays = (daysDataList) => {
    const authorDaySelect = document.getElementById("day");
    const dayTemplate = document.getElementById("date-option-template");

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
    const yearTemplate = document.getElementById("date-option-template");

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
    const monthTemplate = document.getElementById("date-option-template");

    for (let i = 0; i < monthsDataList.length; i++) {
      const copyMonthTemplate = document.importNode(
        monthTemplate.content,
        true
      );

      const monthOption = copyMonthTemplate.querySelector("option");

      monthOption.textContent = `${monthsDataList[i]}`;
      monthOption.setAttribute("value", `${monthsDataList[i] -1}`);

      authorMonthSelect.append(monthOption);
    }
  };
}
const editAuthorsCtrl = new EditAuthorsController(
  new AuthorsService(),
  new DateService()
);
editAuthorsCtrl.init();
