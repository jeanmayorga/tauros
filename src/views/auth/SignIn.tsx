import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppLoadingStore } from "../../store";

type AuthForm = {
  email: string;
  password: string;
};

export function SignInView() {
  const router = useRouter();
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
      const response = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        setError(response.error.message);
        setIsAppLoading(false);
        return;
      }

      router.push("/");

      setIsAppLoading(false);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <>
      <Box mx={-2}>
        <img
          src="https://img2.goodfon.com/wallpaper/nbig/e/97/shtanga-skamya-gym-fitness.jpg"
          className="home-cover"
        />
      </Box>
      <Box my={4}>
        <Box width="100%">
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={4}>
                <Typography variant="h4">Iniciar Sesión</Typography>
                <Typography variant="subtitle2">
                  Al entrar tendras acceso a toda tu información
                </Typography>
              </Box>
              {error && (
                <Box mb={4}>
                  <Alert severity="error" variant="outlined">
                    {error}
                  </Alert>
                </Box>
              )}
              <Box mb={4}>
                <TextField
                  label="Correo electronico o usuario"
                  fullWidth
                  {...register("email", { required: true, minLength: 1 })}
                />
              </Box>
              <Box mb={4}>
                <TextField
                  label="Contraseña"
                  fullWidth
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 1,
                  })}
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
                  Iniciar sesión
                </Button>
              </Box>
            </form>
            <Box mb={1} textAlign="right">
              <Button
                LinkComponent={NextLink}
                href="/auth/forgot"
                size="large"
                fullWidth
                variant="text"
              >
                Recuperar contraseña
              </Button>
            </Box>
            <Divider />
            <Box mt={1}>
              <Button
                LinkComponent={NextLink}
                href="/auth/signup"
                size="large"
                fullWidth
                variant="text"
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
