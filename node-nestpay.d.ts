/**
 * @author  Tümay Çeber <tumayceber@gmail.com>
 * @date 08.04.2018
 */
export type endpoint = string | "test" | "asseco" | "isbank" | "akbank" | "finansbank" | "denizbank" | "kuveytturk" | "halkbank" | "anadolubank" | "hsbc" | "ziraatbank" | "ingbank" | "citibank" | "teb";

export interface INestPayConfiguration {
    name: string;
    password: string;
    clientId: number;
    storekey?: string;
    callbackSuccess?: string;
    callbackFail?: string;
    mode?: "P" | "T";
    currency?: string;
    orderId?: string;
    secureFormat?: string;
    endpoint?: endpoint;
    lang?: string;
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

export class NestPay {
    constructor(options: INestPayConfiguration);

    public authorize(options: INestPaymentRequest): any;

    public capture(options: { orderId: string }): any;

    public purchase(options: INestPaymentRequest): any;

    public refund(options: { amount: number, orderId: string }): any;

    public request(url: any, data: any): any;

    public secure3d(options: INestSecure3dRequest): any;

    public secureAuthorize(options: INestSecure3dPurchaseRequest): any;

    public securePurchase(options: INestSecure3dPurchaseRequest): any;

    public void(options: { orderId: string }): any;
}