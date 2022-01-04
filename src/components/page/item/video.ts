import { BaseComponent } from "../../component.js";

export class VvideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`<section class="video">
                <div class="video_player">
                    <iframe class="video_iframe"></iframe>
                    <h3 class="video_title"></h3>
                </div>
            </section>`);

            const iframe = this.element.querySelector('.video_iframe')! as HTMLIFrameElement;
            iframe.src = this.convertToEmbeddedURL(url);

            const titleElement = this.element.querySelector('.video_title')! as HTMLHeadingElement;
            titleElement.textContent = title;
    }

    private convertToEmbeddedURL(url: string): string {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);

        const videoId = match ? match[1] || match[2] : undefined;
        if(videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/HTewyS8hq0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>