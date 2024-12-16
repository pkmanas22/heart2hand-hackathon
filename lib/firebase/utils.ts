import { query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { requestCollection, userCollection } from "./config";

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
        user.id = querySnapshot.docs[0].id;
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

// create new request
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewRequest = async (data: any) => {
    try {
        const newRequest = await addDoc(requestCollection, {
            ...data,
            createdAt: new Date().toISOString(),
            status: "pending",
            amountCollected: 0,
        });

        if (!newRequest) {
            return { message: "Request not created", success: false };
        }

        return { message: newRequest.id, success: true };
    } catch (error) {
        handleError(error, "createNewRequest");
        return { message: "Something went wrong", success: false };
    }
}

// fetch request by id
export const getRequestById = async (id: string) => {
    try {
        const docRef = doc(requestCollection, id);
        const requestDoc = await getDoc(docRef);

        if (!requestDoc.exists()) {
            return { message: "Invalid request Id", success: false };
        }

        return { message: requestDoc.data(), success: true };
    } catch (err) {
        handleError(err, "getRequestById");
        return { message: "Something went wrong", success: false };
    }
};

// fetch all requests
export const getAllRequest = async() => {
    try {
        const requestDoc = await getDocs(requestCollection); 

        if (requestDoc.empty) {
            return { message: "No request found", success: false };
        }
        const result = requestDoc.docs.map((doc) => {
            const data = doc.data();

            const filteredData = {
                id: doc.id,
                ...data,
            };
            return filteredData;
        });

        return { message: result, success: true };
    } catch (error) {
        handleError(error, "getAllRequest");
        return { message: "Something went wrong", success: false };
    }
    
}
