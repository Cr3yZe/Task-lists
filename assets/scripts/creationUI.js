import { Projects } from "./active-projects.js";
import { Finished } from "./finished-projects.js";

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

    const extraInfoElement = document.createElement('div');
    extraInfoElement.classList.add('more-info-hidden');
    const message = document.createElement('p');
    message.innerHTML = `${this.#extraInfo}`;
    extraInfoElement.append(message);
    li.append(extraInfoElement);

    const buttonInfo = document.createElement('button');
    buttonInfo.innerHTML = 'More Info'
    buttonInfo.className = 'alt';
    buttonInfo.addEventListener('mouseenter', this.checkState.bind(this, UiProject));
    buttonInfo.addEventListener('mouseout', this.hideMoreInfo.bind(this, UiProject));
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
    console.log(li);

    return li;
  }

  finishTask() {
    Projects.finishTask(this.#id);
  }

  activateTask() {
    Projects.activateTask(this.#title, this.#description, this.#extraInfo);
    Finished.appendActivateUI(this.#id.toString());
  }

  checkState() {
    console.log(true);
    if (!this.#state === false) {
      Projects.showMoreInfo(this.#id.toString());
      return;
    }

    Finished.showMoreInfo(this.#id.toString());
  }

  hideMoreInfo() {
    Projects.hideMoreInfo();
    Finished.hideMoreInfo();
  }
}