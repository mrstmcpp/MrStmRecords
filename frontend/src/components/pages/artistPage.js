
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { useParams } from "react-router-dom";


const ArtistPage = () => {
    const { artistId } = useParams();
    const [artistData , setartistData] = useState([]);
    const [songsData , setsongsData] = useState([]);
    
    useEffect(() => {
        const fetchArtistData = async() => {
            try {
                const userDetail = await unauthenticatedGETRequest(`/artist/id/${artistId}`);
                setartistData(userDetail || []);
                
            } catch (error) {
                console.log("error while fetching");
            }
        }

        
        const fetchTrackByArtist = async () => {
            try {
                const tracksData = await unauthenticatedGETRequest(`/artist/tracks/${artistId}`);
                
                if (!tracksData || tracksData.length === 0) {
                    setsongsData([]);
                    console.log("No tracks available for this artist.");
                } else {
                    setsongsData(tracksData);
                    
                }
            } catch (error) {
                console.log("Error while fetching songs", error);
            }
        }
        
        
        if (artistId) {
            fetchArtistData();
            fetchTrackByArtist();
        }


    } , [artistId]);

    return (
        <Layout>
            <h2>welcome to artist page</h2>
        </Layout>
    )
}
export default ArtistPage;