import { EContactStatus, EStatus, EUserStatus } from "./enum.js";

declare global {
    interface IUser {
        _id: string;
        email: string;
        password: string;
        name: string;
        phone: string;
        status: EUserStatus;
    }

    interface IProgram {
        _id: string;
        title: string;
        description: string;
        country: string;
        duration: string;
        tuition: string;
        opportunities: string;
        about: string;
        requirements: string[];
        benefits: string[];
        imageUrl: string;
        image?: File | null;
        featured: boolean;
        createdAt?: string;
        updatedAt?: string;
        status: EStatus;
    }

    interface IJob {
        _id: string;
        title: string;
        country: string;
        imageUrl?: string;
        image?: File | null;
        positions: number;
        location: string;
        salary: string;
        applicationDeadline: string;
        estimatedDeparture: string;
        requirements: string[];
        benefits: string[];
        description: string;
        company: string;
        workType: string;
        featured: boolean;
        workingHours: string;
        overtime: string;
        accommodation: string;
        workEnvironment: string;
        trainingPeriod: string;
        status: EStatus;
        createdAt?: string;
        updatedAt?: string;
    }

    interface IContact {
        _id: string;
        name: string;
        email: string;
        phone: string;
        program?: string;
        message: string;
        resolvedBy?: string;
        resolvedAt?: string;
        createdAt?: string;
        updatedAt?: string;
        status?: EContactStatus;
    }

    interface IFAQ {
        _id: string;
        question: string;
        answer: string;
        category: string;
        status: EStatus;
        createdAt?: string;
    }
}
export { };