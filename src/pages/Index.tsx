
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to Your App
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Start building your amazing project with our beautiful authentication system.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/auth">
              <LogIn className="h-4 w-4" />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/auth">
              <UserPlus className="h-4 w-4" />
              Create Account
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 p-6 bg-card rounded-lg border shadow-sm max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Ready to connect?</h3>
          <p className="text-sm text-muted-foreground">
            Connect to Supabase to enable real authentication and database functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
