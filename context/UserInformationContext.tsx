import React, { createContext, useContext, useState } from "react";

// ********* TYPES

type UserContextType = {
  username: string;
  email: string; // Peut apparaitre sous la forme login dans le back !
  saveImage: boolean;
  points: number;
  setUserData: (data: UpdatableUserData) => void;
  resetUserData: () => void;
};

type UserContextData = Omit<UserContextType, "setUserData" | "resetUserData">;
type UpdatableUserData = Partial<UserContextData>;

// ********* CONTEXT

const UserInformationContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserInformationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userData, setUserData] = useState<UserContextData>({
    username: "",
    email: "",
    saveImage: false,
    points: 0,
  });

  const resetUserData = () => {
    setUserData({
      username: "",
      email: "",
      saveImage: false,
      points: 0,
    });
  };

  const updateUserData = (data: UpdatableUserData) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserInformationContext.Provider
      value={{ ...userData, setUserData: updateUserData, resetUserData }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useUserInformation = () => {
  const context = useContext(UserInformationContext);
  if (!context) {
    throw new Error(
      "useUserInformation doit être utilisé à l'intérieur de UserInformationProvider",
    );
  }
  return context;
};
