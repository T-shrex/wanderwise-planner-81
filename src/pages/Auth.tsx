import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode") === "signup" ? "signup" : "signin";
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  if (isSignedIn && user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal">
              <Compass className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">ZipTrip</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Welcome</h2>
              <p className="text-muted-foreground mb-6">
                Sign in or create an account to sync your itineraries securely with Clerk.
              </p>
              <Button
                variant="ghost"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Button>
            </div>
            <div className="flex-1">
              {mode === "signup" ? (
                <SignUp path="/auth" routing="path" signInUrl="/auth" />
              ) : (
                <SignIn path="/auth" routing="path" signUpUrl="/auth?mode=signup" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
