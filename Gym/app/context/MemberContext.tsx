import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Member {
  id: number; 
  name: string;
  phone_number: string;
  profile_picture: string | number;
  email: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  address: string;
  notes: string;
}

interface MemberContextType {
  member: Member[];
  setMember: React.Dispatch<React.SetStateAction<Member[]>>;
  removeMember: (id: number) => void; 
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMember] = useState<Member[]>([]); // Store a list of members

  const removeMember = (id: number) => {
    setMember((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  return (
    <MemberContext.Provider value={{ member, setMember, removeMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = (): MemberContextType => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};
