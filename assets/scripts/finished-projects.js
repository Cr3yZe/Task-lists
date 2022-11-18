import { UiProject } from "./creationUI.js";
import { finishedSection } from "./app.js";
import { Projects } from "./active-projects.js";

export class Finished {
  static #finishedTasksList = [];

  static addTasksToFinishedList(taskForAdding) {
    this.#finishedTasksList.push(taskForAdding);

    // Clear the finished column after adding the newst task for avoiding tasks duplication.
    this.clearFinishedUI();
    
    // Render all the finish taks that are still in the array of finished tasks.
    this.createFinishedUI();
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
      console.log(finishedTasksElements);
    })

    this.appendFinishUI(finishedTasksElements);

    return finishedTasksElements;
  }

  static appendFinishUI(elementsForRendering) {
    elementsForRendering.forEach((value) => {
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
    })
  }

  static showMoreInfo(id) {
    console.log(false);
    console.log(id);
  }
}