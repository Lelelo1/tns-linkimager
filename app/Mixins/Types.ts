
import { Image } from "react-nativescript/dist/client/ElementRegistry";

export enum Media {
    "photo" = "photo",
    "sound" = "sound",
    "video" = "video",
}

export interface ILinkable {
    owners?: ILinkable[];
    media: Media;
    url: string;
    links?: ILinkable[]
    percentRectangle?: PercentRectangle;
}


/* potentially move this somewhere else */
export class PercentRectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
//... html, document etc