
import { Rectangle, PercentRectangle } from "~/Mixins/Types";
import { Image } from "react-nativescript/dist/client/ElementRegistry";
// UI stuff

export function percentRectangle(bounds: Image, interactor: Image): Promise<PercentRectangle> {
    console.log("percent rectangle");
    
    let image = bounds as Image;
    const compare = interactor;
    if(compare) {
        console.log("compare");
        if(compare.getMeasuredWidth() < 1 || compare.getMeasuredHeight() < 1) {
            throw new Error("failed to get bounds of interactor to set percentRectangle values. Could not set the percentages");
        }
        if(image) {
            console.log("was image: " + image);
            return new Promise<PercentRectangle>((resolve, reject) => {
                setTimeout(() => {
                    console.log("returning ");
                    resolve(new PercentRectangle(
                        image.getLocationRelativeTo(interactor).x / compare.getActualSize().width,
                        image.getLocationRelativeTo(interactor).y / compare.getActualSize().height,
                        image.getActualSize().width /  compare.getActualSize().width,
                        image.getActualSize().height / compare.getActualSize().height 
                    ));
                }, 0.00000000000000001);
            });
        }
        /* (how to type check if its Image or Rectangle?)
        let rectangle = bounds as Rectangle;
        if(rectangle) {
            // the image passed think its is a recntangle for some reason.
            console.log("was rectangle");
            return new Promise<PercentRectangle>((resolve, reject,) => {
                setTimeout(() => {
                    resolve(new PercentRectangle(
                        rectangle.x / compare.getActualSize().width,
                        rectangle.y / compare.getActualSize().height,
                        rectangle.width /  compare.getActualSize().width,
                        rectangle.height / compare.getActualSize().height 
                    ));
                }, 0.000000000000001);
            });
        }
        */
        
    }
    console.warn("percentRectangle method, that creates a percentages did never return it's values");
}

export function bounds(percentRectangle: PercentRectangle, interactor: Image): Rectangle {
    const compare = interactor;
    if(compare) {
        // console.log("compare width: " + compare.getActualSize() + ", height: " + compare.getActualSize());
        if(compare.getMeasuredWidth() < 1 || compare.getMeasuredHeight() < 1) {
            throw new Error("failed to get bounds of interactor to messure areas. Could determine bounds");
        }
        return new Rectangle(
            percentRectangle.x * compare.getActualSize().width,
            percentRectangle.y * compare.getActualSize().height,
            percentRectangle.width * compare.getActualSize().width,
            percentRectangle.height * compare.getActualSize().height
        )
    }
    return new Rectangle(-0.01, -0.01, -0.01, -0.01);
}