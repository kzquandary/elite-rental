'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, User, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.username === 'admin' && credentials.password === 'admin') {
      storage.setAdminUser({
        username: credentials.username,
        isLoggedIn: true
      });

      toast({
        title: "Login Berhasil",
        description: "Selamat datang di dashboard admin!"
      });

      router.push('/admin/dashboard');
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto bg-emerald-600 p-3 rounded-full w-fit">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Admin Portal
              </CardTitle>
              <p className="text-slate-600 mt-2">
                EliteRental Management System
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  placeholder="Masukkan username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Memproses...' : 'Login'}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 text-center mb-2">
                Demo Credentials:
              </p>
              <div className="text-xs font-mono text-slate-700 text-center space-y-1">
                <div>Username: <span className="bg-white px-2 py-1 rounded">admin</span></div>
                <div>Password: <span className="bg-white px-2 py-1 rounded">admin</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => router.push('/')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            ← Kembali ke Homepage
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}