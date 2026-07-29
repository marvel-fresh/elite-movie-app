export interface loginInfo {
 userName:string;
  email:string;
  phoneNumber:number;
  password:string;
  address:string;
}

export interface loginType {
    success: boolean;
    message: string;
    data?: loginInfo & { id?: string };
}