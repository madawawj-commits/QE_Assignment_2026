export class APIEnv {
    public static readonly BASE_URL: string = '' + process.env.BASE_URL;
    public static readonly ENDPOINT: string = this.BASE_URL + process.env.ENDPOINT;
}