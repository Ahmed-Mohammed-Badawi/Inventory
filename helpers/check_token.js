export default function check_token(token) {
    if (token) {
        // get the first 10 chars
        const start = Array.from(token).slice(0, 10);
        const end = Array.from(token).slice(-10);

        if (start.join("") === "a1h1m5e8d3" && end.join("") === "a5h0m1e6d0") {
            return true;
        } else {
            return false;
        }
    }else{
        return false
    }
}
