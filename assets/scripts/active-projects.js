import { UiProject } from "./creationUI.js";
import { activeSection } from "./app.js";
import { Finished } from './finished-projects.js';
import { Project } from "./project-template.js";

export class Projects {
  static #projects = [];
  static #projectsElements = [];
  static #projectsObjects = [];

  static set addProject(project) {
    this.#projects.push(project);
    console.log(this.#projects);
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
      this.#projectsObjects.push(element);
      projects.push(element.createElement());
    })
    
    // Copy the elemnts into a new array that have to be used in other methods.
    this.#projectsElements = [...projects];

    return projects;
  }

  static appendUI() {
    this.#projectsElements.forEach((value) => {
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
    this.appendUI();
  }

  static activateTask(...rest) {
    const [ title, details, extraInfo ] = rest;
    
    this.addProject = new Project(title, details, extraInfo);
    this.clearUI();
    this.createUI();
    this.appendUI();
  }

  static showMoreInfo(id) {
    this.#projectsElements.forEach((value, index) => {
      if (value.id === id) {
        value.querySelector('div').classList.add('more-info-vissible');
        console.log(value);
      }
    })
  }
}
