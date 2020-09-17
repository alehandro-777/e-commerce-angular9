export class User {
   _id:string;
   profile:string;
   shopcart:string;
   name:string;
   email:string;
   login:string;
   password:string;
   phone:string;
   role:string;
   image_uri:string;
   enabled:boolean;
   created_at: Date;
}

export class RoleSelectOptions {
   value: string;
   viewValue: string;
 }

 export class UpdateDeleteModel {
   ok: number;
   nModified: string;
   n: number;
 }