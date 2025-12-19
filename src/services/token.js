import { api } from "configs/api"
import { requestHandler } from "helpers/helper";


const getNewTokens = refreshToken => requestHandler(() => api.post('auth/check-refresh-token', { refreshToken }));


export { getNewTokens }