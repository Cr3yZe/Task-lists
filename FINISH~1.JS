import { UiProject } from "./creationUI.js";
import { finishedSection } from "./app.js";

export class Finished {
  static #finishedTasksList = [];
  
  static addTasksToFinishedList(taskForAdding) {
    const { title, details, extraInfo, id } = taskForAdding;
    console.log(taskForAdding);

    const element = new UiProject(title, details, extraInfo, 'li', id, 'card', false);
    this.#finishedTasksList.push(element.createElement());
    console.log(this.#finishedTasksList)

    this.appendFinishUI();
  }

  static appendFinishUI() {
    this.#finishedTasksList.forEach((value) => {
      finishedSection.append(value);
    })
  }
}