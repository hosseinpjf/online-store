import { api } from "configs/api";
import { requestHandler } from "helpers/helper";


const sendOtp = (mobile) => requestHandler(() => api.post('/auth/send-otp', { mobile }));

const checkOtp = (mobile, code) => requestHandler(() => api.post('/auth/check-otp', { mobile, code }));


export { sendOtp, checkOtp };