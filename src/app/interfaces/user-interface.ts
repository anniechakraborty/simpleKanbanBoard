/**
 * This interface is defined to validate the user objects we receive from the backend after making a post request
 */
export interface UserInterface {
    email: string;
    token: string;
    username: string;
}
