import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { MemberForm } from "./memberForm";
import requester from "../axios";

export function Members() {
    const navigate = useNavigate();
    
    const [members, setMembers] = useState([]);

    const updateMembers = (data) => setMembers([...members, data]);

    useEffect(() => {
        const getMembers = async () => {
            try {
                const reponse = await requester.get("/members");
                setMembers(reponse.data);
            } catch (error) {
                console.error("Erro ao buscar os membros:", error);
            }
        };

        getMembers();
    }, []);

    const deleteMember = async ({ id }) => {
        try {
            await requester.delete(`members/${id}`);
            setMembers(members.filter((member) => member.id !== id));
        } catch (error) {
            console.error("Erro ao deletar o membro: ", error);
        }
    
    }

    return (
        <div className="flex flex-col gap-4 p-5 text-orange-500">
            <h1>Membros</h1>
            <ul>
                {members.map((member) => (
                    <li key={member.id} className="cursor-pointer flex gap-4 items-center">
                        {member.name}
                        <button onClick={() => navigate(member.id)}>Editar</button>
                        <button onClick={() => deleteMember(member)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <MemberForm updateMembers={updateMembers} />
        </div>
    );
}
