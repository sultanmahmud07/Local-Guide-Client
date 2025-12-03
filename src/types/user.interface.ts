import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";
import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";

export type AuthProvider = {
  provider: string;
  providerId?: string;
};

export type IUser = {
  _id: string;
  name: string;
  email: string;
  profile?: string
  isActive: string;
  isVerified: boolean;
  isDeleted?: boolean;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  auths?: AuthProvider[];
  // add any other fields you need
};

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";
    admin?: IAdmin;
    patient?: IPatient;
    doctor?: IDoctor;
    createdAt: string;
    updatedAt: string;
}