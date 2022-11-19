import { UiProject } from "./creationUI.js";
import { finishedSection } from "./app.js";

export class Finished {
  static #finishedTasksList = [];
  static #finishedTasksElements = [];

  static addTasksToFinishedList(taskForAdding) {
    this.#finishedTasksList.push(taskForAdding);

    // Clear the finished column after adding the newst task for avoiding tasks duplication.
    this.clearFinishedUI();

    // Render all the finish taks that are still in the array of finished tasks.
    this.createFinishedUI();
    this.appendFinishUI();
  }

  static clearFinishedUI() {
    finishedSection.textContent = '';
  }

  static createFinishedUI() {
    const finishedTasksElements = [];

    this.#finishedTasksList.forEach((value, index) => {
      const { title, details, extraInfo } = value;

      const element = new UiProject(title, details, extraInfo, 'li', index, 'card', false);
      finishedTasksElements.push(element.createElement());
    })

    this.#finishedTasksElements = [...finishedTasksElements];;

    return finishedTasksElements;
  }

  static appendFinishUI() {
    this.#finishedTasksElements.forEach((value) => {
      finishedSection.append(value);
    })
  }

  static appendActivateUI(taskToActivate) {
    const elementsForRendering = this.createFinishedUI();
    elementsForRendering.forEach((value, index) => {
      if (value.id === taskToActivate) {
        this.#finishedTasksList.splice(index, 1);
      }

      this.clearFinishedUI();
      this.createFinishedUI();
      this.appendFinishUI();
    })
  }

  static showMoreInfo(id) {
    this.#finishedTasksElements.forEach((value, index) => {
      if (value.id === id) {
        console.log(value)
        value.querySelector('div').classList.add('more-info-vissible')
      }
    })
  }

  static hideMoreInfo() {
    this.#finishedTasksElements.forEach((value, index) => {
      value.querySelector('div').classList.remove('more-info-vissible')
    })
  }
}