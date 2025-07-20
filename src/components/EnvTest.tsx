import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EnvTest = () => {
  const [envStatus, setEnvStatus] = useState<{
    url: boolean;
    anonKey: boolean;
    connection: boolean;
  }>({
    url: false,
    anonKey: false,
    connection: false,
  });

  useEffect(() => {
    const checkEnvironment = async () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      setEnvStatus(prev => ({
        ...prev,
        url: !!url,
        anonKey: !!anonKey,
      }));

      // Test Supabase connection
      if (url && anonKey) {
        try {
          const { data, error } = await supabase.from('profiles').select('count').limit(1);
          setEnvStatus(prev => ({
            ...prev,
            connection: !error,
          }));
        } catch (error) {
          setEnvStatus(prev => ({
            ...prev,
            connection: false,
          }));
        }
      }
    };

    checkEnvironment();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Environment Test
        </CardTitle>
        <CardDescription>
          Testing Supabase environment configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Supabase URL</span>
          <Badge variant={envStatus.url ? "default" : "destructive"}>
            {envStatus.url ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {envStatus.url ? "Found" : "Missing"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Anon Key</span>
          <Badge variant={envStatus.anonKey ? "default" : "destructive"}>
            {envStatus.anonKey ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {envStatus.anonKey ? "Found" : "Missing"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Database Connection</span>
          <Badge variant={envStatus.connection ? "default" : "destructive"}>
            {envStatus.connection ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {envStatus.connection ? "Connected" : "Failed"}
          </Badge>
        </div>

        {envStatus.url && envStatus.anonKey && envStatus.connection && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✅ All environment variables are properly configured!
            </p>
          </div>
        )}

        {(!envStatus.url || !envStatus.anonKey) && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">
              ❌ Missing environment variables. Check your .env file.
            </p>
            <p className="text-xs text-red-600 mt-1">
              Make sure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvTest; 