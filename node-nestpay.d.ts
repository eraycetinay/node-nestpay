/**
 * @author  Tümay Çeber <tumayceber@gmail.com>
 * @date 08.04.2018
 */
export type endpoint = "test" | "asseco" | "isbank" | "akbank" | "finansbank" | "denizbank" | "kuveytturk" | "halkbank" | "anadolubank" | "hsbc" | "ziraatbank" | "ingbank" | "citibank" | "teb";

export interface INestPayConfiguration {
    name: string;
    password: string;
    clientId: number;
    mode?: "P" | "T";
    currency?: string;
    orderId?: string;
    secureFormat?: string;
    endpoint?: endpoint;
    lang?: string;
}

export interface INestPayConfiguration3d extends INestPayConfiguration {
    storekey: string;
    callbackSuccess?: string;
    callbackFail?: string;
}

interface INestPaymentRequestMinimal {
    number: string;
    year: string;
    month: string;
    cvv: string;
    amount: string;
}

export interface INestPaymentRequest extends INestPaymentRequestMinimal {
    installment?: number;
    orderId?: string;
    groupId?: string;
    transId?: string;
}

export interface INestSecure3dRequest extends INestPaymentRequestMinimal {
    orderId?: string;
    lang?: string;
    timestamp?: string;
    secureFormat?: string;
    storekey?: string;
    callbackSuccess?: string;
    callbackFail?: string;
}

export interface INestSecure3dRequestReturn {
    form: {
        clientId: string,
        oid: string,
        amount: string,
        okUrl: string,
        failUrl: string,
        rnd: string,
        currency: string,
        pan: string,
        Ecom_Payment_Card_ExpDate_Year: string,
        Ecom_Payment_Card_ExpDate_Month: string,
        cv2: string,
        storetype: '3d',
        lang: string,
        hash: string,
    };
    url: string;
}

export interface INestSecure3dPurchaseRequest {
    HASHPARAMSVAL: string;
    HASH: string;
    md: string;
    xid: string;
    eci: string;
    cavv: string;
    amount: string;
    installment?: number;
    orderId?: string;
    groupId?: string;
    transId?: string;
    userId?: string;
}

export default class NestPay {
    constructor(options: INestPayConfiguration | INestPayConfiguration3d);

    public authorize(options: INestPaymentRequest): Promise<any>;

    public capture(options: { orderId: string }): Promise<any>;

    public purchase(options: INestPaymentRequest): Promise<any>;

    public refund(options: { amount: number, orderId: string }): Promise<any>;

    public request(url: any, data: any): Promise<any>;

    public secure3d(options: INestSecure3dRequest): Promise<INestSecure3dRequestReturn | string>;

    public secureAuthorize(options: INestSecure3dPurchaseRequest): Promise<any>;

    public securePurchase(options: INestSecure3dPurchaseRequest): Promise<any>;

    public void(options: { orderId: string }): Promise<any>;
}
