import { toast } from "react-toastify";

export function toastLoginSuccessMessage(email: string) {
    toast(`😀 어서오세요 ${email}님!`, { pauseOnHover: false });
}

export function toastRequestLoginMessage() {
    toast.info(`🧐 서비스 이용을 위해 로그인 해주세요`);
}

export function toastErrorMessage(message: string) {
    toast.error(`😥 ${message}`);
}

export function servicePreparingMessage() {
    toast.warn("😥 서비스 준비 중입니다");
}
