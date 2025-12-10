export type UserRole = "TOURIST" | "GUIDE" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED"; // Assuming string based on your data
export type AuthProvider = {
  provider: string;
  providerId?: string;
};

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  role: UserRole;
  isActive: UserStatus; // String based on your JSON ("ACTIVE")
  isVerified: boolean;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  guideProfile?: {
    expertise: string[];
    dailyRate: number;
    verified: boolean;
    languages: string[];
  };
  languages?: string[];
}

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

export interface ITourist {
    _id: string;
    name: string;
    email: string;
    isDeleted: boolean;
    isActive: 'ACTIVE' | 'INACTIVE'; 
    isVerified: boolean;
    role: Role.TOURIST; 
    address?: string; // Made optional
    phone?: string;   // Made optional
    picture?: string; // Profile picture URL
    bio?: string;
    languages?: string[]; // Array of languages spoken

    auths: Array<{
        provider: string;
        providerId: string;
    }>;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    
    // --- Aggregation Fields (Specific to Tourists, usually 0) ---
    review_count: number; // Tourist might have written 0 reviews
    
    // NOTE: avg_rating and guideProfile are absent as they are Guide-specific.
}