
import { LinkImage } from "../Mixins/Mixins";
import { Media, PercentRectangle } from "../Mixins/Types";

const startImage = new LinkImage({
    url : "https://media-cdn.tripadvisor.com/media/photo-s/0e/38/76/58/korridor.jpg",
    media : Media.photo
});


const centerImage = new LinkImage({
    url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zSasJr1EegqFFC8uZCRA34oWFTh0ozSCRYrNN8AFsJ1tRPH50g",
    media : Media.photo,
    percentRectangle : new PercentRectangle(0.38, 0.37, 0.25, 0.25)
});
// 0, 8, 25, 20)
// 90, 70, 20, 20
const rightImage = new LinkImage({
    url: "https://www.stenaline.co.uk/-/media/Images/Global-images/Ships/Stena-lagan-mersey/lagan-mersey-4b-inside-cabin-1.jpg?w=220",
    media : Media.photo,
    percentRectangle : new PercentRectangle(0.70, 0.38, 0.20, 0.30)
});

const leftImage = new LinkImage({
    url: "https://ae01.alicdn.com/kf/HTB1ZEqEBY5YBuNjSspoq6zeNFXa2/Nature-Landscape-3D-Window-View-Wall-Stickers-For-Living-Room-Bedroom-Decorative-Decoration-Home-PVC-Decor.jpg",
    media: Media.photo,
    percentRectangle: new PercentRectangle(0.10, 0.35, 0.10, 0.15)
});

centerImage.owners.push(startImage);
rightImage.owners.push(startImage);
leftImage.owners.push(startImage);

startImage.links.push(centerImage);
startImage.links.push(rightImage);
startImage.links.push(leftImage);

export const projectMock1 = startImage;