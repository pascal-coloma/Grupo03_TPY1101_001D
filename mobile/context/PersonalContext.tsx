import PERSONAL, { Personal } from "@/constants/mockPersonal"
import { createContext, ReactNode, useContext, useState } from "react";

type PersonalContextType = {
    personal: Personal[],
    actualizarDisponilidad: (id: string) => void
};

const PersonalContext = createContext<PersonalContextType | null>(null);

const PersonalProvider = ({ children }: { children: ReactNode }) => {
    const [personal, setPersonal] = useState<Personal[]>(PERSONAL);

    function actualizarDisponilidad(id: string): void {
        const personalActualizado = personal.map(p => {
            if (p.id == id) {
                return { ...p, disponible: false };
            } else {
                return p;
            }
        });
        setPersonal(personalActualizado);
    }

    return <PersonalContext.Provider value={{ personal, actualizarDisponilidad }}>{children}</PersonalContext.Provider>;
};

export default PersonalProvider;

export function usePersonal() {
    const ctx = useContext(PersonalContext);
    if (!ctx) throw new Error('useContext debe usarse dentro de PersonalProvider');
    return ctx;

}