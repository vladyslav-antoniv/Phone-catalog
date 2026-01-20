import { supabase } from "@/shared/api/supabase/client"; // Імпортуємо наш налаштований клієнт

// === LOGIN ===
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// === REGISTER ===
export const registerUser = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// === LOGOUT ===
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};