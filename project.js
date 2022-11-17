import { UiProject } from "./creationUI.js";
import { activeSection } from "./app.js";
import { Finished } from './finished-projects.js';

export class Projects {
  static #projects = [];

  static set addProject(project) {
    this.#projects.push(project);
  }

  static get getProjects() {
    return this.#projects;
  }

  static clearUI() {
    activeSection.textContent = '';
  }

  static createUI() {
    const projects = [];

    this.#projects.forEach((value, index) => {
      // Create the id for every task.
      value.id = index;

      const { title, details, extraInfo } = value;

      const element = new UiProject(title, details, extraInfo, 'li', index, 'card', true)
      projects.push(element.createElement());
    })
    

    this.appendUI(projects);

    return projects;
  }

  static appendUI(projects) {
    projects.forEach((value) => {
      activeSection.append(value);
    })
  }

  static finishTask(taskID) {
    this.#projects.forEach((value, i) => {
      if (value.id === taskID) {
        this.#projects.splice(i, 1);
        Finished.addTasksToFinishedList(value)
      }
    })

    this.clearUI();
    this.createUI();
  }

  static activateTask(taskID) {
    console.log(taskID);
  }
}
