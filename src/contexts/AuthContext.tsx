import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser, useClerk } from "@clerk/clerk-react";
import { setTokenProvider } from "@/lib/api";

interface AuthContextType {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded } = useClerkAuth();
  const { user, isSignedIn } = useClerkUser();
  const { signOut: clerkSignOut } = useClerk();

  useEffect(() => {
    setTokenProvider(async () => {
      try {
        return await getToken();
      } catch {
        return null;
      }
    });
  }, [getToken]);

  const signOut = async () => {
    await clerkSignOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: isSignedIn ? user : null,
        token: null, // token is fetched on demand via getToken
        isLoading: !isLoaded,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
