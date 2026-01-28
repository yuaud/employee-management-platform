export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; //current page
    size: number;
    first: boolean;
    last: boolean;
}