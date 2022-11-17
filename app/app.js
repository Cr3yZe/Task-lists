import { Projects } from "./project.js";
import { Project } from "./project-template.js";

export const activeSection = document.getElementById('active-projects').querySelector('ul');
export const finishedSection = document.getElementById('finished-projects').querySelector('ul');
const title = document.getElementById('title');
const details = document.getElementById('project-content');
const extraInfo = document.getElementById('extra-info');
const addProjectBtn = document.getElementById('add-project');

const getProjectDetails = () => {
  // Add project to the Project class
  Projects.addProject = new Project(title.value, details.value, extraInfo.value);
  
  // Clear all the tasks before rendering.
  Projects.clearUI();
  
  // Redner the task from the Project class.
  Projects.createUI().forEach((value) => {
    activeSection.append(value)
  });

  title.value = '';
  details.value = '';
  extraInfo.value = '';
}

addProjectBtn.addEventListener('click', getProjectDetails);