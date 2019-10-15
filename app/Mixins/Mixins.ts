import { Observable, Image } from "react-nativescript/dist/client/ElementRegistry";
import { Media, ILinkable, PercentRectangle } from "./Types";

// https://github.com/microsoft/TypeScript/pull/13743




type Constructor<T> = new(...args: any[]) => Image;

/* // needed when acces outside file is neccesary, export type
interface Testable {
    testName: string;
}
*/

function Testable<T extends Constructor<{}>>(Base: T) {
    return class Test extends Base {
        private static count = 0;
        constructor(...args: any[]) {
            super(...args);
            this.automationText = "image" + Test.count;
            Test.count ++;
        }
    }
}

export class LinkImage extends Testable(Image) implements ILinkable {
    owners: ILinkable[] = []
    media: Media;
    url: string;
    links: ILinkable[] = [];
    percentRectangle: PercentRectangle

    constructor(linkable: ILinkable) {
        super();
        if(linkable.owners) {
            this.owners = linkable.owners;
        }
        this.media = linkable.media;
        this.url = linkable.url;
        if(linkable.links) {
            this.links = linkable.links;
        }
        this.percentRectangle = linkable.percentRectangle;
    }
};
