import { useParams } from "react-router-dom";
import { frontEndUrl } from "../../utils/FrontendUrl";
export const ClickToShare = async (data, type) => {
    if (navigator.share) {
        try {
            let shareUrl = '';

            switch (type) {
                case 'track':
                    shareUrl = `${frontEndUrl}/track/${data.id}`;
                    break;
                case 'artist':
                    shareUrl = `${frontEndUrl}/artist/${data.artist.id}`;
                    break;
                case 'album':
                    shareUrl = `${frontEndUrl}/album/${data.id}`;
                    break;
                case 'genre':
                    shareUrl = `${frontEndUrl}/genre/${data.id}`;
                    break;
                default:
                    shareUrl = `${frontEndUrl}/track/${data.id}`;
                    break;
            }
            await navigator.share({
                title: data.name,
                text: data.description,
                url: shareUrl
            });
            // console.log(data);
            
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Web Share API not supported in this browser.');
    }
};