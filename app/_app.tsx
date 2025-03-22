import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useSupabase } from '@/lib/supabase-client';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { supabase } = useSupabase();
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;