export const getPageTitle = (pathname) => {
    switch (pathname) {
        case "/admin/upload":
            return "Upload Song";
        case "/admin/tracks":
            return "My Tracks";
        case "/admin/playlists":
            return "My Playlists";
        case "/admin/analytics":
            return "Analytics";
        case "/admin/artistCard":
            return "Artist Card";
        case "/admin/genreCard":
            return "Genre Card";
        case "/admin/topTracksCard":
            return "Top Tracks Card";
        case "/admin/newReleaseCard":
            return "New Release Card";
        case "/admin/requests":
            return "Upload Requests";
        case "/admin/account":
            return "My Account";
        default:
            return "Admin Panel";
    }
};