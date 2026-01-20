"use client";

import { useEffect } from "react";
import { supabase } from "@/shared/api/supabase/client";
import { useAppDispatch } from "@/shared/api/lib/hooks";
import { setUser } from "@/features/auth/model/authSlice";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/app/store/store";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export const AuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        dispatch(setUser(user));
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
};
