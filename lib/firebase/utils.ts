import { query, where, getDocs, addDoc } from "firebase/firestore";
import { userCollection } from "./config";

// handling error
const handleError = (err: unknown, method: string) => {
    console.error(`Firebase Error in ${method} :: `, err); // Log the error
};

// fetchUserDetails
export const fetchUserDetails = async (email: string) => {
    try {
        const q = query(userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const user = querySnapshot.docs[0].data();
        return user;
    } catch (err) {
        handleError(err, "fetchUserDetails");
        return null;
    }
};

// create new user
export const createNewUser = async (name: string, email: string, hashedPassword: string, role: string) => {
    try {
        const user = await fetchUserDetails(email);
        if (user) {
            return { message: "User already exists", success: false };
        }
        const newUser = await addDoc(userCollection, { name, email, hashedPassword, role });

        if (!newUser) {
            return { message: "User not created", success: false };
        }

        return { message: "User created successfully", success: true };
    } catch (error) {
        handleError(error, "createNewUser");
        return { message: "Something went wrong", success: false };
    }
}