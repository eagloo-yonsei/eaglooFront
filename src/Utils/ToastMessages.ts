import { toast } from "react-toastify";

export function toastMailSendSuccessMessage(email: string) {
    toast.info(`🧐 ${email}@yonsei.ac.kr 로 인증메일이 발송 되었습니다.`, {
        pauseOnHover: false,
    });
}

export function toastSecretVerifySuccessMessage() {
    toast.info(
        `🤩 이메일 주소 인증이 완료되었습니다. 비밀번호를 설정해 주세요.`,
        { pauseOnHover: false }
    );
}

export function toastSignupSuccessMessage(email: string) {
    toast.success(
        `😎 ${email} 주소로 회원가입이 완료되었습니다. 가입하신 정보로 로그인 해 주세요.`,
        { pauseOnHover: false }
    );
}

export function toastLoginSuccessMessage(email: string) {
    toast(`😀 어서오세요 ${email}님!`, { pauseOnHover: false });
}

export function toastRequestLoginMessage() {
    toast.info(`🧐 서비스 이용을 위해 로그인 해 주세요.`);
}

export function toastErrorMessage(message: string) {
    toast.error(`😥 ${message}`);
}

export function servicePreparingMessage() {
    toast.warn("😥 서비스 준비 중입니다.");
}
