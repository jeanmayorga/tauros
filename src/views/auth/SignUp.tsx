import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

export function SignUpView() {
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
      const response = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
          },
        },
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
      <Box>
        <img
          src="https://img2.goodfon.com/wallpaper/nbig/e/97/shtanga-skamya-gym-fitness.jpg"
          className="home-cover"
        />
      </Box>
      <Box>
        <Box width="100%">
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={4}>
                <Typography variant="h4">Registrarse</Typography>
                <Typography variant="subtitle2">
                  Al registrarte puedes tener beneficios extras.
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Nombre"
                      fullWidth
                      {...register("first_name", {
                        required: true,
                        minLength: 1,
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Apellido"
                      fullWidth
                      {...register("last_name", {
                        required: true,
                        minLength: 1,
                      })}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={4}>
                <TextField
                  label="Correo electronico o usuario"
                  fullWidth
                  type="email"
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
                <TextField
                  label="Número de teléfono"
                  fullWidth
                  type="tel"
                  {...register("phone", { required: true, minLength: 1 })}
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
                  Registrarse
                </Button>
              </Box>
            </form>
            <Divider />
            <Box mt={1}>
              <Button
                LinkComponent={NextLink}
                href="/auth/signin"
                size="large"
                fullWidth
                variant="text"
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
