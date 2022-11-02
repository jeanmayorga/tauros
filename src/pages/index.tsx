import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type AuthForm = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>();
  const onSubmit: SubmitHandler<AuthForm> = (data) => console.log(data);

  return (
    <Box
      margin={{ xs: 0, md: 8 }}
      borderRadius={{ xs: 0, md: 4 }}
      overflow="hidden"
    >
      <Grid container>
        <Box component={Grid} xs={8} display={{ xs: "none", md: "block" }}>
          <img
            src="https://img2.goodfon.com/wallpaper/nbig/e/97/shtanga-skamya-gym-fitness.jpg"
            className="home-cover"
          />
        </Box>
        <Grid item xs={12} md={4} bgcolor="#151412">
          <Box paddingX={4} pt={1} pb={20}>
            <Box textAlign="center">
              <img
                src="https://cdn.dribbble.com/users/1090926/screenshots/14226582/media/762f9f80040cc43603db0f1146df6d0d.png?compress=1&resize=400x300"
                width="100%"
              />
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={4}>
                  <Typography variant="h4">Iniciar Sesión</Typography>
                  <Typography variant="subtitle1">
                    Al entrar tendras acceso a toda tu información
                  </Typography>
                </Box>
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
                    {...register("password", { required: true, minLength: 1 })}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  disabled={!isValid}
                >
                  Iniciar sesión
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
