import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppLoadingStore } from "../../../store";
import { useToastStore } from "../../../store/toast";
import { AppBar } from "../../../components";

type AuthForm = {
  password: string;
};

export function PasswordPage() {
  const router = useRouter();
  const { toast } = useToastStore();
  const supabase = useSupabaseClient();
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>();

  const onSubmit: SubmitHandler<AuthForm> = async (formData) => {
    try {
      setError(null);
      setIsAppLoading(true);
      const response = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (response.error) {
        setError(response.error.message);
        setIsAppLoading(false);
        return;
      }

      setIsAppLoading(false);
      await router.push("/account");
      toast("Datos actualizados.");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box p={2}>
      <AppBar title="Contraseña" withBack />
      <Box py={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Box mb={4}>
              <Alert severity="error" variant="outlined">
                {error}
              </Alert>
            </Box>
          )}
          <Box mb={4}>
            <TextField
              label="Nueva contraseña"
              fullWidth
              type="password"
              {...register("password")}
            />
          </Box>

          <Box mb={4}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              disabled={!isValid || isAppLoading}
            >
              Actualizar constraseña
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
