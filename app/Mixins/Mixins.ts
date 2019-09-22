import { Observable, Image } from "react-nativescript/dist/client/ElementRegistry";

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

const TestableImage = Testable(Image);
export type TestableImage = typeof Testable<Image>;

export const getImage = () => {
    return new TestableImage();
}