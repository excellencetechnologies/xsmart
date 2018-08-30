export interface loginData{
    status:number;
    message:string;
    data:Array<{
    verified:boolean;
  social_id:null;
  _id:string;
  name:string;
  password:string;
  email:string;
  createdAt:string;
  updatedAt:string;
  _v:0;
    }>
    token:string;
}