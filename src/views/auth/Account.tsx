import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppLoadingStore } from "../../store";
import { useToastStore } from "../../store/toast";

type AuthForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

export function AccountView() {
  const { toast } = useToastStore();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>({
    defaultValues: {
      first_name: user?.user_metadata.first_name,
      last_name: user?.user_metadata.last_name,
      email: user?.user_metadata.email,
      phone: user?.user_metadata.phone,
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = async (formData) => {
    try {
      setError(null);
      setIsAppLoading(true);
      const response = await supabase.auth.updateUser({
        ...(formData.password ? { password: formData.password } : undefined),
        email: formData.email,
        data: {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
        },
      });

      if (response.error) {
        setError(response.error.message);
        setIsAppLoading(false);
        return;
      }

      setIsAppLoading(false);
      toast("Datos actualizados.");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box paddingY={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <Typography variant="h5">Tu cuenta</Typography>
          <Typography variant="subtitle2">
            Actualiza datos de tu cuenta
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
            label="Nueva contraseña"
            fullWidth
            type="password"
            {...register("password")}
            helperText="Deja tu contraseña en blanco para conservarla."
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
            Actualizar información
          </Button>
        </Box>
      </form>
    </Box>
  );
}
