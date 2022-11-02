import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../lib";

type AuthForm = {
  email: string;
  password: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>();
  const onSubmit: SubmitHandler<AuthForm> = async (formData) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        setError(response.error.message);
      }
      console.log({ response });

      setIsLoading(false);
    } catch (error) {
      console.log("EEEORR", error);
    }
  };

  const asssfa = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log({ user });
  };

  return (
    <Box
      margin={{ xs: 0, md: 8 }}
      borderRadius={{ xs: 0, md: 4 }}
      overflow="hidden"
    >
      <Grid container>
        <Box component={Grid} item xs={8} display={{ xs: "none", md: "block" }}>
          <img
            src="https://img2.goodfon.com/wallpaper/nbig/e/97/shtanga-skamya-gym-fitness.jpg"
            className="home-cover"
          />
        </Box>
        <Box
          component={Grid}
          item
          xs={12}
          md={4}
          bgcolor="#151412"
          paddingX={4}
          display="flex"
          alignItems="center"
          height={{ xs: "100vh", sm: "auto" }}
        >
          <Box width="100%">
            <Box textAlign="center" mb={4}>
              <img src="https://tauros.vercel.app/img/logo.png" width="100%" />
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={4}>
                  <Button onClick={asssfa}>asdasdadas</Button>
                  <Typography variant="h4">Iniciar Sesión</Typography>
                  <Typography variant="subtitle1">
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
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  disabled={!isValid || isLoading}
                >
                  Iniciar sesión
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
