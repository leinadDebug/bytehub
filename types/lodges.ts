export interface Host {
    _id?: string;
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinDate: string | Date;
    responseRate: number;
    hostingSince: string | Date;
    reviewCount: number;
    averageRating: number;
}

export interface BedroomArrangement {
    type: string;
    count: number;
}

export interface SleepingArrangement {
    bedrooms: BedroomArrangement[];
}

export interface Review {
    _id?: string;
    reviewer: string;
    date: string | Date;
    rating: number;
    comment?: string;
}

export interface Lodge {
    _id: string;
    title: string;
    owner: string;  // Keeping your existing owner field
    user?: string;  // Optional to maintain backward compatibility
    location?: string;
    description?: string;
    price?: number;
    images?: string[];
    amenities?: string[];
    unavailableAmenities?: string[];
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    host?: Host;
    reviews?: Review[];
    rating?: number;
    reviewCount?: number;
    sleepingArrangement?: SleepingArrangement;
    highlights?: string[];
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    // Optional host-related fields if users can be hosts
    isSuperhost?: boolean;
    hostingSince?: string | Date;
    responseRate?: number;
}