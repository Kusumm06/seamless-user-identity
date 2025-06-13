
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>
              Your account information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {user.user_metadata?.name && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{user.user_metadata.name}</p>
                </div>
              </div>
            )}

            {user.user_metadata?.phone && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.user_metadata.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-sm text-muted-foreground">
                  {user.email_confirmed_at ? 'Email Verified' : 'Email Pending Verification'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
