import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
    readonly title: string;
    readonly url: string;
}

export interface TextData {
    readonly title: string;
    readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    closeListener?: OnCloseListener;
    submitListener?: OnSubmitListener;
    constructor() {
        super(`<section class="dialog">
                <div class="dialog_container">
                    <button class="close">&times;</button>
                    <div id="dialog_body"></div>
                    <button class="dialog_submit"></button>
                </div>   
            </section>`);
            const closeBtn = this.element.querySelector('.close')! as HTMLElement;
            closeBtn.onclick = () => {
                this.closeListener && this.closeListener();
            };

            const submitBtn = this.element.querySelector('.dialog_submit')! as HTMLElement;
            submitBtn.onclick = () => {
                this.submitListener && this.submitListener();
            };
        }

    setOnCloseListner(listener: OnCloseListener) {
        this.closeListener = listener;
    }
    setSubmitBtnListner(listener: OnSubmitListener) {
        this.submitListener = listener;
    }

    addChild(child: Component): void {
        const body = this.element.querySelector('#dialog_body')! as HTMLElement;
        child.attachTo(body);
    }
}