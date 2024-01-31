

export const extractBearerToken = (authHeader: string): string | false => {

    if (!authHeader) return false;

    const bearerToken = authHeader.split(" ")
    if (bearerToken[1]) {
        const token = bearerToken[1];
        return token;
    } else {
        return false;
    }
}