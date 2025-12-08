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

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  GUIDE = "GUIDE",
  TOURIST = "TOURIST"
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED"
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IGuideProfile {
  expertise?: string[];       // e.g. ["History", "Food"]
  dailyRate?: number;         // price per booking/day
  languages?: string[];       // e.g. ["English", "Spanish"]
  verified?: boolean;         // admin-verified guide
  bio?: string;
  photos?: string[];          // urls
}

export interface ITouristProfile {
  preferences?: string[];     // travel interests
  phone?: string;
}

export interface UserInfo {
  _id: string; // Allow string for serialization
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;         // email verified
  role: Role;
  auths: IAuthProvider[];
  guideProfile?: IGuideProfile;
  touristProfile?: ITouristProfile;
  // Added fields you wanted to update:
  bio?: string;
  languages?: string[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGuide extends UserInfo {
    role: Role.GUIDE; 
    guideProfile?: IGuideProfile; 
    review_count?: number; 
    avg_rating?: number; 
    isFeatured?: boolean;
}