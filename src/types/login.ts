export interface loginInfo {
 userName:string;
  email:string;

}

export interface loginType {
    success: boolean;
    message: string;
    data?: loginInfo & { id?: string };
}