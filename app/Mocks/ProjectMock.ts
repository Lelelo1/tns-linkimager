
import { LinkImage } from "../Mixins/Mixins";
import { Media, PercentRectangle } from "../Mixins/Types";

const startImage = new LinkImage({
    url : "https://media-cdn.tripadvisor.com/media/photo-s/0e/38/76/58/korridor.jpg",
    media : Media.photo
});


const centerImage = new LinkImage({
    url : "https://www.stenaline.co.uk/-/media/Images/Global-images/Ships/Stena-lagan-mersey/lagan-mersey-4b-inside-cabin-1.jpg?w=220",
    media : Media.photo,
    percentRectangle : new PercentRectangle(38, 37, 25, 25)
});
// 0, 8, 25, 20)
// 90, 70, 20, 20
const rightImage = new LinkImage({
    url: "https://www.stenaline.co.uk/-/media/Images/Global-images/Ships/Stena-lagan-mersey/lagan-mersey-4b-inside-cabin-1.jpg?w=220",
    media : Media.photo,
    percentRectangle : new PercentRectangle(70, 38, 20, 30)
});

centerImage.owners.push(startImage);
rightImage.owners.push(startImage);

startImage.links.push(centerImage);
startImage.links.push(rightImage);

export const projectMock1 = startImage;