
let SERVER_HOST_PATH = "";
let ERP_LINK_1 = "";

// Get only the hostname (without protocol or port)
const hostname = window.location.hostname;

if (hostname.includes("43.225.53.91")) {
    SERVER_HOST_PATH = "/api/";
    ERP_LINK_1 = "/";
    //ERP_LINK_1 = "/";
    //SERVER_HOST_PATH = "http://54.165.88.229/api/";
    //ERP_LINK_1 = "http://54.165.88.229:32014";
} else if (hostname === "fooderp.chitalesweets.com") {
    SERVER_HOST_PATH = "https://fooderp.chitalesweets.com/api";
    ERP_LINK_1 = "https://fooderp.chitalesweets.com";
} else if (hostname === "cbmfooderp.com") {
    SERVER_HOST_PATH = "https://cbmfooderp.com/api";
    ERP_LINK_1 = "https://cbmfooderp.com";
} else if (hostname === "fooderp.in") {
    SERVER_HOST_PATH = "https://fooderp.in/api";
    ERP_LINK_1 = "https://fooderp.in";
} else if (hostname.includes("10.4.5.68")) {
    SERVER_HOST_PATH = "http://10.4.5.68:8000";
    ERP_LINK_1 = "http://10.4.5.68:3000";
} else if (hostname.includes("localhost")) {
    SERVER_HOST_PATH = "http://192.168.1.114:8000";
    ERP_LINK_1 = "http://192.168.1.34:3000";
}

// Export values
export const ERP_LINK = ERP_LINK_1;
export default SERVER_HOST_PATH;
