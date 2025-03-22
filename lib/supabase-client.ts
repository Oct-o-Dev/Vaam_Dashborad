"use client"
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

export function useSupabase() {
    const supabase = useMemo(
        () =>
            createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );
    return { supabase };
}