import { frontEndUrl } from "../../utils/FrontendUrl";
export const ClickToShare = async (data, type) => {
    if (navigator.share) {

        try {
            let shareUrl = '';

            switch (type) {
                case 'track':
                    shareUrl = `${frontEndUrl}/track/${data._id}`;
                    break;
                case 'artist':
                    shareUrl = `${frontEndUrl}/artist/${data.artist._id}`;
                    break;
                case 'album':
                    shareUrl = `${frontEndUrl}/album/${data._id}`;
                    break;
                case 'genre':
                    shareUrl = `${frontEndUrl}/genre/${data._id}`;
                    break;
                default:
                    shareUrl = `${frontEndUrl}/track/${data._id}`;
                    break;
            }
            await navigator.share({
                title: data.title,
                text: data.description,
                url: shareUrl
            });
            console.log(data);
            
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Web Share API not supported in this browser.');
    }
};