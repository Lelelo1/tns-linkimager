
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
        if(x > 1 || y > 1 || width > 1 || height > 1) throw Error("PercentRectangle can only be initalized with value of 1 to 0");
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