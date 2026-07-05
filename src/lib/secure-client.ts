import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function obfuscate(str: string, key: number): string {
  return btoa(str.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join(''));
}

function deobfuscate(encoded: string, key: number): string {
  try {
    return atob(encoded).split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join('');
  } catch {
    return '';
  }
}

const _k = 0x3a;
const _u = obfuscate(import.meta.env.VITE_SUPABASE_URL || '', _k);
const _a = obfuscate(import.meta.env.VITE_SUPABASE_ANON_KEY || '', _k);

let _client: SupabaseClient | null = null;

export function getSecureClient(): SupabaseClient {
  if (!_client) {
    const url = deobfuscate(_u, _k);
    const key = deobfuscate(_a, _k);
    _client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { 'X-Security-Check': 'enabled' } },
    });
  }
  return _client;
}
