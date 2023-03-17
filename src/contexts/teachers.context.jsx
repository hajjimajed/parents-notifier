import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, currentTeacherData } from "../firebase/firebase";

export const TeacherContext = createContext({
    currentTeacher: null,
    setCurrentTeacher: () => null
})

export const TeacherProvider = ({ children }) => {
    const [currentTeacher, setCurrentTeacher] = useState(null);

    useEffect(() => {
        onAuthStateChangedListener((currentTeacher) => {
            if (currentTeacher) {
                setCurrentTeacher(currentTeacher);
            } else {
                setCurrentTeacher(null);
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async currentTeacher => {
            if (currentTeacher) {
                const datas = await currentTeacherData(currentTeacher);
                setCurrentTeacher({ uid: currentTeacher.uid, ...datas });
            } else {
                setCurrentTeacher(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const value = { currentTeacher, setCurrentTeacher };

    return <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
}

