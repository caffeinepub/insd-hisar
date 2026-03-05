import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Enquiry {
    name: string;
    email: string;
    courseInterest: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Course {
    id: bigint;
    title: string;
    duration: string;
    description: string;
    level: string;
    category: string;
}
export interface backendInterface {
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getCourseById(id: bigint): Promise<Course>;
    getCourses(): Promise<Array<Course>>;
    submitEnquiry(name: string, email: string, phone: string, courseInterest: string, message: string): Promise<void>;
}
