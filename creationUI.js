import { Projects } from "./project.js";

export class UiProject {
  #title;
  #description;
  #extraInfo;
  #tag;
  #id;
  #cls;
  #state;

  constructor(title, description, extrInfo, tag, id, cls, state) {
    this.#title = title;
    this.#description = description;
    this.#extraInfo = extrInfo;
    this.#tag = tag;
    this.#id = id;
    this.#cls = cls;
    this.#state = state;
  }

  // Create the HTML element
  createElement() {
    const li = document.createElement(this.#tag);
    li.setAttribute('id', this.#id);
    li.className = this.#cls;

    const title = document.createElement('h2');
    title.innerHTML = this.#title;
    li.append(title);

    const description = document.createElement('p');
    description.innerHTML = this.#description;
    li.append(description);

    const buttonInfo = document.createElement('button');
    buttonInfo.innerHTML = 'More Info'
    buttonInfo.className = 'alt';
    li.append(buttonInfo);

    if (!this.#state === false) {
      const buttonFinish = document.createElement('button');
      buttonFinish.innerHTML = 'Finish';
      buttonFinish.addEventListener('click', this.finishTask.bind(this, UiProject));
      li.append(buttonFinish);
      return li;
    }

    const buttonActive = document.createElement('button');
    buttonActive.innerHTML = 'Activate'
    buttonActive.addEventListener('click', this.activateTask.bind(this, UiProject));
    li.append(buttonActive);
    return li;
  }
  
  finishTask() {
    console.log(`${this.#title} is finished!`);
    Projects.finishTask(this.#id);
  }

  activateTask() {
    console.log(`${this.#title} is being activated!`);
    Projects.activateTask(this.#id);
  }
}